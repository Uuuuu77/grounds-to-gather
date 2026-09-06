import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SubscriptionsPage from '@/app/subscriptions/page'

const add = vi.fn()
vi.mock('@/components/cart', () => ({ useCart: () => ({ add }) }))

describe('subscription form', () => {
  it('lets a customer choose a rhythm and roast, then adds a tagged item', () => {
    render(<SubscriptionsPage />)

    fireEvent.click(screen.getByLabelText('Bi-monthly'))
    fireEvent.click(screen.getByLabelText('Gathinja Dark Roast'))
    expect(screen.getByLabelText('Bi-monthly')).toBeChecked()
    expect(screen.getByLabelText('Gathinja Dark Roast')).toBeChecked()
    expect(screen.getByRole('button', { name: 'Add subscription to cart' })).toBeInTheDocument()
  })
})
