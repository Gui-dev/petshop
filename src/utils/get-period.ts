import type { PeriodType } from '@/types/appointment'

export const getPeriod = (hour: number): PeriodType => {
  if (hour >= 9 && hour < 12) {
    return 'morning'
  }

  if (hour >= 13 && hour < 18) {
    return 'afternoon'
  }

  if (hour >= 19 && hour <= 21) {
    return 'evening'
  }

  return 'morning'
}
