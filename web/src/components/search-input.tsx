'use client'

import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  UserRoundPlus,
  X,
} from 'lucide-react'
import { type FormEvent, useState } from 'react'

export const SearchInput = () => {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState(['bruce@email.com'])

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
            <span className="flex flex-1 text-lg text-zinc-400">
              Quem estará na viagem?
            </span>
          </button>

          <div className="h-6 w-px bg-zinc-800" />

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
            onClick={handleOpenGuestsInput}
          >
            Confirmar viagem
            <ArrowRight className="size-5 text-lime-950" />
          </button>
        </div>
      )}

      {isGuestsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Selecionar convidados</h2>
                <button type="button" onClick={handleCloseGuestsModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-left text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map(email => {
                return (
                  <div
                    key={email}
                    className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
                  >
                    <span className="text-zinc-300">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmailFromInvites(email)}
                    >
                      <X className="size-4 text-zinc-400" />
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="h-px w-full bg-zinc-800" />

            <form
              onSubmit={handleAddNewEmailToInvite}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-2.5"
            >
              <div className="flex flex-1 items-center gap-2 px-2">
                <AtSign className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado!"
                  className="flex flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
                onClick={handleOpenGuestsInput}
              >
                Convidar
                <Plus className="size-5 text-lime-950" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
