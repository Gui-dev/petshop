import type { PeriodType } from '@/types/appointment'

export const getPeriod = (hour: number): PeriodType => {
  if (hour >= 0 && hour < 12) {
    return 'morning'
  } else if (hour >= 12 && hour < 18) {
    return 'afternoon'
  } else {
    return 'evening'
  }
}
