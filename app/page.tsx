import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1fr_.9fr] md:items-center md:py-20">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-primary">
            Grounded in Grace. Gathered in Love.
          </p>
          <h1 className="max-w-xl text-5xl leading-[1.04] tracking-tight md:text-7xl">
            Coffee made for
            <br />
            <span className="text-primary">gathering.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            East African coffee, roasted in Nairobi.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground"
          >
            Shop the roast
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src="/grounds-brew.jpg"
            alt="Grounds to Gather coffee bag beside a pour-over setup"
            fill
            className="object-cover"
            priority
            sizes="(max-width:768px) 100vw, 45vw"
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.22em] text-primary">
              The collection
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl">Choose your roast.</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-primary">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <Link href={`/shop/${p.slug}`} key={p.id} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              <div className="mt-4 flex justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.weightG}g · {p.roast} roast
                  </p>
                </div>
                <p className="font-semibold">
                  KSh {p.priceKsh.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-xs uppercase tracking-[.22em] text-primary">
          From our table to yours
        </p>
        <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
          A better cup, shared.
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
          Some of life&apos;s best moments happen around a shared table: a warm
          cup, good company, and conversation worth lingering over.
        </p>
        <p className="mt-6 font-serif text-xl text-primary">
          Grounded in Grace. Gathered in Love.
        </p>
        <Link
          href="/story"
          className="mt-7 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary"
        >
          Read our story
        </Link>
      </section>
    </main>
  );
}
