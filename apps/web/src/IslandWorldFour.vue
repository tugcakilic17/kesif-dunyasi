<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { clampWorldX, clampWorldY, imageHeight, imageWidth, southForestWidth, worldCenter, worldHeight, worldImages, worldWidth } from './island-world';

const viewport = ref<HTMLElement | null>(null);
const viewportWidth = ref(0);
const viewportHeight = ref(0);
const x = ref(0);
const y = ref(0);
const zoom = ref(1);
const dragging = ref(false);
// Start in the original forest; two full garden screens continue to the east.
const fittedZoom = computed(() => Math.max(viewportHeight.value / imageHeight, viewportWidth.value / imageWidth));
// Keep a complete sea row available so the eastern islands remain reachable.
const minimumZoom = computed(() => Math.max(viewportHeight.value / imageHeight, viewportWidth.value / southForestWidth));
const maximumZoom = computed(() => Math.max(1, fittedZoom.value * 1.4));
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
  pointerId = null;
  dragging.value = false;
  if (viewport.value?.hasPointerCapture(event.pointerId)) viewport.value.releasePointerCapture(event.pointerId);
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
    viewportWidth.value = entry.contentRect.width;
    viewportHeight.value = entry.contentRect.height;
    zoom.value = Math.min(maximumZoom.value, Math.max(minimumZoom.value, fittedZoom.value * relativeZoom));
    x.value = clampX(viewportWidth.value / 2 - centerX * zoom.value);
    y.value = clampY(viewportHeight.value / 2 - centerY * zoom.value);
  });
  if (viewport.value) resizeObserver.observe(viewport.value);
});
onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <main ref="viewport" class="map-viewport island-viewport" :class="{ dragging }"
    aria-label="Sürükleyerek gezilebilen orman, iki bölümlü şekiller bahçesi, kumsal ve adalar haritası"
    @pointerdown="startDrag" @pointermove="moveDrag" @pointerup="endDrag"
    @pointercancel="endDrag" @lostpointercapture="endDrag" @dragstart.prevent @wheel="zoomMap">
    <div class="island-world" :style="{ width: `${worldWidth}px`, height: `${worldHeight}px`, transform: `translate3d(${x}px, ${y}px, 0) scale(${zoom})` }">
      <img v-for="image in worldImages" :key="image.src" class="island-art" :src="image.src" alt="" draggable="false" decoding="async"
        :width="image.width" :height="image.height"
        :style="{ left: `${image.x}px`, top: `${image.y}px`, width: `${image.width}px`, height: `${image.height}px`, maskImage: image.maskImage, WebkitMaskImage: image.maskImage,
          maskSize: '100% 100%', WebkitMaskSize: '100% 100%', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat' }" />
    </div>
  </main>
</template>

<style scoped>
.island-viewport { background: #6dd5ee; }
.island-world { position: absolute; top: 0; left: 0; transform-origin: 0 0; will-change: transform; }
.island-art { position: absolute; display: block; max-width: none; pointer-events: none; user-select: none; }
</style>
