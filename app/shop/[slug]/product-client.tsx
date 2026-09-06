'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart'
import type { Product } from '@/components/cart'

export function ProductClient({ product }: { product: Product }) {
  const { add } = useCart()
  return <main className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-24"><div className="relative aspect-square overflow-hidden rounded-[var(--radius)] bg-muted"><Image src={product.imageUrl} alt={`${product.name} coffee bag`} fill className="object-contain p-6" sizes="(max-width:768px) 100vw, 50vw" /></div><div className="flex flex-col justify-center"><Link href="/shop" className="text-sm text-primary">← Back to shop</Link><h1 className="mt-7 text-5xl leading-tight">{product.name}</h1><p className="mt-3 text-sm text-muted-foreground">{product.weightG}g · {product.roast} roast · {product.process} · {product.origin}</p><p className="mt-8 text-2xl">KSh {product.priceKsh.toLocaleString()}</p><p className="mt-6 max-w-md leading-7 text-muted-foreground">{product.description}</p><div className="mt-6 flex flex-wrap gap-2">{product.flavorProfile.map((flavor) => <span className="rounded-full border border-border px-3 py-2 text-xs" key={flavor}>{flavor}</span>)}</div><button onClick={() => add(product)} className="mt-9 w-full rounded-[var(--radius)] bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-foreground md:w-fit">Add to cart</button><a href={`https://wa.me/254708997089?text=${encodeURIComponent(`I have a question about the ${product.name}`)}`} className="mt-5 text-sm text-primary underline underline-offset-4">Ask about this bag on WhatsApp</a></div></main>
}
