import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacityProps,
} from 'react-native'
import { useApp } from '@/components/app/app-provider'

export type ButtonVariant = 'brand' | 'dark' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export function AppButton({
  children,
  variant = 'brand',
  size = 'md',
  block = false,
  style,
  textStyle,
  onClick,
  onPress,
  ...props
}: {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onClick?: () => void
  onPress?: () => void
} & TouchableOpacityProps) {
  const { theme } = useApp()

  const sizeHeights: Record<ButtonSize, number> = {
    sm: 38,
    md: 46,
    lg: 54,
  }

  const sizeFont: Record<ButtonSize, number> = {
    sm: 13,
    md: 15,
    lg: 16,
  }

  const getVariantStyles = (): { bg: string; text: string; border?: string } => {
    switch (variant) {
      case 'brand':
        return { bg: theme.brand, text: theme.brandForeground }
      case 'dark':
        return { bg: theme.primary, text: theme.primaryForeground }
      case 'secondary':
        return { bg: theme.secondary, text: theme.secondaryForeground }
      case 'outline':
        return { bg: 'transparent', text: theme.foreground, border: theme.border }
      case 'ghost':
        return { bg: 'transparent', text: theme.mutedForeground }
      default:
        return { bg: theme.brand, text: theme.brandForeground }
    }
  }

  const { bg, text, border } = getVariantStyles()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress || onClick}
      style={[
        {
          height: sizeHeights[size],
          borderRadius: size === 'lg' ? 20 : 16,
          backgroundColor: bg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          gap: 8,
          width: block ? '100%' : undefined,
          borderWidth: border ? 1 : 0,
          borderColor: border || 'transparent',
        },
        style,
      ]}
      {...props}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={[{ fontSize: sizeFont[size], fontWeight: '700', color: text }, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

export function IconButton({
  children,
  variant = 'secondary',
  style,
  onClick,
  onPress,
  ...props
}: {
  children: React.ReactNode
  variant?: 'secondary' | 'outline' | 'glass'
  style?: StyleProp<ViewStyle>
  onClick?: () => void
  onPress?: () => void
} & TouchableOpacityProps) {
  const { theme, dark } = useApp()

  const bg =
    variant === 'glass'
      ? dark
        ? 'rgba(255,255,255,0.12)'
        : 'rgba(0,0,0,0.05)'
      : variant === 'secondary'
        ? theme.secondary
        : 'transparent'
  const border = variant === 'outline' ? theme.border : undefined

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress || onClick}
      style={[
        {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: border ? 1 : 0,
          borderColor: border || 'transparent',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}
