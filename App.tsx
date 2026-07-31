import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { AppProvider, useApp } from '@/components/app/app-provider'
import { ScreenRegistry } from '@/components/app/screen-registry'

function MainApp() {
  const { theme, dark } = useApp()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <View style={styles.content}>
        <ScreenRegistry />
      </View>
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
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
})
