import { api } from '@/lib/api'

type ParticipantConfirm = {
  participantId: string
  name: string
  email: string
}

export const confirmTripByParticipantId = async ({
  participantId,
  name,
  email,
}: ParticipantConfirm) => {
  try {
    await api.patch(`/participants/${participantId}/confirm`, { name, email })
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}
