<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import MapArtwork from './MapArtwork.vue';
import { clampWorldX, clampWorldY, imageHeight, imageWidth, oceanTileHeight, oceanTileWidth, worldCenter, worldHeight, worldImages, worldRegions, worldWidth, type RealmId } from './game-map';

const props = defineProps<{ initialRealm: RealmId }>();
const emit = defineEmits<{ home: [] }>();

const viewport = ref<HTMLElement | null>(null);
const viewportWidth = ref(0);
const viewportHeight = ref(0);
const x = ref(0);
const y = ref(0);
const zoom = ref(1);
const dragging = ref(false);
const overview = ref(false);
const selectedRealm = ref('');
// Start in the original forest, with the expanded campus reachable by panning.
const fittedZoom = computed(() => Math.max(viewportHeight.value / imageHeight, viewportWidth.value / imageWidth));
const minimumZoom = computed(() => Math.min(viewportWidth.value / worldWidth, viewportHeight.value / worldHeight));
// 100% is the normal opening scale for this viewport, not the artwork's pixel scale.
const maximumZoom = computed(() => fittedZoom.value);
const zoomPercentage = computed(() => fittedZoom.value > 0 ? Math.round(zoom.value / fittedZoom.value * 100) : 100);
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
function showWholeWorld() {
  overview.value = true;
  centerOn(worldWidth / 2, worldHeight / 2, minimumZoom.value);
}
function zoomAtCenter(factor: number) {
  overview.value = false;
  const centerX = (viewportWidth.value / 2 - x.value) / zoom.value;
  const centerY = (viewportHeight.value / 2 - y.value) / zoom.value;
  centerOn(centerX, centerY, Math.min(maximumZoom.value, Math.max(minimumZoom.value, zoom.value * factor)));
}
function travelToRealm() {
  const region = worldRegions.find(region => region.id === selectedRealm.value);
  if (!region) return;
  overview.value = false;
  if (region.id === 'science') {
    // Keep the normal exploration scale instead of shrinking the larger campus into one view.
    centerOn(imageWidth * 1.97, imageHeight * 1.97, fittedZoom.value);
    selectedRealm.value = '';
    return;
  }
  if (region.id === 'magic') {
    // Explore the large cloud realm at the same scale as the original forest.
    centerOn(imageWidth * 3, imageHeight * 0.52, fittedZoom.value);
    selectedRealm.value = '';
    return;
  }
  const realmZoom = Math.max(minimumZoom.value, Math.min(maximumZoom.value,
    viewportWidth.value / (region.width * 1.12), viewportHeight.value / (region.height * 1.12)));
  centerOn(region.x + region.width / 2, region.y + region.height / 2, realmZoom);
  selectedRealm.value = '';
}

function openInitialRealm() {
  const region = worldRegions.find(region => region.id === props.initialRealm)!;
  if (region.id === 'science') centerOn(imageWidth * 1.97, imageHeight * 1.97, fittedZoom.value);
  else if (region.id === 'magic') centerOn(imageWidth * 3, imageHeight * 0.52, fittedZoom.value);
  else centerOn(region.x + region.width / 2, region.y + region.height / 2, fittedZoom.value);
}

function startDrag(event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0 || pointerId !== null) return;
  overview.value = false;
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
  pointerId = null;
  dragging.value = false;
  if (viewport.value?.hasPointerCapture(event.pointerId)) viewport.value.releasePointerCapture(event.pointerId);
}
function zoomMap(event: WheelEvent) {
  event.preventDefault();
  if (!event.deltaY || !viewport.value) return;
  overview.value = false;
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
    viewportWidth.value = entry.contentRect.width;
    viewportHeight.value = entry.contentRect.height;
    if (!oldWidth) {
      openInitialRealm();
      return;
    }
    if (overview.value) {
      showWholeWorld();
      return;
    }
    zoom.value = Math.min(maximumZoom.value, Math.max(minimumZoom.value, fittedZoom.value * relativeZoom));
    x.value = clampX(viewportWidth.value / 2 - centerX * zoom.value);
    y.value = clampY(viewportHeight.value / 2 - centerY * zoom.value);
  });
  if (viewport.value) resizeObserver.observe(viewport.value);
});
onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <main ref="viewport" class="map-viewport geometry-viewport" :class="{ dragging }"
    aria-label="Orman, şekiller bahçesi, deniz ve liman, geniş bilim kampüsü ve havada süzülen masal adası haritası"
    @pointerdown="startDrag" @pointermove="moveDrag" @pointerup="endDrag"
    @pointercancel="endDrag" @lostpointercapture="endDrag" @dragstart.prevent @wheel="zoomMap">
    <button type="button" class="home-control" @pointerdown.stop @wheel.stop @click="emit('home')">← Dünya Haritası</button>
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
    <nav class="map-controls" aria-label="Diyarlar arasında gezinme" @pointerdown.stop @wheel.stop>
      <button type="button" @click="showWholeWorld">Tüm Harita</button>
      <select v-model="selectedRealm" aria-label="Diyara git" @change="travelToRealm">
        <option disabled value="">Diyara git</option>
        <option v-for="region in worldRegions" :key="region.id" :value="region.id">{{ region.name }}</option>
      </select>
      <button type="button" class="zoom-control" aria-label="Uzaklaş" @click="zoomAtCenter(1 / 1.35)">−</button>
      <output class="zoom-percentage" aria-label="Yakınlaştırma oranı" aria-live="off">%{{ zoomPercentage }}</output>
      <button type="button" class="zoom-control" aria-label="Yakınlaş" :disabled="zoom >= maximumZoom" @click="zoomAtCenter(1.35)">+</button>
    </nav>
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
.home-control {
  position: absolute; z-index: 5; left: 14px; top: 14px;
  min-height: 38px; padding: 0 14px; border: 2px solid #d7deb5; border-radius: 12px;
  color: #385435; background: #fff9e8ed; font: 600 13px system-ui, sans-serif; cursor: pointer;
  box-shadow: 0 3px 12px #31462a30;
}
.home-control:focus-visible { outline: 3px solid #385d38; outline-offset: 2px; }
.map-controls {
  position: absolute; z-index: 5;
  left: max(14px, env(safe-area-inset-left)); bottom: max(14px, env(safe-area-inset-bottom));
  display: flex; gap: 6px; padding: 6px; border-radius: 14px;
  background: #fff9e8ed; box-shadow: 0 3px 12px #31462a30;
  cursor: default;
}
.map-controls button, .map-controls select {
  min-height: 38px; padding: 0 12px; border: 2px solid #d7deb5; border-radius: 9px;
  color: #385435; background: #f6f0d8; font: 600 13px system-ui, sans-serif; cursor: pointer;
}
.map-controls :focus-visible { outline: 3px solid #385d38; outline-offset: 2px; }
.map-controls .zoom-control { width: 34px; padding: 0; font-size: 19px; }
.zoom-percentage { display: flex; align-items: center; justify-content: center; min-width: 42px; color: #385435; font: 600 13px system-ui, sans-serif; font-variant-numeric: tabular-nums; }
.map-controls button:disabled { cursor: default; opacity: 0.5; }
</style>

