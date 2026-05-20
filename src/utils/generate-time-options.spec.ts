import { timeOptions } from './generate-time-options'

describe('generateTimeOptions', () => {
  it('should generate options from 09:00 to 20:30', () => {
    const firstOption = timeOptions[0]
    const lastOption = timeOptions[timeOptions.length - 1]

    expect(firstOption.value).toBe('09:00')
    expect(lastOption.value).toBe('20:30')
  })

  it('should generate options in 30-minute intervals', () => {
    const totalOptions = timeOptions.length
    // 12 hours (9-20) * 2 intervals per hour = 24
    expect(totalOptions).toBe(24)
  })

  it('should have correct label and value format for each option', () => {
    timeOptions.forEach(option => {
      expect(option).toHaveProperty('label')
      expect(option).toHaveProperty('value')
      expect(option.label).toMatch(/^\d{2}:\d{2}$/)
      expect(option.value).toMatch(/^\d{2}:\d{2}$/)
      expect(option.label).toBe(option.value)
    })
  })
})
