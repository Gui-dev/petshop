'use server'

import { revalidatePath } from 'next/cache'
import { appointmentSchema, type IAppointmentSchema } from '@/schemas/appointment-schema'
import { prisma } from '@/services/prisma'
import { getPeriod } from '@/utils/get-period'

export const createAppointment = async (data: IAppointmentSchema) => {
  try {
    const parsedData = appointmentSchema.parse(data)
    const { scheduledAt } = parsedData

    const period = getPeriod(scheduledAt)

    if (!period) {
      return {
        error: 'Agendamentos só podem ser feitos entre 9h-12h, 13h-18h e 19h-21h',
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

    revalidatePath('/')
  } catch (_error) {}
  console.log(data)
}
