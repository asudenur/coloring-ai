import { ImageSourcePropType } from 'react-native'
import { ASSETS } from './assets'

export type Style = {
  id: string
  name: string
  description: string
  image: ImageSourcePropType
  pro?: boolean
}

export const STYLES: Style[] = [
  { id: 'general', name: 'General', description: 'Balanced everyday line art', image: ASSETS.results.portraitLine },
  { id: 'detailed', name: 'Detailed', description: 'Intricate, dense linework', image: ASSETS.styles.detailed },
  { id: 'anime', name: 'Anime', description: 'Manga-inspired outlines', image: ASSETS.styles.anime, pro: true },
  { id: 'sketch', name: 'Sketch', description: 'Loose hand-drawn strokes', image: ASSETS.styles.sketch },
  { id: 'comic', name: 'Comic', description: 'Bold graphic-novel ink', image: ASSETS.styles.comic, pro: true },
  { id: 'minimal', name: 'Minimal', description: 'Single elegant contour', image: ASSETS.styles.minimal },
  { id: 'pencil', name: 'Pencil', description: 'Soft graphite shading', image: ASSETS.styles.sketch },
  { id: 'kids', name: 'Kids Coloring', description: 'Simple, playful shapes', image: ASSETS.styles.kids },
]

export type Creation = {
  id: string
  title: string
  style: string
  date: string
  photo: ImageSourcePropType
  result: ImageSourcePropType
  favorite?: boolean
  category?: string
}

export const CREATIONS: Creation[] = [
  { id: '1', title: 'Curly Portrait', style: 'General', date: 'Today', photo: ASSETS.photos.portrait, result: ASSETS.results.portraitLine, favorite: true, category: 'Portraits' },
  { id: '2', title: 'Golden Retriever', style: 'Detailed', date: 'Today', photo: ASSETS.photos.dog, result: ASSETS.results.dogLine, category: 'Pets' },
  { id: '3', title: 'Rose Bouquet', style: 'Minimal', date: 'Yesterday', photo: ASSETS.photos.flowers, result: ASSETS.results.flowersLine, favorite: true, category: 'Flowers' },
  { id: '4', title: 'Curly Portrait', style: 'Sketch', date: 'Mar 12', photo: ASSETS.photos.portrait, result: ASSETS.results.portraitLine, category: 'Portraits' },
  { id: '5', title: 'Golden Retriever', style: 'Comic', date: 'Mar 11', photo: ASSETS.photos.dog, result: ASSETS.results.dogLine, category: 'Pets' },
  { id: '6', title: 'Rose Bouquet', style: 'Kids', date: 'Mar 9', photo: ASSETS.photos.flowers, result: ASSETS.results.flowersLine, category: 'Flowers' },
]

export const PROCESSING_MESSAGES = [
  'Warming up the ink pens…',
  'Tracing every beautiful edge…',
  'Removing color, keeping the soul…',
  'Smoothing the linework…',
  'Almost ready to color…',
]
