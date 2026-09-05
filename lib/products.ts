import type { Product } from '@/components/cart'

export const products: Product[] = [
  { id: 'gathinja-medium', name: 'Gathinja Medium Roast', slug: 'gathinja-medium-roast', origin: "Murang'a", roast: 'Medium', process: 'Washed', flavorProfile: ['Dark Chocolate', 'Burnt Caramel', 'Citrus'], description: "Sourced in Murang'a and roasted in Nairobi. A balanced, generous cup for slow mornings and shared tables.", weightG: 400, priceKsh: 1250, imageUrl: '/grounds-bags.jpg', stock: 50 },
  { id: 'gathinja-dark', name: 'Gathinja Dark Roast', slug: 'gathinja-dark-roast', origin: "Murang'a", roast: 'Dark', process: 'Washed', flavorProfile: ['Cocoa', 'Brown Sugar', 'Sweet Lemon Zest'], description: "A deeper Murang'a roast with a full body and a sweet finish, made for lingering conversations.", weightG: 400, priceKsh: 1250, imageUrl: '/grounds-bags.jpg', stock: 50 },
]

export const getProduct = (slug: string) => products.find((product) => product.slug === slug)
