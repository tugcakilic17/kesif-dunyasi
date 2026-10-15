<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import GameMap from './GameMap.vue';
import WorldHome from './WorldHome.vue';
import { worldRegions, type RealmId } from './game-map';

function realmFromUrl(): RealmId | null {
  const id = new URLSearchParams(window.location.search).get('region');
  return worldRegions.find(region => region.id === id)?.id ?? null;
}
const activeRealm = ref<RealmId | null>(realmFromUrl());
function navigate(realm: RealmId | null) {
  const url = new URL(window.location.href);
  url.searchParams.delete('harita');
  if (realm) url.searchParams.set('region', realm);
  else url.searchParams.delete('region');
  window.history.pushState(null, '', url);
  activeRealm.value = realm;
}
function onHistoryChange() { activeRealm.value = realmFromUrl(); }
window.addEventListener('popstate', onHistoryChange);
onBeforeUnmount(() => window.removeEventListener('popstate', onHistoryChange));
</script>

<template>
  <GameMap v-if="activeRealm" :initial-realm="activeRealm" @home="navigate(null)" />
  <WorldHome v-else @enter="navigate" />
</template>
