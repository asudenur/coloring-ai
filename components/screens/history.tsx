import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { useApp } from '@/components/app/app-provider'
import { CREATIONS } from '@/lib/data'
import { Search, SlidersHorizontal, Heart, ImageOff } from 'lucide-react-native'

const FILTERS = ['All', 'Favorites', 'Portraits', 'Pets', 'Recent']

export function HistoryScreen() {
  const { go, theme } = useApp()
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCreations = CREATIONS.filter((c) => {
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
      return c.date === 'Today'
    }

    return true // 'All'
  })

  return (
    <Screen
      bottomNav="history"
      header={<ScreenHeader title="History" large subtitle="All your coloring pages in one place" />}
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
              placeholder="Search creations"
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
          {FILTERS.map((f) => {
            const active = filter === f
            return (
              <TouchableOpacity
                key={f}
                activeOpacity={0.8}
                onPress={() => setFilter(f)}
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
                  {f}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Grid or Empty State */}
        {filteredCreations.length === 0 ? (
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
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: theme.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ImageOff size={24} color={theme.mutedForeground} />
            </View>
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.foreground }}>No creations found</Text>
            <Text style={{ fontSize: 13, color: theme.mutedForeground }}>
              No items match your "{filter}" filter.
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {filteredCreations.map((c) => (
              <TouchableOpacity
                key={c.id}
                activeOpacity={0.85}
                onPress={() => go('result')}
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
                  <Image source={c.result} style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', resizeMode: 'cover' }} />
                  {c.favorite ? (
                    <View
                      style={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <Heart size={14} color={theme.brand} fill={theme.brand} />
                    </View>
                  ) : null}
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
