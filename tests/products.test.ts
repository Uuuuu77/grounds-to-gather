import { describe, expect, it } from 'vitest'
import { getProduct, products } from '@/lib/products'

describe('product catalog', () => {
  it('keeps both Gathinja roasts available', () => {
    expect(products).toHaveLength(2)
    expect(products.map((product) => product.roast)).toEqual(['Medium', 'Dark'])
  })

  it('resolves collection links to product pages', () => {
    expect(getProduct('gathinja-medium-roast')?.name).toBe('Gathinja Medium Roast')
    expect(getProduct('missing-roast')).toBeUndefined()
  })
})
