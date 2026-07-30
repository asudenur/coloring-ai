import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { AppButton } from '@/components/kit/button'
import { Badge } from '@/components/kit/primitives'
import { useApp } from '@/components/app/app-provider'
import { STYLES } from '@/lib/data'
import { Check, Crown } from 'lucide-react-native'

export function StyleScreen() {
  const { go, selectedStyle, setSelectedStyle, theme } = useApp()

  return (
    <Screen header={<ScreenHeader title="Choose a Style" onBack={() => go('crop')} />}>
      <View style={{ gap: 16, paddingBottom: 100 }}>
        <Text style={{ fontSize: 14, color: theme.mutedForeground, paddingHorizontal: 4 }}>
          Pick how your coloring page should look. You can regenerate anytime.
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {STYLES.map((s) => {
            const active = selectedStyle === s.id
            return (
              <TouchableOpacity
                key={s.id}
                activeOpacity={0.85}
                onPress={() => setSelectedStyle(s.id)}
                style={{
                  width: '48%',
                  borderRadius: 22,
                  borderWidth: active ? 2 : 1,
                  borderColor: active ? theme.brand : theme.border,
                  backgroundColor: theme.card,
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <View style={{ position: 'relative', width: '100%', aspectRatio: 1 }}>
                  <Image source={s.image} style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', resizeMode: 'cover' }} />
                  {s.pro ? (
                    <View style={{ position: 'absolute', left: 8, top: 8 }}>
                      <Badge tone="dark" style={{ backgroundColor: theme.primary }}>
                        <Crown size={12} color={theme.primaryForeground} />
                        <Text style={{ fontSize: 11, fontWeight: '700', color: theme.primaryForeground, marginLeft: 2 }}>PRO</Text>
                      </Badge>
                    </View>
                  ) : null}
                  {active ? (
                    <View
                      style={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: theme.brand,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={16} color="#ffffff" strokeWidth={3} />
                    </View>
                  ) : null}
                </View>
                <View style={{ padding: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: theme.foreground }}>{s.name}</Text>
                  <Text style={{ fontSize: 12, color: theme.mutedForeground, marginTop: 2, lineHeight: 16 }}>
                    {s.description}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.card,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}
      >
        <AppButton size="lg" block onClick={() => go('processing')}>
          Generate Coloring Page
        </AppButton>
      </View>
    </Screen>
  )
}
