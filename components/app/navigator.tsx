import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SCREENS, type ScreenMeta } from '@/lib/screens'
import { useApp } from '@/components/app/app-provider'
import { Moon, Sun, Sparkles } from 'lucide-react-native'

const groups: ScreenMeta['group'][] = ['Flow', 'Main', 'Account', 'States']

export function Navigator() {
  const { screen, go, dark, toggleDark, theme } = useApp()

  return (
    <View style={{ width: 256, flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            backgroundColor: theme.brand,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.brand,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <Sparkles size={20} color="#ffffff" strokeWidth={2.5} />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#ffffff', letterSpacing: -0.2 }}>Coloring AI</Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Design System</Text>
        </View>
      </View>

      {/* Dark mode toggle */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleDark}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.1)',
          backgroundColor: 'rgba(255,255,255,0.05)',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#ffffff' }}>
          {dark ? 'Dark mode' : 'Light mode'}
        </Text>
        {dark ? <Moon size={16} color="#ffffff" /> : <Sun size={16} color="#ffffff" />}
      </TouchableOpacity>

      {/* Screen selector list */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        {groups.map((group) => (
          <View key={group} style={{ gap: 6 }}>
            <Text style={{ paddingHorizontal: 8, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(255,255,255,0.4)' }}>
              {group}
            </Text>
            {SCREENS.filter((s) => s.group === group).map((s) => {
              const active = screen === s.key
              return (
                <TouchableOpacity
                  key={s.key}
                  activeOpacity={0.8}
                  onPress={() => go(s.key)}
                  style={{
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    backgroundColor: active ? '#ffffff' : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: active ? '#000000' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {s.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
