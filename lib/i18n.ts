export type Locale = 'en' | 'tr'

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
]

const translations = {
  en: {
    nav: {
      home: 'Home',
      history: 'History',
      premium: 'Premium',
      profile: 'Profile',
    },
    common: {
      continue: 'Continue',
      cancel: 'Cancel',
      skip: 'Skip',
      getStarted: 'Get Started',
      seeAll: 'See all',
      pro: 'PRO',
      guestUser: 'Guest User',
      justNow: 'Just now',
      today: 'Today',
    },
    home: {
      greeting: 'Good morning, {{name}}',
      title: 'What will you turn into art today?',
      uploadPhoto: 'Upload a Photo',
      uploadHint: 'Start a new coloring page',
      camera: 'Camera',
      cameraHint: 'Snap & convert',
      aiStyles: 'AI Styles',
      recentCreations: 'Recent creations',
      noCreations: 'No creations yet',
      noCreationsHint: 'Tap here to upload a photo & create your first page',
      goPremium: 'Go Premium',
      premiumHint: 'Unlimited pages · all styles · no ads',
      styleDetailed: 'Detailed',
      styleAnime: 'Anime',
      styleComic: 'Comic',
      styleMinimal: 'Minimal',
    },
    settings: {
      title: 'Settings',
      appearance: 'Appearance',
      darkMode: 'Dark Mode',
      language: 'Language',
      notifications: 'Notifications',
      pushNotifications: 'Push Notifications',
      legal: 'Legal',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      deleteAccount: 'Delete Account',
      version: 'Coloring AI · Version 2.4.0',
      selectLanguage: 'Select Language',
    },
    profile: {
      title: 'Profile',
      creations: 'Creations',
      downloads: 'Downloads',
      credits: 'Credits',
      currentPlan: 'Current plan',
      renews: 'Renews Mar 24, 2026',
      upgradeHint: 'Upgrade for unlimited access',
      manage: 'Manage',
      aiCredits: 'AI Credits',
      creditsLeft: '{{count}} left',
      subscription: 'Subscription',
      support: 'Support',
      privacy: 'Privacy',
      signOut: 'Sign Out',
      appleId: 'Apple ID',
      googleAccount: 'Google Account',
      guestAccount: 'Guest Account',
      guestMode: 'Guest Mode',
    },
    login: {
      title: 'Welcome to Coloring AI',
      subtitle: 'Sign in to save creations, sync across devices and unlock premium styles.',
      continueApple: 'Continue with Apple',
      continueGoogle: 'Continue with Google',
      continueGuest: 'Continue as Guest',
      terms: 'By continuing you agree to our Terms of Service and Privacy Policy.',
    },
    onboarding: {
      page1Title: 'Turn Any Photo Into A Coloring Book',
      page1Body: 'Upload a photo and our AI redraws it into clean, printable line art in seconds.',
      page2Title: 'Choose From Multiple Drawing Styles',
      page2Body: 'General, detailed, anime, sketch, comic and more — preview before you generate.',
      page3Title: 'Download, Print & Share',
      page3Body: 'Export crisp PNG or PDF pages, print at home or share with friends and family.',
      photo: 'Photo',
      coloringPage: 'Coloring page',
    },
    history: {
      title: 'History',
      subtitle: 'All your coloring pages in one place',
      searchPlaceholder: 'Search creations',
      filterAll: 'All',
      filterFavorites: 'Favorites',
      filterPortraits: 'Portraits',
      filterPets: 'Pets',
      filterRecent: 'Recent',
      noCreations: 'No creations yet',
      noCreationsHint: 'Your generated coloring pages will show up here. Start by uploading a photo!',
      createFirst: 'Create first page',
      noResults: 'No creations found',
      noResultsHint: 'No items match your "{{filter}}" filter.',
    },
    upload: {
      title: 'New Coloring Page',
      choosePhoto: 'Choose your photo',
      browseHint: 'Tap to browse device photo library',
      camera: 'Camera',
      gallery: 'Gallery',
      recentPhotos: 'Recent photos',
      formats: 'Supports JPG, PNG & HEIC · up to 25MB',
      permissionTitle: 'Permission Required',
      permissionBody: 'Camera permission is needed to take a photo.',
    },
    crop: {
      title: 'Crop & Adjust',
    },
    style: {
      title: 'Choose a Style',
      hint: 'Pick how your coloring page should look. You can regenerate anytime.',
      generate: 'Generate Coloring Page',
    },
    styles: {
      general: { name: 'General', description: 'Balanced everyday line art' },
      detailed: { name: 'Detailed', description: 'Intricate, dense linework' },
      anime: { name: 'Anime', description: 'Manga-inspired outlines' },
      sketch: { name: 'Sketch', description: 'Loose hand-drawn strokes' },
      comic: { name: 'Comic', description: 'Bold graphic-novel ink' },
      minimal: { name: 'Minimal', description: 'Single elegant contour' },
      pencil: { name: 'Pencil', description: 'Soft graphite shading' },
      kids: { name: 'Kids Coloring', description: 'Simple, playful shapes' },
    },
    processing: {
      title: 'Creating your artwork',
      finishing: 'Finishing…',
      remaining: '~{{seconds}}s remaining',
      cancel: 'Cancel',
      messages: [
        'Warming up the ink pens…',
        'Tracing every beautiful edge…',
        'Removing color, keeping the soul…',
        'Smoothing the linework…',
        'Almost ready to color…',
      ],
    },
    result: {
      title: 'Your Coloring Page',
      before: 'Before',
      after: 'After',
      savePage: 'Save Coloring Page',
      tryAnother: 'Try Another Style',
      savedTitle: 'Saved!',
      savedBody: 'PNG coloring page saved to your device photo gallery.',
      exportedTitle: 'Exported!',
      exportedBody: 'High-res PDF vector line art exported to downloads.',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      history: 'Geçmiş',
      premium: 'Premium',
      profile: 'Profil',
    },
    common: {
      continue: 'Devam',
      cancel: 'İptal',
      skip: 'Atla',
      getStarted: 'Başla',
      seeAll: 'Tümünü gör',
      pro: 'PRO',
      guestUser: 'Misafir Kullanıcı',
      justNow: 'Az önce',
      today: 'Bugün',
    },
    home: {
      greeting: 'Günaydın, {{name}}',
      title: 'Bugün neyi sanata dönüştüreceksin?',
      uploadPhoto: 'Fotoğraf Yükle',
      uploadHint: 'Yeni bir boyama sayfası başlat',
      camera: 'Kamera',
      cameraHint: 'Çek ve dönüştür',
      aiStyles: 'AI Stilleri',
      recentCreations: 'Son oluşturmalar',
      noCreations: 'Henüz oluşturma yok',
      noCreationsHint: 'Fotoğraf yükleyerek ilk sayfanı oluşturmak için dokun',
      goPremium: "Premium'a Geç",
      premiumHint: 'Sınırsız sayfa · tüm stiller · reklamsız',
      styleDetailed: 'Detaylı',
      styleAnime: 'Anime',
      styleComic: 'Çizgi Roman',
      styleMinimal: 'Minimal',
    },
    settings: {
      title: 'Ayarlar',
      appearance: 'Görünüm',
      darkMode: 'Karanlık Mod',
      language: 'Dil',
      notifications: 'Bildirimler',
      pushNotifications: 'Anlık Bildirimler',
      legal: 'Yasal',
      privacyPolicy: 'Gizlilik Politikası',
      termsOfService: 'Kullanım Koşulları',
      deleteAccount: 'Hesabı Sil',
      version: 'Coloring AI · Sürüm 2.4.0',
      selectLanguage: 'Dil Seçin',
    },
    profile: {
      title: 'Profil',
      creations: 'Oluşturmalar',
      downloads: 'İndirmeler',
      credits: 'Krediler',
      currentPlan: 'Mevcut plan',
      renews: '24 Mar 2026 tarihinde yenilenir',
      upgradeHint: 'Sınırsız erişim için yükselt',
      manage: 'Yönet',
      aiCredits: 'AI Kredileri',
      creditsLeft: '{{count}} kaldı',
      subscription: 'Abonelik',
      support: 'Destek',
      privacy: 'Gizlilik',
      signOut: 'Çıkış Yap',
      appleId: 'Apple ID',
      googleAccount: 'Google Hesabı',
      guestAccount: 'Misafir Hesabı',
      guestMode: 'Misafir Modu',
    },
    login: {
      title: "Coloring AI'a Hoş Geldiniz",
      subtitle: 'Oluşturmalarınızı kaydedin, cihazlar arası senkronize edin ve premium stillerin kilidini açın.',
      continueApple: 'Apple ile Devam Et',
      continueGoogle: 'Google ile Devam Et',
      continueGuest: 'Misafir Olarak Devam Et',
      terms: 'Devam ederek Kullanım Koşullarımızı ve Gizlilik Politikamızı kabul etmiş olursunuz.',
    },
    onboarding: {
      page1Title: 'Herhangi Bir Fotoğrafı Boyama Kitabına Dönüştürün',
      page1Body: 'Bir fotoğraf yükleyin, yapay zekamız saniyeler içinde temiz, yazdırılabilir çizgi sanatına dönüştürsün.',
      page2Title: 'Birden Fazla Çizim Stili Seçin',
      page2Body: 'Genel, detaylı, anime, eskiz, çizgi roman ve daha fazlası — oluşturmadan önce önizleyin.',
      page3Title: 'İndir, Yazdır ve Paylaş',
      page3Body: 'Net PNG veya PDF sayfaları dışa aktarın, evde yazdırın veya arkadaşlarınızla paylaşın.',
      photo: 'Fotoğraf',
      coloringPage: 'Boyama sayfası',
    },
    history: {
      title: 'Geçmiş',
      subtitle: 'Tüm boyama sayfalarınız tek yerde',
      searchPlaceholder: 'Oluşturmaları ara',
      filterAll: 'Tümü',
      filterFavorites: 'Favoriler',
      filterPortraits: 'Portreler',
      filterPets: 'Evcil Hayvanlar',
      filterRecent: 'Son',
      noCreations: 'Henüz oluşturma yok',
      noCreationsHint: 'Oluşturduğunuz boyama sayfaları burada görünecek. Fotoğraf yükleyerek başlayın!',
      createFirst: 'İlk sayfayı oluştur',
      noResults: 'Oluşturma bulunamadı',
      noResultsHint: '"{{filter}}" filtresiyle eşleşen öğe yok.',
    },
    upload: {
      title: 'Yeni Boyama Sayfası',
      choosePhoto: 'Fotoğrafınızı seçin',
      browseHint: 'Galeriden seçmek için dokunun',
      camera: 'Kamera',
      gallery: 'Galeri',
      recentPhotos: 'Son fotoğraflar',
      formats: 'JPG, PNG ve HEIC desteklenir · en fazla 25MB',
      permissionTitle: 'İzin Gerekli',
      permissionBody: 'Fotoğraf çekmek için kamera izni gereklidir.',
    },
    crop: {
      title: 'Kırp ve Ayarla',
    },
    style: {
      title: 'Stil Seçin',
      hint: 'Boyama sayfanızın nasıl görüneceğini seçin. İstediğiniz zaman yeniden oluşturabilirsiniz.',
      generate: 'Boyama Sayfası Oluştur',
    },
    styles: {
      general: { name: 'Genel', description: 'Dengeli günlük çizgi sanatı' },
      detailed: { name: 'Detaylı', description: 'Karmaşık, yoğun çizgiler' },
      anime: { name: 'Anime', description: 'Manga tarzı konturlar' },
      sketch: { name: 'Eskiz', description: 'Serbest el çizimleri' },
      comic: { name: 'Çizgi Roman', description: 'Kalın grafik roman mürekkebi' },
      minimal: { name: 'Minimal', description: 'Tek zarif kontur' },
      pencil: { name: 'Kurşun Kalem', description: 'Yumuşak grafit gölgelendirme' },
      kids: { name: 'Çocuk Boyama', description: 'Basit, eğlenceli şekiller' },
    },
    processing: {
      title: 'Sanat eseriniz oluşturuluyor',
      finishing: 'Tamamlanıyor…',
      remaining: '~{{seconds}} sn kaldı',
      cancel: 'İptal',
      messages: [
        'Kalemler ısınıyor…',
        'Her güzel kenar izleniyor…',
        'Renk kaldırılıyor, ruh korunuyor…',
        'Çizgiler düzeltiliyor…',
        'Boyamaya neredeyse hazır…',
      ],
    },
    result: {
      title: 'Boyama Sayfanız',
      before: 'Önce',
      after: 'Sonra',
      savePage: 'Boyama Sayfasını Kaydet',
      tryAnother: 'Başka Stil Dene',
      savedTitle: 'Kaydedildi!',
      savedBody: 'PNG boyama sayfası cihaz galerinize kaydedildi.',
      exportedTitle: 'Dışa aktarıldı!',
      exportedBody: 'Yüksek çözünürlüklü PDF vektör çizgiler indirmelere aktarıldı.',
    },
  },
} as const

export type TranslationKey = string

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

export function translate(
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const value = getNestedValue(translations[locale] as Record<string, unknown>, key)
  if (typeof value !== 'string') return key

  if (!params) return value

  return Object.entries(params).reduce(
    (text, [param, val]) => text.replace(new RegExp(`\\{\\{${param}\\}\\}`, 'g'), String(val)),
    value
  )
}

export function getProcessingMessages(locale: Locale): string[] {
  const messages = getNestedValue(translations[locale] as Record<string, unknown>, 'processing.messages')
  return Array.isArray(messages) ? (messages as string[]) : []
}

export function getStyleTranslation(locale: Locale, styleId: string): { name: string; description: string } {
  const style = getNestedValue(translations[locale] as Record<string, unknown>, `styles.${styleId}`)
  if (style && typeof style === 'object' && 'name' in style && 'description' in style) {
    return style as { name: string; description: string }
  }
  return { name: styleId, description: '' }
}

export function getHistoryFilterKeys(): { key: string; labelKey: string }[] {
  return [
    { key: 'All', labelKey: 'history.filterAll' },
    { key: 'Favorites', labelKey: 'history.filterFavorites' },
    { key: 'Portraits', labelKey: 'history.filterPortraits' },
    { key: 'Pets', labelKey: 'history.filterPets' },
    { key: 'Recent', labelKey: 'history.filterRecent' },
  ]
}

export function getDeviceLocale(): Locale {
  if (typeof navigator !== 'undefined' && navigator.language?.startsWith('tr')) {
    return 'tr'
  }
  return 'en'
}

export function getLocaleLabel(locale: Locale): string {
  return LOCALES.find((l) => l.code === locale)?.label ?? locale
}
