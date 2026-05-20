import { render, screen } from '@testing-library/react'
import { PeriodSection } from './period-section'
import type { AppointmentFullProps } from '@/types/appointment'
import type { AppointmentProps } from '@/types/appointment'

vi.mock('./appointment-card', () => ({
  AppointmentCard: ({ appointment }: { appointment: AppointmentProps }) => (
    <div data-testid="appointment-card">
      <span>{appointment.petName}</span>
    </div>
  ),
}))

describe('<PeriodSection />', () => {
  const mockAppointments: AppointmentProps[] = [
    {
      id: '1',
      tutorName: 'Clark Kent',
      petName: 'Krypto',
      phone: '(11) 99999-9999',
      description: 'Banho',
      time: '09:00',
      period: 'morning',
      service: 'Banho',
      scheduledAt: new Date('2026-05-22T09:00:00'),
    },
  ]

  const createPeriod = (
    type: 'morning' | 'afternoon' | 'evening',
    appointments: AppointmentProps[] = [],
  ): AppointmentFullProps => ({
    type,
    title: type === 'morning' ? 'Manhã' : type === 'afternoon' ? 'Tarde' : 'Noite',
    timeRange:
      type === 'morning' ? '09h - 12h' : type === 'afternoon' ? '13h - 18h' : '19h - 21h',
    appointments,
  })

  it('should render period title and timeRange', () => {
    const period = createPeriod('morning')
    render(<PeriodSection period={period} />)

    expect(screen.getByText('Manhã')).toBeInTheDocument()
    expect(screen.getByText('09h - 12h')).toBeInTheDocument()
  })

  it('should render appointment cards when appointments exist', () => {
    const period = createPeriod('morning', mockAppointments)
    render(<PeriodSection period={period} />)

    expect(screen.getByTestId('appointment-card')).toBeInTheDocument()
    expect(screen.getByText('Krypto')).toBeInTheDocument()
  })

  it('should show empty state when no appointments', () => {
    const period = createPeriod('afternoon', [])
    render(<PeriodSection period={period} />)

    expect(screen.getByText('Nada ainda.')).toBeInTheDocument()
  })

  it('should render correct icon for each period type', () => {
    const morningPeriod = createPeriod('morning', [])
    const { unmount } = render(<PeriodSection period={morningPeriod} />)
    expect(screen.getByText('Manhã')).toBeInTheDocument()
    unmount()

    const afternoonPeriod = createPeriod('afternoon', [])
    render(<PeriodSection period={afternoonPeriod} />)
    expect(screen.getByText('Tarde')).toBeInTheDocument()
    unmount()

    const eveningPeriod = createPeriod('evening', [])
    render(<PeriodSection period={eveningPeriod} />)
    expect(screen.getByText('Noite')).toBeInTheDocument()
  })
})
