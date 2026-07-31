import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { ScreenKey } from '@/lib/screens'
import { LIGHT_THEME, DARK_THEME, type Theme } from '@/lib/theme'
import { authenticateWithGoogle, authenticateWithApple } from '@/lib/auth'
import { ASSETS } from '@/lib/assets'
import type { Creation } from '@/lib/data'
import type { CropRatio } from '@/lib/crop'
import { type Locale, translate, getDeviceLocale } from '@/lib/i18n'

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
  go: (targetScreen: ScreenKey, options?: { resetStack?: boolean }) => void
  goBack: () => void
  dark: boolean
  toggleDark: () => void
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
  theme: Theme
  selectedStyle: string
  setSelectedStyle: (id: string) => void
  selectedPhoto: any
  setSelectedPhoto: (photo: any) => void
  cropRatio: CropRatio
  setCropRatio: (ratio: CropRatio) => void
  user: UserProfile | null
  creations: Creation[]
  addCreation: (item: Creation) => void
  toggleFavorite: (id: string) => void
  loginWithApple: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginAsGuest: () => void
  logout: () => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [historyStack, setHistoryStack] = useState<ScreenKey[]>(['splash'])
  const [dark, setDark] = useState(false)
  const [locale, setLocale] = useState<Locale>(getDeviceLocale)
  const [selectedStyle, setSelectedStyle] = useState('general')
  const [selectedPhoto, setSelectedPhoto] = useState<any>(ASSETS.photos.portrait)
  const [cropRatio, setCropRatio] = useState<CropRatio>('1:1')
  const [user, setUser] = useState<UserProfile | null>(null)
  const [creations, setCreations] = useState<Creation[]>([])

  const screen = historyStack[historyStack.length - 1] || 'home'
  const theme = dark ? DARK_THEME : LIGHT_THEME

  const go = (targetScreen: ScreenKey, options?: { resetStack?: boolean }) => {
    if (options?.resetStack) {
      setHistoryStack([targetScreen])
    } else {
      setHistoryStack((prev) => {
        if (prev[prev.length - 1] === targetScreen) return prev
        return [...prev, targetScreen]
      })
    }
  }

  const goBack = () => {
    setHistoryStack((prev) => {
      if (prev.length <= 1) return ['home']
      const newStack = prev.slice(0, -1)
      // Skip loading/processing screen when going back
      if (newStack[newStack.length - 1] === 'processing') {
        return newStack.length > 1 ? newStack.slice(0, -1) : ['home']
      }
      return newStack
    })
  }

  const addCreation = (item: Creation) => {
    setCreations((prev) => [item, ...prev])
    setUser((u) => {
      if (!u) return null
      return {
        ...u,
        creationsCount: u.creationsCount + 1,
        credits: Math.max(0, u.credits - 2),
      }
    })
  }

  const toggleFavorite = (id: string) => {
    setCreations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    )
  }

  const loginWithApple = async () => {
    const profile = await authenticateWithApple()
    if (profile) {
      setUser(profile)
      go('home', { resetStack: true })
    }
  }

  const loginWithGoogle = async () => {
    const profile = await authenticateWithGoogle()
    if (profile) {
      setUser(profile)
      go('home', { resetStack: true })
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
    go('home', { resetStack: true })
  }

  const logout = () => {
    setUser(null)
    setCreations([])
    go('login', { resetStack: true })
  }

  return (
    <AppContext.Provider
      value={{
        screen,
        go,
        goBack,
        dark,
        toggleDark: () => setDark((d) => !d),
        locale,
        setLocale,
        t: (key, params) => translate(locale, key, params),
        theme,
        selectedStyle,
        setSelectedStyle,
        selectedPhoto,
        setSelectedPhoto,
        cropRatio,
        setCropRatio,
        user,
        creations,
        addCreation,
        toggleFavorite,
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
