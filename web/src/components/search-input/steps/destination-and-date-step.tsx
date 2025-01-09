'use client'

import { Button } from '@/components/button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Calendar, MapPin, Settings2, X } from 'lucide-react'
import { useState } from 'react'
import {
  type DateRange,
  DayPicker,
  getDefaultClassNames,
} from 'react-day-picker'
import 'react-day-picker/dist/style.css'

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
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()
  const defaultClassNames = getDefaultClassNames()

  const handleOpenDatepicker = () => {
    setIsDatePickerOpen(true)
  }

  const handleCloseDatepicker = () => {
    setIsDatePickerOpen(false)
  }

  const displayedDate =
    eventStartAndEndDates?.from && eventStartAndEndDates?.to
      ? `
          ${format(eventStartAndEndDates.from, "d 'de' LLL", { locale: ptBR })} até
          ${format(eventStartAndEndDates.to, "d 'de' LLL", { locale: ptBR })}
        `
      : null

  return (
    <>
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
        <button
          type="button"
          onClick={handleOpenDatepicker}
          disabled={isGuestsInputOpen}
          className="flex w-[240px] flex-1 items-center gap-2 text-left"
        >
          <Calendar className="size-5 text-zinc-400" />
          <span className="flex-1 bg-transparent text-lg text-zinc-400">
            {displayedDate || 'Quando ?'}
          </span>
        </button>

        <div className="h-6 w-px bg-zinc-800" />

        {!isGuestsInputOpen && (
          <Button type="button" onClick={onOpenGuestsInput}>
            Continuar
            <ArrowRight className="size-5 text-lime-950" />
          </Button>
        )}

        {isGuestsInputOpen && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCloseGuestsInput}
          >
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        )}
      </div>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Selecione a data</h2>
                <button type="button" onClick={handleCloseDatepicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              classNames={{
                selected: `${defaultClassNames.selected} text-zinc-500 `, // Highlight the selected day
                root: `${defaultClassNames.root} shadow-lg p-5 text-zinc-200`, // Add a shadow to the root element
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
