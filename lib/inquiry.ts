export type Inquiry = {
  name: string
  contact: string
  topic: string
  message: string
}

export function formatInquiryMessage(inquiry: Inquiry) {
  return [
    'New inquiry from the website:',
    `Name: ${inquiry.name.trim()}`,
    `Contact: ${inquiry.contact.trim()}`,
    `Topic: ${inquiry.topic.trim()}`,
    `Message: ${inquiry.message.trim()}`,
  ].join('\n')
}

export function isValidInquiry(inquiry: Inquiry) {
  return [inquiry.name, inquiry.contact, inquiry.topic, inquiry.message].every((value) => value.trim().length > 0)
}
