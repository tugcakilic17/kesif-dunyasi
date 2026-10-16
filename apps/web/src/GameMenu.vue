<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue';
import HomeIcon from './HomeIcon.vue';
import HomeSurface from './HomeSurface.vue';
import { reduceMotion } from './game-preferences';
const emit = defineEmits<{ home: [] }>();
const panelId = useId();
const panel = ref<HTMLElement | null>(null);
const isOpen = ref(false);
type MenuView = 'menu' | 'profile' | 'settings' | 'help';
const view = ref<MenuView>('menu');
const backButton = ref<HTMLButtonElement | null>(null);
const viewTitle = computed(() => ({ menu: 'Keşif Menüsü', profile: 'Profilim', settings: 'Ayarlar', help: 'Nasıl Oynanır?' })[view.value]);

function onToggle(event: Event) {
  isOpen.value = (event as ToggleEvent).newState === 'open';
  if (!isOpen.value) view.value = 'menu';
}
async function showView(next: MenuView) {
  const previous = view.value;
  view.value = next;
  await nextTick();
  if (next === 'menu') panel.value?.querySelector<HTMLButtonElement>(`[data-view="${previous}"]`)?.focus({ preventScroll: true });
  else backButton.value?.focus({ preventScroll: true });
}
function goHome() {
  panel.value?.hidePopover();
  emit('home');
}
</script>

<template>
  <div class="game-menu" @pointerdown.stop @wheel.stop @keydown.esc.stop>
    <button type="button" class="menu-toggle" :popovertarget="panelId" :aria-expanded="isOpen"
      :aria-controls="panelId">
      <svg class="menu-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path v-if="isOpen" d="m6 6 12 12M6 18 18 6" />
        <path v-else d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span class="menu-label">Menü</span>
    </button>

    <div :id="panelId" ref="panel" popover="auto" class="menu-panel" aria-label="Keşif menüsü" @toggle="onToggle">
      <header class="panel-heading" :class="{ 'subview-heading': view !== 'menu' }">
        <button v-if="view !== 'menu'" ref="backButton" type="button" class="back-button" aria-label="Menüye dön" @click="showView('menu')">←</button>
        <h2>{{ viewTitle }}</h2>
      </header>

      <nav v-if="view === 'menu'" aria-label="Keşif seçenekleri" class="menu-links">
        <button type="button" class="menu-item home-item" @click="goHome">
          <HomeIcon name="home" /><span>Dünya Haritası</span><span class="item-arrow" aria-hidden="true">↗</span>
        </button>
        <button type="button" class="menu-item" data-view="profile" @click="showView('profile')">
          <span class="menu-avatar" aria-hidden="true"><HomeSurface kind="avatar" /></span><span>Profilim</span><span class="item-arrow" aria-hidden="true">›</span>
        </button>
        <button type="button" class="menu-item" data-view="settings" @click="showView('settings')">
          <HomeIcon name="settings" /><span>Ayarlar</span><span class="item-arrow" aria-hidden="true">›</span>
        </button>
        <button type="button" class="menu-item" data-view="help" @click="showView('help')">
          <svg class="help-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="16" cy="16" r="12"/><path d="M12 12a4 4 0 0 1 8 0c0 3-4 3-4 6" stroke-linecap="round"/><circle cx="16" cy="23" r="1" fill="currentColor" stroke="none"/></svg>
          <span>Nasıl Oynanır?</span><span class="item-arrow" aria-hidden="true">›</span>
        </button>
      </nav>

      <section v-else-if="view === 'profile'" class="profile-view" aria-label="Oyuncu profili">
        <div class="profile-identity">
          <span class="profile-avatar" role="img" aria-label="Papağan avatarı"><HomeSurface kind="avatar" /></span>
          <div><p class="eyebrow">Merhaba, kaşif!</p><h3>İsa abi</h3></div>
        </div>
        <div class="profile-stats">
          <div><HomeIcon name="star" /><strong>320</strong><span>Yıldız puanı</span></div>
          <div><HomeIcon name="forest" /><strong>3 / 5</strong><span>Keşfedilen diyar</span></div>
        </div>
        <h3 class="section-title">Keşif yolculuğum</h3>
        <div class="profile-progress" role="progressbar" aria-label="Keşfedilen diyarlar" :aria-valuenow="3" :aria-valuemin="0" :aria-valuemax="5"><span /></div>
        <p class="profile-caption">Yeni keşifler seni bekliyor!</p>
        <h3 class="section-title">Rozetlerim</h3>
        <div class="profile-badges" role="list" aria-label="Öne çıkan rozetler">
          <span v-for="index in 4" :key="index" role="listitem"><span class="profile-badge" role="img" :aria-label="`Yıldız rozeti ${index}`"><HomeSurface kind="badge" /></span></span>
        </div>
      </section>

      <section v-else-if="view === 'settings'" class="settings-view" aria-label="Görünüm ayarları">
        <h3 class="section-title">Görünüm</h3>
        <label class="setting-row">
          <span><strong>Hareketi azalt</strong><small>Animasyon ve geçişleri daha sakin göster.</small></span>
          <input v-model="reduceMotion" type="checkbox" role="switch" aria-label="Hareketi azalt" />
        </label>
      </section>

      <section v-else class="help-view" aria-label="Keşif rehberi">
        <ol>
          <li><strong>Haritayı keşfet</strong><p>Fareyle veya parmağınla sürükleyerek etrafa bak. Fare tekerleğiyle yakınlaşabilirsin.</p></li>
          <li><strong>Oyunları tanı</strong><p>Yuvarlak simgelerin üzerine gel veya dokun; oyunların isimlerini gör.</p></li>
          <li><strong>Dünyaya dön</strong><p>Diğer diyarları görmek için menüden Dünya Haritası’nı aç.</p></li>
        </ol>
      </section>
    </div>
  </div>
</template>

<style scoped>
.game-menu {
  --menu-left: max(16px, env(safe-area-inset-left));
  --menu-top: max(16px, env(safe-area-inset-top));
  --menu-button-height: 48px;
  position: absolute; z-index: 5; top: var(--menu-top); left: var(--menu-left);
  max-width: calc(100% - var(--menu-left) - max(16px, env(safe-area-inset-right)));
  color: #315b45; font-family: 'Baloo 2', 'Trebuchet MS', sans-serif; cursor: default;
}
button, input { font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
button:focus-visible, input:focus-visible { outline: 3px solid #507959; outline-offset: 3px; }
.menu-toggle {
  display: flex; align-items: center; gap: 10px; max-width: 100%; min-height: var(--menu-button-height);
  box-sizing: border-box; padding: 8px 16px; border: 1px solid #ddcfa9; border-radius: 20px;
  background: linear-gradient(#fffdf4, #f6ecd7); box-shadow: inset 0 1px #fff, 0 4px 14px #204e3d33;
  transition: box-shadow 180ms ease;
}
.menu-toggle:hover, .menu-toggle[aria-expanded='true'] { box-shadow: inset 0 1px #fff, 0 5px 18px #204e3d4d; }
.menu-glyph { width: 22px; height: 22px; flex-shrink: 0; }
.menu-label { font-size: 18px; font-weight: 800; line-height: 1.1; }
.menu-panel {
  position: fixed; inset: auto; left: var(--menu-left); top: calc(var(--menu-top) + var(--menu-button-height) + 10px);
  width: 292px; max-width: calc(100vw - var(--menu-left) - max(16px, env(safe-area-inset-right)));
  max-height: calc(100dvh - var(--menu-top) - var(--menu-button-height) - 26px - env(safe-area-inset-bottom));
  box-sizing: border-box; margin: 0; padding: 16px 12px 10px; overflow-y: auto;
  overscroll-behavior: contain; border: 1px solid #ddcfa9; border-radius: 24px;
  background: linear-gradient(135deg, #fffdf4, #f7efdF); color: inherit;
  box-shadow: inset 0 1px #fff, 0 12px 32px #204e3d38;
  transform-origin: top left;
}
.menu-panel:popover-open { animation: menu-appear 180ms ease-out; }
.menu-panel::backdrop { background: transparent; }
.panel-heading { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
.panel-heading h2 { margin: 0 12px; font-size: 19px; font-weight: 800; }
.subview-heading h2 { margin-left: 0; }
.back-button { width: 44px; height: 44px; padding: 0; border: 0; border-radius: 12px; background: #eaf0df; font-size: 23px; }
.back-button:hover { background: #dde7cf; }
.menu-links { display: grid; gap: 5px; }
.menu-item {
  display: flex; align-items: center; gap: 12px; width: 100%; min-height: 46px;
  box-sizing: border-box; padding: 8px 12px; border: 1px solid transparent; border-radius: 13px;
  background: transparent; text-align: left; font-size: 16px; font-weight: 700; line-height: 1.2;
  transition: background-color 150ms ease;
}
.menu-item .home-icon { font-size: 27px; }
.menu-item:hover { background: #e8eddb; }
.home-item { background: #eaf0df; border-color: #dce5cb; }
.item-arrow { margin-left: auto; color: #65916a; font-size: 21px; }
.menu-avatar { position: relative; isolation: isolate; display: block; width: 27px; height: 27px; flex-shrink: 0; }
.help-icon { width: 27px; height: 27px; flex-shrink: 0; color: #698770; }
.profile-view, .settings-view, .help-view { padding: 2px 8px 8px; }
.profile-identity { display: flex; align-items: center; gap: 12px; padding: 8px 0 16px; }
.profile-avatar { position: relative; isolation: isolate; display: block; width: 66px; height: 66px; flex-shrink: 0; }
.eyebrow { margin: 0; color: #7c8c70; font-size: 13px; }
.profile-identity h3 { margin: 0; font-size: 24px; line-height: 1.2; }
.profile-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.profile-stats > div { display: grid; justify-items: center; padding: 12px 4px; border: 1px solid #e4d9bc; border-radius: 16px; background: #fffaf0; }
.profile-stats .home-icon { font-size: 26px; }
.profile-stats strong { font-size: 22px; line-height: 1.4; }
.profile-stats span { color: #7c8c70; font-size: 11px; }
.section-title { margin: 18px 0 8px; font-size: 15px; font-weight: 800; }
.profile-progress { height: 10px; border-radius: 20px; background: #e3e4d5; overflow: hidden; }
.profile-progress span { display: block; width: 60%; height: 100%; border-radius: inherit; background: linear-gradient(#9cbe81, #6d9b68); }
.profile-caption { margin: 6px 0 0; color: #7c8c70; font-size: 12px; }
.profile-badges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; padding: 2px 0 8px; }
.profile-badge { position: relative; isolation: isolate; display: block; width: 100%; height: 62px; }
.setting-row { display: flex; align-items: center; gap: 12px; padding: 14px 12px; border: 1px solid #e4d9bc; border-radius: 16px; background: #fffaf0; cursor: pointer; }
.setting-row strong { font-size: 15px; }
.setting-row small { display: block; margin-top: 3px; color: #7c8c70; font: 12px / 1.5 'Trebuchet MS', sans-serif; }
.setting-row input { appearance: none; flex-shrink: 0; width: 42px; height: 26px; margin: 0; border: 1px solid #c8d2b9; border-radius: 20px; background: #dce2d1; }
.setting-row input::before { content: ''; display: block; width: 18px; height: 18px; margin: 3px; border-radius: 50%; background: #fffdf4; box-shadow: 0 1px 3px #315b4533; transition: transform 150ms ease; }
.setting-row input:checked { background: #79a577; border-color: #6a9568; }
.setting-row input:checked::before { transform: translateX(16px); }
.help-view ol { list-style: none; counter-reset: steps; display: grid; gap: 16px; margin: 4px 0; padding: 0; }
.help-view li { counter-increment: steps; position: relative; padding-left: 34px; }
.help-view li::before { content: counter(steps); position: absolute; left: 0; top: 0; display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: #e6ecd8; color: #58835c; font-size: 13px; font-weight: 800; }
.help-view strong { font-size: 15px; }
.help-view p { margin: 4px 0 0; color: #7c8c70; font: 13px / 1.6 'Trebuchet MS', sans-serif; }
@keyframes menu-appear { from { opacity: 0; transform: translateY(-5px) scale(.98); } to { opacity: 1; transform: none; } }
@media (max-width: 600px) {
  .game-menu { --menu-button-height: 46px; }
  .menu-toggle { gap: 8px; padding: 8px 12px; border-radius: 18px; }
  .menu-label { font-size: 16px; }
}
@media (prefers-reduced-motion: reduce) { .menu-panel:popover-open { animation: none; } .menu-toggle, .menu-item { transition: none; } }
</style>
