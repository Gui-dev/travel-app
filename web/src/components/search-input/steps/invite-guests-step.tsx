import { ArrowRight, UserRoundPlus } from 'lucide-react'

interface IInviteGuestsStepProps {
  onOpenGuestsModal: () => void
  onOpenConfirmTripModal: () => void
  emailsToInvite: string[]
}

export const InviteGuestsStep = ({
  onOpenGuestsModal,
  onOpenConfirmTripModal,
  emailsToInvite,
}: IInviteGuestsStepProps) => {
  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <button
        type="button"
        onClick={onOpenGuestsModal}
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
        onClick={onOpenConfirmTripModal}
      >
        Confirmar viagem
        <ArrowRight className="size-5 text-lime-950" />
      </button>
    </div>
  )
}
