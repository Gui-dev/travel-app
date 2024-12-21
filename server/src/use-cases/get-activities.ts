import type { Activity } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { dayjs } from './../lib/dayjs'

interface IGetAcitivitiesUseCaseRequest {
  trip_id: string
}

interface IGetAcitivitiesUseCaseResponse {
  activities: {
    date: Date
    activities: Activity[]
  }[]
}

export const getAcitivitiesUseCase = async ({
  trip_id,
}: IGetAcitivitiesUseCaseRequest): Promise<IGetAcitivitiesUseCaseResponse> => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
    include: {
      activities: {
        orderBy: {
          occurs_at: 'asc',
        },
      },
    },
  })

  if (!trip) {
    throw new Error('Trip not found')
  }

  const differenceInDaysBetweenTripStartAndEnd = dayjs(trip.ends_at).diff(
    trip.starts_at,
    'days',
  )
  const activities = Array.from({
    length: differenceInDaysBetweenTripStartAndEnd + 1,
  }).map((_, index) => {
    const date = dayjs(trip.starts_at).add(index, 'days')
    return {
      date: date.toDate(),
      activities: trip.activities.filter(activity => {
        return dayjs(activity.occurs_at).isSame(date, 'day')
      }),
    }
  })

  return {
    activities,
  }
}
