import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { initiateStkPush } from '@/lib/mpesa'

export async function POST(request: Request) {
  const body = await request.json() as { orderId?: string; phone?: string }
  if (!body.orderId || !body.phone) return NextResponse.json({ error: 'orderId and phone are required' }, { status: 400 })
  const order = await prisma.order.findUnique({ where: { id: body.orderId } })
  if (!order || order.status !== 'pending') return NextResponse.json({ error: 'Pending order not found' }, { status: 404 })
  const result = await initiateStkPush({ orderId: order.id, phone: body.phone, amount: order.subtotalKsh })
  await prisma.order.update({ where: { id: order.id }, data: { paymentRef: result.CheckoutRequestID, paymentMethod: 'mpesa' } })
  return NextResponse.json({ checkoutRequestId: result.CheckoutRequestID, message: result.CustomerMessage })
}
