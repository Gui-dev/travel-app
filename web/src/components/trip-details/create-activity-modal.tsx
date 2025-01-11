'use client'

import { createActivity } from '@/app/actions/create-activity'
import { Calendar, Save, Tag, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { Button } from '../button'

interface ICreateActivityModalProps {
  tripId: string
  onCloseCreateActivityModal: () => void
}

export const CreateActivityModal = ({
  tripId,
  onCloseCreateActivityModal,
}: ICreateActivityModalProps) => {
  const handleCreateActivity = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const activity = data.get('activity')?.toString()
    const occurs_at = data.get('date')?.toString()

    if (!activity || !occurs_at) {
      return
    }

    await createActivity({
      trip_id: tripId,
      activity,
      occurs_at,
    })
    onCloseCreateActivityModal()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Cadastrar atividade</h2>
            <button type="button" onClick={onCloseCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-left text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades
          </p>
        </div>

        <form onSubmit={handleCreateActivity} className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Tag className="size-5 text-zinc-400" />
              <input
                type="text"
                name="activity"
                placeholder="Qual a atividade"
                className="flex flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="date"
                placeholder="Data e horário da atividade"
                className="flex flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>
          </div>

          <Button type="submit" size="full">
            <Save className="size-5" />
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}
