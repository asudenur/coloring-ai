import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { IconButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'

export function StatusBar({ dark }: { dark?: boolean }) {
  // Native status bar is handled by expo-status-bar in App.tsx and SafeAreaView
  return null
}

export function ScreenHeader({
  title,
  onBack,
  right,
  large,
  subtitle,
}: {
  title?: string
  onBack?: () => void
  right?: ReactNode
  large?: boolean
  subtitle?: string
}) {
  const { theme } = useApp()

  return (
    <View style={{ flexDirection: 'column', gap: 4, paddingHorizontal: 20, paddingBottom: 8, paddingTop: 12 }}>
      <View style={{ minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {onBack ? (
            <IconButton variant="secondary" aria-label="Back" onClick={onBack} style={{ width: 40, height: 40, borderRadius: 20 }}>
              <ChevronLeft size={20} color={theme.foreground} strokeWidth={2.5} />
            </IconButton>
          ) : null}
          {!large && title ? (
            <Text style={{ fontSize: 17, fontWeight: '700', color: theme.foreground, letterSpacing: -0.3 }}>{title}</Text>
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>{right}</View>
      </View>
      {large && title ? (
        <View style={{ paddingHorizontal: 4, paddingTop: 4 }}>
          <Text style={{ fontSize: 30, fontWeight: '800', color: theme.foreground, letterSpacing: -0.5, lineHeight: 34 }}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ marginTop: 6, fontSize: 14, color: theme.mutedForeground }}>{subtitle}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  )
}

export function HomeIndicator({ dark }: { dark?: boolean }) {
  // Native home indicator space is handled by safe area inset
  return null
}
