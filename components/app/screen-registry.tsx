import React from 'react'
import { View } from 'react-native'
import { useApp } from '@/components/app/app-provider'
import type { ScreenKey } from '@/lib/screens'

import { SplashScreen } from '@/components/screens/splash'
import { OnboardingScreen } from '@/components/screens/onboarding'
import { LoginScreen } from '@/components/screens/login'
import { HomeScreen } from '@/components/screens/home'
import { UploadScreen } from '@/components/screens/upload'
import { CropScreen } from '@/components/screens/crop'
import { StyleScreen } from '@/components/screens/style'
import { ProcessingScreen } from '@/components/screens/processing'
import { ResultScreen } from '@/components/screens/result'
import { HistoryScreen } from '@/components/screens/history'
import { PremiumScreen } from '@/components/screens/premium'
import { ProfileScreen } from '@/components/screens/profile'
import { SettingsScreen } from '@/components/screens/settings'
import { CreditsScreen } from '@/components/screens/credits'
import { SuccessScreen } from '@/components/screens/success'
import { EmptyScreen, ErrorScreen } from '@/components/screens/states'

const registry: Record<ScreenKey, React.ComponentType> = {
  splash: SplashScreen,
  onboarding: OnboardingScreen,
  login: LoginScreen,
  home: HomeScreen,
  upload: UploadScreen,
  crop: CropScreen,
  style: StyleScreen,
  processing: ProcessingScreen,
  result: ResultScreen,
  history: HistoryScreen,
  premium: PremiumScreen,
  profile: ProfileScreen,
  settings: SettingsScreen,
  credits: CreditsScreen,
  success: SuccessScreen,
  empty: EmptyScreen,
  error: ErrorScreen,
}

export function ScreenRegistry() {
  const { screen } = useApp()
  const ActiveComponent = registry[screen] || HomeScreen

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <ActiveComponent />
    </View>
  )
}
