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

  const backgroundColor = darkChrome ? theme.primary : theme.background

  return (
    <View style={[{ flex: 1, backgroundColor }, style]}>
      <StatusBar dark={darkChrome ?? dark} />
      {header}
      {scroll ? (
        <ScrollView
          style={{ flex: 1, backgroundColor }}
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
            { flex: 1, backgroundColor },
            padded && { paddingHorizontal: 20 },
            bottomNav && { paddingBottom: 8 },
          ]}
        >
          {children}
        </View>
      )}
      {bottomNav ? <BottomNav active={bottomNav} /> : null}
      <HomeIndicator dark={darkChrome ?? dark} />
    </View>
  )
}
