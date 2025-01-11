'use server'

import { api } from '@/lib/api'

export const getActivity = async (trip_id: string) => {
  const { data } = await api.get(`/trips/${trip_id}/activities`)

  return data.activities
}
