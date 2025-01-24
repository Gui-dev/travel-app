import { api } from '@/lib/api'

type Activity = {
  id: string
  occurs_at: string
  title: string
}

type ActivityResponse = {
  activities: {
    date: string
    activities: Activity[]
  }[]
}

export const getActivitiesByTripId = async (tripId: string) => {
  try {
    const { data } = await api.get<ActivityResponse>(
      `/trips/${tripId}/activities`,
    )
    return data.activities
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}
