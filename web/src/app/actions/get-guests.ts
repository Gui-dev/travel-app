'use server'

import { api } from '@/lib/api'

export const getGuests = async (trip_id: string) => {
  const { data } = await api.get(`trips/${trip_id}/participants`)

  return data.participants
}
