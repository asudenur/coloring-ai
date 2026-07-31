import React, { useState } from 'react'

import { View, Text, TouchableOpacity, Image } from 'react-native'

import { Screen } from '@/components/app/screen'

import { ScreenHeader } from '@/components/app/phone-chrome'

import { AppButton, IconButton } from '@/components/kit/button'

import { useApp } from '@/components/app/app-provider'

import { ASSETS } from '@/lib/assets'

import { CROP_RATIOS, cropFrameStyle, type CropRatio } from '@/lib/crop'

import { RotateCw } from 'lucide-react-native'



export function CropScreen() {

  const { go, goBack, theme, selectedPhoto, cropRatio, setCropRatio, dark } = useApp()

  const [zoom, setZoom] = useState(1)

  const [rotate, setRotate] = useState(0)



  const imageSource = selectedPhoto || ASSETS.photos.portrait



  return (

    <Screen

      header={<ScreenHeader title="Crop & Adjust" onBack={goBack} />}

      padded={false}

      scroll={false}

    >

      <View style={{ flex: 1, justifyContent: 'space-between' }}>

        {/* Canvas area */}

        <View

          style={{

            marginHorizontal: 20,

            flex: 1,

            alignItems: 'center',

            justifyContent: 'center',

          }}

        >

          <View

            style={{

              ...cropFrameStyle(cropRatio),

              maxWidth: '100%',

              maxHeight: '100%',

              borderRadius: 24,

              backgroundColor: theme.secondary,

              overflow: 'hidden',

              position: 'relative',

            }}

          >

            <Image

              source={imageSource}

              style={{

                width: '100%',

                height: '100%',

                resizeMode: 'cover',

                transform: [{ scale: zoom }, { rotate: `${rotate}deg` }],

              }}

            />

            {/* Grid overlay */}

            <View

              style={{

                position: 'absolute',

                inset: 24,

                borderRadius: 16,

                borderWidth: 1,

                borderColor: dark ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.7)',

                pointerEvents: 'none',

              }}

            />

          </View>

        </View>



        {/* Controls */}

        <View style={{ gap: 16, padding: 20 }}>

          {/* Ratios & rotate */}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>

            {CROP_RATIOS.map((r) => (

              <TouchableOpacity

                key={r}

                activeOpacity={0.8}

                onPress={() => setCropRatio(r)}

                style={{

                  height: 38,

                  flex: 1,

                  borderRadius: 12,

                  alignItems: 'center',

                  justifyContent: 'center',

                  backgroundColor: cropRatio === r ? theme.primary : theme.secondary,

                }}

              >

                <Text

                  style={{

                    fontSize: 13,

                    fontWeight: '600',

                    color: cropRatio === r ? theme.primaryForeground : theme.mutedForeground,

                  }}

                >

                  {r}

                </Text>

              </TouchableOpacity>

            ))}

            <IconButton

              aria-label="Rotate"

              onClick={() => setRotate((d) => (d + 90) % 360)}

              style={{ width: 38, height: 38, borderRadius: 12 }}

            >

              <RotateCw size={18} color={theme.foreground} />

            </IconButton>

          </View>



          <AppButton size="lg" block onClick={() => go('style')}>

            Continue

          </AppButton>

        </View>

      </View>

    </Screen>

  )

}

