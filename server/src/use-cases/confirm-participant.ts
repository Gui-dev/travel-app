import type { Participant } from '@prisma/client'
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
    throw new Error('Participant not found')
  }

  if (participant.is_confirmed) {
    throw new Error('Trip already confirmed')
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
