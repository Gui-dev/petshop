export type PeriodType = 'morning' | 'afternoon' | 'evening'

export type AppointmentProps = {
  id: string
  tutorName: string
  petName: string
  phone: string
  description: string
  time: string
  period: PeriodType
  service: string
  scheduledAt: Date
}

export type AppointmentFullProps = {
  type: PeriodType
  title: string
  timeRange: string
  appointments: AppointmentProps[]
}
