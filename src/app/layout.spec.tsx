import { render, screen } from '@testing-library/react'
import RootLayout from './layout'

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-sans' }),
}))

vi.mock('@/components/ui/sonner', () => ({
  Toaster: () => <div data-testid="toaster" />,
}))

vi.mock('@/lib/utils', () => ({
  cn: (...inputs: string[]) => inputs.filter(Boolean).join(' '),
}))

describe('<RootLayout />', () => {
  it('should render children', () => {
    render(<RootLayout><div data-testid="child">content</div></RootLayout>)

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('should render Toaster component', () => {
    render(<RootLayout><div>content</div></RootLayout>)

    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  it('should render children inside body', () => {
    render(<RootLayout><div>content</div></RootLayout>)

    expect(screen.getByText('content')).toBeInTheDocument()
    expect(screen.getByText('content').closest('body')).toBeInTheDocument()
  })
})
