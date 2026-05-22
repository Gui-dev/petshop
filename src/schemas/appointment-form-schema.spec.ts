import { appointmentFormSchema } from './appointment-form-schema'

describe('appointmentFormSchema', () => {
  const validData = {
    tutorName: 'John Doe',
    petName: 'Rex',
    phone: '11999999999',
    description: 'Banho e tosa',
    scheduledAt: new Date('2026-12-25T10:00:00'),
    time: '10:00',
  }

  it('should pass with valid data', () => {
    const result = appointmentFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail when tutorName is empty', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      tutorName: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('tutorName')
    }
  })

  it('should fail when petName is empty', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      petName: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('petName')
    }
  })

  it('should fail when phone has less than 11 digits', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      phone: '1234567890',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('phone')
    }
  })

  it('should fail when description is less than 3 characters', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      description: 'AB',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('description')
    }
  })

  it('should fail when scheduledAt is undefined', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      scheduledAt: undefined,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('scheduledAt')
    }
  })

  it('should fail when scheduledAt is in the past', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      scheduledAt: new Date('2020-01-01'),
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('scheduledAt')
    }
  })

  it('should fail when time is empty', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      time: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('time')
    }
  })

  it('should fail when time is in the past for the given date', () => {
    const today = new Date()
    const pastHour = new Date()
    pastHour.setHours(pastHour.getHours() - 2)
    const pastTime = `${String(pastHour.getHours()).padStart(2, '0')}:${String(pastHour.getMinutes()).padStart(2, '0')}`

    const result = appointmentFormSchema.safeParse({
      ...validData,
      scheduledAt: today,
      time: pastTime,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('time')
    }
  })
})
