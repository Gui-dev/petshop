# AGENTS.md

## Commands

- `pnpm dev` - Start dev server (uses pnpm, not npm)
- `pnpm build` - Production build
- `pnpm lint` - Biome check (`biome check .`)
- `pnpm format` - Biome format (`biome format .`)
- `pnpm test` - Vitest tests (if configured)

## Tech Stack

- **Next.js 16** with App Router (src/app)
- **React 19**
- **Biome** - Linter/formatter (NOT ESLint or Prettier)
- **Tailwind v4** - No traditional tailwind.config.js
- **Prisma** - Database ORM (prisma/schema.prisma)
- **Vitest** - Test framework (see docs/TESTING_GUIDELINE.md)

## Key Conventions

- Use **pnpm**, not npm/yarn
- Linting/formatting via **Biome**, not ESLint/Prettier
- Tests colocated: `src/components/X.spec.tsx`, `src/hooks/X.spec.ts`
- Commit style: Conventional Commits (see docs/skills/COMMITS_GUIDELINE.md)
- Use `vi.mock('next/navigation')` and `vi.mock('next/image')` for Next.js mocks

## Important Files

- `biome.json` - Lint/format rules (quotes: single JS, double JSX)
- `prisma/schema.prisma` - Database schema
- `docs/TESTING_GUIDELINE.md` - Testing patterns
- `docs/skills/COMMITS_GUIDELINE.md` - Commit rules