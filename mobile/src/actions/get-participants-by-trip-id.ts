import { api } from '@/lib/api'

export type Participant = {
  id: string
  name: string
  email: string
  is_confirmed: boolean
}

export const getParticipantsByTripId = async (tripId: string) => {
  try {
    const { data } = await api.get<{ participants: Participant[] }>(
      `/trips/${tripId}/participants`,
    )

    return data.participants
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}
