import { prisma } from '@/services/prisma'
import { revalidatePath } from 'next/cache'
import { deleteAppointmentAction } from './delete-appointment-action'

vi.mock('@/services/prisma', () => ({
  prisma: {
    appointment: {
      findFirst: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('deleteAppointmentAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should delete appointment successfully', async () => {
    vi.mocked(prisma.appointment.findFirst).mockResolvedValue({ id: '1' })
    vi.mocked(prisma.appointment.delete).mockResolvedValue({ id: '1' })

    const result = await deleteAppointmentAction('1')

    expect(result).toBeUndefined()
    expect(prisma.appointment.findFirst).toHaveBeenCalledWith({
      where: { id: '1' },
    })
    expect(prisma.appointment.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })

  it('should return error when appointment not found', async () => {
    vi.mocked(prisma.appointment.findFirst).mockResolvedValue(null)

    const result = await deleteAppointmentAction('1')

    expect(result).toEqual({ error: 'Agendamento não encontrado' })
    expect(prisma.appointment.delete).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('should return error when prisma.delete fails', async () => {
    vi.mocked(prisma.appointment.findFirst).mockResolvedValue({ id: '1' })
    vi.mocked(prisma.appointment.delete).mockRejectedValue(new Error('DB error'))

    const result = await deleteAppointmentAction('1')

    expect(result).toEqual({ error: 'Erro ao deletar agendamento' })
    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
