'use client'

import {
  ArrowRight,
  Calendar,
  MapPin,
  Settings2,
  UserRoundPlus,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { ConfirmTripModal } from './confirm-trip-modal'
import { InviteGuestsModal } from './invite-guests-modal'

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
      <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
        <div className="flex flex-1 items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Para onde você vai?"
            className="flex flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            disabled={isGuestsInputOpen}
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Quando?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none"
            disabled={isGuestsInputOpen}
          />
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        {!isGuestsInputOpen && (
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
            onClick={handleOpenGuestsInput}
          >
            Continuar
            <ArrowRight className="size-5 text-lime-950" />
          </button>
        )}

        {isGuestsInputOpen && (
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2 font-medium text-zinc-200 hover:bg-zinc-700"
            onClick={handleCloseGuestsInput}
          >
            Alterar local/data
            <Settings2 className="size-5 text-zinc-200" />
          </button>
        )}
      </div>

      {isGuestsInputOpen && (
        <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
          <button
            type="button"
            onClick={handleOpenGuestsModal}
            className="flex flex-1 items-center gap-2"
          >
            <UserRoundPlus className="size-5 text-zinc-400" />
            {emailsToInvite.length === 0 && (
              <span className="flex flex-1 text-lg text-zinc-400">
                Quem estará na viagem?
              </span>
            )}

            {emailsToInvite.length > 0 && (
              <span className="flex flex-1 text-lg text-zinc-100">
                {emailsToInvite.length} pessoa(s) foram convidada(s)
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-zinc-800" />

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
            onClick={handleOpenConfirmTripModal}
          >
            Confirmar viagem
            <ArrowRight className="size-5 text-lime-950" />
          </button>
        </div>
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
