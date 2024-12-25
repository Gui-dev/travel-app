import type { Participant } from '@prisma/client'
import { ClientError } from '../http/error/errors/client-error'
import { prisma } from '../lib/prisma'

interface IGetParticipantUseCaseRequest {
  participant_id: string
}

interface IGetParticipantUseCaseResponse {
  participant: Pick<Participant, 'id' | 'name' | 'email' | 'is_confirmed'>
}

export const getParticipantUseCase = async ({
  participant_id,
}: IGetParticipantUseCaseRequest): Promise<IGetParticipantUseCaseResponse> => {
  const participant = await prisma.participant.findUnique({
    where: {
      id: participant_id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      is_confirmed: true,
    },
  })

  if (!participant) {
    throw new ClientError('Trip not found')
  }

  return {
    participant,
  }
}
