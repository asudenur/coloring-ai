import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { useApp } from '@/components/app/app-provider'
import { ASSETS } from '@/lib/assets'
import { Camera, Images, UploadCloud, LucideIcon } from 'lucide-react-native'

const RECENT = [
  ASSETS.photos.portrait,
  ASSETS.photos.dog,
  ASSETS.photos.flowers,
  ASSETS.photos.portrait,
  ASSETS.photos.dog,
  ASSETS.photos.flowers,
]

export function UploadScreen() {
  const { go, theme } = useApp()

  return (
    <Screen header={<ScreenHeader title="New Coloring Page" onBack={() => go('home')} />}>
      <View style={{ gap: 24, paddingBottom: 32 }}>
        {/* Drop area */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => go('crop')}
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            borderRadius: 26,
            borderWidth: 2,
            borderColor: theme.border,
            borderStyle: 'dashed',
            backgroundColor: theme.secondary,
            paddingHorizontal: 24,
            paddingVertical: 48,
          }}
        >
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
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <UploadCloud size={32} color="#ffffff" strokeWidth={2} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.foreground }}>Drag & drop your photo</Text>
            <Text style={{ marginTop: 4, fontSize: 13, color: theme.mutedForeground }}>or tap to browse your library</Text>
          </View>
        </TouchableOpacity>

        {/* Source buttons */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <SourceCard icon={Camera} label="Camera" onClick={() => go('crop')} />
          <SourceCard icon={Images} label="Gallery" onClick={() => go('crop')} />
        </View>

        {/* Recent photos */}
        <View style={{ gap: 12 }}>
          <View style={{ paddingHorizontal: 4 }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: theme.foreground }}>Recent photos</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {RECENT.map((src, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.85}
                onPress={() => go('crop')}
                style={{
                  width: '31%',
                  aspectRatio: 1,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: theme.border,
                  overflow: 'hidden',
                }}
              >
                <Image source={src} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={{ textAlign: 'center', fontSize: 12, color: theme.mutedForeground }}>
          Supports JPG, PNG & HEIC · up to 25MB
        </Text>
      </View>
    </Screen>
  )
}

function SourceCard({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
  const { theme } = useApp()

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onClick}
      style={{
        flex: 1,
        alignItems: 'center',
        gap: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.card,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 16,
          backgroundColor: theme.brandSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={24} color={theme.brand} strokeWidth={2} />
      </View>
      <Text style={{ fontSize: 14, fontWeight: '600', color: theme.foreground }}>{label}</Text>
    </TouchableOpacity>
  )
}
