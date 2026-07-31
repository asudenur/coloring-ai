import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { AppButton, IconButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'
import { ASSETS } from '@/lib/assets'
import { RotateCw, ScanFace } from 'lucide-react-native'

const RATIOS = ['1:1', '4:5', '3:4', '9:16']

export function CropScreen() {
  const { go, goBack, theme, selectedPhoto } = useApp()
  const [ratio, setRatio] = useState('1:1')
  const [zoom, setZoom] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [face, setFace] = useState(true)

  const imageSource = selectedPhoto || ASSETS.photos.portrait

  return (
    <Screen
      header={<ScreenHeader title="Crop & Adjust" onBack={goBack} />}
      padded={false}
      scroll={false}
    >
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Canvas area */}
        <View
          style={{
            marginHorizontal: 20,
            flex: 1,
            borderRadius: 24,
            backgroundColor: theme.secondary,
            overflow: 'hidden',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={imageSource}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              transform: [{ scale: zoom }, { rotate: `${rotate}deg` }],
            }}
          />
          {/* Grid overlay */}
          <View
            style={{
              position: 'absolute',
              inset: 24,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.7)',
              pointerEvents: 'none',
            }}
          />
          {face ? (
            <View
              style={{
                position: 'absolute',
                top: '38%',
                left: '50%',
                marginLeft: -64,
                marginTop: -64,
                width: 128,
                height: 128,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: theme.brand,
                pointerEvents: 'none',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -28,
                  backgroundColor: theme.brand,
                  borderRadius: 999,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffff' }}>Subject detected</Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* Controls */}
        <View style={{ gap: 16, padding: 20 }}>
          {/* Ratios & rotate */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {RATIOS.map((r) => (
              <TouchableOpacity
                key={r}
                activeOpacity={0.8}
                onPress={() => setRatio(r)}
                style={{
                  height: 38,
                  flex: 1,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: ratio === r ? theme.primary : theme.secondary,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: ratio === r ? theme.primaryForeground : theme.mutedForeground,
                  }}
                >
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
            <IconButton
              aria-label="Rotate"
              onClick={() => setRotate((d) => (d + 90) % 360)}
              style={{ width: 38, height: 38, borderRadius: 12 }}
            >
              <RotateCw size={18} color={theme.foreground} />
            </IconButton>
          </View>

          {/* Auto detect face toggle */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setFace((f) => !f)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.card,
              padding: 14,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: theme.brandSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ScanFace size={20} color={theme.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: theme.foreground }}>Auto detect subject</Text>
              <Text style={{ fontSize: 12, color: theme.mutedForeground, marginTop: 2 }}>
                Center crop on the main subject
              </Text>
            </View>
            <Toggle on={face} />
          </TouchableOpacity>

          <AppButton size="lg" block onClick={() => go('style')}>
            Continue
          </AppButton>
        </View>
      </View>
    </Screen>
  )
}

function Toggle({ on }: { on: boolean }) {
  const { theme } = useApp()
  return (
    <View
      style={{
        width: 48,
        height: 28,
        borderRadius: 14,
        backgroundColor: on ? theme.brand : theme.border,
        padding: 2,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: '#ffffff',
          transform: [{ translateX: on ? 20 : 0 }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 2,
        }}
      />
    </View>
  )
}
