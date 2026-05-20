import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as action from '@/app/(home)/action'
import { AppointmentForm } from './appointment-form'

vi.mock('@/app/(home)/action', () => ({
  createAppointment: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}))

vi.mock('./ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('./ui/popover', () => ({
  Popover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PopoverContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('./ui/select', () => ({
  Select: ({
    children,
    value,
    onValueChange,
  }: {
    children: React.ReactNode
    value?: string
    onValueChange?: (value: string) => void
  }) => (
    <div data-select value={value} data-onchange={onValueChange ? 'true' : 'false'}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-select-item value={value}>
      {children}
    </div>
  ),
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
}))

vi.mock('./ui/calendar', () => ({
  Calendar: () => <div data-testid="calendar" />,
}))

vi.mock('./ui/button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    type,
  }: {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit'
  }) => (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}))

vi.mock('react-imask', () => ({
  IMaskInput: ({
    placeholder,
    className,
    id,
    onChange,
    onBlur,
    name,
  }: {
    placeholder?: string
    className?: string
    id?: string
    onChange?: (e: { target: { value: string } }) => void
    onBlur?: () => void
    name?: string
  }) => (
    <input
      id={id}
      name={name}
      placeholder={placeholder}
      className={className}
      onChange={e => onChange?.({ target: { value: e.target.value } })}
      onBlur={onBlur}
    />
  ),
}))

describe('<AppointmentForm />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the trigger button with "Agendar" text', () => {
    render(<AppointmentForm />)
    const buttons = screen.getAllByText('Agendar')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('should render all form fields', () => {
    render(<AppointmentForm />)

    expect(screen.getByPlaceholderText('Nome do tutor')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Nome do pet')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('(99) 99999-9999')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Uma breve descrição')).toBeInTheDocument()
  })

  it('should show validation errors on empty submit', async () => {
    render(<AppointmentForm />)

    const submitButton = screen.getAllByRole('button', { name: /agendar/i })[1]
    fireEvent.click(submitButton)

    await waitFor(() => {
      const errorSpans = document.querySelectorAll('span.text-red-500')
      expect(errorSpans.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('should show loading state when submitting', async () => {
    vi.mocked(action.createAppointment).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    const user = userEvent.setup()
    render(<AppointmentForm />)

    await user.type(screen.getByPlaceholderText('Nome do tutor'), 'Tutor Name')
    await user.type(screen.getByPlaceholderText('Nome do pet'), 'Pet Name')
    await user.type(screen.getByPlaceholderText('(99) 99999-9999'), '11999999999')
    await user.type(screen.getByPlaceholderText('Uma breve descrição'), 'Test description')

    const submitButton = screen.getAllByRole('button', { name: /agendar/i })[1]
    fireEvent.click(submitButton)

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      const disabledButton = buttons.find(btn => btn.disabled)
      expect(disabledButton).toBeInTheDocument()
    })
  })
})
