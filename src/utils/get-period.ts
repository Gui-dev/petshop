import { tz } from '@date-fns/tz'
import { format } from 'date-fns'
import type { PeriodType } from '@/types/appointment'

export const getPeriod = (date: Date): PeriodType | null => {
  const hour = Number(format(date, 'HH', { in: tz('America/Sao_Paulo') }))

  if (hour >= 9 && hour < 13) {
    return 'morning'
  }

  if (hour >= 13 && hour < 19) {
    return 'afternoon'
  }

  if (hour >= 19 && hour <= 21) {
    return 'evening'
  }

  return null
}
