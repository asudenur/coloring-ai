import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { useApp } from '@/components/app/app-provider'
import { Search, SlidersHorizontal, Heart, ImageOff, Plus } from 'lucide-react-native'
import { AppButton } from '@/components/kit/button'

import { getHistoryFilterKeys } from '@/lib/i18n'

export function HistoryScreen() {
  const { go, theme, creations, toggleFavorite, setSelectedPhoto, t } = useApp()
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filters = getHistoryFilterKeys().map((f) => ({
    key: f.key,
    label: t(f.labelKey),
  }))

  const filteredCreations = creations.filter((c) => {
    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchesTitle = c.title.toLowerCase().includes(q)
      const matchesStyle = c.style.toLowerCase().includes(q)
      const matchesDate = c.date.toLowerCase().includes(q)
      if (!matchesTitle && !matchesStyle && !matchesDate) return false
    }

    // 2. Chip Category Filter
    if (filter === 'Favorites') {
      return c.favorite === true
    }
    if (filter === 'Portraits') {
      return c.category === 'Portraits' || c.title.toLowerCase().includes('portrait')
    }
    if (filter === 'Pets') {
      return c.category === 'Pets' || c.title.toLowerCase().includes('retriever') || c.title.toLowerCase().includes('dog')
    }
    if (filter === 'Recent') {
      return c.date === 'Just now' || c.date === 'Today'
    }

    return true // 'All'
  })

  return (
    <Screen
      bottomNav="history"
      header={<ScreenHeader title={t('history.title')} large subtitle={t('history.subtitle')} />}
    >
      <View style={{ gap: 16, paddingBottom: 110 }}>
        {/* Search */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              height: 48,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              borderRadius: 16,
              backgroundColor: theme.input,
              paddingHorizontal: 14,
            }}
          >
            <Search size={20} color={theme.mutedForeground} />
            <TextInput
              placeholder={t('history.searchPlaceholder')}
              placeholderTextColor={theme.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ flex: 1, height: '100%', fontSize: 15, color: theme.foreground }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setFilter('All')
              setSearchQuery('')
            }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              backgroundColor: theme.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SlidersHorizontal size={20} color={theme.primaryForeground} />
          </TouchableOpacity>
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {filters.map((f) => {
            const active = filter === f.key
            return (
              <TouchableOpacity
                key={f.key}
                activeOpacity={0.8}
                onPress={() => setFilter(f.key)}
                style={{
                  height: 36,
                  borderRadius: 18,
                  paddingHorizontal: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active ? theme.primary : theme.secondary,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: active ? theme.primaryForeground : theme.mutedForeground,
                  }}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Dynamic Grid or Empty State */}
        {creations.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 56,
              paddingHorizontal: 24,
              gap: 16,
              borderRadius: 26,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.secondary,
              marginTop: 12,
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: theme.card,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <ImageOff size={28} color={theme.mutedForeground} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.foreground }}>{t('history.noCreations')}</Text>
            <Text style={{ fontSize: 14, color: theme.mutedForeground, textAlign: 'center', maxWidth: 260, lineHeight: 20 }}>
              {t('history.noCreationsHint')}
            </Text>
            <AppButton size="md" onClick={() => go('upload')}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Plus size={18} color={theme.brandForeground} />
                <Text style={{ fontSize: 14, fontWeight: '700', color: theme.brandForeground }}>{t('history.createFirst')}</Text>
              </View>
            </AppButton>
          </View>
        ) : filteredCreations.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 48,
              gap: 12,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.secondary,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.foreground }}>{t('history.noResults')}</Text>
            <Text style={{ fontSize: 13, color: theme.mutedForeground }}>
              {t('history.noResultsHint', { filter: filters.find((f) => f.key === filter)?.label ?? filter })}
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {filteredCreations.map((c) => (
              <TouchableOpacity
                key={c.id}
                activeOpacity={0.85}
                onPress={() => {
                  setSelectedPhoto(c.photo)
                  go('result')
                }}
                style={{
                  width: '48%',
                  borderRadius: 20,
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
                <View style={{ position: 'relative', width: '100%', aspectRatio: 1 }}>
                  <Image source={c.photo} style={{ width: '100%', height: '100%', backgroundColor: theme.paper, resizeMode: 'cover' }} />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => toggleFavorite(c.id)}
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: theme.card,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <Heart size={14} color={theme.brand} fill={c.favorite ? theme.brand : 'transparent'} />
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: theme.foreground }}>{c.title}</Text>
                  <Text style={{ fontSize: 11, color: theme.mutedForeground, marginTop: 2 }}>
                    {c.style} · {c.date}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </Screen>
  )
}
