import type { Participant } from '@prisma/client'
import { ClientError } from '../http/error/errors/client-error'
import { prisma } from './../lib/prisma'

interface IConfirmParticipantsRequest {
  participant_id: string
}

export const confirmParticipantsUseCase = async ({
  participant_id,
}: IConfirmParticipantsRequest): Promise<Participant> => {
  const participant = await prisma.participant.findUnique({
    where: {
      id: participant_id,
    },
  })

  if (!participant) {
    throw new ClientError('Participant not found')
  }

  if (participant.is_confirmed) {
    throw new ClientError('Trip already confirmed')
  }

  await prisma.participant.update({
    where: {
      id: participant_id,
    },
    data: {
      is_confirmed: true,
    },
  })

  return participant
}
