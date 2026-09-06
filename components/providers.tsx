'use client'

import { CartProvider } from '@/components/cart'
import { ThemeProvider } from '@/components/theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider><CartProvider>{children}</CartProvider></ThemeProvider>
}
