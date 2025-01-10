'use server'

import { api } from '@/lib/api'

interface ICreateTrip {
  destination: string
  owner_name: string
  owner_email: string
  emails_to_invite: string[]
  starts_at: Date
  ends_at: Date
}

export const createTrip = async ({
  destination,
  owner_name,
  owner_email,
  emails_to_invite,
  starts_at,
  ends_at,
}: ICreateTrip) => {
  const { data } = await api.post('/trips', {
    destination,
    owner_name,
    owner_email,
    emails_to_invite,
    starts_at,
    ends_at,
  })

  return data
}
