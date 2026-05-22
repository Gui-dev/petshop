import { z } from 'zod'

export const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduledAt: z.date(),
})

export type IAppointmentSchema = z.infer<typeof appointmentSchema>
