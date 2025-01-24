import { api } from '@/lib/api'

type Activity = {
  id: string
  occurs_at: string
  title: string
}

type ActivityCreate = Omit<Activity, 'id'> & {
  tripId: string
}

export const createActivity = async ({
  tripId,
  occurs_at,
  title,
}: ActivityCreate) => {
  try {
    const { data } = await api.post<{ activityId: string }>(
      `/trips/${tripId}/activities`,
      { occurs_at, title },
    )

    return data
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}
