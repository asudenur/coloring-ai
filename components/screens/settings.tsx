import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { useApp } from '@/components/app/app-provider'
import { LOCALES, getLocaleLabel, type Locale } from '@/lib/i18n'
import { Moon, Globe, Bell, ShieldCheck, FileText, ChevronRight, Trash2, LucideIcon, Check } from 'lucide-react-native'

export function SettingsScreen() {
  const { goBack, dark, toggleDark, theme, locale, setLocale, t } = useApp()
  const [notifs, setNotifs] = useState(true)
  const [languageOpen, setLanguageOpen] = useState(false)

  return (
    <Screen header={<ScreenHeader title={t('settings.title')} onBack={goBack} />}>
      <View style={{ gap: 24, paddingBottom: 40 }}>
        <Group title={t('settings.appearance')}>
          <ToggleRow icon={Moon} label={t('settings.darkMode')} on={dark} onToggle={toggleDark} />
          <LinkRow
            icon={Globe}
            label={t('settings.language')}
            hint={getLocaleLabel(locale)}
            onClick={() => setLanguageOpen(true)}
            last
          />
        </Group>

        <Group title={t('settings.notifications')}>
          <ToggleRow
            icon={Bell}
            label={t('settings.pushNotifications')}
            on={notifs}
            onToggle={() => setNotifs((v) => !v)}
            last
          />
        </Group>

        <Group title={t('settings.legal')}>
          <LinkRow icon={ShieldCheck} label={t('settings.privacyPolicy')} onClick={() => {}} />
          <LinkRow icon={FileText} label={t('settings.termsOfService')} onClick={() => {}} last />
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
          <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: theme.destructive }}>
            {t('settings.deleteAccount')}
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', fontSize: 12, color: theme.mutedForeground }}>
          {t('settings.version')}
        </Text>
      </View>

      <Modal visible={languageOpen} transparent animationType="fade" onRequestClose={() => setLanguageOpen(false)}>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }}
          onPress={() => setLanguageOpen(false)}
        >
          <Pressable
            style={{
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: theme.card,
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 32,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: 17, fontWeight: '700', color: theme.foreground, marginBottom: 16 }}>
              {t('settings.selectLanguage')}
            </Text>
            {LOCALES.map((item, index) => {
              const selected = locale === item.code
              const last = index === LOCALES.length - 1
              return (
                <TouchableOpacity
                  key={item.code}
                  activeOpacity={0.7}
                  onPress={() => {
                    setLocale(item.code as Locale)
                    setLanguageOpen(false)
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 14,
                    borderBottomWidth: last ? 0 : 1,
                    borderBottomColor: theme.border,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: selected ? '700' : '500',
                      color: selected ? theme.brand : theme.foreground,
                    }}
                  >
                    {item.label}
                  </Text>
                  {selected ? <Check size={20} color={theme.brand} strokeWidth={2.5} /> : null}
                </TouchableOpacity>
              )
            })}
          </Pressable>
        </Pressable>
      </Modal>
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
            backgroundColor: theme.toggleThumb,
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
