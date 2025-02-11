import { Link2, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../button'

export const ImportantLinks = () => {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links inportantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <Link
              href="https://airbnb.com.br/rooms.92184904dish89fy328748912yhduew"
              className="block truncate text-xs text-zinc-400 hover:text-zinc-200"
            >
              https://airbnb.com.br/rooms.92184904dish89fy328748912yhduew
            </Link>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <Link
              href="https://airbnb.com.br/rooms.92184904dish89fy328748912yhduew"
              className="block truncate text-xs text-zinc-400 hover:text-zinc-200"
            >
              https://airbnb.com.br/rooms.92184904dish89fy328748912yhduew
            </Link>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>
      </div>
      <Button type="button" variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}
