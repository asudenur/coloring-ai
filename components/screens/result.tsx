import React, { useState, useMemo } from 'react'
import { View, Text, Image, PanResponder, Alert } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { AppButton, IconButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'
import { ASSETS } from '@/lib/assets'
import { cropRatioToNumber } from '@/lib/crop'
import { Heart, Share2, Maximize2, RefreshCw, FileImage, FileText, GripVertical, CheckCircle2, Bookmark } from 'lucide-react-native'

export function ResultScreen() {
  const { go, goBack, theme, selectedPhoto, cropRatio } = useApp()
  const [pos, setPos] = useState(50)
  const [fav, setFav] = useState(false)
  const [fullScreenMode, setFullScreenMode] = useState(false)
  const [containerWidth, setContainerWidth] = useState(340)

  const imageSource = selectedPhoto || ASSETS.photos.portrait
  const aspectRatio = cropRatioToNumber(cropRatio)

  const updatePositionFromTouch = (evt: any) => {
    const touchX = evt.nativeEvent.locationX
    if (containerWidth > 0 && typeof touchX === 'number') {
      const newPercentage = Math.min(100, Math.max(0, (touchX / containerWidth) * 100))
      setPos(newPercentage)
    }
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => updatePositionFromTouch(evt),
        onPanResponderMove: (evt) => updatePositionFromTouch(evt),
      }),
    [containerWidth]
  )

  const handleDownloadPNG = () => {
    Alert.alert('Saved!', 'PNG coloring page saved to your device photo gallery.')
  }

  const handleDownloadPDF = () => {
    Alert.alert('Exported!', 'High-res PDF vector line art exported to downloads.')
  }

  return (
    <Screen
      header={
        <ScreenHeader
          title="Your Coloring Page"
          onBack={goBack}
          right={
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <IconButton aria-label="Favorite" onClick={() => setFav((f) => !f)}>
                <Heart size={20} color={theme.brand} fill={fav ? theme.brand : 'transparent'} strokeWidth={2} />
              </IconButton>
              <IconButton aria-label="Toggle Zoom" onClick={() => setFullScreenMode((v) => !v)}>
                <Maximize2 size={20} color={theme.foreground} strokeWidth={2} />
              </IconButton>
            </View>
          }
        />
      }
    >
      <View style={{ gap: 20, paddingBottom: 32 }}>
        {/* Interactive Before / After comparison slider */}
        <View
          {...panResponder.panHandlers}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio,
            ...(fullScreenMode ? { minHeight: aspectRatio < 1 ? 520 : 360 } : {}),
            borderRadius: 24,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.paper,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 16,
            elevation: 4,
          }}
        >
          {/* After Image (Background) */}
          <Image
            source={ASSETS.results.portraitLine}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />

          {/* Before Image (Overlay clipped by pos %) */}
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${pos}%`, overflow: 'hidden' }}>
            <Image
              source={imageSource}
              style={{ width: containerWidth, height: '100%', resizeMode: 'cover' }}
            />
          </View>

          {/* Vertical Divider handle line */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${pos}%`,
              width: 2,
              marginLeft: -1,
              backgroundColor: theme.paper,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            {/* Grab handle circle icon */}
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
                backgroundColor: theme.paper,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 6,
              }}
            >
              <GripVertical size={18} color={theme.foreground} />
            </View>
          </View>

          {/* Badges */}
          <View
            style={{
              position: 'absolute',
              left: 12,
              top: 12,
              borderRadius: 999,
              backgroundColor: theme.overlay,
              paddingHorizontal: 10,
              paddingVertical: 4,
              pointerEvents: 'none',
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
              pointerEvents: 'none',
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#ffffff' }}>After</Text>
          </View>
        </View>

        {/* Download row */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <AppButton variant="secondary" size="md" style={{ flex: 1 }} onClick={handleDownloadPNG}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <FileImage size={20} color={theme.secondaryForeground} />
              <Text style={{ fontSize: 15, fontWeight: '700', color: theme.secondaryForeground }}>PNG</Text>
            </View>
          </AppButton>
          <AppButton variant="secondary" size="md" style={{ flex: 1 }} onClick={handleDownloadPDF}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <FileText size={20} color={theme.secondaryForeground} />
              <Text style={{ fontSize: 15, fontWeight: '700', color: theme.secondaryForeground }}>PDF</Text>
            </View>
          </AppButton>
        </View>

        {/* Primary Save & Complete Button */}
        <AppButton size="lg" block onClick={() => go('success')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Bookmark size={20} color={theme.brandForeground} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.brandForeground }}>Save Coloring Page</Text>
          </View>
        </AppButton>

        {/* Try another style */}
        <AppButton variant="outline" size="lg" block onClick={() => go('style')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <RefreshCw size={20} color={theme.foreground} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.foreground }}>Try Another Style</Text>
          </View>
        </AppButton>
      </View>
    </Screen>
  )
}
