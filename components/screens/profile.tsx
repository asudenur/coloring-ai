import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { Card, Badge } from '@/components/kit/primitives'
import { useApp } from '@/components/app/app-provider'
import { ASSETS } from '@/lib/assets'
import { Crown, Coins, Download, Sparkles, Settings, LifeBuoy, ShieldCheck, ChevronRight, Star, LogOut, User as UserIcon, LucideIcon } from 'lucide-react-native'
import type { ScreenKey } from '@/lib/screens'

export function ProfileScreen() {
  const { go, theme, user, logout, t } = useApp()

  const name = user ? user.name : t('common.guestUser')
  const email = user ? user.email : 'guest@coloring.ai'
  const providerLabel =
    user?.provider === 'apple'
      ? t('profile.appleId')
      : user?.provider === 'google'
        ? t('profile.googleAccount')
        : t('profile.guestAccount')
  const credits = user ? user.credits : 10
  const creations = user ? user.creationsCount : 0
  const downloads = user ? user.downloadsCount : 0
  const planName = user ? user.planName : t('profile.guestMode')
  const isPremium = user?.isPremium || false

  return (
    <Screen bottomNav="profile" header={<ScreenHeader title={t('profile.title')} large />}>
      <View style={{ gap: 20, paddingBottom: 110 }}>
        {/* Identity */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              borderWidth: 2,
              borderColor: theme.brand,
              padding: 2,
              overflow: 'hidden',
              backgroundColor: theme.secondary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {user?.avatar ? (
              <Image source={user.avatar} style={{ width: '100%', height: '100%', borderRadius: 34, resizeMode: 'cover' }} />
            ) : (
              <UserIcon size={34} color={theme.foreground} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: theme.foreground }}>{name}</Text>
              {isPremium ? (
                <Badge tone="brand">
                  <Crown size={12} color={theme.brand} />
                  <Text style={{ color: theme.brand, fontSize: 11, fontWeight: '700', marginLeft: 2 }}>{t('common.pro')}</Text>
                </Badge>
              ) : (
                <Badge tone="neutral">
                  <Text style={{ fontSize: 11, fontWeight: '600', color: theme.mutedForeground }}>{providerLabel}</Text>
                </Badge>
              )}
            </View>
            <Text style={{ fontSize: 13, color: theme.mutedForeground, marginTop: 2 }}>{email}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Stat icon={Sparkles} value={String(creations)} label={t('profile.creations')} />
          <Stat icon={Download} value={String(downloads)} label={t('profile.downloads')} />
          <Stat icon={Coins} value={String(credits)} label={t('profile.credits')} />
        </View>

        {/* Subscription card */}
        <Card style={{ backgroundColor: theme.primary, padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.8, color: theme.primaryForeground, opacity: 0.5 }}>
                {t('profile.currentPlan')}
              </Text>
              <Text style={{ fontSize: 19, fontWeight: '700', color: theme.primaryForeground, marginTop: 2 }}>{planName}</Text>
              <Text style={{ fontSize: 12, color: theme.primaryForeground, opacity: 0.6, marginTop: 2 }}>
                {isPremium ? t('profile.renews') : t('profile.upgradeHint')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => go('premium')}
              style={{
                borderRadius: 999,
                backgroundColor: theme.brand,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#ffffff' }}>{t('profile.manage')}</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Menu */}
        <View
          style={{
            borderRadius: 22,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.card,
            overflow: 'hidden',
          }}
        >
          <Row icon={Coins} label={t('profile.aiCredits')} hint={t('profile.creditsLeft', { count: credits })} to="credits" go={go} />
          <Row icon={Crown} label={t('profile.subscription')} to="premium" go={go} />
          <Row icon={Settings} label={t('settings.title')} to="settings" go={go} />
          <Row icon={LifeBuoy} label={t('profile.support')} to="settings" go={go} />
          <Row icon={ShieldCheck} label={t('profile.privacy')} to="settings" go={go} last />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={logout}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: 'rgba(239, 68, 68, 0.3)',
            backgroundColor: 'rgba(239, 68, 68, 0.06)',
            paddingVertical: 14,
          }}
        >
          <LogOut size={18} color={theme.destructive} />
          <Text style={{ fontSize: 15, fontWeight: '700', color: theme.destructive }}>{t('profile.signOut')}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

function Stat({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  const { theme } = useApp()
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        gap: 4,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.card,
        paddingVertical: 16,
      }}
    >
      <Icon size={20} color={theme.brand} />
      <Text style={{ fontSize: 20, fontWeight: '800', color: theme.foreground }}>{value}</Text>
      <Text style={{ fontSize: 11, color: theme.mutedForeground }}>{label}</Text>
    </View>
  )
}

function Row({
  icon: Icon,
  label,
  hint,
  to,
  go,
  last,
}: {
  icon: LucideIcon
  label: string
  hint?: string
  to: ScreenKey
  go: (s: ScreenKey) => void
  last?: boolean
}) {
  const { theme } = useApp()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => go(to)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: theme.border,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          backgroundColor: theme.secondary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={20} color={theme.foreground} strokeWidth={2} />
      </View>
      <Text style={{ flex: 1, fontSize: 15, fontWeight: '500', color: theme.foreground }}>{label}</Text>
      {hint ? <Text style={{ fontSize: 13, color: theme.mutedForeground }}>{hint}</Text> : null}
      <ChevronRight size={16} color={theme.mutedForeground} />
    </TouchableOpacity>
  )
}
