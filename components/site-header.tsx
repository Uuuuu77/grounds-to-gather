'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { useState } from 'react'
import { useCart } from './cart'

export function SiteHeader() {
  const { count } = useCart()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const dark = theme === 'dark'
  const close = () => setOpen(false)

  return <header className="border-b border-border bg-background"><div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:h-20"><Link href="/" aria-label="Grounds to Gather home" className="inline-flex items-center"><Image src="/grounds-logo-mark.jpg" alt="Grounds to Gather" width={128} height={128} className="size-12 object-contain md:size-14" priority /></Link><nav className="hidden items-center gap-8 text-sm md:flex"><Link href="/shop">Shop</Link><Link href="/story">Our story</Link><Link href="/subscriptions">Subscriptions</Link><Link href="/contact">Contact</Link></nav><div className="flex items-center gap-4"><button type="button" onClick={() => setTheme(dark ? 'light' : 'dark')} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} className="rounded-full p-2 text-primary hover:bg-card">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><Link aria-label={`Cart with ${count} items`} href="/cart" className="relative"><ShoppingBag size={20} />{count > 0 && <span className="absolute -right-3 -top-3 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">{count}</span>}</Link><button type="button" className="md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button></div></div>{open && <nav className="flex flex-col gap-5 border-t border-border bg-background px-5 py-5 text-sm md:hidden"><Link onClick={close} href="/shop">Shop</Link><Link onClick={close} href="/story">Our story</Link><Link onClick={close} href="/subscriptions">Subscriptions</Link><Link onClick={close} href="/contact">Contact</Link></nav>}</header>
}
