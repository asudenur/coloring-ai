export type ScreenKey =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'home'
  | 'upload'
  | 'crop'
  | 'style'
  | 'processing'
  | 'result'
  | 'history'
  | 'premium'
  | 'profile'
  | 'settings'
  | 'credits'
  | 'success'
  | 'empty'
  | 'error'

export type ScreenMeta = {
  key: ScreenKey
  label: string
  group: 'Flow' | 'Main' | 'Account' | 'States'
}

export const SCREENS: ScreenMeta[] = [
  { key: 'splash', label: 'Splash', group: 'Flow' },
  { key: 'onboarding', label: 'Onboarding', group: 'Flow' },
  { key: 'login', label: 'Login', group: 'Flow' },
  { key: 'home', label: 'Home', group: 'Main' },
  { key: 'upload', label: 'Upload', group: 'Main' },
  { key: 'crop', label: 'Crop & Adjust', group: 'Main' },
  { key: 'style', label: 'Style Selection', group: 'Main' },
  { key: 'processing', label: 'AI Processing', group: 'Main' },
  { key: 'result', label: 'Result', group: 'Main' },
  { key: 'history', label: 'History', group: 'Main' },
  { key: 'premium', label: 'Premium', group: 'Account' },
  { key: 'profile', label: 'Profile', group: 'Account' },
  { key: 'settings', label: 'Settings', group: 'Account' },
  { key: 'credits', label: 'AI Credits', group: 'Account' },
  { key: 'success', label: 'Success', group: 'States' },
  { key: 'empty', label: 'Empty States', group: 'States' },
  { key: 'error', label: 'Error State', group: 'States' },
]
