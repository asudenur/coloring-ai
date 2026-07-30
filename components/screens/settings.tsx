import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { useApp } from '@/components/app/app-provider'
import { Moon, Globe, Bell, ShieldCheck, FileText, ChevronRight, Trash2, LucideIcon } from 'lucide-react-native'

export function SettingsScreen() {
  const { go, dark, toggleDark, theme } = useApp()
  const [notifs, setNotifs] = useState(true)

  return (
    <Screen header={<ScreenHeader title="Settings" onBack={() => go('profile')} />}>
      <View style={{ gap: 24, paddingBottom: 40 }}>
        <Group title="Appearance">
          <ToggleRow icon={Moon} label="Dark Mode" on={dark} onToggle={toggleDark} />
          <LinkRow icon={Globe} label="Language" hint="English" onClick={() => {}} last />
        </Group>

        <Group title="Notifications">
          <ToggleRow icon={Bell} label="Push Notifications" on={notifs} onToggle={() => setNotifs((v) => !v)} last />
        </Group>

        <Group title="Legal">
          <LinkRow icon={ShieldCheck} label="Privacy Policy" onClick={() => {}} />
          <LinkRow icon={FileText} label="Terms of Service" onClick={() => {}} last />
        </Group>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: 'rgba(239, 68, 68, 0.3)',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Trash2 size={20} color={theme.destructive} />
          </View>
          <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: theme.destructive }}>Delete Account</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', fontSize: 12, color: theme.mutedForeground }}>
          Coloring AI · Version 2.4.0
        </Text>
      </View>
    </Screen>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useApp()
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, color: theme.mutedForeground, paddingHorizontal: 8 }}>
        {title}
      </Text>
      <View
        style={{
          borderRadius: 22,
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.card,
          overflow: 'hidden',
        }}
      >
        {children}
      </View>
    </View>
  )
}

function RowShell({ icon: Icon, label, children, last }: { icon: LucideIcon; label: string; children: React.ReactNode; last?: boolean }) {
  const { theme } = useApp()
  return (
    <View
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
      {children}
    </View>
  )
}

function ToggleRow({ icon, label, on, onToggle, last }: { icon: LucideIcon; label: string; on: boolean; onToggle: () => void; last?: boolean }) {
  const { theme } = useApp()
  return (
    <RowShell icon={icon} label={label} last={last}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
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
      </TouchableOpacity>
    </RowShell>
  )
}

function LinkRow({ icon: Icon, label, hint, onClick, last }: { icon: LucideIcon; label: string; hint?: string; onClick: () => void; last?: boolean }) {
  const { theme } = useApp()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
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
