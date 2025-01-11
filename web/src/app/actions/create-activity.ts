'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'

interface ICreateActivityProps {
  trip_id: string
  activity: string
  occurs_at: string
}

export const createActivity = async ({
  trip_id,
  activity,
  occurs_at,
}: ICreateActivityProps) => {
  await api.post(`/trips/${trip_id}/activities`, {
    title: activity,
    occurs_at,
  })

  revalidatePath('/trips/[trip_id]')
}
