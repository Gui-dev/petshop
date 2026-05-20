import { getPeriod } from './get-period'

describe('getPeriod', () => {
  it('should return morning for hours 9-11', () => {
    expect(getPeriod(9)).toBe('morning')
    expect(getPeriod(10)).toBe('morning')
    expect(getPeriod(11)).toBe('morning')
  })

  it('should return afternoon for hours 13-17', () => {
    expect(getPeriod(13)).toBe('afternoon')
    expect(getPeriod(15)).toBe('afternoon')
    expect(getPeriod(17)).toBe('afternoon')
  })

  it('should return evening for hours 19-21', () => {
    expect(getPeriod(19)).toBe('evening')
    expect(getPeriod(20)).toBe('evening')
    expect(getPeriod(21)).toBe('evening')
  })

  it('should return morning as fallback for hours outside business range', () => {
    expect(getPeriod(0)).toBe('morning')
    expect(getPeriod(6)).toBe('morning')
    expect(getPeriod(12)).toBe('morning')
    expect(getPeriod(18)).toBe('morning')
    expect(getPeriod(23)).toBe('morning')
  })
})
