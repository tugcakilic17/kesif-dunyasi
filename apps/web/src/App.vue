<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue';
import GameMap from './GameMap.vue';
import WorldHome from './WorldHome.vue';
import { worldRegions, type RealmId } from './game-map';
import { gameCatalog, isGameId, type GameId } from './games/catalog';
import GameShell from './games/shared/ui/GameShell.vue';

function realmFromUrl(): RealmId | null {
  const id = new URLSearchParams(window.location.search).get('region');
  return worldRegions.find(region => region.id === id)?.id ?? null;
}
const activeRealm = ref<RealmId | null>(realmFromUrl());
function gameFromUrl(): GameId | null {
  const id = new URLSearchParams(window.location.search).get('game');
  return isGameId(id) && gameCatalog[id].realm === activeRealm.value ? id : null;
}
const activeGame = ref<GameId | null>(gameFromUrl());
const isTransitioning = ref(false);
function navigate(realm: RealmId | null) {
  if (isTransitioning.value || (realm === activeRealm.value && !activeGame.value)) return;
  const url = new URL(window.location.href);
  url.searchParams.delete('harita');
  url.searchParams.delete('game');
  if (realm) url.searchParams.set('region', realm);
  else url.searchParams.delete('region');
  window.history.pushState(null, '', url);
  activeRealm.value = realm;
  activeGame.value = null;
}
async function focusGameMarker(id: GameId) {
  await nextTick();
  document.querySelector<HTMLButtonElement>(`[data-game-id="${id}"]`)?.focus({ preventScroll: true });
}
function openGame(id: GameId) {
  if (isTransitioning.value || activeGame.value || gameCatalog[id].realm !== activeRealm.value) return;
  const url = new URL(window.location.href);
  url.searchParams.set('game', id);
  window.history.pushState({ gameOverlay: true }, '', url);
  activeGame.value = id;
}
function closeGame() {
  const id = activeGame.value;
  if (!id) return;
  if (window.history.state?.gameOverlay) {
    activeGame.value = null;
    focusGameMarker(id);
    window.history.back();
    return;
  }
  const url = new URL(window.location.href);
  url.searchParams.delete('game');
  window.history.replaceState(null, '', url);
  activeGame.value = null;
  focusGameMarker(id);
}
function onHistoryChange() {
  const previousGame = activeGame.value;
  activeRealm.value = realmFromUrl();
  activeGame.value = gameFromUrl();
  if (previousGame && !activeGame.value) focusGameMarker(previousGame);
}
window.addEventListener('popstate', onHistoryChange);
onBeforeUnmount(() => window.removeEventListener('popstate', onHistoryChange));
</script>

<template>
  <div class="app-scene" :inert="isTransitioning" :aria-busy="isTransitioning">
    <Transition name="realm-transition" mode="out-in"
      @before-leave="isTransitioning = true" @after-enter="isTransitioning = false"
      @leave-cancelled="isTransitioning = false" @enter-cancelled="isTransitioning = false">
      <GameMap v-if="activeRealm" :key="activeRealm" :initial-realm="activeRealm" :inert="!!activeGame" :aria-hidden="activeGame ? true : undefined" @home="navigate(null)" @play="openGame" />
      <WorldHome v-else key="home" @enter="navigate" />
    </Transition>
    <GameShell v-if="activeGame" :key="activeGame" :game-id="activeGame" @back="closeGame" />
  </div>
</template>

<style scoped>
.app-scene { position: fixed; inset: 0; background: #10aef0; }
.realm-transition-leave-active { transition: opacity 160ms ease-in; }
.realm-transition-enter-active { transition: opacity 280ms ease-out; }
.realm-transition-leave-to, .realm-transition-enter-from { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .realm-transition-leave-active, .realm-transition-enter-active { transition-duration: 1ms; }
}
</style>
