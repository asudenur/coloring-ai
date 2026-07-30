import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StatusBar, HomeIndicator } from '@/components/app/phone-chrome'
import { AppButton } from '@/components/kit/button'
import { useApp } from '@/components/app/app-provider'
import { Sparkles, ChevronRight } from 'lucide-react-native'
import Svg, { Path } from 'react-native-svg'

export function LoginScreen() {
  const { go, theme } = useApp()

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar />
      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: 80,
              height: 80,
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
            <Sparkles size={36} color="#ffffff" strokeWidth={2} />
          </View>
          <Text
            style={{
              marginTop: 24,
              fontSize: 30,
              fontWeight: '800',
              color: theme.foreground,
              letterSpacing: -0.4,
              textAlign: 'center',
            }}
          >
            Welcome to Coloring AI
          </Text>
          <Text
            style={{
              marginTop: 8,
              maxWidth: 280,
              fontSize: 15,
              lineHeight: 22,
              color: theme.mutedForeground,
              textAlign: 'center',
            }}
          >
            Sign in to save creations, sync across devices and unlock premium styles.
          </Text>
        </View>

        <View style={{ gap: 12, paddingBottom: 24 }}>
          <AppButton variant="dark" size="lg" block onClick={() => go('home')}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.primaryForeground }}>
               Continue with Apple
            </Text>
          </AppButton>

          <AppButton variant="outline" size="lg" block onClick={() => go('home')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <GoogleMark />
              <Text style={{ fontSize: 16, fontWeight: '700', color: theme.foreground }}>
                Continue with Google
              </Text>
            </View>
          </AppButton>

          <TouchableOpacity
            onPress={() => go('home')}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 8 }}
          >
            <Text style={{ fontSize: 15, fontWeight: '600', color: theme.mutedForeground }}>
              Continue as Guest
            </Text>
            <ChevronRight size={16} color={theme.mutedForeground} />
          </TouchableOpacity>

          <Text style={{ textAlign: 'center', fontSize: 11, lineHeight: 16, color: theme.mutedForeground, paddingHorizontal: 16 }}>
            By continuing you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </View>
      <HomeIndicator />
    </View>
  )
}

function GoogleMark() {
  return (
    <Svg width={20} height={20} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 3-2.26 5.54-4.78 7.24l7.73 6c4.51-4.18 7.09-10.36 7.09-17.71z" />
      <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </Svg>
  )
}
