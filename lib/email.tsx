import { render } from '@react-email/components'
import { Resend } from 'resend'
import { InvoiceEmail } from '@/emails/invoice-email'

export type OrderEmail = { id: string; email: string; customerName: string; address: string; items: { name: string; qty: number; priceKsh: number }[]; subtotalKsh: number; createdAt: Date }

export async function sendOrderInvoice(order: OrderEmail) {
  if (!process.env.RESEND_API_KEY) return { skipped: true }
  const resend = new Resend(process.env.RESEND_API_KEY)
  const html = await render(<InvoiceEmail order={order} />)
  const { data, error } = await resend.emails.send({ from: `Grounds to Gather <hello@${process.env.RESEND_EMAIL_DOMAIN ?? 'resend.dev'}>`, to: [order.email], subject: `Order confirmation ${order.id}`, html }, { idempotencyKey: `order-confirmation/${order.id}` })
  if (error) throw new Error(error.message)
  return data
}
