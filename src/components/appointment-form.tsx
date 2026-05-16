'use client'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { format, startOfToday } from 'date-fns'
import { Calendar, Calendar1, ChevronDown, Clock, Dog, Loader, Phone, User } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { toast } from 'sonner'
import {
  appointmentFormSchema,
  type IAppointmentFormSchema,
} from '@/schemas/appointment-form-schema'
import { timeOptions } from '@/utils/generate-time-options'
import { Button } from './ui/button'
import { Calendar as CalendarComponent } from './ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'

export const AppointmentForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAppointmentFormSchema>({
    resolver: standardSchemaResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
      scheduledAt: new Date(),
      time: '',
    },
  })

  const handleSubmitAppointment = (data: IAppointmentFormSchema) => {
    const [hour, minute] = data.time.split(':')
    const scheduledDate = new Date(data.scheduledAt).setHours(Number(hour), Number(minute), 0, 0)
    toast.success('Agendamento realizado com sucesso!')
    console.log(scheduledDate)
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
        <div className="flex flex-col gap-4">
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
                className="flex cursor-pointer items-center gap-3 rounded-lg bg-zinc-700 px-4 py-2 focus-within:ring-2 focus-within:ring-yellow-400"
              >
                <Phone className="size-4" />
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <IMaskInput
                      mask="(00) 00000-0000"
                      id="phone"
                      {...field}
                      type="tel"
                      placeholder="(99) 99999-9999"
                      className="bg-transparent py-2 outline-none"
                    />
                  )}
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

            <div className="flex flex-col gap-4 md:mb-4 md:flex-row md:items-center md:gap-2">
              <div className="flex flex-col gap-2 md:w-full">
                <Controller
                  control={control}
                  name="scheduledAt"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex cursor-pointer items-center justify-between gap-1 rounded-lg bg-zinc-700 py-4 pr-4 pl-2 focus-within:ring-2 focus-within:ring-yellow-400"
                        >
                          <span className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            {field.value && format(field.value, 'dd/MM/yyyy')}
                            {!field.value && <span>Data</span>}
                          </span>
                          <ChevronDown className="size-4 font-bold" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date => date < startOfToday()}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.scheduledAt && (
                  <span className="text-left text-red-500 text-xs">
                    {errors.scheduledAt.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 md:w-full">
                <Controller
                  control={control}
                  name="time"
                  render={({ field }) => (
                    <label
                      htmlFor="time"
                      className="flex items-center rounded-lg bg-zinc-700 py-2 focus-within:ring-2 focus-within:ring-yellow-400"
                    >
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="time" className="w-full bg-transparent">
                          <div className="flex items-center gap-2">
                            <Clock className="size-4 text-zinc-100" />
                            <SelectValue placeholder="Hora" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map(option => {
                            return (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </label>
                  )}
                />
                {errors.time && (
                  <span className="text-left text-red-500 text-xs">{errors.time.message}</span>
                )}
              </div>
            </div>

            <Button type="submit" className="h-12 rounded-lg font-bold" disabled={isSubmitting}>
              {!isSubmitting && 'Agendar'}
              {isSubmitting && <Loader className="size-6 animate-spin text-zinc-800" />}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
