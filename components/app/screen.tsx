import React, { ReactNode } from 'react'
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native'
import { StatusBar, HomeIndicator } from '@/components/app/phone-chrome'
import { BottomNav } from '@/components/app/bottom-nav'
import type { ScreenKey } from '@/lib/screens'
import { useApp } from '@/components/app/app-provider'

export function Screen({
  children,
  header,
  bottomNav,
  darkChrome,
  style,
  padded = true,
  scroll = true,
}: {
  children: ReactNode
  header?: ReactNode
  bottomNav?: ScreenKey
  darkChrome?: boolean
  style?: StyleProp<ViewStyle>
  padded?: boolean
  scroll?: boolean
}) {
  const { theme, dark } = useApp()

  const isDarkChrome = darkChrome ?? dark

  return (
    <View style={[{ flex: 1, backgroundColor: isDarkChrome ? theme.primary : theme.background }, style]}>
      <StatusBar dark={isDarkChrome} />
      {header}
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            padded && { paddingHorizontal: 20 },
            bottomNav && { paddingBottom: 8 },
            { flexGrow: 1 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            { flex: 1 },
            padded && { paddingHorizontal: 20 },
            bottomNav && { paddingBottom: 8 },
          ]}
        >
          {children}
        </View>
      )}
      {bottomNav ? <BottomNav active={bottomNav} /> : null}
      <HomeIndicator dark={isDarkChrome} />
    </View>
  )
}
