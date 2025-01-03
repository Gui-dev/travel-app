import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'

interface IDestinationAndDateStepProps {
  onOpenGuestsInput: () => void
  onCloseGuestsInput: () => void
  isGuestsInputOpen: boolean
}

export const DestinationAndDateStep = ({
  onOpenGuestsInput,
  onCloseGuestsInput,
  isGuestsInputOpen,
}: IDestinationAndDateStepProps) => {
  return (
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
          onClick={onOpenGuestsInput}
        >
          Continuar
          <ArrowRight className="size-5 text-lime-950" />
        </button>
      )}

      {isGuestsInputOpen && (
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2 font-medium text-zinc-200 hover:bg-zinc-700"
          onClick={onCloseGuestsInput}
        >
          Alterar local/data
          <Settings2 className="size-5 text-zinc-200" />
        </button>
      )}
    </div>
  )
}
