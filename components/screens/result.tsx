import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { AppButton, IconButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'
import { ASSETS } from '@/lib/assets'
import { Heart, Share2, Maximize2, RefreshCw, FileImage, FileText, GripVertical } from 'lucide-react-native'

export function ResultScreen() {
  const { go, theme, selectedPhoto } = useApp()
  const [pos, setPos] = useState(55)
  const [fav, setFav] = useState(false)

  const imageSource = selectedPhoto || ASSETS.photos.portrait

  return (
    <Screen
      header={
        <ScreenHeader
          title="Your Coloring Page"
          onBack={() => go('style')}
          right={
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <IconButton aria-label="Favorite" onClick={() => setFav((f) => !f)}>
                <Heart size={20} color={theme.brand} fill={fav ? theme.brand : 'transparent'} strokeWidth={2} />
              </IconButton>
              <IconButton aria-label="Fullscreen" onClick={() => go('success')}>
                <Maximize2 size={20} color={theme.foreground} strokeWidth={2} />
              </IconButton>
            </View>
          }
        />
      }
    >
      <View style={{ gap: 20, paddingBottom: 32 }}>
        {/* Before / After comparison */}
        <View
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: 1,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 16,
            elevation: 4,
          }}
        >
          <Image source={ASSETS.results.portraitLine} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${pos}%`, overflow: 'hidden' }}>
            <Image source={imageSource} style={{ width: 350, height: '100%', resizeMode: 'cover' }} />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${pos}%`,
              width: 2,
              backgroundColor: '#ffffff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: -18,
                marginTop: -18,
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.14,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <GripVertical size={16} color={theme.foreground} />
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              left: 12,
              top: 12,
              borderRadius: 999,
              backgroundColor: 'rgba(0,0,0,0.6)',
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#ffffff' }}>Before</Text>
          </View>

          <View
            style={{
              position: 'absolute',
              right: 12,
              top: 12,
              borderRadius: 999,
              backgroundColor: theme.brand,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#ffffff' }}>After</Text>
          </View>
        </View>

        {/* Download row */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <AppButton variant="secondary" size="md" style={{ flex: 1 }} onClick={() => go('success')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <FileImage size={20} color={theme.secondaryForeground} />
              <Text style={{ fontSize: 15, fontWeight: '700', color: theme.secondaryForeground }}>PNG</Text>
            </View>
          </AppButton>
          <AppButton variant="secondary" size="md" style={{ flex: 1 }} onClick={() => go('success')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <FileText size={20} color={theme.secondaryForeground} />
              <Text style={{ fontSize: 15, fontWeight: '700', color: theme.secondaryForeground }}>PDF</Text>
            </View>
          </AppButton>
        </View>

        <AppButton size="lg" block onClick={() => go('success')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Share2 size={20} color={theme.brandForeground} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.brandForeground }}>Share</Text>
          </View>
        </AppButton>

        <AppButton variant="outline" size="lg" block onClick={() => go('processing')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <RefreshCw size={20} color={theme.foreground} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.foreground }}>Generate Again</Text>
          </View>
        </AppButton>
      </View>
    </Screen>
  )
}
