import { getGuests } from '@/app/actions/get-guests'
import { getTrip } from '@/app/actions/get-trip'
import { TripDetailsPage } from '@/pages/trip-details-page'

interface ITripDetailsParams {
  params: Promise<{
    trip_id: string
  }>
}

const TripDetails = async ({ params }: ITripDetailsParams) => {
  const { trip_id } = await params
  const trip = await getTrip(trip_id)
  const guests = await getGuests(trip_id)

  return <TripDetailsPage trip={trip} guests={guests} />
}

export default TripDetails
