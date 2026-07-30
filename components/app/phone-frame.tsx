import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { useApp } from '@/components/app/app-provider'

export function PhoneFrame({ children }: { children: ReactNode }) {
  const { theme } = useApp()

  return (
    <View style={styles.outer}>
      <View style={styles.frame}>
        <View style={[styles.inner, { backgroundColor: theme.background }]}>
          {children}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    position: 'relative',
  },
  frame: {
    width: 390,
    height: 844,
    borderRadius: 54,
    backgroundColor: '#000000',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 20,
  },
  inner: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 42,
    overflow: 'hidden',
  },
})
