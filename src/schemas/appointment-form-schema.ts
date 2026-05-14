import { z } from 'zod'

export const appointmentFormSchema = z.object({
  tutorName: z.string().min(1, 'O nome do tutor é obrigatório'),
  petName: z.string().min(1, 'O nome do pet é obrigatório'),
  phone: z
    .string('O telefone é obrigatório')
    .min(11, 'O número de telefone deve ter pelo menos 11 dígitos'),
  description: z.string().min(3, 'A descrição é obrigatória'),
})

export type IAppointmentFormSchema = z.infer<typeof appointmentFormSchema>
