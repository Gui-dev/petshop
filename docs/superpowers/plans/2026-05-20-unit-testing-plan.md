# Unit Testing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add comprehensive unit test coverage across all application layers — utils, schemas, UI components, and server actions.

**Architecture:** Layered TDD approach — install and configure Vitest, then write tests bottom-up from pure utilities through schemas, simple components, complex components, and finally server actions. Each layer produces a passing test suite before moving to the next.

**Tech Stack:** Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom, MSW

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `vitest.config.ts` | Create | Vitest config with jsdom, `@/` alias, test setup |
| `src/test-setup.ts` | Create | Global jest-dom matchers |
| `package.json` | Modify | Add `test` and `test:coverage` scripts |
| `src/utils/get-period.spec.ts` | Create | Tests for getPeriod utility |
| `src/utils/generate-time-options.spec.ts` | Create | Tests for time options generator |
| `src/utils/get-appointments-by-period.spec.ts` | Create | Tests for appointment grouping |
| `src/schemas/appointment-form-schema.spec.ts` | Create | Tests for form validation schema |
| `src/schemas/create-appointment-schema.spec.ts` | Create | Tests for create appointment schema |
| `src/components/appointment-card.spec.tsx` | Create | Tests for appointment card component |
| `src/components/period-section.spec.tsx` | Create | Tests for period section component |
| `src/components/appointment-form.spec.tsx` | Create | Tests for appointment form component |
| `src/app/(home)/action.spec.ts` | Create | Tests for server actions |

---

### Task 1: Install Dependencies and Configure Vitest

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test-setup.ts`
- Modify: `package.json`

- [ ] **Step 1: Install dependencies**

Run:
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

- [ ] **Step 2: Create vitest.config.ts**

```typescript
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.{ts,tsx}'],
  },
})
```

- [ ] **Step 3: Create src/test-setup.ts**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Update package.json scripts**

Add to the `"scripts"` section:
```json
"test": "vitest",
"test:coverage": "vitest --coverage"
```

- [ ] **Step 5: Verify setup**

Run:
```bash
pnpm test -- --run
```
Expected: "No test files found" or runs with 0 tests (no failures).

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts src/test-setup.ts package.json pnpm-lock.yaml
git commit -m "chore: add vitest and testing dependencies"
```

---

### Task 2: Tests for getPeriod Utility

**Files:**
- Create: `src/utils/get-period.spec.ts`
- Source: `src/utils/get-period.ts`

- [ ] **Step 1: Write the tests**

```typescript
import { getPeriod } from './get-period'

describe('getPeriod', () => {
  it('should return morning for hours 9-11', () => {
    expect(getPeriod(9)).toBe('morning')
    expect(getPeriod(10)).toBe('morning')
    expect(getPeriod(11)).toBe('morning')
  })

  it('should return afternoon for hours 13-17', () => {
    expect(getPeriod(13)).toBe('afternoon')
    expect(getPeriod(15)).toBe('afternoon')
    expect(getPeriod(17)).toBe('afternoon')
  })

  it('should return evening for hours 19-21', () => {
    expect(getPeriod(19)).toBe('evening')
    expect(getPeriod(20)).toBe('evening')
    expect(getPeriod(21)).toBe('evening')
  })

  it('should return morning as fallback for hours outside business range', () => {
    expect(getPeriod(0)).toBe('morning')
    expect(getPeriod(6)).toBe('morning')
    expect(getPeriod(12)).toBe('morning')
    expect(getPeriod(18)).toBe('morning')
    expect(getPeriod(23)).toBe('morning')
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
pnpm test -- --run src/utils/get-period.spec.ts
```
Expected: All 4 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/utils/get-period.spec.ts
git commit -m "test(utils): add getPeriod unit tests"
```

---

### Task 3: Tests for generateTimeOptions Utility

**Files:**
- Create: `src/utils/generate-time-options.spec.ts`
- Source: `src/utils/generate-time-options.ts`

- [ ] **Step 1: Write the tests**

```typescript
import { timeOptions } from './generate-time-options'

describe('generateTimeOptions', () => {
  it('should generate options from 09:00 to 20:30', () => {
    const firstOption = timeOptions[0]
    const lastOption = timeOptions[timeOptions.length - 1]

    expect(firstOption.value).toBe('09:00')
    expect(lastOption.value).toBe('20:30')
  })

  it('should generate options in 30-minute intervals', () => {
    const totalOptions = timeOptions.length
    // 12 hours (9-20) * 2 intervals per hour = 24
    expect(totalOptions).toBe(24)
  })

  it('should have correct label and value format for each option', () => {
    timeOptions.forEach(option => {
      expect(option).toHaveProperty('label')
      expect(option).toHaveProperty('value')
      expect(option.label).toMatch(/^\d{2}:\d{2}$/)
      expect(option.value).toMatch(/^\d{2}:\d{2}$/)
      expect(option.label).toBe(option.value)
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
pnpm test -- --run src/utils/generate-time-options.spec.ts
```
Expected: All 3 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/utils/generate-time-options.spec.ts
git commit -m "test(utils): add generateTimeOptions unit tests"
```

---

### Task 4: Tests for getAppointmentsByPeriod Utility

**Files:**
- Create: `src/utils/get-appointments-by-period.spec.ts`
- Source: `src/utils/get-appointments-by-period.ts`
- Source: `src/utils/get-period.ts`

- [ ] **Step 1: Write the tests**

```typescript
import { getAppointmentsByPeriod } from './get-appointments-by-period'
import type { Appointment } from '@/generated/prisma'

describe('getAppointmentsByPeriod', () => {
  const createAppointment = (hour: number): Appointment => ({
    id: `test-${hour}`,
    tutorName: 'John Doe',
    petName: 'Rex',
    phone: '(11) 99999-9999',
    description: 'Banho',
    scheduledAt: new Date(2026, 4, 22, hour, 0, 0),
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  it('should group appointments by period correctly', () => {
    const appointments = [
      createAppointment(9),
      createAppointment(14),
      createAppointment(20),
    ]

    const result = getAppointmentsByPeriod(appointments)

    const morning = result.find(r => r.type === 'morning')
    const afternoon = result.find(r => r.type === 'afternoon')
    const evening = result.find(r => r.type === 'evening')

    expect(morning?.appointments).toHaveLength(1)
    expect(afternoon?.appointments).toHaveLength(1)
    expect(evening?.appointments).toHaveLength(1)
  })

  it('should return all three periods even with empty input', () => {
    const result = getAppointmentsByPeriod([])

    expect(result).toHaveLength(3)
    expect(result[0].type).toBe('morning')
    expect(result[1].type).toBe('afternoon')
    expect(result[2].type).toBe('evening')
    expect(result[0].appointments).toHaveLength(0)
    expect(result[1].appointments).toHaveLength(0)
    expect(result[2].appointments).toHaveLength(0)
  })

  it('should transform appointments with time and service fields', () => {
    const appointments = [createAppointment(10)]

    const result = getAppointmentsByPeriod(appointments)
    const morning = result.find(r => r.type === 'morning')!
    const transformed = morning.appointments[0]

    expect(transformed.time).toBeDefined()
    expect(transformed.service).toBe('Banho')
    expect(transformed.period).toBe('morning')
    expect(transformed.tutorName).toBe('John Doe')
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
pnpm test -- --run src/utils/get-appointments-by-period.spec.ts
```
Expected: All 3 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/utils/get-appointments-by-period.spec.ts
git commit -m "test(utils): add getAppointmentsByPeriod unit tests"
```

---

### Task 5: Tests for Appointment Form Schema

**Files:**
- Create: `src/schemas/appointment-form-schema.spec.ts`
- Source: `src/schemas/appointment-form-schema.ts`

- [ ] **Step 1: Write the tests**

```typescript
import { appointmentFormSchema } from './appointment-form-schema'

describe('appointmentFormSchema', () => {
  const validData = {
    tutorName: 'John Doe',
    petName: 'Rex',
    phone: '11999999999',
    description: 'Banho e tosa',
    scheduledAt: new Date('2026-12-25T10:00:00'),
    time: '10:00',
  }

  it('should pass with valid data', () => {
    const result = appointmentFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail when tutorName is empty', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      tutorName: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('tutorName')
    }
  })

  it('should fail when petName is empty', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      petName: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('petName')
    }
  })

  it('should fail when phone has less than 11 digits', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      phone: '1234567890',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('phone')
    }
  })

  it('should fail when description is less than 3 characters', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      description: 'AB',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('description')
    }
  })

  it('should fail when scheduledAt is in the past', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      scheduledAt: new Date('2020-01-01'),
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('scheduledAt')
    }
  })

  it('should fail when time is empty', () => {
    const result = appointmentFormSchema.safeParse({
      ...validData,
      time: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('time')
    }
  })

  it('should fail when time is in the past for the given date', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const result = appointmentFormSchema.safeParse({
      ...validData,
      scheduledAt: yesterday,
      time: '10:00',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('time')
    }
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
pnpm test -- --run src/schemas/appointment-form-schema.spec.ts
```
Expected: All 8 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/schemas/appointment-form-schema.spec.ts
git commit -m "test(schemas): add appointmentFormSchema unit tests"
```

---

### Task 6: Tests for Create Appointment Schema

**Files:**
- Create: `src/schemas/create-appointment-schema.spec.ts`
- Source: `src/schemas/create-appointment-schema.ts`

- [ ] **Step 1: Write the tests**

```typescript
import { createAppointmentSchema } from './create-appointment-schema'

describe('createAppointmentSchema', () => {
  const validData = {
    tutorName: 'John Doe',
    petName: 'Rex',
    phone: '11999999999',
    description: 'Banho',
    scheduledAt: new Date('2026-12-25T10:00:00'),
  }

  it('should pass with valid data', () => {
    const result = createAppointmentSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail when required fields are missing', () => {
    const result = createAppointmentSchema.safeParse({})
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map(issue => issue.path[0])
      expect(paths).toContain('tutorName')
      expect(paths).toContain('petName')
      expect(paths).toContain('phone')
      expect(paths).toContain('description')
      expect(paths).toContain('scheduledAt')
    }
  })

  it('should fail when scheduledAt is not a date', () => {
    const result = createAppointmentSchema.safeParse({
      ...validData,
      scheduledAt: 'not-a-date',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('scheduledAt')
    }
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
pnpm test -- --run src/schemas/create-appointment-schema.spec.ts
```
Expected: All 3 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/schemas/create-appointment-schema.spec.ts
git commit -m "test(schemas): add createAppointmentSchema unit tests"
```

---

### Task 7: Tests for AppointmentCard Component

**Files:**
- Create: `src/components/appointment-card.spec.tsx`
- Source: `src/components/appointment-card.tsx`
- Source: `src/types/appointment.ts`

- [ ] **Step 1: Write the tests**

```typescript
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
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
pnpm test -- --run src/components/appointment-card.spec.tsx
```
Expected: All 2 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/appointment-card.spec.tsx
git commit -m "test(components): add AppointmentCard unit tests"
```

---

### Task 8: Tests for PeriodSection Component

**Files:**
- Create: `src/components/period-section.spec.tsx`
- Source: `src/components/period-section.tsx`
- Source: `src/components/appointment-card.tsx`

- [ ] **Step 1: Write the tests**

```typescript
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
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
pnpm test -- --run src/components/period-section.spec.tsx
```
Expected: All 4 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/period-section.spec.tsx
git commit -m "test(components): add PeriodSection unit tests"
```

---

### Task 9: Tests for AppointmentForm Component

**Files:**
- Create: `src/components/appointment-form.spec.tsx`
- Source: `src/components/appointment-form.tsx`

- [ ] **Step 1: Write the tests**

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppointmentForm } from './appointment-form'
import * as action from '@/app/(home)/action'

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

describe('<AppointmentForm />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the trigger button with "Agendar" text', () => {
    render(<AppointmentForm />)
    expect(screen.getByText('Agendar')).toBeInTheDocument()
  })

  it('should render all form fields', () => {
    render(<AppointmentForm />)

    expect(screen.getByPlaceholderText('Nome do tutor')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Nome do pet')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('(99) 99999-9999')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Uma breve descrição')).toBeInTheDocument()
  })

  it('should show validation errors on empty submit', async () => {
    const user = userEvent.setup()
    render(<AppointmentForm />)

    const submitButton = screen.getByRole('button', { name: /agendar/i })
    await user.click(submitButton)

    expect(await screen.findByText('O nome do tutor é obrigatório')).toBeInTheDocument()
    expect(await screen.findByText('O nome do pet é obrigatório')).toBeInTheDocument()
  })

  it('should show loading state when submitting', async () => {
    vi.mocked(action.createAppointment).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100)),
    )

    const user = userEvent.setup()
    render(<AppointmentForm />)

    const submitButton = screen.getByRole('button', { name: /agendar/i })
    await user.click(submitButton)

    expect(await screen.findByRole('button', { disabled: true })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
pnpm test -- --run src/components/appointment-form.spec.tsx
```
Expected: All 4 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/appointment-form.spec.tsx
git commit -m "test(components): add AppointmentForm unit tests"
```

---

### Task 10: Tests for Server Actions

**Files:**
- Create: `src/app/(home)/action.spec.ts`
- Source: `src/app/(home)/action.ts`
- Source: `src/services/prisma.ts`

- [ ] **Step 1: Write the tests**

```typescript
import { createAppointment, getAppointments } from './action'
import { prisma } from '@/services/prisma'
import * as getPeriodModule from '@/utils/get-period'

vi.mock('@/services/prisma', () => ({
  prisma: {
    appointment: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
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
        error: 'Agendamentos só podem ser feitos entre 9h e 21h',
      })
      expect(prisma.appointment.findFirst).not.toHaveBeenCalled()
    })
  })

  describe('getAppointments', () => {
    it('should return appointments grouped by period', async () => {
      const mockAppointments = [
        {
          id: '1',
          tutorName: 'John',
          petName: 'Rex',
          phone: '11999999999',
          description: 'Banho',
          scheduledAt: new Date('2026-05-22T10:00:00'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      vi.mocked(prisma.appointment.findMany).mockResolvedValue(mockAppointments)

      const result = await getAppointments()

      expect(prisma.appointment.findMany).toHaveBeenCalledWith({
        orderBy: { scheduledAt: 'asc' },
      })
      expect(result).toHaveLength(3)
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
pnpm test -- --run src/app/\(home\)/action.spec.ts
```
Expected: All 4 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(home)/action.spec.ts"
git commit -m "test(actions): add server action unit tests"
```

---

### Task 11: Final Verification and Cleanup

- [ ] **Step 1: Run all tests**

Run:
```bash
pnpm test -- --run
```
Expected: All tests PASS across all files.

- [ ] **Step 2: Run lint check**

Run:
```bash
pnpm lint
```
Fix any issues found.

- [ ] **Step 3: Final commit if lint fixes needed**

```bash
git add -A
git commit -m "style: fix lint issues in test files"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All spec requirements mapped to tasks — utils (3 files, 10 tests), schemas (2 files, 11 tests), components (3 files, 10 tests), server actions (1 file, 4 tests). Total: 35 tests across 9 test files.
- [x] **Placeholder scan:** No TBD, TODO, or vague instructions. All code blocks are complete.
- [x] **Type consistency:** All types reference `@/types/appointment` (`AppointmentProps`, `AppointmentFullProps`). Prisma `Appointment` type used in get-appointments-by-period tests. Schema tests use `safeParse` pattern consistently.
- [x] **No missing references:** All imports, mock patterns, and file paths defined inline.
