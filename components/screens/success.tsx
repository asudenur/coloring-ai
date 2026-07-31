import React from 'react'
import { View, Text, Image } from 'react-native'
import { StatusBar, HomeIndicator } from '@/components/app/phone-chrome'
import { AppButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'
import { ASSETS } from '@/lib/assets'
import { cropPreviewSize } from '@/lib/crop'
import { Check, History, Home } from 'lucide-react-native'

export function SuccessScreen() {
  const { go, theme, selectedPhoto, cropRatio } = useApp()

  const imageSource = selectedPhoto || ASSETS.photos.portrait
  const preview = cropPreviewSize(cropRatio, 160)

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        {/* Success mark */}
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: theme.brand,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.brand,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <Check size={48} color="#ffffff" strokeWidth={3} />
        </View>

        <Text style={{ marginTop: 32, fontSize: 28, fontWeight: '800', color: theme.foreground, letterSpacing: -0.4, textAlign: 'center' }}>
          All done!
        </Text>
        <Text style={{ marginTop: 8, maxWidth: 260, fontSize: 15, lineHeight: 22, color: theme.mutedForeground, textAlign: 'center' }}>
          Your coloring page has been saved to your library and downloads.
        </Text>

        {/* Thumbnail */}
        <View
          style={{
            marginTop: 32,
            transform: [{ rotate: '-3deg' }],
            borderRadius: 24,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.paper,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.12,
            shadowRadius: 20,
            elevation: 6,
          }}
        >
          <Image
            source={imageSource}
            style={{ width: preview.width, height: preview.height, resizeMode: 'cover' }}
          />
        </View>
      </View>

      <View style={{ gap: 12, paddingHorizontal: 24, paddingBottom: 16 }}>
        <AppButton size="lg" block onClick={() => go('history')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <History size={20} color={theme.brandForeground} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.brandForeground }}>View in History</Text>
          </View>
        </AppButton>
        <AppButton variant="outline" size="lg" block onClick={() => go('home', { resetStack: true })}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Home size={20} color={theme.foreground} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.foreground }}>Back to Home</Text>
          </View>
        </AppButton>
      </View>
      <HomeIndicator />
    </View>
  )
}
