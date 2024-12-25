import type { Trip } from '@prisma/client'
import { prisma } from '../lib/prisma'

interface IGetTripDetailsUseCaseRequest {
  trip_id: string
}

interface IGetTripDetailsUseCaseResponse {
  trip: Pick<
    Trip,
    'id' | 'destination' | 'starts_at' | 'ends_at' | 'is_confirmed'
  >
}

export const getTripDetailsUseCase = async ({
  trip_id,
}: IGetTripDetailsUseCaseRequest): Promise<IGetTripDetailsUseCaseResponse> => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
    select: {
      id: true,
      destination: true,
      starts_at: true,
      ends_at: true,
      is_confirmed: true,
    },
  })

  if (!trip) {
    throw new Error('Trip not found')
  }

  return {
    trip,
  }
}
