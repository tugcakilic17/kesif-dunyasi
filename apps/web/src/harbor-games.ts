import { imageHeight, imageWidth } from './game-map';

const sourceScale = imageWidth / 1672;
// Landmarks are measured on the actual PNGs, then mapped through their scene bounds.
const harborPoint = (x: number, y: number) => ({
  x: x / 1486 * imageWidth,
  y: imageHeight - 250 * sourceScale + y / 1058 * (imageHeight + 250 * sourceScale),
});
const beachPoint = (x: number, y: number) => ({
  x: x / 1571 * imageWidth,
  y: 1382 * sourceScale + y / 1001 * 1065 * sourceScale,
});

export const harborGames = [
  { id: 'harbor-lighthouse', name: 'Deniz Feneri', ...harborPoint(399, 535) },
  { id: 'harbor-hut', name: 'Kıyı Kulübesi', ...harborPoint(617, 365) },
  { id: 'harbor-pier', name: 'İskele Macerası', ...harborPoint(520, 735) },
  { id: 'harbor-sailboat', name: 'Yelkenli Yolculuğu', ...harborPoint(931, 741) },
  { id: 'harbor-palm-island', name: 'Palmiye Adası', ...harborPoint(1188, 677) },
  { id: 'harbor-beach', name: 'Kumsal Keşfi', ...beachPoint(270, 713) },
  { id: 'harbor-beach-pier', name: 'Sahil İskelesi', ...beachPoint(628, 802) },
  { id: 'harbor-sunny-cove', name: 'Güneşli Koy', ...beachPoint(896, 601) },
];

// Reuse the existing sailboat illustration as the temporary game thumbnail.
export const harborGameThumbnail = {
  src: import.meta.env.BASE_URL + 'assets/game_map/island-sea-south-storybook-v1.png',
  width: 1486, height: 1058, viewBox: '850 645 170 170',
};
