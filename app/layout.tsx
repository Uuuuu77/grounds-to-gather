import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsApp } from '@/components/whatsapp'
import { Providers } from '@/components/providers'

const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  metadataBase: new URL('https://groundstogather.com'),
  alternates: {
    canonical: '/',
  },
  title: 'Grounds to Gather | Grounded in Grace. Gathered in Love.',
  description: 'East African coffee, roasted in Nairobi. Every bag gathers your table and builds a future at its source.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${body.variable} ${display.variable}`}>
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
          <WhatsApp />
        </Providers>
      </body>
    </html>
  )
}
