import type { Participant } from '@prisma/client'
import { prisma } from '../lib/prisma'

interface IGetParticipantsUseCaseRequest {
  trip_id: string
}

interface IGetParticipantsUseCaseResponse {
  participants: Pick<Participant, 'id' | 'name' | 'email' | 'is_confirmed'>[]
}

export const getParticipantsUseCase = async ({
  trip_id,
}: IGetParticipantsUseCaseRequest): Promise<IGetParticipantsUseCaseResponse> => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
    include: {
      participants: {
        select: {
          id: true,
          name: true,
          email: true,
          is_confirmed: true,
        },
      },
    },
  })

  if (!trip) {
    throw new Error('Trip not found')
  }

  return {
    participants: trip.participants,
  }
}
