import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { StatusBar, HomeIndicator } from '@/components/app/phone-chrome'
import { AppButton, IconButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'
import { X, Crown, Sparkles, Zap, ShieldCheck, CheckCircle2, Info } from 'lucide-react-native'

export function PremiumScreen() {
  const { goBack, theme, user } = useApp()
  const [period, setPeriod] = useState<'yearly' | 'monthly'>('yearly')
  const [restoring, setRestoring] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleRestore = () => {
    setRestoring(true)
    setStatusMessage(null)
    setTimeout(() => {
      setRestoring(false)
      if (user?.isPremium) {
        setStatusMessage('Your PRO Subscription is active and restored!')
      } else {
        setStatusMessage('No active prior subscriptions found for this account.')
      }
    }, 1200)
  }

  const handleStartTrial = () => {
    setStatusMessage('🎉 PRO 3-Day Free Trial Activated!')
    setTimeout(() => {
      goBack()
    }, 1200)
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar />
      {/* Top bar with close button */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 12,
        }}
      >
        <IconButton aria-label="Close" onClick={goBack}>
          <X size={20} color={theme.foreground} />
        </IconButton>
        <TouchableOpacity onPress={handleRestore} disabled={restoring}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {restoring ? <ActivityIndicator size="small" color={theme.brand} /> : null}
            <Text style={{ fontSize: 13, fontWeight: '600', color: theme.brand }}>Restore</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Restore Status Alert Banner */}
      {statusMessage ? (
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderRadius: 16,
            backgroundColor: theme.brandSoft,
            borderWidth: 1,
            borderColor: theme.brand,
            paddingHorizontal: 14,
            paddingVertical: 12,
          }}
        >
          <Info size={18} color={theme.brand} />
          <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: theme.foreground }}>
            {statusMessage}
          </Text>
          <TouchableOpacity onPress={() => setStatusMessage(null)}>
            <X size={16} color={theme.mutedForeground} />
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'space-between', paddingBottom: 24 }}>
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              backgroundColor: theme.brand,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: theme.brand,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 6,
            }}
          >
            <Crown size={36} color="#ffffff" strokeWidth={2} />
          </View>

          <Text style={{ marginTop: 20, fontSize: 28, fontWeight: '800', color: theme.foreground, letterSpacing: -0.4 }}>
            Coloring AI PRO
          </Text>
          <Text style={{ marginTop: 6, fontSize: 15, color: theme.mutedForeground, textAlign: 'center' }}>
            Unlock unlimited HD generations and premium AI styles.
          </Text>
        </View>

        {/* Benefits list */}
        <View style={{ gap: 14, marginVertical: 20 }}>
          <Benefit icon={Sparkles} title="Unlimited AI Generations" desc="Create as many coloring pages as you want" />
          <Benefit icon={Crown} title="Exclusive AI Styles" desc="Access Anime, Comic, Pencil & Ultra-Detail" />
          <Benefit icon={Zap} title="Lightning Fast Processing" desc="Priority queue with zero wait time" />
          <Benefit icon={ShieldCheck} title="High-Res PDF Export" desc="Print-ready 300 DPI vector lines" />
        </View>

        {/* Plans selector */}
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <PlanCard
              title="Yearly"
              price="$3.99 / mo"
              sub="$47.99 billed annually"
              save="SAVE 50%"
              active={period === 'yearly'}
              onClick={() => setPeriod('yearly')}
            />
            <PlanCard
              title="Monthly"
              price="$7.99 / mo"
              sub="Billed monthly"
              active={period === 'monthly'}
              onClick={() => setPeriod('monthly')}
            />
          </View>

          <AppButton size="lg" block onClick={handleStartTrial}>
            Start 3-Day Free Trial
          </AppButton>

          <Text style={{ textAlign: 'center', fontSize: 11, color: theme.mutedForeground }}>
            Cancel anytime in App Store settings. No commitment.
          </Text>
        </View>
      </View>
      <HomeIndicator />
    </View>
  )
}

function Benefit({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  const { theme } = useApp()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 14,
          backgroundColor: theme.brandSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={20} color={theme.brand} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: theme.foreground }}>{title}</Text>
        <Text style={{ fontSize: 12, color: theme.mutedForeground, marginTop: 1 }}>{desc}</Text>
      </View>
    </View>
  )
}

function PlanCard({
  title,
  price,
  sub,
  save,
  active,
  onClick,
}: {
  title: string
  price: string
  sub: string
  save?: string
  active: boolean
  onClick: () => void
}) {
  const { theme } = useApp()
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onClick}
      style={{
        flex: 1,
        borderRadius: 20,
        borderWidth: active ? 2 : 1,
        borderColor: active ? theme.brand : theme.border,
        backgroundColor: active ? theme.brandSoft : theme.card,
        padding: 16,
        position: 'relative',
      }}
    >
      {save ? (
        <View
          style={{
            position: 'absolute',
            top: -10,
            right: 12,
            backgroundColor: theme.brand,
            borderRadius: 999,
            paddingHorizontal: 8,
            paddingVertical: 2,
          }}
        >
          <Text style={{ fontSize: 9, fontWeight: '800', color: '#ffffff' }}>{save}</Text>
        </View>
      ) : null}
      <Text style={{ fontSize: 14, fontWeight: '700', color: theme.foreground }}>{title}</Text>
      <Text style={{ fontSize: 18, fontWeight: '800', color: theme.foreground, marginTop: 4 }}>{price}</Text>
      <Text style={{ fontSize: 11, color: theme.mutedForeground, marginTop: 2 }}>{sub}</Text>
    </TouchableOpacity>
  )
}
