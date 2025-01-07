import { TripDetailsPage } from '@/pages/trip-details-page'

interface ITripDetailsParams {
  params: {
    trip_id: string
  }
}

const TripDetails = ({ params }: ITripDetailsParams) => {
  return <TripDetailsPage />
}

export default TripDetails
