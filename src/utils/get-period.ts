import type { PeriodType } from '@/types/appointment'

export const getPeriod = (hour: number): PeriodType => {
  let type: PeriodType = 'morning'

  if (hour >= 9 && hour < 12) {
    type = 'morning'
  } else if (hour >= 13 && hour < 18) {
    type = 'afternoon'
  } else if (hour >= 19 && hour < 21) {
    type = 'evening'
  }

  return type
}
