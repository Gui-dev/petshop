import { prisma } from '@/services/prisma'
import * as getPeriodModule from '@/utils/get-period'
import { revalidatePath } from 'next/cache'
import { updateAppointmentAction } from './update-appointment-action'

vi.mock('@/services/prisma', () => ({
  prisma: {
    appointment: {
      findFirst: vi.fn(),
      update: vi.fn(),
    },
  },
}))

vi.mock('@/utils/get-period', () => ({
  getPeriod: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

const validData = {
  tutorName: 'John Doe',
  petName: 'Rex',
  phone: '11999999999',
  description: 'Banho',
  scheduledAt: new Date('2026-05-22T10:00:00'),
}

describe('updateAppointmentAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should update appointment successfully', async () => {
    vi.mocked(getPeriodModule.getPeriod).mockReturnValue('morning')
    vi.mocked(prisma.appointment.findFirst).mockResolvedValue(null)
    vi.mocked(prisma.appointment.update).mockResolvedValue({ id: '1', ...validData })

    await updateAppointmentAction({ id: '1', data: validData })

    expect(prisma.appointment.findFirst).toHaveBeenCalledWith({
      where: {
        scheduledAt: validData.scheduledAt,
        id: { not: '1' },
      },
    })
    expect(prisma.appointment.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: expect.objectContaining({
        tutorName: 'John Doe',
        petName: 'Rex',
      }),
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })

  it('should return error when appointment already exists for that time', async () => {
    vi.mocked(getPeriodModule.getPeriod).mockReturnValue('morning')
    vi.mocked(prisma.appointment.findFirst).mockResolvedValue({ id: '2' })

    const result = await updateAppointmentAction({ id: '1', data: validData })

    expect(result).toEqual({
      error: 'Já existe um agendamento para essa data',
    })
    expect(prisma.appointment.update).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('should return error when hour is outside business range', async () => {
    vi.mocked(getPeriodModule.getPeriod).mockReturnValue(undefined as never)

    const result = await updateAppointmentAction({ id: '1', data: validData })

    expect(result).toEqual({
      error: 'Agendamentos só podem ser feitos entre 9h e 21h',
    })
    expect(prisma.appointment.findFirst).not.toHaveBeenCalled()
    expect(prisma.appointment.update).not.toHaveBeenCalled()
  })

  it('should not throw when prisma.update fails', async () => {
    vi.mocked(getPeriodModule.getPeriod).mockReturnValue('morning')
    vi.mocked(prisma.appointment.findFirst).mockResolvedValue(null)
    vi.mocked(prisma.appointment.update).mockRejectedValue(new Error('DB error'))

    await expect(
      updateAppointmentAction({ id: '1', data: validData })
    ).resolves.toBeUndefined()
  })
})
