import { Calendar1 } from 'lucide-react'
import { AppointmentForm } from '@/components/appointment-form'
import { PeriodSection } from '@/components/period-section'
import { getAppointments } from './actions/get-appointments-action'

export default async function Home() {
  const periods = await getAppointments()

  return (
    <section className="p-6">
      <div className="mb-4 flex items-center justify-between md:mb-8">
        <div>
          <h1 className="mb-2 font-bold text-zinc-100">Sua Agenda</h1>
          <p className="text-sm text-zinc-300">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>

        <div>DATEPICKER</div>
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
