export const gameCatalog = {
  'memory-drawing': {
    name: 'Hafıza ve Çizim',
    realm: 'forest',
    load: () => import('./forest/memory-drawing/Game.vue'),
  },
} as const;

export type GameId = keyof typeof gameCatalog;

export function isGameId(value: string | null): value is GameId {
  return value !== null && Object.hasOwn(gameCatalog, value);
}
