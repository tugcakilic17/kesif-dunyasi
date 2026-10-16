import { imageWidth } from './game-map';
import memoryMascot from './games/forest/memory-drawing/assets/ui/maskot_normal.png';

// Landmark positions in the original 1672 × 941 forest illustration.
// Convert once to world coordinates so markers stay attached while panning/zooming.
export const forestSourceScale = imageWidth / 1672;
export const forestGameThumbnail = {
  src: import.meta.env.BASE_URL + 'assets/world_map/ui/forest-tree-icon-v1.png',
  width: 1254, height: 1254, viewBox: '52 203 1096 844',
};
export const forestGames = [
  { id: 'treehouse', name: 'Hafıza ve Çizim', x: 385, y: 500, gameId: 'memory-drawing' as const,
    thumbnail: { src: memoryMascot, width: 1199, height: 1312, viewBox: '180 80 800 800' } },
  { id: 'camp', name: 'Kamp Ateşi', x: 727, y: 308 },
  { id: 'lookout', name: 'Gözcü Kulesi', x: 1103, y: 199 },
  { id: 'waterfall', name: 'Şelale Keşfi', x: 634, y: 518 },
  { id: 'bridge', name: 'Köprü Yolculuğu', x: 815, y: 610 },
  { id: 'picnic', name: 'Orman Pikniği', x: 1091, y: 483 },
  { id: 'cave', name: 'Gizemli Mağara', x: 1342, y: 610 },
  { id: 'target', name: 'Hedef Ustası', x: 1396, y: 754 },
].map(game => ({ ...game, x: game.x * forestSourceScale, y: game.y * forestSourceScale }));
