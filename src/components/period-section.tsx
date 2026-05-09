import { Cloudy, Moon, Sun } from 'lucide-react'
import type { AppointmentFullProps } from '@/types/appointment'
import { AppointmentCard } from './appointment-card'

interface IPeriodSectionProps {
  period: AppointmentFullProps
}

export const PeriodSection = ({ period }: IPeriodSectionProps) => {
  const periodIcons = {
    morning: <Sun className="text-blue-500" />,
    afternoon: <Cloudy className="text-orange-500" />,
    evening: <Moon className="text-yellow-500" />,
  }

  return (
    <section className="mb-8 rounded-lg bg-zinc-900">
      <div className="flex items-center justify-between border-zinc-600 border-b px-5 py-3">
        <div className="flex items-center justify-center gap-2">
          {periodIcons[period.type]}
          <h2 className="font-semibold text-lg text-zinc-100">{period.title}</h2>
        </div>
        <span className="font-semibold text-2xl text-zinc-400">{period.timeRange}</span>
      </div>

      {period.appointments.length > 0 && (
        <div className="px-5">
          {period.appointments.map(appointment => {
            return <AppointmentCard key={appointment.id} appointment={appointment} />
          })}
        </div>
      )}

      {period.appointments.length === 0 && <div>Nada ainda.</div>}
    </section>
  )
}
