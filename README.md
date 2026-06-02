<div align="center">
  <h1 align="center">Pets Dev</h1>
  <p align="center">A pet care appointment scheduler built with Next.js</p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS 4" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma" alt="Prisma" />
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript" alt="TypeScript" />
  </p>
</div>

## About

Pets Dev is a full-stack web application for managing pet care appointments. It allows pet clinics or groomers to view, create, edit, and delete appointments grouped by morning, afternoon, and evening periods.

## Features

- **📅 Date-based filtering** — Browse appointments for any date using the date picker
- **⏰ Period grouping** — Appointments organised into morning (09h–12h), afternoon (13h–18h), and evening (19h–21h) slots
- **➕ Create appointments** — Book new appointments with tutor name, pet name, phone, description, and scheduled time
- **✏️ Edit appointments** — Update existing appointment details
- **🗑️ Delete appointments** — Remove appointments with a confirmation dialog
- **✅ Form validation** — Client and server-side validation via Zod schemas
- **🌙 Dark mode** — Dark theme out of the box

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Database | [PostgreSQL](https://www.postgresql.org/) |
| ORM | [Prisma](https://www.prisma.io/) |
| Validation | [Zod](https://zod.dev/) |
| Forms | [React Hook Form](https://react-hook-form.com/) |
| Dates | [date-fns](https://date-fns.org/) |
| Linter | [Biome](https://biomejs.dev/) |
| Tests | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |

## Getting Started

### Prerequisites

- Node.js >= 22
- pnpm
- PostgreSQL (or Docker)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/pet-dev.git
cd pet-dev

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Start PostgreSQL with Docker (optional)
docker compose up -d

# Run database migrations
pnpm db:migrate

# Seed the database (optional)
pnpm db:seed

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/pet-dev"
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production (runs Prisma generate + migrate + Next.js build) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome checks |
| `pnpm format` | Format code with Biome |
| `pnpm test` | Run Vitest tests |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:seed` | Seed the database |

## Project Structure

```
src/
├── app/(home)/              # Home page (route group)
│   ├── actions/             # Server actions (CRUD)
│   └── page.tsx
├── components/              # UI components
│   ├── ui/                  # shadcn/ui primitives
│   ├── header.tsx
│   ├── appointment-card.tsx
│   ├── appointment-form.tsx
│   ├── date-picker.tsx
│   └── period-section.tsx
├── lib/                     # Shared utilities
├── schemas/                 # Zod validation schemas
├── services/                # Database services
├── types/                   # TypeScript types
└── utils/                   # Helper functions
```

## Screenshots

<!-- TODO: Add screenshots of the application -->

| | |
|:---:|:---:|
| **Home Page** | **Create Appointment** |
| ![Home](.screens/home.png) | ![Create appointment](.screens/create.png) |
| **Edit Appointment** | **Delete Confirmation** |
| ![Edit appointment](screenshots/edit.png) | ![Delete appointment](.screens/delete.png) |

## License

[MIT](LICENSE)
