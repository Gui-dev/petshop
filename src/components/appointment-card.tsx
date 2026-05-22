import { Pen } from 'lucide-react'
import type { AppointmentProps } from '@/types/appointment'
import { AppointmentForm } from './appointment-form'

interface IAppointmentCardProps {
  appointment: AppointmentProps
}

export const AppointmentCard = ({ appointment }: IAppointmentCardProps) => {
  return (
    <div className="grid grid-cols-2 items-center border-zinc-800 border-b py-3 [ last:border-b-0 md:grid-cols-[15%_35%_30%_20%]">
      <div className="pr-4 text-left md:pr-0">
        <span className="font-semibold text-sm text-zinc-100">{appointment.time}</span>
      </div>

      <div className="text-right md:pr-4 md:text-left">
        <div className="flex items-center justify-end gap-1 md:justify-start">
          <span className="font-semibold text-sm text-zinc-100">{appointment.petName}</span>
          <span className="text-sm text-zinc-400">/</span>
          <span className="font-semibold text-sm text-zinc-100">{appointment.tutorName}</span>
        </div>
      </div>
      <div className="col-span-2 mt-1 hidden gap-2 pr-4 text-left md:col-span-1 md:mt-0 md:block">
        <span className="text-sm text-zinc-400">{appointment.description}</span>
      </div>

      <div className="col-span-2 mt-2 flex items-center justify-end gap-2 text-right md:col-span-1 md:mt-0">
        <AppointmentForm appointemnt={appointment}>
          <Pen className="size-4 font-bold text-yellow-300" />
        </AppointmentForm>
      </div>
    </div>
  )
}
