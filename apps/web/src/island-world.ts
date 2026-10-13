// An independent fourth world. The selected valley source is reused unchanged.
export const imageWidth = 3840;
const sourceScale = imageWidth / 1672;
export const imageHeight = 941 * sourceScale;
export const southForestWidth = imageWidth;
export const seaWidth = imageWidth * 1.5;
export const worldWidth = imageWidth * 3;
export const worldHeight = imageHeight * 2;
export const worldCenter = { x: imageWidth / 2, y: imageHeight / 2 };
const overlap = 250 * sourceScale;
const blendStart = 180 * sourceScale;
const eastOverlap = 420 * sourceScale;
const beachTopOverlap = 200 * sourceScale;
// Resolve public assets under the repository path when hosted on GitHub Pages.
const assetUrl = (filename: string) => `${import.meta.env?.BASE_URL ?? '/'}${filename}`;

export const worldImages = [
  { src: assetUrl('forest-valley-original.png'), x: 0, y: 0, width: imageWidth, height: imageHeight, maskImage: undefined },
  {
    src: assetUrl('shape-garden-west-v1.png'), x: imageWidth - eastOverlap, y: 0,
    width: imageWidth + eastOverlap, height: imageHeight,
    maskImage: `url(${assetUrl('shape-garden-west-join-mask-v1.png')})`,
  },
  {
    src: assetUrl('shape-garden-east-v1.png'), x: imageWidth * 2 - eastOverlap, y: 0,
    width: imageWidth + eastOverlap, height: imageHeight,
    maskImage: `url(${assetUrl('shape-garden-east-join-mask-v1.png')})`,
  },
  {
    src: assetUrl('island-sea-south-v1.png'), x: 0, y: imageHeight - overlap,
    width: imageWidth, height: imageHeight + overlap,
    maskImage: `linear-gradient(to bottom, transparent ${blendStart}px, black ${overlap}px)`,
  },
  {
    src: assetUrl('island-sea-east-garden-v5.png'), x: imageWidth - eastOverlap, y: imageHeight - beachTopOverlap,
    width: imageWidth / 2 + eastOverlap, height: imageHeight + beachTopOverlap,
    maskImage: `url(${assetUrl('island-sea-east-garden-mask-v5.png')})`,
  },
];

function clampOffset(value: number, viewportSize: number, worldSize: number, zoom: number) {
  const size = worldSize * zoom;
  return size <= viewportSize ? (viewportSize - size) / 2 : Math.min(0, Math.max(viewportSize - size, value));
}

// The forest and two garden screens form a wide upper row; the sea is narrower.
export function clampWorldX(value: number, viewportWidth: number, viewportHeight: number, zoom: number, y: number) {
  const bottom = (viewportHeight - y) / zoom;
  const coveredWidth = bottom > imageHeight + 0.01 ? seaWidth : worldWidth;
  return clampOffset(value, viewportWidth, coveredWidth, zoom);
}

export function clampWorldY(value: number, viewportWidth: number, viewportHeight: number, zoom: number, x: number, _currentY: number) {
  const offset = clampOffset(value, viewportHeight, worldHeight, zoom);
  return (viewportWidth - x) / zoom > seaWidth + 0.01 ? Math.max(offset, viewportHeight - imageHeight * zoom) : offset;
}
