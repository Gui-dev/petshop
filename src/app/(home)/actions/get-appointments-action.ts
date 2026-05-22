'use server'

import { prisma } from '@/services/prisma'
import { getAppointmentsByPeriod } from '@/utils/get-appointments-by-period'

export const getAppointments = async () => {
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      scheduledAt: 'asc',
    },
  })

  return getAppointmentsByPeriod(appointments)
}
