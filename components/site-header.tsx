'use client'

import Link from 'next/link'
import { Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { useState } from 'react'
import { useCart } from './cart'
import { Logo } from './logo'

export function SiteHeader() {
  const { count } = useCart()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const dark = theme === 'dark'
  const close = () => setOpen(false)

  return (
    <header className="theme-surface theme-border border-b theme-icon transition-colors">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:h-20">
        <Link href="/" aria-label="Grounds to Gather home" className="inline-flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm theme-icon md:flex" aria-label="Primary navigation">
          <Link className="theme-icon hover:text-primary" href="/shop">Shop</Link>
          <Link className="theme-icon hover:text-primary" href="/story">Our story</Link>
          <Link className="theme-icon hover:text-primary" href="/subscriptions">Subscriptions</Link>
          <Link className="theme-icon hover:text-primary" href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setTheme(dark ? 'light' : 'dark')} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} className="rounded-full p-2 theme-icon hover:bg-card hover:text-primary">
            {dark ? <Sun aria-hidden="true" className="theme-icon" size={18} strokeWidth={2.2} /> : <Moon aria-hidden="true" className="theme-icon" size={18} strokeWidth={2.2} />}
          </button>
          <Link aria-label={`Cart with ${count} items`} href="/cart" className="relative">
            <ShoppingBag aria-hidden="true" className="theme-icon" size={20} strokeWidth={2.2} />
            {count > 0 && <span className="absolute -right-3 -top-3 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">{count}</span>}
          </Link>
          <button type="button" className="rounded-full p-2 theme-icon hover:bg-card md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X aria-hidden="true" className="theme-icon" size={21} strokeWidth={2.2} /> : <Menu aria-hidden="true" className="theme-icon" size={21} strokeWidth={2.2} />}
          </button>
        </div>
      </div>
      {open && <nav aria-label="Mobile navigation" className="theme-surface theme-border flex flex-col gap-5 border-t px-5 py-5 text-sm shadow-sm md:hidden">
        <Link onClick={close} href="/shop">Shop</Link>
        <Link onClick={close} href="/story">Our story</Link>
        <Link onClick={close} href="/subscriptions">Subscriptions</Link>
        <Link onClick={close} href="/contact">Contact</Link>
      </nav>}
    </header>
  )
}
