import { Button } from '@/components/button'
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
        <Button type="button" onClick={onOpenGuestsInput}>
          Continuar
          <ArrowRight className="size-5 text-lime-950" />
        </Button>
      )}

      {isGuestsInputOpen && (
        <Button type="button" variant="secondary" onClick={onCloseGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      )}
    </div>
  )
}
