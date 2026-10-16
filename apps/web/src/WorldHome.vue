<script setup lang="ts">
import { ref } from 'vue';
import { homeArtwork, homeRealms } from './world-home';
import HomeIcon from './HomeIcon.vue';
import HomeSurface from './HomeSurface.vue';
import type { RealmId } from './game-map';

const emit = defineEmits<{ enter: [realm: RealmId] }>();
const active = ref<RealmId | null>(null);
const lastRealm = homeRealms[0]!;
function enterRealm(id: RealmId) { emit('enter', id); }
function animateHeaderControl(event: MouseEvent) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('reduce-motion')) return;
  (event.currentTarget as HTMLElement).animate([
    { transform: 'scale(.95)' },
    { transform: 'translateY(-2px) scale(1.025)', offset: .65 },
    { transform: 'translateY(0) scale(1)' },
  ], { duration: 260, easing: 'ease-out' });
}
</script>

<template>
  <main class="world-home" aria-label="Oyun Dünyası — keşfetmek istediğin diyarı seç">
    <div class="home-stage">
      <header class="home-header">
        <HomeSurface kind="header" />
        <div class="brand" role="img" aria-label="Oyun Dünyası"><HomeSurface kind="logo" /></div>
        <nav class="header-nav" aria-label="Ana menü">
          <button type="button" class="header-action nav-pill selected" aria-current="page" @click="animateHeaderControl"><HomeIcon name="home"/>Ana Sayfa</button>
          <button v-for="page in 3" :key="page" type="button" class="header-action nav-pill" @click="animateHeaderControl">Sayfa {{ page }}</button>
        </nav>
        <div class="profile-bar">
          <span class="currency" aria-label="320 yıldız puanı"><span class="points-star"><HomeSurface kind="points"/></span><b>320</b></span>
          <button type="button" class="header-action greeting" aria-label="Merhaba İsa abi" @click="animateHeaderControl"><span class="greeting-avatar" role="img" aria-label="Papağan avatarı"><HomeSurface kind="avatar"/></span><span>Merhaba<br><b>İsa abi</b></span></button>
          <button type="button" class="header-action settings-icon" aria-label="Ayarlar" @click="animateHeaderControl"><HomeIcon name="settings"/></button>
        </div>
      </header>
      <div class="home-map">
        <h1 class="world-heading" aria-label="Bir bölge seç ve keşfet!"><HomeSurface kind="heading" /></h1>
        <div class="island-scene">
          <svg class="world-art" viewBox="0 0 1920 868" preserveAspectRatio="xMidYMid meet" aria-label="Dünya haritasındaki beş diyar">
            <image :href="homeArtwork" width="1920" height="868" aria-hidden="true" />
            <a v-for="realm in homeRealms" :key="realm.id" :href="`?region=${realm.id}`" :aria-label="realm.name" class="realm-link" :class="{ highlighted: active === realm.id }"
              @pointerenter="active = realm.id" @pointerleave="active = null" @focus="active = realm.id" @blur="active = null" @click.prevent="enterRealm(realm.id)" @keydown.space.prevent="enterRealm(realm.id)">
              <title>{{ realm.name }}</title><path :d="realm.outline" class="realm-boundary" />
            </a>
          </svg>
          <div class="realm-choices" role="group" aria-label="Diyar seçimi">
            <button v-for="realm in homeRealms" :key="realm.id" type="button" class="realm-label" :class="{ highlighted: active === realm.id }"
              :style="{ '--realm-x': realm.x, '--realm-y': realm.y, '--realm-color': realm.color }" :aria-label="`${realm.name} bölgesini aç`"
              @pointerenter="active = realm.id" @pointerleave="active = null" @focus="active = realm.id" @blur="active = null" @click="enterRealm(realm.id)">
              <HomeIcon :name="realm.id"/><span class="realm-name" aria-hidden="true">{{ realm.label }}</span>
            </button>
          </div>
        </div>
      </div>
      <section class="dashboard" aria-label="Keşif bilgileri">
        <article class="dashboard-card last-card">
          <HomeSurface kind="panel" />
          <h2><HomeIcon name="gamepad"/>Son Oynanan Oyun</h2>
          <div class="last-content">
            <div class="last-thumbnail" role="img" aria-label="Keşif Ormanı ağaç simgesi"><HomeSurface kind="forest"/></div>
            <div class="last-copy"><h3>{{ lastRealm.name }}</h3><div class="progress-track" role="progressbar" aria-label="Keşfedilen diyarlar" aria-valuenow="3" :aria-valuemin="0" :aria-valuemax="5"><i style="width: 60%"/></div><p>3 / 5 diyar keşfedildi</p></div>
            <button type="button" class="continue-button" :aria-label="`${lastRealm.name} — Başla`"><span class="continue-art"><HomeSurface kind="play"/></span><span>Başla</span></button>
          </div>
        </article>
        <article class="dashboard-card badges-card">
          <HomeSurface kind="panel" />
          <h2>Rozetlerim</h2>
          <div class="badge-row" role="list" aria-label="Öne çıkan rozetler">
            <div v-for="index in 4" :key="index" class="badge-slot" role="listitem"><div class="badge-item" role="img" :aria-label="`Yıldız rozeti ${index}`"><HomeSurface kind="badge" /></div></div>
          </div>
          <button type="button" class="badges-more" aria-label="Tüm rozetleri gör">Tümünü gör <span aria-hidden="true">→</span></button>
        </article>
        <article class="dashboard-card task-card">
          <HomeSurface kind="panel" />
          <h2>Bugünün Görevi</h2>
          <div class="task-content">
            <div class="target-art" role="img" aria-label="Günlük görev hedefi"><HomeSurface kind="target"/></div>
            <div class="task-copy">
              <h3>3 farklı diyarı keşfet</h3>
              <div class="progress-track" role="progressbar" aria-label="Günlük keşif görevi" aria-valuenow="1" :aria-valuemin="0" :aria-valuemax="3"><i style="width: 33.333%"/></div>
              <p>1 / 3 diyar keşfedildi</p>
            </div>
            <div class="gift-button"><HomeIcon name="gift"/><span>Görevi tamamla,<br>ödülünü kazan!</span></div>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>

<style scoped>
.world-home { position: fixed; inset: 0; overflow: auto; display: grid; place-items: center; box-sizing: border-box; padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left); background: linear-gradient(#21b3f4, #10aef0 55%, #098ece); color: #092966; font-family: 'Trebuchet MS', 'Segoe UI', sans-serif; }
/* One 1920 × 868 canvas: artwork, hit areas and desktop UI share its scale. */
.home-stage { position: relative; width: min(100%, calc((100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom)) * 1920 / 868)); aspect-ratio: 1920 / 868; container-type: inline-size; --art-u: calc(100cqw / 1920); --u: calc(var(--art-u) * .85); }
.home-map, .island-scene { position: absolute; inset: 0; }
.world-art { position: absolute; inset: 0; width: 100%; height: 100%; }
.realm-choices { position: absolute; inset: 0; pointer-events: none; }
.realm-label { left: calc(var(--realm-x) * var(--art-u)); top: calc(var(--realm-y) * var(--art-u)); pointer-events: auto; }
.home-header, .world-heading, .dashboard { z-index: 1; }
button { font: inherit; color: inherit; }
button:focus-visible, a:focus-visible { outline: calc(4 * var(--u)) solid #ffc92c; outline-offset: calc(5 * var(--u)); }
.home-header { position: absolute; isolation: isolate; --surface-cap: calc(78 * var(--u)); top: calc(12 * var(--u)); left: 50%; transform: translateX(-50%); width: 94%; max-width: calc(1700 * var(--u)); height: calc(78 * var(--u)); box-sizing: border-box; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: calc(26 * var(--u)); padding: 0 calc(30 * var(--u)); }
.brand { position: relative; isolation: isolate; width: calc(308 * var(--u)); height: calc(60 * var(--u)); }
.header-nav { display: flex; justify-content: center; gap: calc(10 * var(--u)); }
.header-action { border: 0; background: transparent; cursor: pointer; border-radius: calc(18 * var(--u)); transition: transform 170ms ease, background-color 170ms ease, color 170ms ease; -webkit-tap-highlight-color: transparent; }
.header-action:hover, .header-action:focus-visible { background-color: #4387990d; transform: translateY(calc(-2 * var(--u))); }
.header-action:active { transform: translateY(calc(1 * var(--u))) scale(.95); background-color: #43879918; }
.header-action .home-icon, .greeting-avatar { transition: transform 180ms ease; }
.nav-pill:hover .home-icon { transform: translateY(calc(-1 * var(--u))) scale(1.07); }
.greeting:hover .greeting-avatar { transform: rotate(-5deg) scale(1.04); }
.settings-icon:hover .home-icon { transform: rotate(22deg); }
.nav-pill { position: relative; isolation: isolate; --surface-cap: calc(24 * var(--u)); box-sizing: border-box; height: calc(48 * var(--u)); min-width: calc(118 * var(--u)); padding: 0 calc(20 * var(--u)); display: flex; justify-content: center; align-items: center; gap: calc(9 * var(--u)); color: #236276; font-family: 'Baloo 2', 'Trebuchet MS', sans-serif; font-size: calc(20 * var(--u)); font-weight: 700; white-space: nowrap; }
.nav-pill.selected { color: #087fca; font-weight: 800; min-width: calc(168 * var(--u)); }
.nav-pill .home-icon { font-size: calc(27 * var(--u)); }
.nav-pill + .nav-pill::before { content: ''; position: absolute; left: calc(-5 * var(--u)); top: 50%; transform: translateY(-50%); width: 1px; height: calc(24 * var(--u)); background: #d8cdbd; }
.currency { color: #236276; font-family: 'Baloo 2', 'Trebuchet MS', sans-serif; font-weight: 700; }
.greeting b { color: #236276; font-weight: 800; }
.profile-bar { display: flex; align-items: center; gap: calc(10 * var(--u)); margin-left: auto; }
.currency { position: relative; isolation: isolate; --surface-cap: calc(23 * var(--u)); display: flex; align-items: center; justify-content: center; gap: calc(7 * var(--u)); box-sizing: border-box; min-width: calc(99 * var(--u)); height: calc(46 * var(--u)); padding: 0 calc(12 * var(--u)); font-size: calc(21 * var(--u)); }
.points-star { position: relative; isolation: isolate; display: block; width: calc(34 * var(--u)); height: calc(34 * var(--u)); flex-shrink: 0; }
.greeting { position: relative; isolation: isolate; --surface-cap: calc(26 * var(--u)); display: flex; align-items: center; justify-content: center; gap: calc(7 * var(--u)); box-sizing: border-box; min-width: calc(165 * var(--u)); height: calc(52 * var(--u)); padding: 0 calc(10 * var(--u)); color: #56717a; font-family: 'Baloo 2', 'Trebuchet MS', sans-serif; font-size: calc(17 * var(--u)); font-weight: 600; line-height: 1.05; }
.greeting-avatar { position: relative; isolation: isolate; width: calc(52 * var(--u)); height: calc(52 * var(--u)); border-radius: 50%; overflow: hidden; flex-shrink: 0; }
.settings-icon { display: grid; place-items: center; padding: 0; width: calc(44 * var(--u)); height: calc(46 * var(--u)); flex-shrink: 0; color: #236276; }
.settings-icon .home-icon { font-size: calc(33 * var(--u)); }
.realm-link { outline: none; cursor: pointer; }.realm-boundary { fill: transparent; stroke: transparent; stroke-width: 4; stroke-linejoin: round; pointer-events: all; transition: fill 160ms, stroke 160ms, filter 160ms; }.realm-link.highlighted .realm-boundary { fill: #fff6c012; stroke: #fff1ac; filter: drop-shadow(0 0 calc(8 * var(--u)) #fffad9); }
.realm-label { cursor: pointer; position: absolute; box-sizing: border-box; width: calc(70 * var(--art-u)); height: calc(68 * var(--art-u)); padding: 0 calc(14 * var(--art-u)); transform: translate(calc(-35 * var(--art-u)), -50%); border: 0; border-radius: calc(35 * var(--art-u)); background: linear-gradient(#fffaf0,#f3e4c9); color: #296778; box-shadow: inset 0 calc(2 * var(--art-u)) 0 #fffdf7, 0 calc(5 * var(--art-u)) calc(11 * var(--art-u)) #204b5052, 0 calc(2 * var(--art-u)) calc(3 * var(--art-u)) #204b5026; display: flex; align-items: center; justify-content: flex-start; overflow: hidden; font: 700 calc(24 * var(--art-u)) / 1 'Baloo 2', 'Trebuchet MS', sans-serif; transition: transform 220ms ease, box-shadow 220ms ease; }
.realm-label .home-icon { font-size: calc(42 * var(--art-u)); transition: transform 220ms ease; }
.realm-name { flex-shrink: 0; max-width: 0; margin-left: 0; opacity: 0; overflow: hidden; white-space: nowrap; transform: translateX(calc(-5 * var(--art-u))); transition: max-width 240ms cubic-bezier(.22,.61,.36,1), margin-left 240ms ease, opacity 180ms ease, transform 220ms ease; }
.realm-label.highlighted { width: calc(188 * var(--art-u)); transform: translate(calc(-35 * var(--art-u)), calc(-50% - 2 * var(--art-u))); box-shadow: inset 0 calc(2 * var(--art-u)) 0 #fffdf7, 0 calc(7 * var(--art-u)) calc(14 * var(--art-u)) #204b5057; }
.realm-label.highlighted .home-icon { transform: scale(1.07); }
.realm-label.highlighted .realm-name { max-width: calc(110 * var(--art-u)); margin-left: calc(8 * var(--art-u)); opacity: 1; transform: translateX(0); }
.world-heading { position: absolute; isolation: isolate; top: calc(86 * var(--art-u)); left: 50%; transform: translateX(-50%); width: calc(600 * var(--art-u)); height: calc(140 * var(--art-u)); margin: 0; pointer-events: none; }
.dashboard { position: absolute; bottom: calc(21 * var(--u)); left: 6.64%; right: 7.24%; display: grid; grid-template-columns: 1.075fr 1fr 1.06fr; gap: calc(14 * var(--u)); }
.dashboard-card { position: relative; isolation: isolate; height: calc(170 * var(--u)); box-sizing: border-box; padding: calc(30 * var(--u)) calc(24 * var(--u)) calc(22 * var(--u)); transition: transform 260ms cubic-bezier(.22,.61,.36,1), filter 260ms ease; }
.dashboard-card:hover, .dashboard-card:focus-within { transform: translateY(calc(-5 * var(--u))); filter: drop-shadow(0 calc(8 * var(--u)) calc(9 * var(--u)) #244c6024); }
.dashboard-card h2 { display: flex; align-items: center; margin: 0; padding-left: calc(40 * var(--u)); font: 800 calc(22 * var(--u)) / calc(27 * var(--u)) 'Baloo 2', 'Trebuchet MS', sans-serif; text-shadow: 0 calc(1 * var(--u)) #fffdf2; }
.dashboard-card h2 > .home-icon { display: none; }
.last-card h2 { color: #087fac; }.badges-card h2 { color: #8b43bd; }.task-card h2 { color: #c56827; }
.last-card { padding: calc(15 * var(--u)) calc(25 * var(--u)) calc(20 * var(--u)); font-family: 'Baloo 2', 'Trebuchet MS', sans-serif; }
.last-card h2 { color: #296778; font-size: calc(22 * var(--u)); line-height: calc(28 * var(--u)); }
.last-content { display: grid; grid-template-columns: calc(112 * var(--u)) minmax(0, 1fr) calc(76 * var(--u)); align-items: center; gap: calc(16 * var(--u)); margin-top: calc(12 * var(--u)); }
.last-thumbnail { position: relative; isolation: isolate; box-sizing: border-box; width: calc(112 * var(--u)); height: calc(84 * var(--u)); }
.last-copy { flex: 1; min-width: 0; }
.last-copy h3,.task-copy h3 { margin: 0 0 calc(9 * var(--u)); font-size: calc(16 * var(--u)); font-weight: 900; }
.progress-track { height: calc(13 * var(--u)); background: #dfdcd3; border-radius: calc(20 * var(--u)); overflow: hidden; box-shadow: inset 0 calc(1 * var(--u)) calc(2 * var(--u)) #b6b4ae33; }
.progress-track i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(#82e36a,#24a83e); box-shadow: inset 0 calc(2 * var(--u)) 0 #c6f0a1; }
.last-copy h3 { margin: 0 0 calc(8 * var(--u)); color: #296778; font: 700 calc(20 * var(--u)) / 1.15 'Baloo 2', 'Trebuchet MS', sans-serif; }
.last-copy .progress-track { height: calc(12 * var(--u)); background: #e4dfd2; box-shadow: inset 0 calc(1 * var(--u)) calc(2 * var(--u)) #8f82651a; }
.last-copy .progress-track i { background: linear-gradient(#91bf7d, #69a468); box-shadow: inset 0 calc(1 * var(--u)) 0 #b2d59d; }
.last-copy p { margin: calc(5 * var(--u)) 0 0; color: #71827a; font-size: calc(13 * var(--u)); font-weight: 600; line-height: 1.2; }
.continue-button { display: flex; flex-direction: column; align-items: center; gap: calc(3 * var(--u)); padding: 0; border: 0; border-radius: calc(12 * var(--u)); background: transparent; cursor: pointer; color: #417154; font: 700 calc(14 * var(--u)) / 1 'Baloo 2', 'Trebuchet MS', sans-serif; }
.continue-art { position: relative; isolation: isolate; display: block; width: calc(62 * var(--u)); height: calc(62 * var(--u)); transition: transform 220ms cubic-bezier(.22,.61,.36,1), filter 220ms ease; }
.continue-button:hover .continue-art, .continue-button:focus-visible .continue-art { transform: translateY(calc(-2 * var(--u))) scale(1.06); filter: drop-shadow(0 calc(3 * var(--u)) calc(3 * var(--u)) #41715422); }
.continue-button:active .continue-art { transform: scale(.97); }
.badges-card { padding: calc(15 * var(--u)) calc(25 * var(--u)) calc(20 * var(--u)); font-family: 'Baloo 2', 'Trebuchet MS', sans-serif; }
.badges-card h2 { color: #6e668a; font-size: calc(22 * var(--u)); line-height: calc(28 * var(--u)); white-space: nowrap; }
.badges-more { position: absolute; right: calc(25 * var(--u)); bottom: calc(11 * var(--u)); display: inline-flex; align-items: center; gap: calc(7 * var(--u)); padding: calc(4 * var(--u)) calc(9 * var(--u)); border: 0; border-radius: calc(10 * var(--u)); background: transparent; color: #397482; font: 600 calc(14 * var(--u)) / 1 'Baloo 2', 'Trebuchet MS', sans-serif; white-space: nowrap; cursor: pointer; transition: color 160ms ease, background-color 160ms ease, transform 160ms ease; }
.badges-more span { font-size: calc(20 * var(--u)); transition: transform 160ms ease; }
.badges-more:hover, .badges-more:focus-visible { color: #225b69; background: #4387990d; }
.badges-more:hover span { transform: translateX(calc(3 * var(--u))); }
.badges-more:active { transform: scale(.96); background: #43879918; }
.badge-row { display: grid; grid-template-columns: repeat(4, calc(62 * var(--u))); justify-content: center; align-items: center; gap: calc(24 * var(--u)); margin-top: calc(6 * var(--u)); }
.badge-slot { display: grid; place-items: center; }
.badge-item { position: relative; isolation: isolate; width: calc(62 * var(--u)); height: calc(76 * var(--u)); transition: transform 220ms cubic-bezier(.22,.61,.36,1), filter 220ms ease; }
.badge-item:hover { transform: translateY(calc(-3 * var(--u))) rotate(-3deg) scale(1.055); filter: drop-shadow(0 calc(3 * var(--u)) calc(3 * var(--u)) #86632420); }
.task-card { padding: calc(15 * var(--u)) calc(25 * var(--u)) calc(20 * var(--u)); font-family: 'Baloo 2', 'Trebuchet MS', sans-serif; }
.task-card h2 { color: #a36f50; font-size: calc(22 * var(--u)); line-height: calc(28 * var(--u)); }
.task-content { display: grid; grid-template-columns: calc(78 * var(--u)) minmax(0, 1fr) calc(88 * var(--u)); align-items: center; gap: calc(15 * var(--u)); margin-top: calc(12 * var(--u)); min-height: calc(84 * var(--u)); }
.target-art { position: relative; isolation: isolate; width: calc(76 * var(--u)); height: calc(76 * var(--u)); }
.task-copy { min-width: 0; }
.task-copy h3 { margin: 0 0 calc(8 * var(--u)); color: #296778; font: 700 calc(20 * var(--u)) / 1.15 'Baloo 2', 'Trebuchet MS', sans-serif; white-space: nowrap; }
.task-copy .progress-track { height: calc(12 * var(--u)); background: #e4dfd2; box-shadow: inset 0 calc(1 * var(--u)) calc(2 * var(--u)) #8f82651a; }
.task-copy .progress-track i { background: linear-gradient(#91bf7d, #69a468); box-shadow: inset 0 calc(1 * var(--u)) 0 #b2d59d; }
.task-copy p { margin: calc(5 * var(--u)) 0 0; color: #71827a; font-size: calc(13 * var(--u)); font-weight: 600; line-height: 1.2; }
.gift-button { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: calc(5 * var(--u)); text-align: center; color: #927255; font-size: calc(12 * var(--u)); font-weight: 600; line-height: 1.15; }
.gift-button .home-icon { font-size: calc(36 * var(--u)); }
/* Narrow/portrait screens keep the complete island artwork; surrounding UI flows. */
@media (max-width: 900px), (max-aspect-ratio: 4/3) {
  .world-home { display: block; overscroll-behavior: contain; }
  .home-stage { display: flex; flex-direction: column; gap: 12px; width: 100%; aspect-ratio: auto; min-height: 100%; padding: 12px; box-sizing: border-box; --u: clamp(.8px, .1cqw, 1px); }
  .home-header { order: -1; position: relative; top: auto; left: auto; transform: none; width: 100%; max-width: none; height: auto; min-height: calc(130 * var(--u)); grid-template-columns: minmax(0, 1fr) auto; gap: 4px 12px; padding: 10px 14px; }
  .brand { width: 100%; max-width: calc(250 * var(--u)); height: calc(54 * var(--u)); min-width: 0; }
  .profile-bar { gap: 4px; }
  .currency { min-width: 60px; padding: 0 4px; font-size: 16px; }
  .points-star { width: 27px; height: 27px; }
  .greeting { min-width: 44px; min-height: 44px; padding: 0; }
  .greeting-avatar { width: 40px; height: 40px; }
  .settings-icon { width: 44px; height: 44px; }
  .header-nav { grid-row: 2; grid-column: 1 / -1; gap: 4px; }
  .nav-pill, .nav-pill.selected { flex: 1; min-width: 0; min-height: 44px; padding: 0 6px; font-size: calc(18 * var(--u)); gap: 5px; }
  .nav-pill .home-icon { font-size: 22px; }
  .nav-pill + .nav-pill::before { left: -2px; }
  .home-map { position: relative; inset: auto; }
  .world-heading { position: relative; top: auto; left: auto; transform: none; width: min(92%, calc(480 * var(--u))); height: calc(100 * var(--u)); margin: 0 auto 8px; }
  .island-scene { position: relative; inset: auto; }
  .world-art { position: relative; display: block; height: auto; aspect-ratio: 1920 / 868; border-radius: 20px; }
  .realm-label, .realm-label.highlighted { min-width: 44px; min-height: 44px; transform: translate(-50%, -50%); }
  .realm-label .home-icon { font-size: 30px; }
  .dashboard { position: relative; inset: auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: auto; }
  .last-card { grid-column: 1 / -1; }
  .dashboard-card { min-width: 0; }
  .dashboard-card h2 { padding-left: max(calc(40 * var(--u)), 7%); }
  .badge-row { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(4px, 1cqw, 16px); }
  .badge-slot { min-width: 0; }
  .badge-item { width: min(100%, calc(62 * var(--u))); height: auto; aspect-ratio: 62 / 76; }
  .task-copy h3 { white-space: normal; }
}
@media (max-width: 600px) {
  .home-stage { gap: 10px; }
  .greeting > span:last-child { display: none; }
  .realm-choices { position: relative; inset: auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
  .realm-label, .realm-label.highlighted { position: relative; inset: auto; width: 100%; height: auto; min-height: 44px; padding: 6px; border-radius: 16px; transform: none; justify-content: center; font-size: 14px; box-shadow: inset 0 2px #fffdf7, 0 3px 8px #204b5030; }
  .realm-label .home-icon { font-size: 22px; flex-shrink: 0; }
  .realm-name, .realm-label.highlighted .realm-name { max-width: none; margin-left: 4px; opacity: 1; transform: none; }
  .dashboard { grid-template-columns: minmax(0, 1fr); }
  .dashboard-card { height: calc(180 * var(--u)); }
}
@media (max-width: 380px) {
  .home-header { padding-inline: 8px; column-gap: 6px; }
  .profile-bar { gap: 0; }
  .currency { min-width: 52px; font-size: 14px; }
}
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } .header-action:hover, .header-action:active, .header-action:focus-visible, .header-action .home-icon, .greeting-avatar, .badges-more:active, .badges-more:hover span, .dashboard-card, .continue-art, .badge-item, .realm-label .home-icon, .realm-name { transform: none !important; } .realm-label.highlighted { transform: translate(calc(-35 * var(--art-u)), -50%); } }
@media (prefers-reduced-motion: reduce) and (max-width: 900px), (prefers-reduced-motion: reduce) and (max-aspect-ratio: 4/3) { .realm-label.highlighted { transform: translate(-50%, -50%); } }
@media (max-width: 600px) and (prefers-reduced-motion: reduce) { .realm-label.highlighted { transform: none; } }
</style>










