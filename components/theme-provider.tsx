'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void }
const ThemeContext = createContext<ThemeContextValue>({ theme: 'light', setTheme: () => undefined })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const stored = window.localStorage.getItem('gtg-theme') as Theme | null
    const nextTheme = stored === 'dark' || stored === 'light' ? stored : 'light'
    setThemeState(nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }, [])

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme)
    window.localStorage.setItem('gtg-theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
