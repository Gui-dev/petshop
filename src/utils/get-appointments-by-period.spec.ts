import { getAppointmentsByPeriod } from './get-appointments-by-period'
import type { Appointment } from '@/generated/prisma'

describe('getAppointmentsByPeriod', () => {
  const createAppointment = (hour: number): Appointment => ({
    id: `test-${hour}`,
    tutorName: 'John Doe',
    petName: 'Rex',
    phone: '(11) 99999-9999',
    description: 'Banho',
    scheduledAt: new Date(2026, 4, 22, hour, 0, 0),
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  it('should group appointments by period correctly', () => {
    const appointments = [createAppointment(9), createAppointment(14), createAppointment(20)]

    const result = getAppointmentsByPeriod(appointments)

    const morning = result.find(r => r.type === 'morning')
    const afternoon = result.find(r => r.type === 'afternoon')
    const evening = result.find(r => r.type === 'evening')

    expect(morning?.appointments).toHaveLength(1)
    expect(afternoon?.appointments).toHaveLength(1)
    expect(evening?.appointments).toHaveLength(1)
  })

  it('should return all three periods even with empty input', () => {
    const result = getAppointmentsByPeriod([])

    expect(result).toHaveLength(3)
    expect(result[0].type).toBe('morning')
    expect(result[1].type).toBe('afternoon')
    expect(result[2].type).toBe('evening')
    expect(result[0].appointments).toHaveLength(0)
    expect(result[1].appointments).toHaveLength(0)
    expect(result[2].appointments).toHaveLength(0)
  })

  it('should transform appointments with time and service fields', () => {
    const appointments = [createAppointment(10)]

    const result = getAppointmentsByPeriod(appointments)
    const morning = result.find(r => r.type === 'morning')!
    const transformed = morning.appointments[0]

    expect(transformed.time).toBeDefined()
    expect(transformed.description).toBe('Banho')
    expect(transformed.period).toBe('morning')
    expect(transformed.tutorName).toBe('John Doe')
  })
})
