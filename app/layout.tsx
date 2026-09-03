import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsApp } from '@/components/whatsapp'
import { CartProvider } from '@/components/cart'
const body = DM_Sans({ subsets:['latin'], variable:'--font-body' })
const display = Playfair_Display({ subsets:['latin'], variable:'--font-display' })
export const metadata: Metadata = { title: 'Grounds to Gather | Grounded in Grace. Gathered in Love.', description: 'East African coffee, roasted in Nairobi. Every bag gathers your table and builds a future at its source.' }
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" className="bg-background"><body className={`${body.variable} ${display.variable}`}><CartProvider><SiteHeader />{children}<SiteFooter /><WhatsApp /></CartProvider></body></html> }
