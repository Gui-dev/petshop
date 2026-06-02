'use client'

import { addDays, format, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Calendar as CalendarComponent } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export const DatePicker = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dateParam = searchParams.get('date')

  const getInitialDate = useCallback(() => {
    if (!dateParam) return

    const [year, month, day] = dateParam.split('-').map(Number)
    const parsedDate = new Date(year, month - 1, day)

    if (!isValid(parsedDate)) {
      return new Date()
    }

    return parsedDate
  }, [dateParam])

  const [date, setDate] = useState<Date | undefined>(getInitialDate)
  const [isOpen, setIsOpen] = useState(false)

  const updateURLWithDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return

    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('date', format(selectedDate, 'yyyy-MM-dd'))

    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  const handleNavigateDays = (days: number) => {
    const newDate = addDays(date || new Date(), days)
    updateURLWithDate(newDate)
  }

  const handleDateSelect = (selectDate: Date | undefined) => {
    updateURLWithDate(selectDate)
    setIsOpen(false)
  }

  useEffect(() => {
    const newDate = getInitialDate()

    if (date?.getTime() !== newDate?.getTime()) {
      setDate(newDate)
    }
  }, [getInitialDate, date])

  return (
    <div className="flex items-center justify-center gap-1">
      <Button variant="ghost" onClick={() => handleNavigateDays(-1)} title="Dia anterior">
        <ChevronLeft className="size-4" />
      </Button>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-between rounded-md md:min-w-45"
          >
            <div className="ju flex items-center gap-1">
              <Calendar className="size-4" />
              {date && format(date, 'dd/MM/yyyy', { locale: ptBR })}
              {!date && <span className="text-xs">Selecione uma data</span>}
            </div>
            <ChevronDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
      <Button variant="ghost" onClick={() => handleNavigateDays(1)} title="Próximo dia">
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
