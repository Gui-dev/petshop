import { Dog } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 rounded-b-lg bg-zinc-900 p-3 hover:bg-zinc-950/5"
      >
        <Dog className="size-6 text-yellow-500" />
        <span className="sr-only">Pets Dev</span>
        <h1 className="font-bold text-lg">Pets Dev</h1>
      </Link>
    </header>
  )
}
