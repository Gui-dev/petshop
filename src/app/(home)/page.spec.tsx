import { render, screen } from '@testing-library/react'
import Home from './page'

vi.mock('./actions/get-appointments-action', () => ({
  getAppointments: vi.fn(),
}))

vi.mock('@/components/period-section', () => ({
  PeriodSection: ({ period }: { period: { type: string } }) => (
    <div data-testid={`period-section-${period.type}`} />
  ),
}))

vi.mock('@/components/appointment-form', () => ({
  AppointmentForm: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="appointment-form">{children}</button>
  ),
}))

describe('<Home />', () => {
  it('should render title and description', async () => {
    const { getAppointments } = await import('./actions/get-appointments-action')
    vi.mocked(getAppointments).mockResolvedValue([
      { type: 'morning', title: 'Manhã', timeRange: '09h - 12h', appointments: [] },
      { type: 'afternoon', title: 'Tarde', timeRange: '13h - 18h', appointments: [] },
      { type: 'evening', title: 'Noite', timeRange: '19h - 21h', appointments: [] },
    ])

    render(await Home())

    expect(screen.getByText('Sua Agenda')).toBeInTheDocument()
    expect(screen.getByText(/clientes e servi.os agendados/i)).toBeInTheDocument()
  })

  it('should render PeriodSection for each period', async () => {
    const { getAppointments } = await import('./actions/get-appointments-action')
    vi.mocked(getAppointments).mockResolvedValue([
      { type: 'morning', title: 'Manhã', timeRange: '09h - 12h', appointments: [] },
      { type: 'afternoon', title: 'Tarde', timeRange: '13h - 18h', appointments: [] },
      { type: 'evening', title: 'Noite', timeRange: '19h - 21h', appointments: [] },
    ])

    render(await Home())

    expect(screen.getByTestId('period-section-morning')).toBeInTheDocument()
    expect(screen.getByTestId('period-section-afternoon')).toBeInTheDocument()
    expect(screen.getByTestId('period-section-evening')).toBeInTheDocument()
  })

  it('should render AppointmentForm', async () => {
    const { getAppointments } = await import('./actions/get-appointments-action')
    vi.mocked(getAppointments).mockResolvedValue([])

    render(await Home())

    expect(screen.getByTestId('appointment-form')).toBeInTheDocument()
  })
})
