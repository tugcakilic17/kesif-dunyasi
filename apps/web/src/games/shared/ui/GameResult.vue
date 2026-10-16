<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { GameResult } from '../result';

const props = defineProps<{ gameName: string; result: GameResult }>();
const emit = defineEmits<{ replay: []; back: [] }>();
const dialog = ref<HTMLDialogElement | null>(null);
const mapButton = ref<HTMLButtonElement | null>(null);
const messages = [
  { title: 'Her deneme bir keşif!', text: 'Bir kez daha dene, kendi hızında ilerle.' },
  { title: 'Güzel bir başlangıç!', text: 'Keşfe devam et, her denemede daha da geliş.' },
  { title: 'Çok iyi gidiyorsun!', text: 'Biraz daha denemeyle bütün yıldızlar senin olabilir.' },
  { title: 'Harika bir keşifti!', text: 'Bütün yıldızları kazandın. Sıradaki keşfe hazır mısın?' },
];
const message = computed(() => messages[props.result.stars]);
const metrics = computed(() => props.result.metrics.slice(0, 3));

onMounted(() => {
  dialog.value?.showModal();
  mapButton.value?.focus({ preventScroll: true });
});
</script>

<template>
  <dialog ref="dialog" class="game-result" aria-labelledby="result-title" aria-describedby="result-message" @cancel.prevent>
    <div class="result-content">
      <p class="result-eyebrow">KEŞİF TAMAMLANDI</p>
      <p class="result-game">{{ gameName }}</p>

      <div class="result-stars" role="img" :aria-label="`3 yıldızdan ${result.stars} yıldız kazandın`">
        <svg v-for="star in 3" :key="star" class="result-star" :class="{ earned: star <= result.stars }" :style="{ '--order': star }" viewBox="0 0 100 100" aria-hidden="true">
          <path d="m50 8 12.7 25.8 28.5 4.1-20.6 20.1 4.9 28.4L50 73 24.5 86.4l4.9-28.4L8.8 37.9l28.5-4.1Z" />
          <path v-if="star <= result.stars" class="star-shine" d="m50 19 9 18.5 20.5 3" />
        </svg>
      </div>
      <h1 id="result-title">{{ message.title }}</h1>
      <p id="result-message" class="result-message">{{ message.text }}</p>

      <dl v-if="metrics.length" class="result-metrics">
        <div v-for="metric in metrics" :key="metric.label">
          <dt>{{ metric.label }}</dt>
          <dd>{{ metric.value }}</dd>
        </div>
      </dl>

      <div class="result-actions">
        <button ref="mapButton" type="button" class="result-primary" @click="emit('back')">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Zm0 0V3m6 18V6" /></svg>
          Haritaya Dön
        </button>
        <button type="button" class="result-secondary" @click="emit('replay')">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" /></svg>
          Tekrar Oyna
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.game-result {
  box-sizing: border-box;
  width: min(460px, calc(100% - 32px));
  max-width: calc(100% - 32px);
  max-height: calc(100dvh - 32px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  padding: 9px;
  overflow: auto;
  overscroll-behavior: contain;
  border: 1px solid #e5cfa5;
  border-radius: 32px;
  background: #f5e7cd;
  box-shadow: 0 24px 80px #102e3959, inset 0 1px 0 #fffaf0;
  color: #334e53;
  font-family: 'Baloo 2', sans-serif;
}
.game-result[open] { animation: result-enter 280ms ease-out both; }
.game-result::backdrop { background: #102e3b9e; backdrop-filter: blur(5px); }
.result-content {
  padding: 26px 25px 24px;
  border: 1px solid #fffdf3;
  border-radius: 24px;
  background: radial-gradient(ellipse at 50% 28%, #fffef5, #fcf6e8 75%);
  text-align: center;
}
.result-eyebrow { margin: 0; color: #7e6948; font-size: 11px; font-weight: 800; letter-spacing: 2px; }
.result-game { margin: 5px 0 0; font-size: 17px; font-weight: 600; overflow-wrap: anywhere; }
.result-stars { display: flex; justify-content: center; align-items: center; gap: 8px; margin: 25px 0 22px; }
.result-star { width: 76px; height: 76px; overflow: visible; fill: #e6dfcf; stroke: #c9beaa; stroke-width: 3; stroke-linejoin: round; }
.result-star:nth-child(2) { width: 92px; height: 92px; transform: translateY(-7px); }
.result-star.earned { fill: #f6c351; stroke: #b87e23; filter: drop-shadow(0 5px 0 #db9d3140); animation: star-reveal 420ms ease-out both; animation-delay: calc(var(--order) * 100ms); }
.star-shine { fill: none; stroke: #ffeab1; stroke-width: 5; stroke-linecap: round; }
h1 { margin: 0; color: #2c5354; font-size: clamp(25px, 5.7vw, 32px); line-height: 1.2; font-weight: 800; }
.result-message { max-width: 300px; margin: 10px auto 22px; color: #65716b; font-size: 16px; line-height: 1.5; }
.result-metrics { display: flex; justify-content: center; margin: 0 0 25px; padding: 15px 4px; border-block: 1px solid #e9dfca; }
.result-metrics > div { flex: 1; min-width: 0; padding: 0 10px; }
.result-metrics > div + div { border-left: 1px solid #e9dfca; }
dt { color: #687268; font-size: 13px; line-height: 1.35; }
dd { margin: 5px 0 0; color: #3b5954; font-size: 21px; font-weight: 800; line-height: 1.25; overflow-wrap: anywhere; }
.result-actions { display: grid; gap: 10px; }
.result-actions button { display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 50px; padding: 10px 16px; border: 1px solid; border-radius: 14px; font: 700 17px/1.3 'Baloo 2', sans-serif; cursor: pointer; transition: background 150ms, transform 150ms; }
.result-actions button:hover { transform: translateY(-1px); }
.result-actions button:active { transform: translateY(1px); }
.result-actions button:focus-visible { outline: 3px solid #b47b24; outline-offset: 4px; }
.result-actions svg { width: 21px; height: 21px; flex: 0 0 auto; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.result-actions .result-primary { border-color: #245d63; background: #316f73; box-shadow: 0 3px 0 #204e53; color: #fffdf4; }
.result-actions .result-primary:hover { background: #285f64; }
.result-actions .result-secondary { border-color: #d9ceb6; background: #fffaf0; color: #47615b; }
.result-actions .result-secondary:hover { background: #f3ebd9; }
@keyframes result-enter { from { opacity: 0; translate: 0 12px; } to { opacity: 1; translate: 0 0; } }
@keyframes star-reveal { from { opacity: 0; scale: .65; } to { opacity: 1; scale: 1; } }
@media (max-width: 380px), (max-height: 620px) {
  .result-content { padding: 20px 16px; }
  .result-stars { margin: 14px 0; }
  .result-star { width: 60px; height: 60px; }
  .result-star:nth-child(2) { width: 74px; height: 74px; }
  .result-message { margin-block: 8px 14px; font-size: 14px; }
  .result-metrics { margin-bottom: 16px; padding-block: 10px; }
  .result-actions button { min-height: 46px; }
}
@media (max-height: 430px) and (min-width: 620px) {
  .game-result { width: min(680px, calc(100% - 32px)); }
  .result-content { display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; padding: 18px 24px; }
  .result-eyebrow, .result-game, .result-stars, h1, .result-message { grid-column: 1; }
  .result-stars { margin: 14px 0 12px; }
  h1 { font-size: 24px; }
  .result-message { margin-bottom: 0; font-size: 14px; }
  .result-metrics { grid-column: 2; grid-row: 1 / 5; align-self: end; margin-bottom: 20px; }
  .result-actions { grid-column: 2; grid-row: 5 / 7; align-self: start; }
}
@media (prefers-reduced-motion: reduce) {
  .game-result[open], .result-star.earned { animation: none; }
  .result-actions button { transition: none; }
}
</style>
