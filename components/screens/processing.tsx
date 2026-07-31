import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { StatusBar, HomeIndicator } from '@/components/app/phone-chrome'
import { AppButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'
import { PROCESSING_MESSAGES } from '@/lib/data'
import { ASSETS } from '@/lib/assets'
import { Sparkles, X } from 'lucide-react-native'

export function ProcessingScreen() {
  const { go, theme, selectedPhoto } = useApp()
  const [progress, setProgress] = useState(6)
  const [msg, setMsg] = useState(0)

  const imageSource = selectedPhoto || ASSETS.photos.portrait

  useEffect(() => {
    const p = setInterval(() => {
      setProgress((v) => {
        if (v >= 100) {
          clearInterval(p)
          return 100
        }
        return Math.min(100, v + Math.random() * 9 + 3)
      })
    }, 550)
    const m = setInterval(() => setMsg((v) => (v + 1) % PROCESSING_MESSAGES.length), 1800)
    return () => {
      clearInterval(p)
      clearInterval(m)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => go('result'), 700)
      return () => clearTimeout(t)
    }
  }, [progress, go])

  const remaining = Math.max(0, Math.ceil((100 - progress) / 12))

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        {/* Animated preview container */}
        <View style={{ position: 'relative', width: 208, height: 208, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: 160,
              height: 160,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.14,
              shadowRadius: 24,
              elevation: 6,
            }}
          >
            <Image source={imageSource} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              width: 48,
              height: 48,
              borderRadius: 24,
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
            <Sparkles size={24} color="#ffffff" />
          </View>
        </View>

        <Text style={{ marginTop: 40, fontSize: 24, fontWeight: '800', color: theme.foreground, letterSpacing: -0.4 }}>
          Creating your artwork
        </Text>
        <Text style={{ marginTop: 8, fontSize: 15, color: theme.mutedForeground, textAlign: 'center', minHeight: 24 }}>
          {PROCESSING_MESSAGES[msg]}
        </Text>

        {/* Progress bar */}
        <View style={{ marginTop: 24, width: '100%', maxWidth: 280 }}>
          <View style={{ height: 8, width: '100%', borderRadius: 4, backgroundColor: theme.secondary, overflow: 'hidden' }}>
            <View
              style={{
                height: '100%',
                borderRadius: 4,
                backgroundColor: theme.brand,
                width: `${progress}%`,
              }}
            />
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: theme.brand }}>{Math.round(progress)}%</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: theme.mutedForeground }}>
              {remaining > 0 ? `~${remaining}s remaining` : 'Finishing…'}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
        <AppButton variant="ghost" size="md" block onClick={() => go('style')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <X size={16} color={theme.mutedForeground} />
            <Text style={{ fontSize: 15, fontWeight: '600', color: theme.mutedForeground }}>Cancel</Text>
          </View>
        </AppButton>
      </View>
      <HomeIndicator />
    </View>
  )
}
