import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { StatusBar, HomeIndicator } from '@/components/app/phone-chrome'
import { AppButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'
import { ASSETS } from '@/lib/assets'
import { Wand2, Palette, Share2 } from 'lucide-react-native'

export function OnboardingScreen() {
  const { go, theme, t } = useApp()
  const [page, setPage] = useState(0)

  const PAGES = [
    {
      icon: Wand2,
      title: t('onboarding.page1Title'),
      body: t('onboarding.page1Body'),
      visual: 'transform',
    },
    {
      icon: Palette,
      title: t('onboarding.page2Title'),
      body: t('onboarding.page2Body'),
      visual: 'styles',
    },
    {
      icon: Share2,
      title: t('onboarding.page3Title'),
      body: t('onboarding.page3Body'),
      visual: 'share',
    },
  ]

  const current = PAGES[page]
  const last = page === PAGES.length - 1

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar />
      <View style={{ alignItems: 'flex-end', paddingHorizontal: 20, paddingVertical: 4 }}>
        <TouchableOpacity onPress={() => go('login')}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: theme.mutedForeground }}>{t('common.skip')}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 16 }}>
          <OnboardVisual kind={current.visual} />
        </View>

        <View style={{ paddingBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            {PAGES.map((_, i) => (
              <View
                key={i}
                style={{
                  height: 6,
                  borderRadius: 3,
                  width: i === page ? 28 : 6,
                  backgroundColor: i === page ? theme.brand : theme.border,
                }}
              />
            ))}
          </View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: theme.foreground,
              letterSpacing: -0.4,
              lineHeight: 32,
            }}
          >
            {current.title}
          </Text>
          <Text style={{ marginTop: 12, fontSize: 15, lineHeight: 22, color: theme.mutedForeground }}>
            {current.body}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 16, paddingTop: 16 }}>
        <AppButton
          size="lg"
          block
          onClick={() => (last ? go('login') : setPage((p) => p + 1))}
        >
          {last ? t('common.getStarted') : t('common.continue')}
        </AppButton>
      </View>
      <HomeIndicator />
    </View>
  )
}

function OnboardVisual({ kind }: { kind: string }) {
  const { theme, t } = useApp()

  if (kind === 'transform') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Framed src={ASSETS.photos.portrait} label={t('onboarding.photo')} />
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.brand,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.brand,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Wand2 size={20} color="#ffffff" />
        </View>
        <Framed src={ASSETS.results.portraitLine} label={t('onboarding.coloringPage')} />
      </View>
    )
  }

  if (kind === 'styles') {
    const imgs = [ASSETS.styles.anime, ASSETS.styles.comic, ASSETS.styles.minimal, ASSETS.styles.kids]
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', gap: 12, justifyContent: 'center' }}>
        {imgs.map((src, i) => (
          <View
            key={i}
            style={{
              width: '45%',
              aspectRatio: 1,
              borderRadius: 22,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.paper,
              overflow: 'hidden',
            }}
          >
            <Image source={src} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
          </View>
        ))}
      </View>
    )
  }

  return (
    <View style={{ position: 'relative', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          transform: [{ rotate: '-6deg' }],
          borderRadius: 26,
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.paper,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 24,
          elevation: 6,
        }}
      >
        <Image source={ASSETS.results.flowersLine} style={{ width: 220, height: 220, resizeMode: 'cover' }} />
      </View>
      <View
        style={{
          position: 'absolute',
          right: 20,
          top: -10,
          transform: [{ rotate: '6deg' }],
          borderRadius: 16,
          backgroundColor: theme.brand,
          paddingHorizontal: 16,
          paddingVertical: 8,
          shadowColor: theme.brand,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#ffffff' }}>PDF · PNG</Text>
      </View>
    </View>
  )
}

function Framed({ src, label }: { src: any; label: string }) {
  const { theme } = useApp()
  return (
    <View style={{ alignItems: 'center', gap: 8 }}>
      <View
        style={{
          borderRadius: 22,
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.paper,
          overflow: 'hidden',
        }}
      >
        <Image source={src} style={{ width: 120, height: 120, resizeMode: 'cover' }} />
      </View>
      <Text style={{ fontSize: 12, fontWeight: '600', color: theme.mutedForeground }}>{label}</Text>
    </View>
  )
}
