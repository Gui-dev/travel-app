import { CircleDashed, UserCog } from 'lucide-react'

export const Guests = () => {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Clark Kent</span>
            <span className="block truncate text-sm text-zinc-400">
              clark@email.com
            </span>
          </div>
          <CircleDashed className="size-5 shrink-0 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Barry Allen</span>
            <span className="block truncate text-sm text-zinc-400">
              barry@email.com
            </span>
          </div>
          <CircleDashed className="size-5 shrink-0 text-zinc-400" />
        </div>

        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 px-5 font-medium text-zinc-200 hover:bg-zinc-700"
        >
          <UserCog className="size-5" />
          Gerenciar convidados
        </button>
      </div>
    </div>
  )
}
