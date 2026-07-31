export type CropRatio = '1:1' | '4:5' | '3:4' | '9:16'

export const CROP_RATIOS: CropRatio[] = ['1:1', '4:5', '3:4', '9:16']

export function cropRatioToNumber(ratio: CropRatio): number {
  const [w, h] = ratio.split(':').map(Number)
  return w / h
}

export function cropFrameStyle(ratio: CropRatio) {
  const aspectRatio = cropRatioToNumber(ratio)
  return aspectRatio >= 1
    ? { width: '100%' as const, aspectRatio }
    : { height: '100%' as const, aspectRatio }
}

export function cropPreviewSize(ratio: CropRatio, maxSize: number) {
  const aspectRatio = cropRatioToNumber(ratio)
  if (aspectRatio >= 1) {
    return { width: maxSize, height: maxSize / aspectRatio, aspectRatio }
  }
  return { width: maxSize * aspectRatio, height: maxSize, aspectRatio }
}
