'use client'

import {} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { ConfirmTripModal } from './confirm-trip-modal'
import { InviteGuestsModal } from './invite-guests-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export const SearchInput = () => {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<Array<string>>([])
  const route = useRouter()

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

  const handleCreateTrip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('CRIOU: ')
    route.push('/trips/1234567')
  }

  return (
    <div className="space-y-4">
      <DestinationAndDateStep
        onOpenGuestsInput={handleOpenGuestsInput}
        onCloseGuestsInput={handleCloseGuestsInput}
        isGuestsInputOpen={isGuestsInputOpen}
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
        />
      )}
    </div>
  )
}
