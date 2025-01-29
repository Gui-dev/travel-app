import type { TripLinkProps } from '@/components/trip-link'
import { api } from '@/lib/api'

export const getLinksByTripId = async (tripId: string) => {
  try {
    const { data } = await api.get<{ links: TripLinkProps[] }>(
      `/trips/${tripId}/links`,
    )
    return data.links
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}
