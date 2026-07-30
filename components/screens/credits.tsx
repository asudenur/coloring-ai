import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { AppButton } from '@/components/kit/button'
import { Card } from '@/components/kit/primitives'
import { useApp } from '@/components/app/app-provider'
import { Coins, Zap, Minus, Plus } from 'lucide-react-native'

const PACKS = [
  { credits: 50, price: '$4.99' },
  { credits: 150, price: '$11.99', popular: true },
  { credits: 500, price: '$29.99' },
]

const USAGE = [
  { label: 'Detailed portrait', when: 'Today · 9:24', amount: -2 },
  { label: 'Anime style', when: 'Today · 8:10', amount: -3 },
  { label: 'Weekly bonus', when: 'Yesterday', amount: +10 },
  { label: 'Comic conversion', when: 'Mar 12', amount: -2 },
]

export function CreditsScreen() {
  const { go, theme } = useApp()

  return (
    <Screen header={<ScreenHeader title="AI Credits" onBack={() => go('profile')} />}>
      <View style={{ gap: 24, paddingBottom: 40 }}>
        {/* Balance card */}
        <Card style={{ backgroundColor: theme.primary, padding: 24, alignItems: 'center' }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              backgroundColor: theme.brand,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Coins size={24} color="#ffffff" />
          </View>
          <Text style={{ marginTop: 12, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: theme.primaryForeground, opacity: 0.6 }}>
            Remaining credits
          </Text>
          <Text style={{ fontSize: 44, fontWeight: '800', color: theme.primaryForeground, marginTop: 4 }}>240</Text>
          <Text style={{ marginTop: 4, fontSize: 12, color: theme.primaryForeground, opacity: 0.6 }}>≈ 120 coloring pages</Text>
        </Card>

        {/* Buy */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: theme.foreground, paddingHorizontal: 4 }}>
            Buy credits
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {PACKS.map((p) => (
              <TouchableOpacity
                key={p.credits}
                activeOpacity={0.85}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  gap: 4,
                  borderRadius: 20,
                  borderWidth: p.popular ? 2 : 1,
                  borderColor: p.popular ? theme.brand : theme.border,
                  backgroundColor: theme.card,
                  padding: 16,
                  position: 'relative',
                }}
              >
                {p.popular ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: -10,
                      backgroundColor: theme.brand,
                      borderRadius: 999,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ fontSize: 9, fontWeight: '800', color: '#ffffff' }}>POPULAR</Text>
                  </View>
                ) : null}
                <Zap size={20} color={theme.brand} />
                <Text style={{ fontSize: 20, fontWeight: '800', color: theme.foreground }}>{p.credits}</Text>
                <Text style={{ fontSize: 12, fontWeight: '600', color: theme.mutedForeground }}>{p.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <AppButton size="lg" block onClick={() => go('success')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Plus size={20} color={theme.brandForeground} />
              <Text style={{ fontSize: 16, fontWeight: '700', color: theme.brandForeground }}>Buy 150 Credits</Text>
            </View>
          </AppButton>
        </View>

        {/* Usage history */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: theme.foreground, paddingHorizontal: 4 }}>
            Usage history
          </Text>
          <View
            style={{
              borderRadius: 22,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.card,
              overflow: 'hidden',
            }}
          >
            {USAGE.map((u, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderBottomWidth: i === USAGE.length - 1 ? 0 : 1,
                  borderBottomColor: theme.border,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: u.amount > 0 ? theme.brandSoft : theme.secondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {u.amount > 0 ? <Plus size={16} color={theme.brand} /> : <Minus size={16} color={theme.mutedForeground} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: theme.foreground }}>{u.label}</Text>
                  <Text style={{ fontSize: 12, color: theme.mutedForeground, marginTop: 2 }}>{u.when}</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '700', color: u.amount > 0 ? theme.brand : theme.foreground }}>
                  {u.amount > 0 ? `+${u.amount}` : u.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Screen>
  )
}
