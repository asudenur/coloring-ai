import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { IconButton } from '@/components/kit/button'
import { Card, Badge, SectionTitle } from '@/components/kit/primitives'
import { useApp } from '@/components/app/app-provider'
import { ASSETS } from '@/lib/assets'
import { Bell, Camera, ImagePlus, Wand2, ScanFace, Crown, ArrowRight, User as UserIcon, LucideIcon, ImageOff, Plus } from 'lucide-react-native'

export function HomeScreen() {
  const { go, theme, user, creations, setSelectedPhoto } = useApp()

  const displayName = user ? user.name : 'Guest User'
  const avatarSource = user?.avatar || ASSETS.photos.portrait

  return (
    <Screen
      bottomNav="home"
      header={
        <ScreenHeader
          right={
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <IconButton aria-label="Notifications" style={{ width: 44, height: 44, borderRadius: 22 }}>
                <Bell size={20} color={theme.foreground} strokeWidth={2} />
              </IconButton>
              <TouchableOpacity
                onPress={() => go('profile')}
                activeOpacity={0.8}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: theme.secondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {user?.avatar ? (
                  <Image source={avatarSource} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                ) : (
                  <UserIcon size={22} color={theme.foreground} />
                )}
              </TouchableOpacity>
            </View>
          }
        />
      }
    >
      <View style={{ gap: 24, paddingBottom: 110 }}>
        {/* Header Greeting */}
        <View style={{ paddingHorizontal: 4 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: theme.mutedForeground }}>
            Good morning, {displayName}
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontSize: 28,
              fontWeight: '800',
              color: theme.foreground,
              letterSpacing: -0.4,
              lineHeight: 32,
            }}
          >
            What will you turn into art today?
          </Text>
        </View>

        {/* Primary upload button */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => go('upload')}
          style={{
            width: '100%',
            borderRadius: 26,
            backgroundColor: theme.brand,
            padding: 20,
            shadowColor: theme.brand,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.28,
            shadowRadius: 16,
            elevation: 6,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ImagePlus size={28} color="#ffffff" strokeWidth={2} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 19, fontWeight: '700', color: '#ffffff' }}>Upload a Photo</Text>
              <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>
                Start a new coloring page
              </Text>
            </View>
            <ArrowRight size={20} color="#ffffff" />
          </View>
        </TouchableOpacity>

        {/* Quick actions */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <QuickCard icon={Camera} label="Camera" hint="Snap & convert" onClick={() => go('upload')} />
          <QuickCard icon={ScanFace} label="Face Detect" hint="Auto crop" onClick={() => go('crop')} />
        </View>

        {/* AI feature cards */}
        <View style={{ gap: 12 }}>
          <SectionTitle title="AI Styles" action="See all" onAction={() => go('style')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}>
            {[
              { t: 'Detailed', s: ASSETS.styles.detailed },
              { t: 'Anime', s: ASSETS.styles.anime },
              { t: 'Comic', s: ASSETS.styles.comic },
              { t: 'Minimal', s: ASSETS.styles.minimal },
            ].map((f) => (
              <TouchableOpacity
                key={f.t}
                activeOpacity={0.85}
                onPress={() => go('style')}
                style={{
                  width: 140,
                  borderRadius: 22,
                  borderWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: theme.card,
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Image source={f.s} style={{ width: 140, height: 140, backgroundColor: '#ffffff', resizeMode: 'cover' }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: theme.foreground }}>{f.t}</Text>
                  <Wand2 size={16} color={theme.brand} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent creations */}
        <View style={{ gap: 12 }}>
          <SectionTitle title="Recent creations" action="History" onAction={() => go('history')} />
          {creations.length === 0 ? (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => go('upload')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: theme.border,
                borderStyle: 'dashed',
                backgroundColor: theme.secondary,
                padding: 16,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: theme.card,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ImageOff size={20} color={theme.mutedForeground} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: theme.foreground }}>No creations yet</Text>
                <Text style={{ fontSize: 12, color: theme.mutedForeground, marginTop: 2 }}>
                  Tap here to upload a photo & create your first page
                </Text>
              </View>
              <Plus size={20} color={theme.brand} />
            </TouchableOpacity>
          ) : (
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {creations.slice(0, 3).map((c) => (
                <TouchableOpacity
                  key={c.id}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedPhoto(c.photo)
                    go('result')
                  }}
                  style={{
                    flex: 1,
                    aspectRatio: 1,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: theme.border,
                    backgroundColor: '#ffffff',
                    overflow: 'hidden',
                  }}
                >
                  <Image source={c.photo} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Premium banner */}
        <Card style={{ backgroundColor: theme.primary, padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
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
              <Crown size={24} color="#ffffff" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 17, fontWeight: '700', color: theme.primaryForeground }}>Go Premium</Text>
                <Badge tone="brand" style={{ backgroundColor: theme.brand }}>
                  <Text style={{ color: '#ffffff', fontSize: 11, fontWeight: '700' }}>-40%</Text>
                </Badge>
              </View>
              <Text style={{ fontSize: 13, color: theme.primaryForeground, opacity: 0.7, marginTop: 2 }}>
                Unlimited pages · all styles · no ads
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => go('premium')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.15)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowRight size={20} color={theme.primaryForeground} />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </Screen>
  )
}

function QuickCard({
  icon: Icon,
  label,
  hint,
  onClick,
}: {
  icon: LucideIcon
  label: string
  hint: string
  onClick: () => void
}) {
  const { theme } = useApp()

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onClick}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 20,
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
          width: 44,
          height: 44,
          borderRadius: 14,
          backgroundColor: theme.brandSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={20} color={theme.brand} strokeWidth={2} />
      </View>
      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.foreground }}>{label}</Text>
        <Text style={{ fontSize: 12, color: theme.mutedForeground, marginTop: 2 }}>{hint}</Text>
      </View>
    </TouchableOpacity>
  )
}
