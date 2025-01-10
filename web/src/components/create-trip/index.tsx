'use client'
import { createTrip } from '@/app/actions/create-trip'
import type { AxiosError } from 'axios'
import {} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { ConfirmTripModal } from './confirm-trip-modal'
import { InviteGuestsModal } from './invite-guests-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export const CreateTrip = () => {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<Array<string>>([])
  const route = useRouter()

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  const handleOpenGuestsInput = () => {
    setIsGuestsInputOpen(true)
  }

  const handleCloseGuestsInput = () => {
    setIsGuestsInputOpen(false)
  }

  const handleOpenGuestsModal = () => {
    setIsGuestsModalOpen(true)
  }

  const handleCloseGuestsModal = () => {
    setIsGuestsModalOpen(false)
  }

  const handleOpenConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true)
    setIsGuestsModalOpen(false)
  }

  const handleCloseConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false)
  }

  const handleAddNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    setEmailsToInvite(state =>
      state.includes(email) ? [...state] : [...state, email],
    )
    event.currentTarget.reset()
  }

  const handleRemoveEmailFromInvites = (email: string) => {
    setEmailsToInvite(state => state.filter(invited => invited !== email))
  }

  const handleCreateTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!destination || !ownerName || !ownerEmail) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    try {
      const response = await createTrip({
        destination,
        owner_name: ownerName,
        owner_email: ownerEmail,
        emails_to_invite: emailsToInvite,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
      })
      route.push(`/trips/${response.trip_id}`)
    } catch (error) {
      const err = error as AxiosError
      console.log('ERROR: ', err.message)
    }
  }

  return (
    <div className="space-y-4">
      <DestinationAndDateStep
        onOpenGuestsInput={handleOpenGuestsInput}
        onCloseGuestsInput={handleCloseGuestsInput}
        isGuestsInputOpen={isGuestsInputOpen}
        onDestination={setDestination}
        eventStartAndEndDates={eventStartAndEndDates}
        onEventStartAndEndDates={setEventStartAndEndDates}
      />

      {isGuestsInputOpen && (
        <InviteGuestsStep
          onOpenGuestsModal={handleOpenGuestsModal}
          onOpenConfirmTripModal={handleOpenConfirmTripModal}
          emailsToInvite={emailsToInvite}
        />
      )}

      {isGuestsModalOpen && (
        <InviteGuestsModal
          onCloseGuestsModal={handleCloseGuestsModal}
          onAddNewEmailToInvite={handleAddNewEmailToInvite}
          onRemoveEmailFromInvites={handleRemoveEmailFromInvites}
          emailsToInvite={emailsToInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          onCloseConfirmTripModal={handleCloseConfirmTripModal}
          onCreateTrip={handleCreateTrip}
          onOwnerName={setOwnerName}
          onOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  )
}
