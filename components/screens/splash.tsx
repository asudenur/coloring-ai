import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StatusBar, HomeIndicator } from '@/components/app/phone-chrome'
import { Sparkles } from 'lucide-react-native'
import { useApp } from '@/components/app/app-provider'

export function SplashScreen() {
  const { go, theme } = useApp()

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => go('onboarding')}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}
      >
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              backgroundColor: theme.brand,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: theme.brand,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Sparkles size={44} color="#ffffff" strokeWidth={2} />
          </View>
          <Text
            style={{
              marginTop: 28,
              fontSize: 34,
              fontWeight: '800',
              color: theme.foreground,
              letterSpacing: -0.5,
            }}
          >
            Coloring AI
          </Text>
          <Text style={{ marginTop: 6, fontSize: 15, color: theme.mutedForeground }}>
            Photos into art you can color
          </Text>
        </View>

        <View style={{ position: 'absolute', bottom: 96, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.brand }} />
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.brand, opacity: 0.6 }} />
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.brand, opacity: 0.3 }} />
        </View>

        <TouchableOpacity
          onPress={() => go('onboarding')}
          style={{ position: 'absolute', bottom: 48 }}
        >
          <Text style={{ fontSize: 13, fontWeight: '500', color: theme.mutedForeground, textDecorationLine: 'underline' }}>
            Tap to continue
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <HomeIndicator />
    </View>
  )
}
