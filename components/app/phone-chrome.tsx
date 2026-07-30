import React, { ReactNode } from 'react'
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import { Signal, Wifi, BatteryFull, ChevronLeft } from 'lucide-react-native'
import { IconButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'

export function StatusBar({ dark }: { dark?: boolean }) {
  const { theme } = useApp()
  const textColor = dark ? '#ffffff' : theme.foreground

  return (
    <View
      style={{
        zIndex: 30,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 4,
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: '600', color: textColor, letterSpacing: -0.2 }}>9:41</Text>
      <View
        style={{
          position: 'absolute',
          left: '50%',
          top: 8,
          height: 24,
          width: 96,
          marginLeft: -48,
          borderRadius: 999,
          backgroundColor: '#000000',
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Signal size={16} color={textColor} strokeWidth={2.5} />
        <Wifi size={16} color={textColor} strokeWidth={2.5} />
        <BatteryFull size={20} color={textColor} strokeWidth={2} />
      </View>
    </View>
  )
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
    <View style={{ flexDirection: 'column', gap: 4, paddingHorizontal: 20, paddingBottom: 8, paddingTop: 4 }}>
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
  return (
    <View style={{ height: 24, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          height: 5,
          width: 128,
          borderRadius: 999,
          backgroundColor: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
        }}
      />
    </View>
  )
}
