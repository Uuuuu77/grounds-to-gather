import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.NEWSLETTER_ADMIN_TOKEN}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json() as { subject?: string; html?: string }
  if (!body.subject || !body.html || body.html.length > 100000) return NextResponse.json({ error: 'subject and html are required' }, { status: 400 })
  const subscribers = await prisma.subscriber.findMany({ select: { email: true } })
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: 'Resend is not configured' }, { status: 503 })
  const resend = new Resend(process.env.RESEND_API_KEY)
  const results = []
  for (const subscriber of subscribers) {
    const { data, error } = await resend.emails.send({ from: `Grounds to Gather <hello@${process.env.RESEND_EMAIL_DOMAIN ?? 'resend.dev'}>`, to: [subscriber.email], subject: body.subject, html: body.html }, { idempotencyKey: `newsletter/${body.subject}/${subscriber.email}` })
    if (error) return NextResponse.json({ error: error.message }, { status: 502 })
    results.push(data?.id)
  }
  return NextResponse.json({ sent: results.length })
}
