'use client'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Calendar1, Dog, Phone, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import {
  appointmentFormSchema,
  type IAppointmentFormSchema,
} from '@/schemas/appointment-form-schema'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

export const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAppointmentFormSchema>({
    resolver: standardSchemaResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
    },
  })

  const handleSubmitAppointment = (data: IAppointmentFormSchema) => {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 font-bold text-base">
          <Calendar1 className="size-4 font-bold" />
          Agendar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center gap-4">
          <DialogHeader>
            <DialogTitle>Agende um atendimento</DialogTitle>
            <DialogDescription>
              Preencha os dados do cliente para realizar um agendamento
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleSubmitAppointment)}
            className="flex flex-col gap-4 md:w-full"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="tutorName"
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-zinc-700 px-4 py-2 focus-within:ring-2 focus-within:ring-yellow-400"
              >
                <User className="size-4" />
                <Input
                  id="tutorName"
                  {...register('tutorName')}
                  placeholder="Nome do tutor"
                  className="bg-transparent"
                />
              </label>
              {errors.tutorName && (
                <span className="text-left text-red-500 text-xs">{errors.tutorName.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="petName"
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-zinc-700 px-4 py-2 focus-within:ring-2 focus-within:ring-yellow-400"
              >
                <Dog className="size-4" />
                <Input
                  id="petName"
                  {...register('petName')}
                  placeholder="Nome do pet"
                  className="bg-transparent"
                />
              </label>
              {errors.petName && (
                <span className="text-left text-red-500 text-xs">{errors.petName.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-zinc-700 px-4 py-2 focus-within:ring-2 focus-within:ring-yellow-400"
              >
                <Phone className="size-4" />
                <IMaskInput
                  mask="(00) 00000-0000"
                  id="phone"
                  {...register('phone')}
                  placeholder="(99) 99999-9999"
                  className="bg-transparent py-2 outline-none"
                />
              </label>
              {errors.phone && (
                <span className="text-left text-red-500 text-xs">{errors.phone.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-zinc-700 px-2 py-4 focus-within:ring-2 focus-within:ring-yellow-400"
              >
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Uma breve descrição"
                  className="bg-transparent"
                />
              </label>
              {errors.description && (
                <span className="text-left text-red-500 text-xs">{errors.description.message}</span>
              )}
            </div>

            <Button type="submit" className="h-12 rounded-lg">
              Agendar
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
