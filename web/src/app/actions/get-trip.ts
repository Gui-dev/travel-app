'use server'

import { api } from '@/lib/api'

export const getTrip = async (trip_id: string) => {
  const { data } = await api.get(`trips/${trip_id}`)

  return data.trip
}
