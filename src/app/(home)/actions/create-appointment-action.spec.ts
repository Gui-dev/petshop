import { prisma } from '@/services/prisma'
import * as getPeriodModule from '@/utils/get-period'
import { createAppointment } from './create-appointment-action'

vi.mock('@/services/prisma', () => ({
  prisma: {
    appointment: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('@/utils/get-period', () => ({
  getPeriod: vi.fn(),
}))

describe('Server Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createAppointment', () => {
    const validData = {
      tutorName: 'John Doe',
      petName: 'Rex',
      phone: '11999999999',
      description: 'Banho',
      scheduledAt: new Date('2026-05-22T10:00:00'),
    }

    it('should create appointment successfully with valid data', async () => {
      vi.mocked(getPeriodModule.getPeriod).mockReturnValue('morning')
      vi.mocked(prisma.appointment.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.appointment.create).mockResolvedValue(validData)

      await createAppointment(validData)

      expect(prisma.appointment.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          tutorName: 'John Doe',
          petName: 'Rex',
        }),
      })
    })

    it('should return error when appointment already exists', async () => {
      vi.mocked(getPeriodModule.getPeriod).mockReturnValue('morning')
      vi.mocked(prisma.appointment.findFirst).mockResolvedValue({ id: '1' })

      const result = await createAppointment(validData)

      expect(result).toEqual({
        error: 'Já existe um agendamento para essa data',
      })
      expect(prisma.appointment.create).not.toHaveBeenCalled()
    })

    it('should return error when hour is outside business range', async () => {
      vi.mocked(getPeriodModule.getPeriod).mockReturnValue(undefined as never)

      const result = await createAppointment(validData)

      expect(result).toEqual({
        error: 'Agendamentos só podem ser feitos entre 9h-12h, 13h-18h e 19h-21h',
      })
      expect(prisma.appointment.findFirst).not.toHaveBeenCalled()
    })
  })
})
