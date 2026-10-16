<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { imageWidth } from './game-map';
import type { GameId } from './games/catalog';

type Thumbnail = { src: string; width: number; height: number; viewBox: string };

const props = defineProps<{
  games: ReadonlyArray<{ id: string; name: string; x: number; y: number; gameId?: GameId; thumbnail?: Thumbnail }>;
  thumbnail: Thumbnail;
  label: string;
  cameraX: number;
  cameraY: number;
  zoom: number;
  viewportWidth: number;
  viewportHeight: number;
  dragging: boolean;
}>();
const emit = defineEmits<{ play: [gameId: GameId] }>();

const activeGame = ref<string | null>(null);
const markerSize = computed(() => Math.min(76, 60 * imageWidth / 1672 * props.zoom));
const visibleGames = computed(() => props.games.map(game => {
  const left = props.cameraX + game.x * props.zoom;
  const top = props.cameraY + game.y * props.zoom;
  const labelLeft = left > props.viewportWidth / 2;
  const labelSpace = (labelLeft ? left : props.viewportWidth - left) - markerSize.value / 2 - 24;
  const labelOffsetY = Math.max(36, Math.min(props.viewportHeight - 36, top)) - top;
  return { ...game, thumbnail: game.thumbnail ?? props.thumbnail, left, top, labelLeft, labelWidth: Math.max(0, Math.min(220, labelSpace)), labelOffsetY };
}).filter(game => game.left >= 0 && game.left <= props.viewportWidth && game.top >= 0 && game.top <= props.viewportHeight));

watch(() => props.dragging, dragging => { if (dragging) activeGame.value = null; });
</script>

<template>
  <div class="map-games" role="group" :aria-label="label"
    :style="{ '--marker-size': `${markerSize}px` }">
    <button v-for="game in visibleGames" :key="game.id" type="button" class="map-game"
      :class="{ 'is-active': activeGame === game.id && !dragging, 'label-left': game.labelLeft }"
      :style="{ left: `${game.left}px`, top: `${game.top}px`, '--label-width': `${game.labelWidth}px`, '--label-offset-y': `${game.labelOffsetY}px` }"
      :aria-label="game.name"
      :data-game-id="game.gameId"
      @pointerdown.stop @pointerenter="activeGame = game.id" @pointerleave="activeGame = null"
      @click="game.gameId && emit('play', game.gameId)"
      @focus="activeGame = game.id" @blur="activeGame = null" @keydown.esc="activeGame = null">
      <span class="game-circle" aria-hidden="true">
        <svg class="game-thumbnail" :viewBox="game.thumbnail.viewBox" preserveAspectRatio="xMidYMid slice" focusable="false">
          <image :href="game.thumbnail.src" :width="game.thumbnail.width" :height="game.thumbnail.height" />
        </svg>
      </span>
      <span class="game-name" aria-hidden="true">{{ game.name }}</span>
    </button>
  </div>
</template>

<style scoped>
.map-games { position: absolute; inset: 0; pointer-events: none; --marker-depth: min(1.25px, calc(var(--marker-size) / 56)); }
.map-game {
  position: absolute; z-index: 1; display: grid; place-items: center;
  width: var(--marker-size); height: var(--marker-size); padding: 0; border: 0;
  border-radius: 50%; background: transparent; transform: translate(-50%, -50%);
  color: #315b38; font-family: 'Baloo 2', 'Trebuchet MS', sans-serif;
  cursor: pointer; pointer-events: auto; -webkit-tap-highlight-color: transparent;
}
.game-circle {
  display: block; width: 100%; height: 100%; box-sizing: border-box; padding: calc(var(--marker-size) * .065);
  border: clamp(.5px, calc(var(--marker-size) * .055), 3.5px) solid #fff6de; border-radius: 50%; background: linear-gradient(#fffdf2, #f0e2bf);
  box-shadow: inset 0 var(--marker-depth) 0 #fff,
    0 0 0 var(--marker-depth) #8c795799,
    0 calc(2 * var(--marker-depth)) 0 #31503c66,
    0 calc(6 * var(--marker-depth)) calc(12 * var(--marker-depth)) #163f3566,
    0 var(--marker-depth) calc(3 * var(--marker-depth)) #163f3552;
  transition: transform 260ms cubic-bezier(.2, .8, .2, 1), box-shadow 260ms ease, border-color 260ms ease;
}
.game-thumbnail { display: block; width: 100%; height: 100%; overflow: hidden; border-radius: 50%; filter: saturate(.84) contrast(.96); }
.game-name {
  position: absolute; left: calc(100% + 14px); top: calc(50% + var(--label-offset-y));
  box-sizing: border-box; width: max-content; max-width: var(--label-width);
  padding: 9px 16px; border: 1px solid #e6ce8c; border-radius: 16px;
  background: linear-gradient(#fffdf4, #f6ecd4); box-shadow: 0 4px 12px #254c3b38;
  font-size: 18px; font-weight: 800; line-height: 1.2; text-align: left;
  opacity: 0; visibility: hidden; transform: translate(-8px, -50%);
  pointer-events: none;
  transition: opacity 180ms ease, transform 240ms cubic-bezier(.2, .8, .2, 1), visibility 180ms;
}
.label-left .game-name { left: auto; right: calc(100% + 14px); transform: translate(8px, -50%); }
.map-game.is-active { z-index: 3; }
.is-active .game-circle {
  transform: scale(1.2); border-color: #fffbe9;
  box-shadow: inset 0 var(--marker-depth) 0 #fff,
    0 0 0 calc(3 * var(--marker-depth)) #fff6ce70,
    0 calc(3 * var(--marker-depth)) 0 #31503c66,
    0 calc(9 * var(--marker-depth)) calc(18 * var(--marker-depth)) #163f3570;
}
.is-active .game-name { opacity: 1; visibility: visible; transform: translate(0, -50%); }
.map-game:focus-visible { outline: 3px solid #fff6ad; outline-offset: 7px; }
@media (max-width: 600px) { .game-name { font-size: 16px; padding: 8px 12px; } }
@media (prefers-reduced-motion: reduce) {
  .game-circle, .game-name { transition: none; }
  .is-active .game-circle { transform: none; }
}
</style>
