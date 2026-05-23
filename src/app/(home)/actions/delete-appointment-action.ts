'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/services/prisma'

export const deleteAppointmentAction = async (id: string) => {
  try {
    const existsingAppointment = await prisma.appointment.findFirst({
      where: {
        id,
      },
    })

    if (!existsingAppointment) {
      return {
        error: 'Agendamento não encontrado',
      }
    }

    await prisma.appointment.delete({
      where: {
        id,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.log(error)
    return {
      error: 'Erro ao deletar agendamento',
    }
  }
}
