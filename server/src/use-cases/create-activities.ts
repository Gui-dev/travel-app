import type { Activity } from '@prisma/client'
import { ClientError } from '../http/error/errors/client-error'
import { prisma } from '../lib/prisma'
import { dayjs } from './../lib/dayjs'

interface ICreateAcitivitiesUseCaseRequest {
  trip_id: string
  title: string
  occurs_at: Date
}

interface ICreateAcitivitiesUseCaseResponse {
  activity: Activity
}

export const createAcitivitiesUseCase = async ({
  trip_id,
  title,
  occurs_at,
}: ICreateAcitivitiesUseCaseRequest): Promise<ICreateAcitivitiesUseCaseResponse> => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
  })

  if (!trip) {
    throw new ClientError('Trip not found')
  }

  if (dayjs(occurs_at).isBefore(trip.starts_at)) {
    throw new ClientError('Invalid activity date')
  }

  if (dayjs(occurs_at).isAfter(trip.ends_at)) {
    throw new ClientError('Invalid activity date')
  }

  const activity = await prisma.activity.create({
    data: {
      trip_id,
      title,
      occurs_at,
    },
  })

  return {
    activity,
  }
}
