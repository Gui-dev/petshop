'use server'

import { revalidatePath } from 'next/cache'
import { appointmentSchema, type IAppointmentSchema } from '@/schemas/appointment-schema'
import { prisma } from '@/services/prisma'
import { getPeriod } from '@/utils/get-period'

interface IUpdateAppointmentProps {
  id: string
  data: IAppointmentSchema
}

export const updateAppointmentAction = async ({ id, data }: IUpdateAppointmentProps) => {
  try {
    const parsedData = appointmentSchema.parse(data)
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
        id: {
          not: id,
        },
      },
    })

    if (existsingAppointments) {
      return {
        error: 'Já existe um agendamento para essa data',
      }
    }

    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.error(error)
  }
}
