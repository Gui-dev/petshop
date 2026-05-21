'use server'

import {
  createAppointmentSchema,
  type ICreateAppointmentSchema,
} from '@/schemas/create-appointment-schema'
import { prisma } from '@/services/prisma'
import { getAppointmentsByPeriod } from '@/utils/get-appointments-by-period'
import { getPeriod } from '@/utils/get-period'

export const createAppointment = async (data: ICreateAppointmentSchema) => {
  try {
    const parsedData = createAppointmentSchema.parse(data)
    const { scheduledAt } = parsedData

    const hour = scheduledAt.getHours()
    const period = getPeriod(hour)

    if (!period) {
      return {
        error: 'Agendamentos só podem ser feitos entre 9h e 21h',
      }
    }

    const existsingAppointments = await prisma.appointment.findFirst({
      where: {
        scheduledAt,
      },
    })

    if (existsingAppointments) {
      return {
        error: 'Já existe um agendamento para essa data',
      }
    }

    await prisma.appointment.create({
      data: {
        ...parsedData,
      },
    })
  } catch (_error) {}
  console.log(data)
}

export const getAppointments = async () => {
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      scheduledAt: 'asc',
    },
  })

  return getAppointmentsByPeriod(appointments)
}
