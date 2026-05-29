'use server'

import { endOfDay, startOfDay } from 'date-fns'
import { prisma } from '@/services/prisma'
import { getAppointmentsByPeriod } from '@/utils/get-appointments-by-period'

export const getAppointments = async (date: Date) => {
  const appointments = await prisma.appointment.findMany({
    where: {
      scheduledAt: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
    orderBy: {
      scheduledAt: 'asc',
    },
  })

  return getAppointmentsByPeriod(appointments)
}
