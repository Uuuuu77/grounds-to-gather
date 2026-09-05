'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from './cart'

export function SiteHeader(){
  const {count}=useCart(); const [open,setOpen]=useState(false)
  return <header className="border-b border-border bg-background"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><Link href="/" aria-label="Grounds to Gather home" className="inline-flex items-center"><span className="relative block h-10 w-36 overflow-hidden md:h-12 md:w-44"><Image src="/grounds-logo-clean.png" alt="Grounds to Gather" fill className="object-contain" priority sizes="176px" /></span></Link><nav className="hidden items-center gap-8 text-sm md:flex"><Link href="/shop">Shop</Link><Link href="/story">Our story</Link><Link href="/subscriptions">Subscriptions</Link><Link href="/contact">Contact</Link></nav><div className="flex items-center gap-4"><Link aria-label={`Cart with ${count} items`} href="/cart" className="relative"><ShoppingBag size={20}/>{count>0&&<span className="absolute -right-3 -top-3 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">{count}</span>}</Link><button type="button" className="md:hidden" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button></div></div>{open&&<nav className="flex flex-col gap-5 border-t border-border px-5 py-5 text-sm md:hidden"><Link onClick={()=>setOpen(false)} href="/shop">Shop</Link><Link onClick={()=>setOpen(false)} href="/story">Our story</Link><Link onClick={()=>setOpen(false)} href="/subscriptions">Subscriptions</Link><Link onClick={()=>setOpen(false)} href="/contact">Contact</Link></nav>}</header>
}
