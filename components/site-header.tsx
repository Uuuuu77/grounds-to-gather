'use client'
import Link from 'next/link'
import { ShoppingBag, Menu } from 'lucide-react'
import { useCart } from './cart'
export function SiteHeader(){ const {count}=useCart(); return <header className="border-b border-border bg-background"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><Link href="/" className="font-serif text-xl tracking-tight">Grounds <span className="text-primary">to Gather</span></Link><nav className="hidden items-center gap-8 text-sm md:flex"><Link href="/shop">Shop</Link><Link href="/story">Our story</Link><Link href="/contact">Contact</Link></nav><div className="flex items-center gap-4"><Link aria-label={`Cart with ${count} items`} href="/cart" className="relative"><ShoppingBag size={20}/>{count>0&&<span className="absolute -right-3 -top-3 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">{count}</span>}</Link><Menu className="md:hidden" size={21}/></div></div></header> }
