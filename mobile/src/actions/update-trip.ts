import { api } from '@/lib/api'

export interface ITripUpdateProps {
  trip_id: string
  destination: string
  starts_at: string
  ends_at: string
}

export interface ITripResponse {
  trip_id: string
}

export const updateTrip = async ({
  trip_id,
  destination,
  starts_at,
  ends_at,
}: ITripUpdateProps) => {
  try {
    const { data } = await api.put<ITripResponse>(`/trips/${trip_id}`, {
      destination,
      starts_at,
      ends_at,
    })

    return data.trip_id
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}
