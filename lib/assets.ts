import { ImageSourcePropType } from 'react-native'

export const ASSETS: {
  photos: Record<string, ImageSourcePropType>
  results: Record<string, ImageSourcePropType>
  styles: Record<string, ImageSourcePropType>
} = {
  photos: {
    portrait: require('../public/photos/portrait.png'),
    dog: require('../public/photos/dog.png'),
    flowers: require('../public/photos/flowers.png'),
  },
  results: {
    portraitLine: require('../public/results/portrait-line.png'),
    dogLine: require('../public/results/dog-line.png'),
    flowersLine: require('../public/results/flowers-line.png'),
  },
  styles: {
    detailed: require('../public/styles/detailed.png'),
    anime: require('../public/styles/anime.png'),
    sketch: require('../public/styles/sketch.png'),
    comic: require('../public/styles/comic.png'),
    minimal: require('../public/styles/minimal.png'),
    kids: require('../public/styles/kids.png'),
  },
}
