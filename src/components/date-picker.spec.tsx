import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from './date-picker'

const mockPush = vi.fn()
const mockSearchParams = vi.fn(() => new URLSearchParams())

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/',
  useSearchParams: (...args: unknown[]) => mockSearchParams(...args),
}))

vi.mock('./ui/button', () => ({
  Button: ({
    children,
    onClick,
    variant,
  }: {
    children: React.ReactNode
    onClick?: () => void
    variant?: string
  }) => (
    <button type="button" onClick={onClick} data-variant={variant}>
      {children}
    </button>
  ),
}))

vi.mock('./ui/popover', () => ({
  Popover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PopoverContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('./ui/calendar', () => ({
  Calendar: ({
    mode,
    selected,
    onSelect,
  }: {
    mode: string
    selected?: Date
    onSelect?: (date?: Date) => void
  }) => (
    <div data-testid="calendar" data-mode={mode}>
      <button type="button" onClick={() => onSelect?.(new Date('2026-06-01'))}>
        Select Date
      </button>
    </div>
  ),
}))

describe('<DatePicker />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSearchParams.mockReturnValue(new URLSearchParams())
  })

  it('should render navigation buttons', () => {
    render(<DatePicker />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3)
    expect(screen.getByText('Selecione uma data')).toBeInTheDocument()
  })

  it('should navigate to previous day on left arrow click', async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0]
    await user.click(prevButton)
    expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/date=\d{4}-\d{2}-\d{2}/))
  })

  it('should navigate to next day on right arrow click', async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    const buttons = screen.getAllByRole('button')
    const nextButton = buttons[buttons.length - 1]
    await user.click(nextButton)
    expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/date=\d{4}-\d{2}-\d{2}/))
  })

  it('should render initial date from searchParams when provided', () => {
    mockSearchParams.mockReturnValue(new URLSearchParams('date=2026-06-15'))
    render(<DatePicker />)
    expect(screen.getByText('15/06/2026')).toBeInTheDocument()
  })
})
