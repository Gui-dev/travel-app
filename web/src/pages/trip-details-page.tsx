'use client'
import { Activities } from '@/components/trip-details/activities'
import { CreateActivityModal } from '@/components/trip-details/create-activity-modal'
import { DestinationAndDateHeader } from '@/components/trip-details/destination-and-date-header'
import { Guests } from '@/components/trip-details/guests'
import { ImportantLinks } from '@/components/trip-details/important-links'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export interface ITripDetailsPageProps {
  trip: {
    id: string
    destination: string
    ends_at: string
    is_confirmed: boolean
    starts_at: string
  }
  guests: {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
  }[]
  activities: {
    date: string
    activities: {
      id: string
      title: string
      occurs_at: string
    }[]
  }[]
}

export const TripDetailsPage = ({
  trip,
  guests,
  activities,
}: ITripDetailsPageProps) => {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false)

  const handleOpenCreateActivityModal = () => {
    setIsCreateActivityModalOpen(true)
  }

  const handleCloseCreateActivityModal = () => {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <DestinationAndDateHeader trip={trip} />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-3xl">Atividades</h1>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
              onClick={handleOpenCreateActivityModal}
            >
              <Plus className="size-5 text-lime-950" />
              Cadastrar atividade
            </button>
          </div>

          <Activities activities={activities} />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />

          <div className="h-px w-full bg-zinc-800" />

          <Guests guests={guests} />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          tripId={trip.id}
          onCloseCreateActivityModal={handleCloseCreateActivityModal}
        />
      )}
    </div>
  )
}
