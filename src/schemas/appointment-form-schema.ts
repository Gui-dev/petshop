import { setHours, setMinutes, startOfToday } from 'date-fns'
import { z } from 'zod'

export const appointmentFormSchema = z
  .object({
    tutorName: z.string().min(1, 'O nome do tutor é obrigatório'),
    petName: z.string().min(1, 'O nome do pet é obrigatório'),
    phone: z.string().min(11, 'O número de telefone deve ter pelo menos 11 dígitos'),
    description: z.string().min(3, 'A descrição é obrigatória'),
    scheduledAt: z
      .date({ error: 'A data é obrigatória' })
      .min(startOfToday(), 'A data deve ser futura'),
    time: z.string().min(1, 'O horário é obrigatório'),
  })
  .refine(
    data => {
      const [hour, minute] = data.time.split(':')
      const scheduleDateTime = setMinutes(setHours(data.scheduledAt, Number(hour)), Number(minute))

      return scheduleDateTime > new Date()
    },
    {
      path: ['time'],
      message: 'O horário deve ser futuro',
    }
  )

export type IAppointmentFormSchema = z.infer<typeof appointmentFormSchema>
