const darajaBase = process.env.MPESA_ENV === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke'

async function accessToken() {
  const credentials = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64')
  const response = await fetch(`${darajaBase}/oauth/v1/generate?grant_type=client_credentials`, { headers: { Authorization: `Basic ${credentials}` }, cache: 'no-store' })
  if (!response.ok) throw new Error('Unable to authenticate with Daraja')
  return (await response.json()).access_token as string
}

export async function initiateStkPush(input: { orderId: string; phone: string; amount: number }) {
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)
  const shortcode = process.env.MPESA_SHORTCODE ?? '820820'
  const password = Buffer.from(`${shortcode}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64')
  const response = await fetch(`${darajaBase}/mpesa/stkpush/v1/processrequest`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ BusinessShortCode: shortcode, Password: password, Timestamp: timestamp, TransactionType: 'CustomerPayBillOnline', Amount: input.amount, PartyA: input.phone, PartyB: shortcode, PhoneNumber: input.phone, CallBackURL: process.env.MPESA_CALLBACK_URL, AccountReference: input.orderId, TransactionDesc: `Grounds to Gather order ${input.orderId}` }) })
  if (!response.ok) throw new Error('Unable to initiate M-Pesa payment')
  return response.json() as Promise<{ CheckoutRequestID: string; ResponseCode: string; CustomerMessage: string }>
}
