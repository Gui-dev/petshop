import { render, screen } from '@testing-library/react'
import { AppointmentCard } from './appointment-card'
import type { AppointmentProps } from '@/types/appointment'

describe('<AppointmentCard />', () => {
  const mockAppointment: AppointmentProps = {
    id: '1',
    tutorName: 'Clark Kent',
    petName: 'Krypto',
    phone: '(11) 99999-9999',
    description: 'Banho e tosa',
    time: '09:00',
    period: 'morning',
    service: 'Banho',
    scheduledAt: new Date('2026-05-22T09:00:00'),
  }

  it('should render appointment time, petName, tutorName and description', () => {
    render(<AppointmentCard appointment={mockAppointment} />)

    expect(screen.getByText('09:00')).toBeInTheDocument()
    expect(screen.getByText('Krypto')).toBeInTheDocument()
    expect(screen.getByText('Clark Kent')).toBeInTheDocument()
    expect(screen.getByText('Banho e tosa')).toBeInTheDocument()
  })

  it('should display data correctly from props', () => {
    const customAppointment: AppointmentProps = {
      ...mockAppointment,
      id: '2',
      tutorName: 'Bruce Wayne',
      petName: 'Ace',
      time: '14:30',
      description: 'Consulta veterinária',
    }

    render(<AppointmentCard appointment={customAppointment} />)

    expect(screen.getByText('14:30')).toBeInTheDocument()
    expect(screen.getByText('Ace')).toBeInTheDocument()
    expect(screen.getByText('Bruce Wayne')).toBeInTheDocument()
    expect(screen.getByText('Consulta veterinária')).toBeInTheDocument()
  })
})
