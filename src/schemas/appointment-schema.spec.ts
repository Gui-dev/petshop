import { appointmentSchema } from './appointment-schema'

describe('appointmentSchema', () => {
  const validData = {
    tutorName: 'John Doe',
    petName: 'Rex',
    phone: '11999999999',
    description: 'Banho',
    scheduledAt: new Date('2026-12-25T10:00:00'),
  }

  it('should pass with valid data', () => {
    const result = appointmentSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail when required fields are missing', () => {
    const result = appointmentSchema.safeParse({})
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map(issue => issue.path[0])
      expect(paths).toContain('tutorName')
      expect(paths).toContain('petName')
      expect(paths).toContain('phone')
      expect(paths).toContain('description')
      expect(paths).toContain('scheduledAt')
    }
  })

  it('should fail when scheduledAt is not a date', () => {
    const result = appointmentSchema.safeParse({
      ...validData,
      scheduledAt: 'not-a-date',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('scheduledAt')
    }
  })
})
