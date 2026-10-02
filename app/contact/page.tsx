'use client'

import { FormEvent, useState } from 'react'
import { formatInquiryMessage, isValidInquiry } from '@/lib/inquiry'

const whatsappUrl = 'https://wa.me/254708997089'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const inquiry = {
      name: String(data.get('name') ?? ''),
      contact: String(data.get('contact') ?? ''),
      topic: String(data.get('topic') ?? ''),
      message: String(data.get('message') ?? ''),
    }
    if (!isValidInquiry(inquiry)) return

    setSubmitted(true)
    window.open(`${whatsappUrl}?text=${encodeURIComponent(formatInquiryMessage(inquiry))}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[.22em] text-primary">Contact</p>
      <h1 className="mt-5 max-w-2xl text-6xl leading-tight">Let&apos;s gather.</h1>
      <p className="mt-7 max-w-md text-lg leading-8 text-muted-foreground">Questions about your order, our coffee, or bringing Grounds to Gather to your table?</p>
      <form onSubmit={submit} className="mt-10 max-w-xl space-y-5 rounded-[var(--radius)] light-surface p-6 md:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="name">Name<input className="light-surface-border rounded-[var(--radius)] border bg-transparent px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary" id="name" name="name" required /></label>
          <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="contact">Phone or email<input className="light-surface-border rounded-[var(--radius)] border bg-transparent px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary" id="contact" name="contact" required /></label>
        </div>
        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="topic">What&apos;s this about<select className="light-surface-border rounded-[var(--radius)] border bg-transparent px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary" id="topic" name="topic" defaultValue="Order question"><option>Order question</option><option>Subscription question</option><option>Wholesale or bulk inquiry</option><option>General question</option></select></label>
        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="message">Message<textarea className="light-surface-border min-h-32 rounded-[var(--radius)] border bg-transparent px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary" id="message" name="message" required /></label>
        <button type="submit" className="interactive-control w-full rounded-[var(--radius)] bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-foreground">{submitted ? 'Opening WhatsApp…' : 'Send inquiry on WhatsApp'}</button>
      </form>
      <div className="mt-8 flex flex-col gap-5 sm:flex-row">
        <a href={`${whatsappUrl}?text=Hello%20Grounds%20to%20Gather`} target="_blank" rel="noreferrer" className="interactive-control bg-primary px-6 py-4 text-center text-sm font-semibold text-primary-foreground hover:bg-foreground">Message on WhatsApp</a>
        <a href="mailto:hello@groundstogather.co.ke" className="interactive-control border border-primary px-6 py-4 text-center text-sm font-semibold text-primary hover:bg-card">hello@groundstogather.co.ke</a>
      </div>
    </main>
  )
}
