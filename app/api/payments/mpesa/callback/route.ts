import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendOrderInvoice } from '@/lib/email'

export async function POST(request: Request) {
  const payload = await request.json() as { Body?: { stkCallback?: { CheckoutRequestID?: string; ResultCode?: number } } }
  const callback = payload.Body?.stkCallback
  if (!callback?.CheckoutRequestID) return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid callback' }, { status: 400 })
  const order = await prisma.order.findFirst({ where: { paymentRef: callback.CheckoutRequestID } })
  if (!order) return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  if (callback.ResultCode === 0 && order.status !== 'paid') {
    const paid = await prisma.order.updateMany({ where: { id: order.id, status: 'pending' }, data: { status: 'paid' } })
    if (paid.count === 1) await sendOrderInvoice({ ...order, items: order.items as { name: string; qty: number; priceKsh: number }[] })
  }
  return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
}
