import { api } from '@/lib/api'

interface ICreateTripProps {
  destination: string
  starts_at: string
  ends_at: string
  owner_name?: string
  owner_email?: string
  emails_to_invite: string[]
}

export const createTrip = async (trip: ICreateTripProps) => {
  try {
    const { data } = await api.post<{ trip_id: string }>('/trips', {
      ...trip,
      owner_name: 'Ozzy Osbourne',
      owner_email: 'ozzy@email.com',
    })

    return data
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}
