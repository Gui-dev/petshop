import { z } from 'zod'

export const createAppointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduledAt: z.date(),
})

export type ICreateAppointmentSchema = z.infer<typeof createAppointmentSchema>
