<script setup lang="ts">
import { oceanTileHeight, oceanTileWidth, worldHeight, worldImages, worldWidth } from './game-map';

defineProps<{ includeOcean?: boolean }>();

// Use the same world-aligned, mirrored ocean tiles as the main viewport.
const oceanTiles = Array.from({ length: Math.ceil(worldHeight / oceanTileHeight) }, (_, row) =>
  Array.from({ length: Math.ceil(worldWidth / oceanTileWidth) }, (_, column) => ({
    key: `${column}:${row}`,
    style: {
      left: `${column * oceanTileWidth}px`, top: `${row * oceanTileHeight}px`,
      width: `${oceanTileWidth}px`, height: `${oceanTileHeight}px`,
      transform: `scale(${column % 2 ? -1 : 1}, ${row % 2 ? -1 : 1})`,
    },
  })),
).flat();
</script>

<template>
  <div class="map-artwork" :style="{ width: `${worldWidth}px`, height: `${worldHeight}px` }" aria-hidden="true">
    <template v-if="includeOcean">
      <img v-for="tile in oceanTiles" :key="tile.key" :src="worldImages[0]!.src" alt="" draggable="false" :style="tile.style" />
    </template>
    <img v-for="image in worldImages.slice(1)" :key="image.src" :src="image.src" alt="" draggable="false" decoding="async"
      :width="image.width" :height="image.height"
      :style="{ left: `${image.x}px`, top: `${image.y}px`, width: `${image.width}px`, height: `${image.height}px`,
        maskImage: image.maskImage, WebkitMaskImage: image.maskImage,
        maskComposite: 'intersect', WebkitMaskComposite: 'source-in',
        maskSize: '100% 100%', WebkitMaskSize: '100% 100%', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat' }" />
  </div>
</template>

<style scoped>
.map-artwork { position: absolute; top: 0; left: 0; transform-origin: 0 0; overflow: hidden; pointer-events: none; }
.map-artwork img { position: absolute; display: block; max-width: none; pointer-events: none; user-select: none; }
</style>
