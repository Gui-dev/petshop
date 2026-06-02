import { render, screen } from '@testing-library/react'
import { Header } from './header'

vi.mock('lucide-react', () => ({
  Dog: () => <svg data-testid="dog-icon" />,
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))

describe('<Header />', () => {
  it('should render the title as heading', () => {
    render(<Header />)

    expect(screen.getByRole('heading', { name: 'Pets Dev' })).toBeInTheDocument()
  })

  it('should render a link to home', () => {
    render(<Header />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })

  it('should render the Dog icon', () => {
    render(<Header />)

    expect(screen.getByTestId('dog-icon')).toBeInTheDocument()
  })

  it('should render screen-reader-only text', () => {
    render(<Header />)

    const elements = screen.getAllByText('Pets Dev')
    expect(elements).toHaveLength(2)
  })
})
