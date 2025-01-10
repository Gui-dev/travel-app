import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react'
import { Button } from '../button'

interface IGuestsProps {
  guests: {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
  }[]
}

export const Guests = ({ guests }: IGuestsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {guests.map((guest, index) => {
          return (
            <div
              key={guest.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {guest.name ?? `Convidado ${index + 1}`}
                </span>
                <span className="block truncate text-sm text-zinc-400">
                  {guest.email}
                </span>
              </div>
              {guest.is_confirmed && (
                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
              )}
              {!guest.is_confirmed && (
                <CircleDashed className="size-5 shrink-0 text-zinc-400" />
              )}
            </div>
          )
        })}

        <Button type="button" variant="secondary" size="full">
          <UserCog className="size-5" />
          Gerenciar convidados
        </Button>
      </div>
    </div>
  )
}
