import { api } from '@/lib/api'

export interface ITripDetails {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export const getTripById = async (trip_id: string) => {
  try {
    const { data } = await api.get<{ trip: ITripDetails }>(`/trips/${trip_id}`)

    return data.trip
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}
