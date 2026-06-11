import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Edunexa - Kerala Student Platform',
  description: 'Study prep platform for Kerala DHSE & SSLC students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
