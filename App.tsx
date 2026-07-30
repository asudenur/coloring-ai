import React from 'react'
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppProvider, useApp } from '@/components/app/app-provider'
import { ScreenRegistry } from '@/components/app/screen-registry'
import { Navigator } from '@/components/app/navigator'
import { PhoneFrame } from '@/components/app/phone-frame'

function MainApp() {
  const { theme } = useApp()

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webContainer, { backgroundColor: '#0b0b0f' }]}>
        <View style={styles.webContent}>
          <Navigator />
          <View style={styles.webPhoneWrapper}>
            <PhoneFrame>
              <ScreenRegistry />
            </PhoneFrame>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.nativeContainer, { backgroundColor: theme.background }]}>
      <ScreenRegistry />
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  nativeContainer: {
    flex: 1,
  },
  webContainer: {
    flex: 1,
    width: '100%',
    minHeight: '100vh' as any,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  webContent: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 1150,
    gap: 40,
    justifyContent: 'center',
  },
  webPhoneWrapper: {
    flex: 1,
    alignItems: 'center',
  },
})
