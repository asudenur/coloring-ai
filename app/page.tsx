'use client'

import { AppProvider, useApp } from '@/components/app/app-provider'
import { Navigator } from '@/components/app/navigator'
import { PhoneFrame } from '@/components/app/phone-frame'
import { ScreenRegistry } from '@/components/app/screen-registry'
import { SCREENS } from '@/lib/screens'
import { Moon, Sun } from 'lucide-react'

function Stage() {
  const { dark, toggleDark, screen, go } = useApp()

  return (
    <main className="flex min-h-screen w-full justify-center bg-[#0b0b0f] px-6 py-8 lg:py-16">
      <div className="flex w-full max-w-6xl gap-10 lg:gap-16">
        <Navigator />

        <div className="flex flex-1 flex-col items-center gap-6">
          {/* Mobile controls */}
          <div className="flex w-full max-w-[390px] items-center gap-3 lg:hidden">
            <select
              value={screen}
              onChange={(e) => go(e.target.value as (typeof SCREENS)[number]['key'])}
              className="flex-1 rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white"
              aria-label="Select screen"
            >
              {SCREENS.map((s) => (
                <option key={s.key} value={s.key} className="bg-[#0b0b0f]">
                  {s.group} — {s.label}
                </option>
              ))}
            </select>
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="flex size-11 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/5 text-white"
            >
              {dark ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </button>
          </div>

          <PhoneFrame dark={dark}>
            <ScreenRegistry />
          </PhoneFrame>
        </div>
      </div>
    </main>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <Stage />
    </AppProvider>
  )
}
