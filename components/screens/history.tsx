import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { Screen } from '@/components/app/screen'
import { ScreenHeader } from '@/components/app/phone-chrome'
import { useApp } from '@/components/app/app-provider'
import { CREATIONS } from '@/lib/data'
import { Search, SlidersHorizontal, Heart } from 'lucide-react-native'

const FILTERS = ['All', 'Favorites', 'Portraits', 'Pets', 'Recent']

export function HistoryScreen() {
  const { go, theme } = useApp()
  const [filter, setFilter] = useState('All')

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
              style={{ flex: 1, height: '100%', fontSize: 15, color: theme.foreground }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
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
          {FILTERS.map((f) => (
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
                backgroundColor: filter === f ? theme.primary : theme.secondary,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: filter === f ? theme.primaryForeground : theme.mutedForeground,
                }}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {CREATIONS.map((c) => (
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
      </View>
    </Screen>
  )
}
