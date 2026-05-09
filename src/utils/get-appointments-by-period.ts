import type { Appointment } from '@/generated/prisma'
import type { AppointmentFullProps, AppointmentProps } from '@/types/appointment'
import { getPeriod } from './get-period'

export const getAppointmentsByPeriod = (appointments: Appointment[]): AppointmentFullProps[] => {
  const transformedAppointments: AppointmentProps[] = appointments.map(appointment => {
    return {
      ...appointment,
      time: appointment.scheduledAt.toLocaleTimeString('pt-BR', {}),
      service: appointment.description,
      period: getPeriod(appointment.scheduledAt.getHours()),
    }
  })

  const morningAppointments = transformedAppointments.filter(
    appointment => appointment.period === 'morning'
  )
  const afternoonAppointments = transformedAppointments.filter(
    appointment => appointment.period === 'afternoon'
  )
  const eveningAppointments = transformedAppointments.filter(
    appointment => appointment.period === 'evening'
  )

  return [
    {
      type: 'morning',
      title: 'Manhã',
      timeRange: '09h - 12h',
      appointments: morningAppointments,
    },
    {
      type: 'afternoon',
      title: 'Tarde',
      timeRange: '13h - 18h',
      appointments: afternoonAppointments,
    },
    {
      type: 'evening',
      title: 'Noite',
      timeRange: '19h - 21h',
      appointments: eveningAppointments,
    },
  ]
}
