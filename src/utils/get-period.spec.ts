import { getPeriod } from './get-period'

describe('getPeriod', () => {
  const createDateInBRT = (hour: number) => {
    const date = new Date(`2026-05-28T${hour.toString().padStart(2, '0')}:00:00-03:00`)
    return date
  }

  it('should return morning for hours 9-12 in BRT', () => {
    expect(getPeriod(createDateInBRT(9))).toBe('morning')
    expect(getPeriod(createDateInBRT(10))).toBe('morning')
    expect(getPeriod(createDateInBRT(11))).toBe('morning')
    expect(getPeriod(createDateInBRT(12))).toBe('morning')
  })

  it('should return afternoon for hours 13-18 in BRT', () => {
    expect(getPeriod(createDateInBRT(13))).toBe('afternoon')
    expect(getPeriod(createDateInBRT(15))).toBe('afternoon')
    expect(getPeriod(createDateInBRT(17))).toBe('afternoon')
    expect(getPeriod(createDateInBRT(18))).toBe('afternoon')
  })

  it('should return evening for hours 19-21 in BRT', () => {
    expect(getPeriod(createDateInBRT(19))).toBe('evening')
    expect(getPeriod(createDateInBRT(20))).toBe('evening')
    expect(getPeriod(createDateInBRT(21))).toBe('evening')
  })

  it('should return null for hours outside business range', () => {
    expect(getPeriod(createDateInBRT(0))).toBeNull()
    expect(getPeriod(createDateInBRT(6))).toBeNull()
    expect(getPeriod(createDateInBRT(8))).toBeNull()
    expect(getPeriod(createDateInBRT(22))).toBeNull()
    expect(getPeriod(createDateInBRT(23))).toBeNull()
  })
})
