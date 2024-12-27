import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Travel.app',
  description: 'Convide seus amigos e planeje sua próxima viagem!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-zinc-950 text-zinc-50 antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
