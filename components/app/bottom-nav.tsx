import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Home, Images, Crown, User, Plus, LucideIcon } from 'lucide-react-native'
import { useApp } from '@/components/app/app-provider'
import type { ScreenKey } from '@/lib/screens'

const items: { key: ScreenKey; labelKey: string; icon: LucideIcon }[] = [
  { key: 'home', labelKey: 'nav.home', icon: Home },
  { key: 'history', labelKey: 'nav.history', icon: Images },
  { key: 'premium', labelKey: 'nav.premium', icon: Crown },
  { key: 'profile', labelKey: 'nav.profile', icon: User },
]

export function BottomNav({ active }: { active: ScreenKey }) {
  const { go, theme, t } = useApp()

  return (
    <View style={{ position: 'relative', paddingHorizontal: 16, paddingBottom: 4 }}>
      {/* Floating create button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => go('upload')}
        style={{
          position: 'absolute',
          top: -28,
          left: '50%',
          marginLeft: -32,
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.brand,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: theme.brand,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.35,
          shadowRadius: 12,
          elevation: 6,
          zIndex: 10,
        }}
      >
        <Plus size={28} color="#ffffff" strokeWidth={2.5} />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 26,
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.card,
          paddingHorizontal: 12,
          paddingVertical: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.06,
          shadowRadius: 16,
          elevation: 3,
        }}
      >
        {items.slice(0, 2).map((it) => (
          <NavItem key={it.key} label={t(it.labelKey)} icon={it.icon} active={active === it.key} onClick={() => go(it.key)} />
        ))}
        <View style={{ width: 64 }} />
        {items.slice(2).map((it) => (
          <NavItem key={it.key} label={t(it.labelKey)} icon={it.icon} active={active === it.key} onClick={() => go(it.key)} />
        ))}
      </View>
    </View>
  )
}

function NavItem({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string
  icon: LucideIcon
  active: boolean
  onClick: () => void
}) {
  const { theme } = useApp()
  const activeColor = theme.brand
  const inactiveColor = theme.mutedForeground

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 2 }}
    >
      <Icon size={24} color={active ? activeColor : inactiveColor} strokeWidth={active ? 2.5 : 2} />
      <Text
        style={{
          fontSize: 10,
          fontWeight: '600',
          color: active ? activeColor : inactiveColor,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
