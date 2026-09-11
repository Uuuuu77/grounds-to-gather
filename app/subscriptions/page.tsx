'use client'

import { FormEvent, useState } from 'react'
import { products } from '@/lib/products'
import { useCart } from '@/components/cart'

const rhythms = [
  { value: 'monthly', label: 'Monthly', price: 'KSh 1,250', detail: 'A fresh 400g bag every month.' },
  { value: 'twice-monthly', label: 'Twice a Month', price: 'KSh 1,250', detail: 'A fresh 400g bag, delivered twice every month.' },
]

export default function SubscriptionsPage() {
  const { add } = useCart()
  const [plan, setPlan] = useState('monthly')
  const [roast, setRoast] = useState(products[0].id)
  const [submitted, setSubmitted] = useState(false)
  const selected = products.find((product) => product.id === roast) ?? products[0]

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    add({ ...selected, id: `${selected.id}-${plan}`, name: `${selected.name} — ${plan === 'monthly' ? 'Monthly' : 'Twice a Month'}` })
    setSubmitted(true)
  }

  return <main className="mx-auto max-w-4xl px-5 py-14 md:py-20"><p className="text-xs uppercase tracking-[.22em] text-primary">Welcome to our Subscriptions</p><h1 className="mt-4 max-w-2xl text-5xl leading-tight md:text-6xl">Choose your rhythm now.</h1><p className="mt-5 max-w-xl leading-7 text-muted-foreground">Keep a generous roast close for the moments that matter. Choose your rhythm, choose your roast, and we&apos;ll add it to your cart.</p><form onSubmit={submit} className="mt-10 flex flex-col gap-9"><fieldset className="flex flex-col gap-4"><legend className="mb-1 text-sm font-semibold">Choose your rhythm</legend><div className="grid gap-4 md:grid-cols-2">{rhythms.map((rhythm) => <label key={rhythm.value} className={`relative flex cursor-pointer flex-col gap-2 rounded-[var(--radius)] border p-5 transition-colors ${plan === rhythm.value ? 'border-primary bg-light-surface text-on-light-surface' : 'border-border bg-light-surface text-on-light-surface hover:bg-light-surface'}`}><input aria-label={rhythm.label} className="sr-only" type="radio" name="plan" value={rhythm.value} checked={plan === rhythm.value} onChange={() => setPlan(rhythm.value)} /><span className="text-lg font-semibold">{rhythm.label}</span><span className="text-2xl">{rhythm.price}</span><span className="text-sm leading-6 text-muted-foreground">{rhythm.detail}</span></label>)}</div></fieldset><fieldset className="flex flex-col gap-4"><legend className="mb-1 text-sm font-semibold">Choose your roast</legend><div className="grid gap-4 md:grid-cols-2">{products.map((product) => <label key={product.id} className={`relative flex cursor-pointer flex-col gap-2 rounded-[var(--radius)] border p-5 transition-colors ${roast === product.id ? 'border-primary bg-light-surface text-on-light-surface' : 'border-border bg-light-surface text-on-light-surface hover:bg-light-surface'}`}><input aria-label={product.name} className="sr-only" type="radio" name="roast" value={product.id} checked={roast === product.id} onChange={() => setRoast(product.id)} /><span className="text-lg font-semibold">{product.name}</span><span className="text-xs uppercase tracking-[.18em] text-primary">{product.roast} roast</span><span className="text-sm leading-6 text-muted-foreground">{product.description}</span></label>)}</div></fieldset><div className="grid gap-5 md:grid-cols-2"><label className="flex flex-col gap-2 text-sm">Name<input required minLength={2} name="name" className="border border-border bg-background p-3" /></label><label className="flex flex-col gap-2 text-sm">Phone<input required pattern="[0-9+() -]{9,}" type="tel" name="phone" className="border border-border bg-background p-3" /></label><label className="flex flex-col gap-2 text-sm">Email<input required type="email" name="email" className="border border-border bg-background p-3" /></label><label className="flex flex-col gap-2 text-sm md:col-span-2">Delivery address<textarea required minLength={8} name="address" className="min-h-28 border border-border bg-background p-3" placeholder="Building, street, area, city" /></label></div><button type="submit" className="w-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-foreground md:w-fit">{submitted ? 'Added to cart' : 'Add subscription to cart'}</button></form></main>
}
