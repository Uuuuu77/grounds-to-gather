import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/products'

export default function Shop() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <section className="relative overflow-hidden bg-foreground text-background">
        <Image src="/images/shop/coffee-beans-banner.png" alt="Roasted coffee beans on a wooden table" fill priority className="object-cover opacity-65" sizes="100vw" />
        <div className="relative flex min-h-72 flex-col justify-end gap-4 p-7 md:min-h-96 md:p-12">
          <p className="text-xs uppercase tracking-[.22em] text-background/75">The collection</p>
          <h1 className="max-w-xl text-5xl leading-tight md:text-7xl">Coffee to gather around.</h1>
          <p className="max-w-xs text-sm leading-6 text-background/80">Two Murang&apos;a roasts, sourced with care and roasted in Nairobi.</p>
        </div>
      </section>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {products.map((p) => (
          <Link href={`/shop/${p.slug}`} key={p.id} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-[url('/images/shop/product-backdrop.png')] bg-cover bg-center p-6 md:p-10">
              <Image src={p.imageUrl} alt={`${p.name} roast atmosphere`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <div className="mt-5 flex justify-between gap-4 rounded-[var(--radius)] bg-light-surface p-5 text-on-light-surface"><div><h2 className="font-serif text-2xl text-on-light-surface">{p.name}</h2><p className="mt-1 text-sm text-on-light-surface/75">{p.weightG}g · {p.roast} roast · {p.origin}</p></div><p className="font-semibold text-on-light-surface">KSh {p.priceKsh.toLocaleString()}</p></div>
          </Link>
        ))}
      </div>
    </main>
  )
}
