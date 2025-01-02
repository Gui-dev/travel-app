import { Mail, PlaneIcon, User, X } from 'lucide-react'
import type { FormEvent } from 'react'

interface IConfirmTripModalProps {
  onCloseConfirmTripModal: () => void
  onCreateTrip: (event: FormEvent<HTMLFormElement>) => void
}

export const ConfirmTripModal = ({
  onCloseConfirmTripModal,
  onCreateTrip,
}: IConfirmTripModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">
              Confirmar criação de viagem
            </h2>
            <button type="button" onClick={onCloseConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-left text-sm text-zinc-400">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-50">
              São Paulo, Brasil
            </span>{' '}
            nas datas{' '}
            <span className="font-semibold text-zinc-50">
              31 à 12 de Janeiro de 2025
            </span>{' '}
            preencha seus dados abaixo
          </p>
        </div>

        <form onSubmit={onCreateTrip} className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <User className="size-5 text-zinc-400" />
              <input
                type="text"
                name="name"
                placeholder="Seu nome completo"
                className="flex flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Mail className="size-5 text-zinc-400" />
              <input
                type="email"
                name="email"
                placeholder="Seu e-mail pessoal"
                className="flex flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-lime-300 px-5 font-medium text-lime-950 hover:bg-lime-400"
          >
            Confirmar criação da viagem
            <PlaneIcon className="size-5 text-lime-950" />
          </button>
        </form>
      </div>
    </div>
  )
}
