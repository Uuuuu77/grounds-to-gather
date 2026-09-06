import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/products'
import { ProductClient } from './product-client'

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()
  return <ProductClient product={product} />
}
