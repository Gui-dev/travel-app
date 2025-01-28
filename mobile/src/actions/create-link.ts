import { api } from '@/lib/api'

export type Link = {
  id: string
  title: string
  url: string
}

type LinkCreate = Omit<Link, 'id'> & {
  tripId: string
}

export const createLink = async ({ tripId, title, url }: LinkCreate) => {
  try {
    const { data } = await api.post<{ link_id: string }>(
      `/trips/${tripId}/links`,
      { title, url },
    )

    return data.link_id
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}
