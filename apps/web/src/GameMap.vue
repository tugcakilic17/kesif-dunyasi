<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import MapArtwork from './MapArtwork.vue';
import GameMarkers from './GameMarkers.vue';
import GameMenu from './GameMenu.vue';
import { forestGames, forestGameThumbnail } from './forest-games';
import { harborGames, harborGameThumbnail } from './harbor-games';
import type { GameId } from './games/catalog';
import { clampWorldX, clampWorldY, imageHeight, imageWidth, oceanTileHeight, oceanTileWidth, worldCenter, worldHeight, worldImages, worldRegions, worldWidth, type RealmId } from './game-map';

const props = defineProps<{ initialRealm: RealmId }>();
const emit = defineEmits<{ home: []; play: [gameId: GameId] }>();

const viewport = ref<HTMLElement | null>(null);
const viewportWidth = ref(0);
const viewportHeight = ref(0);
const x = ref(0);
const y = ref(0);
const zoom = ref(1);
const dragging = ref(false);
// Start in the original forest, with the expanded campus reachable by panning.
const fittedZoom = computed(() => Math.max(viewportHeight.value / imageHeight, viewportWidth.value / imageWidth));
const minimumZoom = computed(() => Math.min(viewportWidth.value / worldWidth, viewportHeight.value / worldHeight));
// 100% is the normal opening scale for this viewport, not the artwork's pixel scale.
const maximumZoom = computed(() => fittedZoom.value);
const skyExtensionHeight = computed(() => Math.max(0, y.value));
// At overview scale, pad the exposed sides with the approved scene instead of a different ocean texture.
const leftExtensionWidth = computed(() => Math.max(0, x.value));
const rightExtensionLeft = computed(() => x.value + worldWidth * zoom.value);
const rightExtensionWidth = computed(() => Math.max(0, viewportWidth.value - rightExtensionLeft.value));
const oceanTiles = computed(() => {
  const width = oceanTileWidth * zoom.value;
  const height = oceanTileHeight * zoom.value;
  const tiles = [];
  for (let row = Math.floor(-y.value / height); row < Math.ceil((viewportHeight.value - y.value) / height); row++) {
    for (let column = Math.floor(-x.value / width); column < Math.ceil((viewportWidth.value - x.value) / width); column++) {
      tiles.push({ key: `${column}:${row}`, style: {
        left: `${x.value + column * width}px`, top: `${y.value + row * height}px`,
        width: `${width}px`, height: `${height}px`,
        transform: `scale(${Math.abs(column) % 2 ? -1 : 1}, ${Math.abs(row) % 2 ? -1 : 1})`,
      } });
    }
  }
  return tiles;
});
let resizeObserver: ResizeObserver | undefined;
let pointerId: number | null = null;
let startX = 0;
let startY = 0;
let originX = 0;
let originY = 0;

function clampX(value: number) {
  return clampWorldX(value, viewportWidth.value, viewportHeight.value, zoom.value, y.value);
}
function clampY(value: number) {
  return clampWorldY(value, viewportWidth.value, viewportHeight.value, zoom.value, x.value, y.value);
}

function centerOn(centerX: number, centerY: number, nextZoom: number) {
  zoom.value = Math.min(maximumZoom.value, Math.max(minimumZoom.value, nextZoom));
  x.value = clampX(viewportWidth.value / 2 - centerX * zoom.value);
  y.value = clampY(viewportHeight.value / 2 - centerY * zoom.value);
}
function openInitialRealm() {
  const region = worldRegions.find(region => region.id === props.initialRealm)!;
  if (region.id === 'science') centerOn(imageWidth * 1.97, imageHeight * 1.97, fittedZoom.value);
  else if (region.id === 'magic') centerOn(imageWidth * 3, imageHeight * 0.52, fittedZoom.value);
  else centerOn(region.x + region.width / 2, region.y + region.height / 2, fittedZoom.value);
}

function startDrag(event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0 || pointerId !== null) return;
  event.preventDefault();
  pointerId = event.pointerId;
  startX = event.clientX;
  startY = event.clientY;
  originX = x.value;
  originY = y.value;
  viewport.value?.setPointerCapture(event.pointerId);
  dragging.value = true;
}
function moveDrag(event: PointerEvent) {
  if (event.pointerId !== pointerId) return;
  x.value = clampX(originX + event.clientX - startX);
  y.value = clampY(originY + event.clientY - startY);
}
function endDrag(event: PointerEvent) {
  if (event.pointerId !== pointerId) return;
  stopDrag();
}
function stopDrag() {
  const capturedPointer = pointerId;
  pointerId = null;
  dragging.value = false;
  if (capturedPointer !== null && viewport.value?.hasPointerCapture(capturedPointer)) viewport.value.releasePointerCapture(capturedPointer);
}
function zoomMap(event: WheelEvent) {
  event.preventDefault();
  if (!event.deltaY || !viewport.value) return;
  const bounds = viewport.value.getBoundingClientRect();
  const mouseX = event.clientX - bounds.left;
  const mouseY = event.clientY - bounds.top;
  const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewportHeight.value : 1);
  const next = Math.min(maximumZoom.value, Math.max(minimumZoom.value, zoom.value * Math.exp(-delta * 0.0015)));
  const ratio = next / zoom.value;
  zoom.value = next;
  x.value = clampX(mouseX - (mouseX - x.value) * ratio);
  y.value = clampY(mouseY - (mouseY - y.value) * ratio);
  if (dragging.value) {
    startX = event.clientX;
    startY = event.clientY;
    originX = x.value;
    originY = y.value;
  }
}

onMounted(() => {
  resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry || entry.contentRect.width <= 0 || entry.contentRect.height <= 0) return;
    const oldWidth = viewportWidth.value;
    const oldHeight = viewportHeight.value;
    const centerX = oldWidth ? (oldWidth / 2 - x.value) / zoom.value : worldCenter.x;
    const centerY = oldHeight ? (oldHeight / 2 - y.value) / zoom.value : worldCenter.y;
    const relativeZoom = oldWidth ? zoom.value / fittedZoom.value : 1;
    // A resize changes the camera origin; an in-progress drag must not reuse the old one.
    stopDrag();
    viewportWidth.value = entry.contentRect.width;
    viewportHeight.value = entry.contentRect.height;
    if (!oldWidth) {
      openInitialRealm();
      return;
    }
    zoom.value = Math.min(maximumZoom.value, Math.max(minimumZoom.value, fittedZoom.value * relativeZoom));
    x.value = clampX(viewportWidth.value / 2 - centerX * zoom.value);
    y.value = clampY(viewportHeight.value / 2 - centerY * zoom.value);
  });
  if (viewport.value) resizeObserver.observe(viewport.value);
});
onBeforeUnmount(() => {
  stopDrag();
  resizeObserver?.disconnect();
});
</script>

<template>
  <main ref="viewport" class="map-viewport geometry-viewport" :class="{ dragging }"
    aria-label="Orman, şekiller bahçesi, deniz ve liman, geniş bilim kampüsü ve havada süzülen masal adası haritası"
    @pointerdown="startDrag" @pointermove="moveDrag" @pointerup="endDrag"
    @pointercancel="endDrag" @lostpointercapture="endDrag" @dragstart.prevent @wheel="zoomMap">
    <GameMenu @home="emit('home')" />
    <div class="ocean-background" aria-hidden="true">
      <img v-for="tile in oceanTiles" :key="tile.key" :src="worldImages[0]!.src" alt="" draggable="false" :style="tile.style" />
    </div>
    <div v-if="leftExtensionWidth > 0" class="map-side-extension" aria-hidden="true"
      :style="{ left: 0, width: `${leftExtensionWidth}px` }">
      <MapArtwork include-ocean :style="{ transform: `translate(${x}px, ${y}px) scale(${-zoom}, ${zoom})` }" />
    </div>
    <div v-if="rightExtensionWidth > 0" class="map-side-extension" aria-hidden="true"
      :style="{ left: `${rightExtensionLeft}px`, width: `${rightExtensionWidth}px` }">
      <!-- The fairy source already contains sea beyond the navigable world's right edge. -->
      <MapArtwork include-ocean :style="{ overflow: 'visible', transform: `translate(${-worldWidth * zoom}px, ${y}px) scale(${zoom})` }" />
    </div>
    <div v-if="skyExtensionHeight > 0" class="sky-extension" aria-hidden="true"
      :style="{ height: `${skyExtensionHeight}px` }" />
    <MapArtwork class="geometry-world" :style="{ transform: `translate(${x}px, ${y}px) scale(${zoom})` }" />
    <GameMarkers :games="forestGames" :thumbnail="forestGameThumbnail" label="Orman oyunları"
      @play="emit('play', $event)"
      :camera-x="x" :camera-y="y" :zoom="zoom"
      :viewport-width="viewportWidth" :viewport-height="viewportHeight" :dragging="dragging" />
    <GameMarkers :games="harborGames" :thumbnail="harborGameThumbnail" label="Liman oyunları"
      :camera-x="x" :camera-y="y" :zoom="zoom"
      :viewport-width="viewportWidth" :viewport-height="viewportHeight" :dragging="dragging" />
  </main>
</template>

<style scoped>
.geometry-viewport { background: #6dd5ee; overflow: clip; }
.ocean-background { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.ocean-background img { position: absolute; display: block; max-width: none; }
.map-side-extension { position: absolute; top: 0; bottom: 0; overflow: hidden; pointer-events: none; }
.sky-extension { position: absolute; left: 0; right: 0; overflow: hidden; pointer-events: none; }
.sky-extension {
  top: 0;
  background: linear-gradient(to bottom, #9adbff, #9adbff00),
    linear-gradient(to right, #30b6fa, #29aafa 45%, #1891fb);
}
</style>

