<script setup lang="ts">
import { computed } from 'vue';

type SurfaceKind = 'header' | 'panel' | 'heading' | 'logo' | 'badge' | 'avatar' | 'play' | 'forest' | 'points' | 'target';
type Surface = { file: string; width: number; height: number; bounds: [number, number, number, number]; sliced?: boolean; capWidth?: number; fit?: boolean };
const props = defineProps<{ kind: SurfaceKind }>();

// Render the original raster assets. Capsule ends retain their proportions while only the straight middle extends.
const surfaces: Record<SurfaceKind, Surface> = {
  header: { file: 'header-bar-ivory-v1.png', width: 2172, height: 724, bounds: [17, 187, 2141, 355], sliced: true, capWidth: 355 },
  panel: { file: 'info-panel-ivory-v2.png', width: 2172, height: 724, bounds: [28, 58, 2118, 600] },
  heading: { file: 'heading-banner-ivory-text-v1.png', width: 2172, height: 724, bounds: [17, 146, 2138, 425], fit: true },
  logo: { file: 'world-logo-soft-v1.png', width: 2172, height: 724, bounds: [47, 109, 2081, 479], fit: true },
  badge: { file: 'smiling-star-badge.png', width: 1254, height: 1254, bounds: [161, 32, 929, 1177], fit: true },
  avatar: { file: 'parrot-avatar-v1.png', width: 1254, height: 1254, bounds: [40, 48, 1176, 1176], fit: true },
  play: { file: 'play-button-sage-v1.png', width: 1254, height: 1254, bounds: [64, 64, 1126, 1126], fit: true },
  forest: { file: 'forest-tree-icon-v1.png', width: 1254, height: 1254, bounds: [52, 203, 1148, 844], fit: true },
  points: { file: 'points-star-soft-v1.png', width: 1254, height: 1254, bounds: [120, 160, 1012, 930], fit: true },
  target: { file: 'daily-quest-target-v1.png', width: 1254, height: 1254, bounds: [150, 150, 1040, 990], fit: true },
};
const surface = computed(() => surfaces[props.kind]);
const assetBase = import.meta.env.BASE_URL + 'assets/world_map/ui/';
const slices = computed(() => {
  const [x, y, width, height] = surface.value.bounds;
  const cap = surface.value.capWidth ?? height / 2;
  return [
    [x, y, cap, height].join(' '),
    [x + cap, y, width - 2 * cap, height].join(' '),
    [x + width - cap, y, cap, height].join(' '),
  ];
});
</script>

<template>
  <div v-if="surface.sliced" class="home-surface capsule-surface" aria-hidden="true">
    <svg v-for="(box, index) in slices" :key="index" :viewBox="box" preserveAspectRatio="none" class="surface-piece" :class="{ 'surface-middle': index === 1 }" focusable="false">
      <image :href="assetBase + surface.file" :width="surface.width" :height="surface.height" />
    </svg>
  </div>
  <svg v-else class="home-surface" :viewBox="surface.bounds.join(' ')" :preserveAspectRatio="surface.fit ? 'xMidYMid meet' : 'none'" aria-hidden="true" focusable="false">
    <image :href="assetBase + surface.file" :width="surface.width" :height="surface.height" />
  </svg>
</template>

<style scoped>
.home-surface { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; overflow: hidden; }
.capsule-surface { display: flex; }
.surface-piece { display: block; flex: 0 0 var(--surface-cap, 24px); width: var(--surface-cap, 24px); height: 100%; overflow: hidden; }
.surface-middle { flex: 1 1 0; width: 0; min-width: 0; margin-inline: -1px; }
</style>
