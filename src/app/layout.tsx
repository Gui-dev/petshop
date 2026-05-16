import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Pets Dev',
  description: 'Pets Dev App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('h-full', 'antialiased', 'dark', 'font-sans', inter.variable)}>
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  )
}
