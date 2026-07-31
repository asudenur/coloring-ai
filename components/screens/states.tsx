import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { AppButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'
import { ImageOff, WifiOff, HeartOff, TriangleAlert, RefreshCw, LifeBuoy } from 'lucide-react-native'

const EMPTY_TABS = [
  { id: 'history', label: 'No History', icon: ImageOff, title: 'No creations yet', body: 'Your generated coloring pages will show up here. Start by uploading a photo.', cta: 'Create your first page' },
  { id: 'internet', label: 'No Internet', icon: WifiOff, title: 'You are offline', body: 'Check your connection and try again. Your drafts are saved locally.', cta: 'Retry connection' },
  { id: 'favorites', label: 'No Favorites', icon: HeartOff, title: 'No favorites yet', body: 'Tap the heart on any coloring page to keep your best work here.', cta: 'Browse history' },
]

export function EmptyScreen() {
  const { go, goBack, theme } = useApp()
  const [tab, setTab] = useState('history')
  const current = EMPTY_TABS.find((t) => t.id === tab)!
  const Icon = current.icon

  return (
    <Screen header={<ScreenHeader title="Empty States" onBack={goBack} />}>
      <View style={{ gap: 24, paddingBottom: 32 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {EMPTY_TABS.map((t) => (
            <TouchableOpacity
              key={t.id}
              activeOpacity={0.8}
              onPress={() => setTab(t.id)}
              style={{
                height: 36,
                flex: 1,
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: tab === t.id ? theme.primary : theme.secondary,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: tab === t.id ? theme.primaryForeground : theme.mutedForeground,
                }}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            alignItems: 'center',
            borderRadius: 26,
            borderWidth: 1,
            borderColor: theme.border,
            borderStyle: 'dashed',
            backgroundColor: theme.secondary,
            paddingHorizontal: 32,
            paddingVertical: 56,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.card,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Icon size={36} color={theme.mutedForeground} strokeWidth={1.75} />
          </View>
          <Text style={{ marginTop: 24, fontSize: 20, fontWeight: '700', color: theme.foreground, letterSpacing: -0.3 }}>
            {current.title}
          </Text>
          <Text style={{ marginTop: 8, maxWidth: 260, fontSize: 14, lineHeight: 20, color: theme.mutedForeground, textAlign: 'center' }}>
            {current.body}
          </Text>
          <AppButton size="md" style={{ marginTop: 24 }} onClick={() => go('upload')}>
            {current.cta}
          </AppButton>
        </View>
      </View>
    </Screen>
  )
}

export function ErrorScreen() {
  const { go, goBack, theme } = useApp()

  return (
    <Screen header={<ScreenHeader title="Something went wrong" onBack={goBack} />} scroll={false}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TriangleAlert size={40} color={theme.destructive} strokeWidth={1.75} />
          </View>
          <Text style={{ marginTop: 24, fontSize: 24, fontWeight: '800', color: theme.foreground, letterSpacing: -0.4, textAlign: 'center' }}>
            Generation failed
          </Text>
          <Text style={{ marginTop: 8, maxWidth: 280, fontSize: 15, lineHeight: 22, color: theme.mutedForeground, textAlign: 'center' }}>
            We couldn&apos;t process your photo this time. No credits were charged. Please try again.
          </Text>
        </View>

        <View style={{ gap: 12, paddingBottom: 24 }}>
          <AppButton size="lg" block onClick={() => go('processing')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <RefreshCw size={20} color={theme.brandForeground} />
              <Text style={{ fontSize: 16, fontWeight: '700', color: theme.brandForeground }}>Retry</Text>
            </View>
          </AppButton>
          <AppButton variant="outline" size="lg" block onClick={() => go('settings')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <LifeBuoy size={20} color={theme.foreground} />
              <Text style={{ fontSize: 16, fontWeight: '700', color: theme.foreground }}>Contact Support</Text>
            </View>
          </AppButton>
        </View>
      </View>
    </Screen>
  )
}
