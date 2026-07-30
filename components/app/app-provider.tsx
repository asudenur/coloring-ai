import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { ScreenKey } from '@/lib/screens'
import { LIGHT_THEME, DARK_THEME, type Theme } from '@/lib/theme'

type AppState = {
  screen: ScreenKey
  go: (screen: ScreenKey) => void
  dark: boolean
  toggleDark: () => void
  theme: Theme
  selectedStyle: string
  setSelectedStyle: (id: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenKey>('splash')
  const [dark, setDark] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('general')

  const theme = dark ? DARK_THEME : LIGHT_THEME

  return (
    <AppContext.Provider
      value={{
        screen,
        go: setScreen,
        dark,
        toggleDark: () => setDark((d) => !d),
        theme,
        selectedStyle,
        setSelectedStyle,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
