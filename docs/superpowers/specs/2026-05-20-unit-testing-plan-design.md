# Unit Testing Plan - Pet Shop App

## Overview

Add comprehensive unit test coverage across all layers of the application: utils, schemas, UI components, and server actions.

## Tech Stack

- **Test runner:** Vitest
- **Rendering:** @testing-library/react
- **Assertions:** @testing-library/jest-dom
- **User interactions:** @testing-library/user-event
- **API mocking:** MSW (Mock Service Worker)
- **DOM environment:** jsdom

## Setup

### Dependencies

```
pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react msw
```

### Configuration Files

- `vitest.config.ts` — root config with `@/` alias mapped to `src/`, jsdom environment
- `src/test-setup.ts` — global `@testing-library/jest-dom` matchers import
- `src/mocks/handlers.ts` + `src/mocks/server.ts` — MSW setup
- Update `package.json` scripts: `"test": "vitest"`, `"test:ui": "vitest --ui"`

## Layer 1: Utils

### `src/utils/get-period.spec.ts`

| Test | Purpose |
|------|---------|
| returns 'morning' for hours 9-11 | Validates morning period |
| returns 'afternoon' for hours 13-17 | Validates afternoon period |
| returns 'evening' for hours 19-21 | Validates evening period (inclusive of 21) |
| returns 'morning' as fallback for out-of-range hours | Validates default behavior |

### `src/utils/generate-time-options.spec.ts`

| Test | Purpose |
|------|---------|
| generates options from 09:00 to 20:30 | Validates time range |
| generates options in 30-minute intervals | Validates interval logic |
| each option has correct label and value format | Validates output shape |

### `src/utils/get-appointments-by-period.spec.ts`

| Test | Purpose |
|------|---------|
| groups appointments by period correctly | Validates grouping logic |
| returns all three periods even with empty input | Validates structure completeness |
| transforms appointments with time and service fields | Validates transformation |

## Layer 2: Schemas

### `src/schemas/appointment-form-schema.spec.ts`

| Test | Purpose |
|------|---------|
| passes with valid data | Baseline success case |
| fails when tutorName is empty | Required field validation |
| fails when petName is empty | Required field validation |
| fails when phone has < 11 digits | Format validation |
| fails when description is < 3 chars | Min length validation |
| fails when scheduledAt is in the past | Date constraint |
| fails when time is empty | Required field validation |
| fails when time is in the past for given date | Refine constraint |

### `src/schemas/create-appointment-schema.spec.ts`

| Test | Purpose |
|------|---------|
| passes with valid data | Baseline success case |
| fails when required fields are missing | Required field validation |
| fails when scheduledAt is not a date | Type validation |

## Layer 3: UI Components

### `src/components/appointment-card.spec.tsx`

| Test | Purpose |
|------|---------|
| renders time, petName, tutorName, description | Validates all content renders |
| displays data correctly from props | Validates prop binding |

### `src/components/period-section.spec.tsx`

| Test | Purpose |
|------|---------|
| renders period title and timeRange | Validates header content |
| renders appointment cards when data exists | Validates child rendering |
| shows empty state when no appointments | Validates empty state |
| renders correct icon for each period type | Validates icon mapping |

## Layer 4: Complex Component

### `src/components/appointment-form.spec.tsx`

| Test | Purpose |
|------|---------|
| opens dialog when trigger button is clicked | Validates interaction |
| renders all form fields | Validates form structure |
| shows validation errors on empty submit | Validates error display |
| shows loading state when submitting | Validates loading UI |
| calls createAppointment and shows toast on success | Validates submission flow |

**Mocks:** `vi.mock('@/app/(home)/action')`, `vi.mock('sonner')`, UI child components mocked to simplify.

## Layer 5: Server Action

### `src/app/(home)/action.spec.ts`

| Test | Purpose |
|------|---------|
| creates appointment with valid data | Success path |
| returns error when appointment already exists | Duplicate prevention |
| returns error when hour is outside business range | Time validation |
| getPeriod called with correct hour | Helper integration |

**Mocks:** `vi.mock('@/services/prisma')` — mock PrismaClient methods.

## File Structure

```
vitest.config.ts
src/
├── test-setup.ts
├── mocks/
│   ├── handlers.ts
│   └── server.ts
├── utils/
│   ├── get-period.spec.ts
│   ├── generate-time-options.spec.ts
│   └── get-appointments-by-period.spec.ts
├── schemas/
│   ├── appointment-form-schema.spec.ts
│   └── create-appointment-schema.spec.ts
├── components/
│   ├── appointment-card.spec.tsx
│   ├── period-section.spec.tsx
│   └── appointment-form.spec.tsx
└── app/(home)/
    └── action.spec.ts
```

## Execution Order

1. Install dependencies + configure Vitest
2. Layer 1: Utils tests
3. Layer 2: Schema tests
4. Layer 3: UI component tests
5. Layer 4: Complex component tests
6. Layer 5: Server action tests

## Constraints

- Follow TESTING_GUIDELINE.md conventions
- Tests colocated with source files
- Use `getByRole` / `getByLabelText` queries (accessibility-first)
- Use `user-event` over `fireEvent`
- Mock `next/navigation` and `next/image` via Vitest
