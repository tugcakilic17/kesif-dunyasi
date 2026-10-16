<script setup lang="ts">
import { defineAsyncComponent, nextTick, onErrorCaptured, onMounted, ref } from 'vue';
import { gameCatalog, type GameId } from '../../catalog';
import GameResultPanel from './GameResult.vue';
import type { GameControls, GameResult } from '../result';

const props = defineProps<{ gameId: GameId }>();
const emit = defineEmits<{ back: [] }>();
const backButton = ref<HTMLButtonElement | null>(null);
const failed = ref(false);
const result = ref<GameResult | null>(null);
const gameInstance = ref<GameControls | null>(null);
const game = gameCatalog[props.gameId];
const GameComponent = defineAsyncComponent({ loader: game.load, timeout: 30000 });

onMounted(() => backButton.value?.focus({ preventScroll: true }));
onErrorCaptured(() => { failed.value = true; return false; });

async function replay() {
  if (!gameInstance.value) return;
  gameInstance.value.restart();
  result.value = null;
  await nextTick();
  backButton.value?.focus({ preventScroll: true });
}
</script>

<template>
  <section class="game-shell" :aria-label="game.name">
    <button v-show="!result" ref="backButton" type="button" class="back-to-map" @click="emit('back')"><span aria-hidden="true">←</span> Haritaya Dön</button>
    <div v-if="failed" class="game-message" role="alert">
      <h1>Oyun açılamadı</h1><p>Haritaya dönüp tekrar deneyebilirsin.</p>
    </div>
    <Suspense v-else>
      <component :is="GameComponent" ref="gameInstance" @exit="emit('back')" @complete="result = $event" />
      <template #fallback><div class="game-message" role="status">Oyun hazırlanıyor…</div></template>
    </Suspense>
    <GameResultPanel v-if="result" :game-name="game.name" :result="result" @replay="replay" @back="emit('back')" />
  </section>
</template>

<style scoped>
.game-shell { position: fixed; inset: 0; z-index: 20; background: #315b45; overflow: hidden; }
.back-to-map { position: absolute; z-index: 30; top: max(12px, env(safe-area-inset-top)); left: max(12px, env(safe-area-inset-left)); display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 8px 14px; border: 1px solid #ddcfa9; border-radius: 16px; background: linear-gradient(#fffdf4, #f6ecd7); box-shadow: 0 4px 14px #204e3d33; color: #315b45; font: 700 15px 'Baloo 2', sans-serif; cursor: pointer; }
.back-to-map:hover { background: #fffdf4; }
.back-to-map:focus-visible { outline: 3px solid #fff4ad; outline-offset: 3px; }
.back-to-map span { font-size: 22px; line-height: 1; }
.game-message { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; color: #fff9e9; text-align: center; font: 700 20px 'Baloo 2', sans-serif; }
.game-message h1 { margin: 0; }
.game-message p { font-size: 16px; }
</style>
