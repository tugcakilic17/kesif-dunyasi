<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as Phaser from 'phaser'
import { createMemoryScene, DESIGN_WIDTH, DESIGN_HEIGHT } from './MemoryScene'
import { reduceMotion } from '../../../game-preferences'

import leafFilledUrl from './assets/ui/leaf_filled.png'
import leafSlotUrl from './assets/ui/leaf_slot.png'
import statusPanelUrl from './assets/ui/status_panel.png'
import titleMemoryDrawingUrl from './assets/ui/title_memory_drawing.png'

const gameContainer = ref(null)
const selectedGridSize = ref(3)
const roundResults = ref(Array(5).fill(null))
const timerKey = ref(0)
const timerRunning = ref(false)
const timerProgress = ref(1)
const emit = defineEmits(['complete'])
const ready = ref(false)
const completed = ref(false)
watch(completed, (isComplete) => {
  if (!isComplete) return
  const correct = roundResults.value.filter(Boolean).length
  emit('complete', {
    stars: correct === 5 ? 3 : correct >= 3 ? 2 : correct > 0 ? 1 : 0,
    metrics: [
      { label: 'Tamamlanan tur', value: `${correct} / 5` },
      { label: 'Izgara', value: `${selectedGridSize.value} × ${selectedGridSize.value}` },
    ],
  })
})
const systemMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const MemoryScene = createMemoryScene({ selectedGridSize, roundResults, timerKey, timerRunning, timerProgress, ready, completed, motionReduced: () => reduceMotion.value || systemMotion.matches })


let game = null

function restart() {
  game?.scene.getScene('MemoryScene')?.changeGridSize(selectedGridSize.value, true)
}
defineExpose({ restart })

const chooseGridSize = (size) => {
  if (!ready.value || selectedGridSize.value === size) return

  selectedGridSize.value = size
  roundResults.value = Array(5).fill(null)
  timerRunning.value = false
  game?.scene.getScene('MemoryScene')?.changeGridSize(size)
}


onMounted(() => {
  game = new Phaser.Game({
    type: Phaser.WEBGL,
    parent: gameContainer.value,
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
    backgroundColor: '#1f4d38',
    scene: MemoryScene,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoRound: true,
    },
    render: {
      antialias: true,
      roundPixels: false,
      transparent: false,
    },
  })
})

onBeforeUnmount(() => {
  game?.destroy(true)
  game = null
})
</script>

<template>
  <main class="scene" aria-label="Hafıza ve çizim oyunu">
    <div ref="gameContainer" class="game-container" aria-label="Soldaki deseni sağdaki karelere dokunarak tamamla"></div>
    <img
      class="game-title"
      :src="titleMemoryDrawingUrl"
      alt="Hafıza ve Çizim"
    />
    <div
      class="status-progress"
      aria-label="Tur süresi ve ilerleme"
    >
      <img class="status-progress__panel" :src="statusPanelUrl" alt="" />
      <div class="status-progress__timer" aria-label="10 saniyelik tur süresi">
        <div
          v-if="timerRunning"
          :key="timerKey"
          class="status-progress__timer-fill"
          :style="{ transform: `scaleX(${timerProgress})`, background: timerProgress < .15 ? '#e94f4f' : timerProgress < .32 ? '#e7b63f' : '#55bf63' }"
        ></div>
      </div>
      <span class="status-progress__divider" aria-hidden="true"></span>
      <div
        v-for="index in 5"
        :key="index"
        class="status-progress__leaf"
        role="img"
        :aria-label="`${index}. tur: ${roundResults[index - 1] === true ? 'Başarılı' : roundResults[index - 1] === false ? 'Süre doldu' : 'Bekliyor'}`"
        :style="{ left: `${66 + (index - 1) * 5.5}%` }"
      >
        <img :src="leafSlotUrl" alt="" />
        <img
          v-if="roundResults[index - 1] === true"
          class="status-progress__filled"
          :src="leafFilledUrl"
          alt=""
        />
      </div>
    </div>
    <aside class="grid-settings" aria-label="Grid boyutu">
      <span>Izgara</span>
      <button
        v-for="size in [3, 4, 5]"
        :key="size"
        type="button"
        :class="{ active: selectedGridSize === size }"
        :disabled="!ready"
        :aria-pressed="selectedGridSize === size"
        @click="chooseGridSize(size)"
      >
        {{ size }}×{{ size }}
      </button>
    </aside>
  </main>
</template>

<style scoped>
.scene,
.game-container {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.scene {
  position: relative;
}

.game-container :deep(canvas) {
  display: block;
}

.game-title {
  position: absolute;
  top: max(-12px, calc(env(safe-area-inset-top) - 12px));
  left: 50%;
  z-index: 5;
  display: block;
  width: clamp(220px, 30vw, 460px);
  max-width: calc(100vw - 24px);
  height: auto;
  image-rendering: auto;
  transform: translateX(-50%);
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.status-progress {
  position: absolute;
  bottom: max(8px, env(safe-area-inset-bottom));
  left: 50%;
  z-index: 6;
  width: clamp(300px, 38vw, 560px);
  max-width: calc(100vw - 16px);
  aspect-ratio: 2172 / 724;
  transform: translateX(-50%);
  pointer-events: none;
  user-select: none;
}

.status-progress__panel {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: auto;
  transform: scaleY(0.58);
  transform-origin: center;
  -webkit-user-drag: none;
}

.status-progress__timer {
  position: absolute;
  top: 50.5%;
  left: 9%;
  z-index: 2;
  width: 50%;
  height: 4.5%;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(156, 125, 83, 0.2);
  box-shadow: inset 0 1px 2px rgba(83, 55, 25, 0.13);
  transform: translateY(-50%);
}

.status-progress__timer-fill {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: #55bf63;
  box-shadow: 0 0 5px rgba(58, 174, 78, 0.34);
  transform-origin: left center;
}

.status-progress__divider {
  position: absolute;
  top: 50.5%;
  left: 63%;
  z-index: 2;
  width: 1px;
  height: 18%;
  background: rgba(121, 89, 49, 0.35);
  transform: translateY(-50%);
}

.status-progress__leaf {
  position: absolute;
  top: 50.5%;
  width: 5.5%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
}

.status-progress__leaf img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: auto;
  -webkit-user-drag: none;
}

.status-progress__filled {
  transform-origin: 50% 62%;
  animation: leaf-pop 480ms cubic-bezier(0.2, 0.9, 0.25, 1.28) both;
  filter: drop-shadow(0 3px 4px rgba(60, 112, 15, 0.28));
}

@keyframes leaf-pop {
  0% {
    opacity: 0;
    transform: scale(0.12) rotate(-22deg);
  }

  68% {
    opacity: 1;
    transform: scale(1.22) rotate(5deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.grid-settings {
  position: absolute;
  top: max(8px, env(safe-area-inset-top));
  right: max(8px, env(safe-area-inset-right));
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 7px;
  border: 1px solid rgba(103, 59, 22, 0.45);
  border-radius: 12px;
  background: rgba(255, 247, 220, 0.9);
  box-shadow: 0 3px 10px rgba(54, 31, 12, 0.22);
  color: #6a3a18;
  font: 700 clamp(10px, 0.75vw, 12px)/1 system-ui, sans-serif;
  backdrop-filter: blur(4px);
}

.grid-settings button {
  min-width: 44px;
  height: 44px;
  padding: 0 7px;
  border: 1px solid rgba(112, 67, 29, 0.38);
  border-radius: 8px;
  background: #fffaf0;
  color: #6a3a18;
  font: inherit;
  cursor: pointer;
  transition: transform 140ms ease, background 140ms ease, color 140ms ease;
}

.grid-settings button:hover {
  transform: translateY(-1px);
}

.grid-settings button.active {
  border-color: #1d4f86;
  background: #1d4f86;
  color: white;
}

@media (orientation: portrait) {
  .game-title {
    top: calc(env(safe-area-inset-top) + 24px);
    width: min(68vw, 420px);
  }

  .status-progress {
    bottom: max(2px, env(safe-area-inset-bottom));
    width: min(90vw, 520px);
  }

  .grid-settings {
    transform: none;
  }
}

@media (max-width: 480px) and (orientation: portrait) {
  .game-title {
    top: calc(env(safe-area-inset-top) + 52px);
    width: 74vw;
  }

  .status-progress {
    top: 48.5%;
    bottom: auto;
    width: 94vw;
  }

  .grid-settings {
    top: calc(env(safe-area-inset-top) + clamp(140px, 18vh, 168px));
    gap: 4px;
    padding: 4px 5px;
    border-radius: 10px;
  }

  .grid-settings > span {
    display: none;
  }

  .grid-settings button {
    min-width: 44px;
    height: 44px;
    padding: 0 5px;
  }
}

@media (min-width: 481px) and (max-width: 768px) and (orientation: portrait) {
  .status-progress {
    top: calc(34% + 19vw);
    bottom: auto;
  }

  .grid-settings {
    top: calc(env(safe-area-inset-top) + clamp(124px, 15vh, 154px));
  }
}

@media (max-height: 650px) and (orientation: landscape) {
  .game-title {
    top: max(-18px, calc(env(safe-area-inset-top) - 18px));
    width: min(25vw, 380px);
  }

  .status-progress {
    bottom: max(-4px, env(safe-area-inset-bottom));
    width: min(34vw, 460px);
  }

  .grid-settings {
    transform: none;
  }
}
.grid-settings button:disabled { opacity: .5; cursor: wait; }
</style>
