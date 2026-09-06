import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CartProvider, useCart } from '@/components/cart'

const product = {
  id: 'gathinja-medium-roast',
  name: 'Gathinja Medium Roast',
  slug: 'gathinja-medium-roast',
  description: 'A balanced cup.',
  weightG: 400,
  priceKsh: 1250,
  imageUrl: '/coffee.png',
  stock: 10,
  origin: "Murang'a",
  roast: 'Medium',
  process: 'Washed',
  flavorProfile: ['Chocolate'],
}

describe('cart state', () => {
  it('adds, increments, totals, and removes products', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => null,
      setItem: vi.fn(),
    })
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => result.current.add(product))
    act(() => result.current.add(product))
    expect(result.current.count).toBe(2)
    expect(result.current.total).toBe(2500)

    act(() => result.current.setQty(product.id, 1))
    expect(result.current.count).toBe(1)
    act(() => result.current.remove(product.id))
    expect(result.current.items).toHaveLength(0)
  })
})
