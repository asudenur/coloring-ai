import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Screen } from '@/components/app/screen'
import { IconButton, AppButton } from '@/components/kit/button'
import { Badge } from '@/components/kit/primitives'
import { useApp } from '@/components/app/app-provider'
import { Check, Crown, X, Infinity as InfinityIcon, Sparkles, Layers, Download } from 'lucide-react-native'

const PLANS = [
  { id: 'monthly', name: 'Monthly', price: '$9.99', per: '/month', note: 'Billed monthly' },
  { id: 'yearly', name: 'Yearly', price: '$49.99', per: '/year', note: 'Save 58% · $4.16/mo', best: true },
  { id: 'lifetime', name: 'Lifetime', price: '$99.99', per: 'once', note: 'Pay once, yours forever' },
]

const FEATURES = [
  { icon: InfinityIcon, label: 'Unlimited coloring pages' },
  { icon: Layers, label: 'All premium styles unlocked' },
  { icon: Download, label: 'High-resolution PNG & PDF' },
  { icon: Sparkles, label: 'Priority AI · no watermark' },
]

export function PremiumScreen() {
  const { go, theme } = useApp()
  const [plan, setPlan] = useState('yearly')

  return (
    <Screen
      bottomNav="premium"
      darkChrome
      padded={false}
      header={
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 4 }}>
          <IconButton variant="glass" aria-label="Close" onClick={() => go('home')} style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            <X size={20} color="#ffffff" />
          </IconButton>
          <TouchableOpacity onPress={() => go('home')}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.7)' }}>Restore</Text>
          </TouchableOpacity>
        </View>
      }
      style={{ backgroundColor: theme.primary }}
    >
      <View style={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 16 }}>
        {/* Hero */}
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              backgroundColor: theme.brand,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: theme.brand,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Crown size={32} color="#ffffff" />
          </View>
          <Text style={{ marginTop: 16, fontSize: 28, fontWeight: '800', color: '#ffffff', letterSpacing: -0.4 }}>
            Coloring AI Premium
          </Text>
          <Text style={{ marginTop: 6, fontSize: 14, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
            Unlock every style and create without limits.
          </Text>
        </View>

        {/* Features */}
        <View style={{ marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {FEATURES.map((f) => (
            <View
              key={f.label}
              style={{
                width: '48%',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                borderRadius: 16,
                backgroundColor: 'rgba(255,255,255,0.06)',
                padding: 12,
              }}
            >
              <f.icon size={20} color={theme.brand} />
              <Text style={{ flex: 1, fontSize: 12, fontWeight: '500', color: '#ffffff', lineHeight: 16 }}>{f.label}</Text>
            </View>
          ))}
        </View>

        {/* Plans */}
        <View style={{ marginTop: 24, gap: 12 }}>
          {PLANS.map((p) => {
            const active = plan === p.id
            return (
              <TouchableOpacity
                key={p.id}
                activeOpacity={0.85}
                onPress={() => setPlan(p.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  borderRadius: 20,
                  borderWidth: active ? 2 : 1,
                  borderColor: active ? theme.brand : 'rgba(255,255,255,0.15)',
                  backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                  padding: 16,
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: active ? theme.brand : 'rgba(255,255,255,0.3)',
                    backgroundColor: active ? theme.brand : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {active ? <Check size={14} color="#ffffff" strokeWidth={3} /> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#ffffff' }}>{p.name}</Text>
                    {p.best ? (
                      <Badge tone="brand" style={{ backgroundColor: theme.brand }}>
                        <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: '800' }}>BEST VALUE</Text>
                      </Badge>
                    ) : null}
                  </View>
                  <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{p.note}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#ffffff' }}>{p.price}</Text>
                  <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{p.per}</Text>
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
          backgroundColor: theme.primary,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.1)',
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}
      >
        <AppButton size="lg" block onClick={() => go('success')}>
          Continue · {PLANS.find((p) => p.id === plan)?.price}
        </AppButton>
        <Text style={{ marginTop: 8, textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
          Cancel anytime · Terms apply
        </Text>
      </View>
    </Screen>
  )
}
