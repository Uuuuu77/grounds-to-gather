import { describe, expect, it } from 'vitest'
import { formatInquiryMessage, isValidInquiry } from '@/lib/inquiry'

describe('WhatsApp inquiry formatting', () => {
  const inquiry = {
    name: ' Ebe ',
    contact: ' ebe@example.com ',
    topic: 'Order question',
    message: ' Where is my order? ',
  }

  it('formats trimmed fields for WhatsApp', () => {
    expect(formatInquiryMessage(inquiry)).toBe('New inquiry from the website:\nName: Ebe\nContact: ebe@example.com\nTopic: Order question\nMessage: Where is my order?')
  })

  it('rejects incomplete submissions', () => {
    expect(isValidInquiry({ ...inquiry, message: ' ' })).toBe(false)
    expect(isValidInquiry(inquiry)).toBe(true)
  })
})
