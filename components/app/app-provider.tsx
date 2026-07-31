import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { ScreenKey } from '@/lib/screens'
import { LIGHT_THEME, DARK_THEME, type Theme } from '@/lib/theme'
import { authenticateWithGoogle, authenticateWithApple } from '@/lib/auth'
import { ASSETS } from '@/lib/assets'

export type UserProfile = {
  id: string
  name: string
  email: string
  avatar?: any
  provider: 'apple' | 'google' | 'guest'
  isPremium: boolean
  planName: string
  credits: number
  creationsCount: number
  downloadsCount: number
}

type AppState = {
  screen: ScreenKey
  go: (screen: ScreenKey) => void
  dark: boolean
  toggleDark: () => void
  theme: Theme
  selectedStyle: string
  setSelectedStyle: (id: string) => void
  selectedPhoto: any
  setSelectedPhoto: (photo: any) => void
  user: UserProfile | null
  loginWithApple: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginAsGuest: () => void
  logout: () => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenKey>('splash')
  const [dark, setDark] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('general')
  const [selectedPhoto, setSelectedPhoto] = useState<any>(ASSETS.photos.portrait)
  const [user, setUser] = useState<UserProfile | null>(null)

  const theme = dark ? DARK_THEME : LIGHT_THEME

  const loginWithApple = async () => {
    const profile = await authenticateWithApple()
    if (profile) {
      setUser(profile)
      setScreen('home')
    }
  }

  const loginWithGoogle = async () => {
    const profile = await authenticateWithGoogle()
    if (profile) {
      setUser(profile)
      setScreen('home')
    }
  }

  const loginAsGuest = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const guestCode = Math.random().toString(36).substring(2, 6).toUpperCase()
    const newUser: UserProfile = {
      id: `guest_${guestCode}`,
      name: `Guest #${randomNum}`,
      email: `guest_${guestCode.toLowerCase()}@coloring.ai`,
      provider: 'guest',
      isPremium: false,
      planName: 'Guest Session',
      credits: 10,
      creationsCount: 0,
      downloadsCount: 0,
    }
    setUser(newUser)
    setScreen('home')
  }

  const logout = () => {
    setUser(null)
    setScreen('login')
  }

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
        selectedPhoto,
        setSelectedPhoto,
        user,
        loginWithApple,
        loginWithGoogle,
        loginAsGuest,
        logout,
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
