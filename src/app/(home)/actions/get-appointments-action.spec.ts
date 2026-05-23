import { prisma } from '@/services/prisma'
import { getAppointments } from './get-appointments-action'

vi.mock('@/services/prisma', () => ({
  prisma: {
    appointment: {
      findMany: vi.fn(),
    },
  },
}))

vi.mock('@/utils/get-appointments-by-period', () => ({
  getAppointmentsByPeriod: vi.fn(),
}))

const mockAppointment = {
  id: '1',
  tutorName: 'John',
  petName: 'Rex',
  phone: '11999999999',
  description: 'Banho',
  scheduledAt: new Date('2026-05-22T10:00:00'),
}

const groupedResult = [
  { type: 'morning', title: 'Manhã', timeRange: '09h - 12h', appointments: [] },
  { type: 'afternoon', title: 'Tarde', timeRange: '13h - 18h', appointments: [] },
  { type: 'evening', title: 'Noite', timeRange: '19h - 21h', appointments: [] },
]

describe('getAppointments', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch appointments ordered by scheduledAt ascending', async () => {
    vi.mocked(prisma.appointment.findMany).mockResolvedValue([mockAppointment])

    await getAppointments()

    expect(prisma.appointment.findMany).toHaveBeenCalledWith({
      orderBy: { scheduledAt: 'asc' },
    })
  })

  it('should return appointments grouped by period', async () => {
    const { getAppointmentsByPeriod } = await import('@/utils/get-appointments-by-period')
    vi.mocked(getAppointmentsByPeriod).mockReturnValue(groupedResult)
    vi.mocked(prisma.appointment.findMany).mockResolvedValue([mockAppointment])

    const result = await getAppointments()

    expect(getAppointmentsByPeriod).toHaveBeenCalledWith([mockAppointment])
    expect(result).toEqual(groupedResult)
  })

  it('should return empty grouped periods when no appointments exist', async () => {
    const { getAppointmentsByPeriod } = await import('@/utils/get-appointments-by-period')
    vi.mocked(getAppointmentsByPeriod).mockReturnValue(groupedResult)
    vi.mocked(prisma.appointment.findMany).mockResolvedValue([])

    const result = await getAppointments()

    expect(getAppointmentsByPeriod).toHaveBeenCalledWith([])
    expect(result).toEqual(groupedResult)
  })
})
