export type Theme = {
  background: string
  foreground: string
  card: string
  cardForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  brand: string
  brandForeground: string
  brandSoft: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
}

export const LIGHT_THEME: Theme = {
  background: '#ffffff',
  foreground: '#111111',
  card: '#ffffff',
  cardForeground: '#111111',
  primary: '#111111',
  primaryForeground: '#ffffff',
  secondary: '#f5f5f7',
  secondaryForeground: '#111111',
  muted: '#f5f5f7',
  mutedForeground: '#8a8a8e',
  accent: '#f5f5f7',
  accentForeground: '#111111',
  brand: '#22c55e',
  brandForeground: '#ffffff',
  brandSoft: 'rgba(34, 197, 94, 0.1)',
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  border: '#ececee',
  input: '#f0f0f2',
  ring: 'rgba(34, 197, 94, 0.4)',
}

export const DARK_THEME: Theme = {
  background: '#0b0b0c',
  foreground: '#f5f5f7',
  card: '#161618',
  cardForeground: '#f5f5f7',
  primary: '#f5f5f7',
  primaryForeground: '#111111',
  secondary: '#1e1e21',
  secondaryForeground: '#f5f5f7',
  muted: '#1e1e21',
  mutedForeground: '#8e8e93',
  accent: '#1e1e21',
  accentForeground: '#f5f5f7',
  brand: '#22c55e',
  brandForeground: '#06210f',
  brandSoft: 'rgba(34, 197, 94, 0.14)',
  destructive: '#ff5a52',
  destructiveForeground: '#ffffff',
  border: '#262629',
  input: '#202023',
  ring: 'rgba(34, 197, 94, 0.5)',
}
