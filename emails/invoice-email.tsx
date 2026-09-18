import { Body, Container, Head, Heading, Html, Hr, Preview, Section, Text } from '@react-email/components'

type Props = { order: { id: string; customerName: string; address: string; items: { name: string; qty: number; priceKsh: number }[]; subtotalKsh: number; createdAt: Date } }
export function InvoiceEmail({ order }: Props) {
  const total = order.subtotalKsh
  return <Html><Head /><Preview>Your Grounds to Gather order is confirmed</Preview><Body style={{ backgroundColor: '#f7f1e8', color: '#3b2412', fontFamily: 'Arial, sans-serif' }}><Container style={{ margin: '32px auto', maxWidth: 560, padding: 24, backgroundColor: '#fffaf2' }}><Heading>Grounds to Gather</Heading><Text>Hi {order.customerName},</Text><Text>Your order has been confirmed and will be dispatched within a short time.</Text><Hr /><Text><strong>Order:</strong> {order.id}<br /><strong>Date:</strong> {order.createdAt.toLocaleDateString('en-KE')}</Text><Section>{order.items.map(item => <Text key={item.name}>{item.name} × {item.qty} — KSh {(item.priceKsh * item.qty).toLocaleString()}</Text>)}</Section><Hr /><Text>Subtotal: KSh {order.subtotalKsh.toLocaleString()}<br />Delivery: Free<br /><strong>Total: KSh {total.toLocaleString()}</strong></Text><Text><strong>Delivery address:</strong><br />{order.address}</Text><Text>Thank you for gathering with us.</Text></Container></Body></Html>
}
