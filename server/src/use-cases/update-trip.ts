import type { Trip } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { dayjs } from './../lib/dayjs'

interface IUpdateTripRequest {
  trip_id: string
  destination: string
  starts_at: Date
  ends_at: Date
}

interface IUpdateTripResponse {
  trip: Trip
}

export const updateTripUseCase = async ({
  trip_id,
  destination,
  starts_at,
  ends_at,
}: IUpdateTripRequest): Promise<IUpdateTripResponse> => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
  })

  if (dayjs(starts_at).isBefore(new Date())) {
    throw new Error('Invalid trip start date')
  }

  if (dayjs(ends_at).isBefore(starts_at)) {
    throw new Error('Invalid trip end date')
  }

  if (!trip) {
    throw new Error('Trip not found')
  }

  const tripUpdated = await prisma.trip.update({
    where: {
      id: trip.id,
    },
    data: {
      destination,
      starts_at,
      ends_at,
    },
  })

  return {
    trip: tripUpdated,
  }
}
