import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, MapPin, Settings2 } from 'lucide-react'
import { Button } from '../button'

interface IDestinationAndDateHeaderProps {
  trip: {
    id: string
    destination: string
    ends_at: string
    is_confirmed: boolean
    starts_at: string
  }
}

export const DestinationAndDateHeader = ({
  trip,
}: IDestinationAndDateHeaderProps) => {
  const displayedDate = trip
    ? `
            ${format(trip.starts_at, "d 'de' LLL", { locale: ptBR })} até
            ${format(trip.ends_at, "d 'de' LLL", { locale: ptBR })}
          `
    : null

  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <Button type="button" variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  )
}
