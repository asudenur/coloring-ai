import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ViewProps,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { useApp } from '@/components/app/app-provider'

export function Card({ style, children, ...props }: ViewProps) {
  const { theme } = useApp()
  return (
    <View
      style={[
        {
          borderRadius: 22,
          backgroundColor: theme.card,
          borderColor: theme.border,
          borderWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 12,
          elevation: 2,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

export function Input({ style, ...props }: TextInputProps) {
  const { theme } = useApp()
  return (
    <TextInput
      style={[
        {
          height: 52,
          width: '100%',
          borderRadius: 16,
          backgroundColor: theme.input,
          paddingHorizontal: 16,
          fontSize: 15,
          color: theme.foreground,
        },
        style,
      ]}
      placeholderTextColor={theme.mutedForeground}
      {...props}
    />
  )
}

export function Badge({
  children,
  style,
  tone = 'brand',
}: {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  tone?: 'brand' | 'neutral' | 'dark'
}) {
  const { theme } = useApp()

  const bgColors = {
    brand: theme.brandSoft,
    neutral: theme.secondary,
    dark: theme.primary,
  }

  const textColors = {
    brand: theme.brand,
    neutral: theme.mutedForeground,
    dark: theme.primaryForeground,
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          borderRadius: 999,
          paddingHorizontal: 10,
          paddingVertical: 4,
          backgroundColor: bgColors[tone],
        },
        style,
      ]}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={{ fontSize: 11, fontWeight: '600', color: textColors[tone] }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}

export function Skeleton({ style }: { style?: StyleProp<ViewStyle> }) {
  const { theme } = useApp()
  return (
    <View
      style={[
        {
          borderRadius: 14,
          backgroundColor: theme.muted,
          opacity: 0.7,
        },
        style,
      ]}
    />
  )
}

export function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) {
  const { theme } = useApp()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
      }}
    >
      <Text style={{ fontSize: 19, fontWeight: '700', color: theme.foreground, letterSpacing: -0.3 }}>
        {title}
      </Text>
      {action ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onAction}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: theme.brand }}>
            {action}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
