import { PeriodSection } from '@/components/period-section'
import { getAppointmentsByPeriod } from '@/utils/get-appointments-by-period'

export default function Home() {
  const appointments = [
    {
      id: '1',
      tutorName: 'Clark Kent',
      petName: 'Cripto',
      phone: '123456789',
      description: 'Banho',
      scheduledAt: new Date('2026-05-22T09:00:00'),
    },
    {
      id: '2',
      tutorName: 'Clark Kent',
      petName: 'Cripto',
      phone: '123456789',
      description: 'Consulta',
      scheduledAt: new Date('2026-05-22T10:00:00'),
    },
    {
      id: '3',
      tutorName: 'Clark Kent',
      petName: 'Cripto',
      phone: '123456789',
      description: 'Banho e tosa',
      scheduledAt: new Date('2026-05-22T14:00:00'),
    },
    {
      id: '4',
      tutorName: 'Clark Kent',
      petName: 'Cripto',
      phone: '123456789',
      description: 'Consulta',
      scheduledAt: new Date('2026-05-22T20:00:00'),
    },
  ]

  const periods = getAppointmentsByPeriod(appointments)

  return (
    <div className="p-6">
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
    </div>
  )
}
