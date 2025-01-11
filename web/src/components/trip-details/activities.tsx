import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CircleCheck } from 'lucide-react'

interface IActivitiesProps {
  activities: {
    date: string
    activities: {
      id: string
      title: string
      occurs_at: string
    }[]
  }[]
}

export const Activities = ({ activities }: IActivitiesProps) => {
  return (
    <div className="space-y-8">
      {activities.map(activity => {
        const day = format(activity.date, "'Dia' d", { locale: ptBR })
        const dayOfTheWeek = format(activity.date, 'EEEE', { locale: ptBR })
        return (
          <div key={activity.date} className="space-y-2.5">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-xl text-zinc-300">{day}</span>
              <span className="text-xs text-zinc-500">{dayOfTheWeek}</span>
            </div>
            {activity.activities.length === 0 && (
              <p className="text-sm text-zinc-500">
                Nenhuma atividade cadastrada nessa data
              </p>
            )}

            {activity.activities.map(activity => {
              const day = format(activity.occurs_at, "HH:mm'h'", {
                locale: ptBR,
              })
              return (
                <div key={activity.id} className="space-y-2.5">
                  <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">{activity.title}</span>
                    <span className="ml-auto text-sm text-zinc-400">{day}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
