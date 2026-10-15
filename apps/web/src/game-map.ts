export const imageWidth = 3840;
const sourceScale = imageWidth / 1672;
export const imageHeight = 941 * sourceScale;
export const seaWidth = imageWidth * 1.5;
export const worldCenter = { x: imageWidth / 2, y: imageHeight / 2 };
export const worldHeight = imageHeight * 2.6;
export const gardenWidth = imageWidth * 1.5;
// End shortly after the fairy cliffs, keeping just a narrow water margin.
export const worldWidth = imageWidth * 3.30;
export const oceanTileWidth = imageWidth * 1.5;
export const oceanTileHeight = oceanTileWidth / 2;
const overlap = 420 * sourceScale;
const topOverlap = 200 * sourceScale;
const assetUrl = (filename: string) => `${import.meta.env.BASE_URL}assets/game_map/${filename}`;

export const worldRegions = [
  { id: 'forest', name: 'Keşif Ormanı', x: 0, y: 0, width: imageWidth, height: imageHeight },
  { id: 'shapes', name: 'Şekiller Bahçesi', x: imageWidth, y: 0, width: gardenWidth, height: imageHeight },
  { id: 'sea', name: 'Deniz ve Liman', x: 0, y: imageHeight, width: seaWidth, height: imageHeight },
  { id: 'science', name: 'Bilim Diyarı', x: imageWidth, y: imageHeight, width: imageWidth * 1.5, height: imageHeight * 1.5 },
  { id: 'magic', name: 'Masal Diyarı', x: imageWidth * 2.5, y: 0, width: worldWidth - imageWidth * 2.5, height: imageHeight * 2.5 },
] as const;

export type RealmId = typeof worldRegions[number]['id'];

// Approved forest/coast panels retain their exact placement, scale and masks.
export const worldImages = [
  {
    src: assetUrl('world-ocean-backdrop-v3.png'), x: 0, y: 0,
    width: imageWidth * 3.5, height: worldHeight,
    maskImage: undefined,
  },
  {
    src: assetUrl('forest-valley-original.png'), x: 0, y: 0,
    width: imageWidth, height: imageHeight, maskImage: undefined,
  },
  {
    src: assetUrl('geometry-garden-main-v3.png'), x: imageWidth - overlap, y: 0,
    width: imageWidth + overlap, height: imageHeight,
    maskImage: `url(${assetUrl('geometry-garden-main-mask-v3.png')})`,
  },
  {
    src: assetUrl('geometry-garden-east-v2.png'), x: imageWidth * 2 - overlap, y: 0,
    width: imageWidth / 2 + overlap, height: imageHeight,
    maskImage: `url(${assetUrl('geometry-garden-east-mask-v2.png')})`,
  },
  {
    src: assetUrl('island-sea-south-v1.png'), x: 0, y: imageHeight - 250 * sourceScale,
    width: imageWidth, height: imageHeight + 250 * sourceScale,
    maskImage: `linear-gradient(to bottom, transparent ${180 * sourceScale}px, black ${250 * sourceScale}px)`,
  },
  {
    src: assetUrl('island-sea-east-garden-v5.png'), x: imageWidth - overlap, y: imageHeight - topOverlap,
    width: imageWidth / 2 + overlap, height: imageHeight + topOverlap,
    maskImage: `url(${assetUrl('island-sea-east-garden-mask-v5.png')})`,
  },
  {
    src: assetUrl('science-realm-v3.png'), x: seaWidth - overlap, y: imageHeight - topOverlap,
    width: imageWidth + overlap, height: imageHeight + topOverlap,
    maskImage: `url(${assetUrl('science-realm-mask-v3.png')})`,
  },
  {
    src: assetUrl('harbor-sea-south-v1.png'), x: 0, y: 1382 * sourceScale,
    width: 1672 * sourceScale, height: 1065 * sourceScale,
    maskImage: `url(${assetUrl('harbor-sea-south-mask-v1.png')})`,
  },
  {
    src: assetUrl('science-campus-v6.png'), x: 1252 * sourceScale, y: 741 * sourceScale,
    width: 2928 * sourceScale, height: 1612 * sourceScale,
    maskImage: `url(${assetUrl('science-campus-mask-v6.png')})`,
  },
  // Overlapping detail panels cover the campus; the approved source remains beneath their edge masks.
  {
    src: assetUrl('science-campus-north-v1.png'), x: 2506 * sourceScale, y: 741 * sourceScale,
    width: 1674 * sourceScale, height: 1112 * sourceScale,
    maskImage: `url(${assetUrl('science-campus-north-mask-v1.png')})`,
  },
  {
    src: assetUrl('science-campus-south-v1.png'), x: 1452 * sourceScale, y: 1431 * sourceScale,
    width: 2728 * sourceScale, height: 922 * sourceScale,
    maskImage: `url(${assetUrl('science-campus-south-mask-v1.png')})`,
  },
  {
    src: assetUrl('coast-valley-link-v1.png'), x: 1400 * sourceScale, y: 500 * sourceScale,
    width: 1050 * sourceScale, height: 700 * sourceScale,
    maskImage: `url(${assetUrl('coast-valley-link-mask-v1.png')})`,
  },
  {
    src: assetUrl('cloud-fairy-realm-v8.png'), x: 3580 * sourceScale, y: 0,
    width: 2272 * sourceScale, height: 2353 * sourceScale,
    maskImage: `url(${assetUrl('cloud-fairy-realm-mask-v8.png')})`,
  },
  {
    src: assetUrl('cloud-fairy-north-v1.png'), x: 4180 * sourceScale, y: 0,
    width: 1338 * sourceScale, height: 1353 * sourceScale,
    maskImage: `url(${assetUrl('cloud-fairy-north-mask-v1.png')})`,
  },
  {
    src: assetUrl('cloud-fairy-south-v1.png'), x: 3980 * sourceScale, y: 1000 * sourceScale,
    width: 1538 * sourceScale, height: 1353 * sourceScale,
    maskImage: `url(${assetUrl('cloud-fairy-south-mask-v1.png')})`,
  },
];

function clampOffset(value: number, viewportSize: number, worldSize: number, zoom: number) {
  const size = worldSize * zoom;
  return size <= viewportSize ? (viewportSize - size) / 2 : Math.min(0, Math.max(viewportSize - size, value));
}

// Science extends south and west; the cloud realm extends east of the garden and campus.
export function clampWorldX(value: number, viewportWidth: number, _viewportHeight: number, zoom: number, _y: number) {
  return clampOffset(value, viewportWidth, worldWidth, zoom);
}
export function clampWorldY(value: number, _viewportWidth: number, viewportHeight: number, zoom: number, _x: number, _currentY: number) {
  return clampOffset(value, viewportHeight, worldHeight, zoom);
}
