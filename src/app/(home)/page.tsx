import { parseISO } from 'date-fns'
import { Calendar1 } from 'lucide-react'
import { AppointmentForm } from '@/components/appointment-form'
import { DatePicker } from '@/components/date-picker'
import { PeriodSection } from '@/components/period-section'
import { getAppointments } from './actions/get-appointments-action'

interface IHomeProps {
  searchParams: Promise<{ date?: string }>
}

export default async function Home({ searchParams }: IHomeProps) {
  const { date } = await searchParams
  const selectedDate = date ? parseISO(date) : new Date()

  const periods = await getAppointments(selectedDate)

  return (
    <section className="p-6">
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:mb-8 md:flex-row md:gap-0">
        <div>
          <h1 className="mb-2 font-bold text-zinc-100">Sua Agenda</h1>
          <p className="text-sm text-zinc-300">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>

        <DatePicker />
      </div>

      <div className="pb-24 md:pb-0">
        {periods.map(period => {
          return <PeriodSection key={period.type} period={period} />
        })}
      </div>

      <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-zinc-800 px-6 py-5 md:top-auto md:right-6 md:bottom-6 md:left-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm>
          <Calendar1 className="size-4 font-bold" />
          Agendar
        </AppointmentForm>
      </div>
    </section>
  )
}
