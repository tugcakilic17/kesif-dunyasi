<script setup lang="ts">
import { ref } from 'vue';
import { homeArtwork, homeRealms } from './world-home';
import HomeIcon from './HomeIcon.vue';
import type { RealmId } from './game-map';

const emit = defineEmits<{ enter: [realm: RealmId] }>();
const active = ref<RealmId | null>(null);
const lastRealm = homeRealms[0]!;
function enterRealm(id: RealmId) { emit('enter', id); }
</script>

<template>
  <main class="world-home" aria-label="Oyun Dünyası — keşfetmek istediğin diyarı seç">
    <div class="home-stage">
      <svg class="world-art" viewBox="0 0 1920 868" preserveAspectRatio="xMidYMid slice" aria-label="Dünya haritasındaki beş diyar">
        <image :href="homeArtwork" width="1920" height="868" aria-hidden="true" />
        <a v-for="realm in homeRealms" :key="realm.id" :href="`?region=${realm.id}`" :aria-label="realm.name" class="realm-link" :class="{ highlighted: active === realm.id }"
          @pointerenter="active = realm.id" @pointerleave="active = null" @focus="active = realm.id" @blur="active = null" @click.prevent="enterRealm(realm.id)" @keydown.space.prevent="enterRealm(realm.id)">
          <title>{{ realm.name }}</title><path :d="realm.outline" class="realm-boundary" />
        </a>
      </svg>

      <header class="home-header">
        <div class="brand" aria-label="Oyun Dünyası ana sayfa"><HomeIcon name="mascot"/><span><b>O</b><b>y</b><b>u</b><b>n</b> <strong>Dünyası</strong></span></div>
        <nav class="header-nav" aria-label="Ana menü">
          <div class="nav-pill selected"><HomeIcon name="home"/>Ana Sayfa</div>
          <div class="nav-pill"><HomeIcon name="parent"/>Ebeveyn</div>
          <div class="nav-pill"><HomeIcon name="settings"/>Ayarlar</div>
        </nav>
        <div class="profile-bar">
          <span class="currency" aria-label="320 yıldız"><HomeIcon name="star"/><b>320</b></span>
          <span class="currency" aria-label="50 altın"><HomeIcon name="coin"/><b>50</b></span>
          <div class="greeting" aria-label="Kağan profili"><HomeIcon name="avatar"/><span>Merhaba<br><b>Kağan!</b></span></div>
        </div>
      </header>

      <h1 class="world-heading">Bir bölge seç ve keşfet!</h1>
      <button v-for="realm in homeRealms" :key="realm.id" class="realm-label" :class="{ highlighted: active === realm.id }"
        :style="{ left: `calc(50% + ${realm.x - 960} * var(--art-u))`, top: `calc(var(--map-center) + ${realm.y - 434} * var(--art-u))`, '--realm-color': realm.color }" :aria-label="`${realm.name} bölgesini aç`"
        @pointerenter="active = realm.id" @pointerleave="active = null" @focus="active = realm.id" @blur="active = null" @click="enterRealm(realm.id)">
        <HomeIcon :name="realm.id"/><span>{{ realm.label }}</span>
      </button>

      <section class="dashboard" aria-label="Keşif bilgileri">
        <article class="dashboard-card last-card">
          <h2><HomeIcon name="gamepad"/>Son Oynanan Oyun</h2>
          <div class="last-content">
            <div class="last-thumbnail" :class="lastRealm.id" :aria-label="`${lastRealm.name} keşfine devam et`"><HomeIcon :name="lastRealm.id"/></div>
            <div class="last-copy"><h3>{{ lastRealm.name }}</h3><div class="progress-track" role="progressbar" aria-label="Keşfedilen diyarlar" aria-valuenow="3" :aria-valuemin="0" :aria-valuemax="5"><i style="width: 60%"/></div><p>3 / 5 diyar keşfedildi</p></div>
            <div class="continue-button" :aria-label="`${lastRealm.name} bölgesine devam et`"><HomeIcon name="play"/></div>
          </div>
        </article>
        <article class="dashboard-card badges-card">
          <div class="card-heading"><h2><HomeIcon name="trophy"/>Rozetlerim</h2><div class="text-link">Tümünü Gör <span>→</span></div></div>
          <div class="badge-row"><div v-for="(realm, index) in homeRealms" :key="realm.id" class="medal" :style="{ '--badge-color': realm.color, '--ribbon': ['#cb4ed7','#fbc327','#ff9241','#9a4fe0','#fa6ab2'][index] }" :aria-label="`${realm.name} rozeti`"><HomeIcon :name="realm.id"/></div></div>
        </article>
        <article class="dashboard-card task-card">
          <h2><HomeIcon name="calendar"/>Bugünün Görevi</h2>
          <div class="task-content"><HomeIcon class="target-icon" name="target"/><div class="task-copy"><h3>3 farklı diyarı keşfet</h3><div class="task-progress"><div class="progress-track" role="progressbar" aria-label="Günlük keşif görevi" aria-valuenow="1" :aria-valuemin="0" :aria-valuemax="3"><i style="width: 33.333%"/></div><span>1 / 3</span></div></div><div class="gift-button"><HomeIcon name="gift"/><span>Keşfet ve<br>görevi tamamla!</span></div></div>
        </article>
      </section>
    </div>
  </main>
</template>

<style scoped>
.world-home { position: fixed; inset: 0; overflow: hidden; --u: min(0.0598086vw, 0.106269vh); --art-u: max(0.0520833vw, 0.115207vh); --map-center: 50%; background-color: #10aef0; color: #092966; font-family: 'Trebuchet MS', 'Segoe UI', sans-serif; }
.home-stage { position: absolute; inset: 0; }

.world-art { position: absolute; inset: 0; width: 100%; height: 100%; }
.brand, .nav-pill, .greeting, .last-thumbnail, .continue-button, .text-link, .medal, .gift-button, button { font: inherit; cursor: default; color: inherit; }
button:focus-visible, a:focus-visible { outline: calc(4 * var(--u)) solid #ffc92c; outline-offset: calc(5 * var(--u)); }
.home-header { position: absolute; top: calc(3 * var(--u)); left: 2.21%; right: 2.21%; height: calc(82 * var(--u)); box-sizing: border-box; border-radius: calc(30 * var(--u)); background: linear-gradient(#fffefa,#fffbee); border: calc(2 * var(--u)) solid #fffdf3; box-shadow: 0 calc(4 * var(--u)) 0 #d6d4bc70, 0 calc(7 * var(--u)) calc(15 * var(--u)) #087fbf38; display: flex; align-items: center; padding: 0 calc(18 * var(--u)); }
.brand { display: flex; align-items: center; gap: calc(8 * var(--u)); padding: 0; background: none; border: 0; width: calc(491 * var(--u)); text-align: left; white-space: nowrap; }
.brand > .home-icon { font-size: calc(66 * var(--u)); transform: rotate(-10deg); }
.brand > span { font-size: calc(49 * var(--u)); font-weight: 1000; letter-spacing: calc(-3 * var(--u)); color: #ffd52f; -webkit-text-stroke: calc(5 * var(--u)) #00549f; paint-order: stroke fill; text-shadow: 0 calc(5 * var(--u)) 0 #002b71, calc(2 * var(--u)) calc(2 * var(--u)) 0 white; }
.brand b:nth-child(1) { color: #ff427a; }.brand b:nth-child(2) { color: #32c5ff; }.brand b:nth-child(3) { color: #8add30; }.brand b:nth-child(4) { color: #ff5758; }.brand strong { font-weight: 1000; }
.header-nav { display: flex; gap: calc(17 * var(--u)); }.nav-pill { box-sizing: border-box; border: calc(2 * var(--u)) solid #efecdf; border-radius: calc(32 * var(--u)); height: calc(50 * var(--u)); padding: 0 calc(24 * var(--u)); display: flex; gap: calc(12 * var(--u)); align-items: center; font-size: calc(18 * var(--u)); font-weight: 800; background: #fffcf3; white-space: nowrap; }.nav-pill .home-icon { font-size: calc(31 * var(--u)); color: #07549c; }.nav-pill.selected { color: white; border-color: #69d1ff; background: linear-gradient(#139fff,#0874ff); box-shadow: inset 0 calc(2 * var(--u)) calc(2 * var(--u)) #9adfff; }.nav-pill.selected .home-icon { color: white; }
.profile-bar { display: flex; align-items: center; gap: calc(14 * var(--u)); margin-left: auto; }.currency { display: flex; align-items: center; gap: calc(9 * var(--u)); padding: calc(4 * var(--u)) calc(14 * var(--u)); height: calc(48 * var(--u)); box-sizing: border-box; border: calc(2 * var(--u)) solid #ebe7db; border-radius: calc(25 * var(--u)); background: #fffdf4; font-size: calc(23 * var(--u)); }.currency .home-icon { font-size: calc(39 * var(--u)); }.greeting { display: flex; gap: calc(9 * var(--u)); align-items: center; border: 0; background: none; padding: 0 0 0 calc(3 * var(--u)); font-size: calc(16 * var(--u)); font-weight: 700; text-align: left; line-height: 1.2; }.greeting .home-icon { font-size: calc(61 * var(--u)); }.greeting span { min-width: calc(73 * var(--u)); max-width: calc(93 * var(--u)); overflow-wrap: anywhere; }
.world-heading { position: absolute; top: calc(var(--map-center) - 314 * var(--art-u) - 33 * var(--art-u)); left: 50%; width: calc(550 * var(--art-u)); height: calc(66 * var(--art-u)); margin: 0; display: grid; place-items: center; color: #642607; font-size: calc(43 * var(--art-u)); letter-spacing: calc(-2 * var(--art-u)); font-weight: 1000; -webkit-text-stroke: calc(6 * var(--art-u)) #fff9e8; paint-order: stroke fill; text-shadow: 0 calc(3 * var(--art-u)) 0 #9a4c1c; white-space: nowrap; pointer-events: none; transform: translateX(-50%) rotate(1deg); }
.realm-link { outline: none; cursor: pointer; }.realm-boundary { fill: transparent; stroke: transparent; stroke-width: 4; stroke-linejoin: round; pointer-events: all; transition: fill 160ms, stroke 160ms, filter 160ms; }.realm-link.highlighted .realm-boundary { fill: #fff6c012; stroke: #fff1ac; filter: drop-shadow(0 0 calc(8 * var(--u)) #fffad9); }
.realm-label { cursor: pointer; position: absolute; width: calc(230 * var(--art-u)); height: calc(56 * var(--art-u)); transform: translate(-50%,-50%) rotate(-1deg); border: calc(3 * var(--art-u)) solid var(--realm-color); border-bottom-width: calc(5 * var(--art-u)); border-radius: calc(30 * var(--art-u)); background: linear-gradient(#fffefa,#fff8df); color: var(--realm-color); box-shadow: inset 0 calc(3 * var(--art-u)) 0 white, 0 calc(5 * var(--art-u)) calc(3 * var(--art-u)) #40562244; display: flex; align-items: center; justify-content: center; gap: calc(10 * var(--art-u)); font-size: calc(28 * var(--art-u)); font-weight: 1000; letter-spacing: calc(-.8 * var(--art-u)); text-shadow: 0 calc(2 * var(--art-u)) 0 #ffffff; transition: transform 160ms, box-shadow 160ms; }.realm-label .home-icon { font-size: calc(39 * var(--art-u)); }.realm-label.highlighted { transform: translate(-50%,-50%) rotate(-1deg) scale(1.035); box-shadow: 0 0 0 calc(5 * var(--art-u)) #fff5a9a0,0 0 calc(23 * var(--art-u)) #ffef9c, inset 0 calc(3 * var(--art-u)) white; }
.dashboard { position: absolute; bottom: calc(21 * var(--u)); left: 6.64%; right: 7.24%; display: grid; grid-template-columns: 1.075fr 1fr 1.06fr; gap: calc(14 * var(--u)); }.dashboard-card { height: calc(158 * var(--u)); box-sizing: border-box; border: calc(3 * var(--u)) solid #fff8e4; border-radius: calc(29 * var(--u)); background: linear-gradient(115deg,#fffbef,#fffdf6); box-shadow: 0 calc(5 * var(--u)) 0 #d7bf8d80,0 calc(6 * var(--u)) calc(12 * var(--u)) #3b7a7c30; padding: calc(12 * var(--u)) calc(20 * var(--u)); }.dashboard-card h2 { display: flex; gap: calc(14 * var(--u)); align-items: center; margin: 0; font-size: calc(25 * var(--u)); letter-spacing: calc(-.7 * var(--u)); color: #703413; font-weight: 900; }.dashboard-card h2 .home-icon { font-size: calc(33 * var(--u)); }.last-content { display: flex; align-items: center; gap: calc(14 * var(--u)); margin-top: calc(9 * var(--u)); }.last-thumbnail { display: grid; place-items: center; box-sizing: border-box; width: calc(128 * var(--u)); height: calc(86 * var(--u)); border: calc(3 * var(--u)) solid white; border-radius: calc(13 * var(--u)); background: linear-gradient(150deg,#8be4ff,#43c6a5 60%,#addd4f); box-shadow: 0 calc(1 * var(--u)) calc(4 * var(--u)) #6b9e87; flex-shrink: 0; }.last-thumbnail .home-icon { font-size: calc(70 * var(--u)); }.last-copy { flex: 1; min-width: 0; }.last-copy h3,.task-copy h3 { margin: 0 0 calc(12 * var(--u)); font-size: calc(18 * var(--u)); font-weight: 900; }.progress-track { height: calc(16 * var(--u)); background: #dfdcd3; border-radius: calc(20 * var(--u)); overflow: hidden; box-shadow: inset 0 calc(1 * var(--u)) calc(2 * var(--u)) #b6b4ae33; }.progress-track i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(#82e36a,#24a83e); box-shadow: inset 0 calc(2 * var(--u)) 0 #c6f0a1; min-width: 0; }.last-copy p { margin: calc(5 * var(--u)) 0 0; text-align: center; color: #798796; font-size: calc(14 * var(--u)); font-weight: 800; }.continue-button { display: grid; place-items: center; box-sizing: border-box; height: calc(66 * var(--u)); width: calc(66 * var(--u)); flex-shrink: 0; border-radius: 50%; border: calc(2 * var(--u)) solid #38af2b; background: linear-gradient(#90e864,#24bd39); box-shadow: inset 0 calc(3 * var(--u)) 0 #d4ffc3,0 calc(4 * var(--u)) 0 #2a982d; color: #fff9e7; }.continue-button .home-icon { font-size: calc(34 * var(--u)); }
.card-heading { display: flex; justify-content: space-between; align-items: center; }.text-link { padding: 0; border: 0; background: none; color: #0987f5; font-weight: 800; font-size: calc(15 * var(--u)); }.text-link span { font-size: calc(24 * var(--u)); margin-left: calc(7 * var(--u)); }.badge-row { display: flex; justify-content: space-between; padding-top: calc(16 * var(--u)); }.medal { position: relative; isolation: isolate; height: calc(68 * var(--u)); width: calc(68 * var(--u)); border-radius: 50%; border: calc(4 * var(--u)) solid #ffbd23; background: linear-gradient(135deg,#fff8bb,var(--badge-color)); box-shadow: 0 0 0 calc(2 * var(--u)) #e28c00,inset 0 0 0 calc(3 * var(--u)) white,0 calc(3 * var(--u)) calc(1 * var(--u)) #cf9215; display: grid; place-items: center; }.medal::before { content: ''; position: absolute; top: calc(51 * var(--u)); left: calc(14 * var(--u)); width: calc(30 * var(--u)); height: calc(26 * var(--u)); background: var(--ribbon); clip-path: polygon(0 0,100% 0,100% 100%,50% 77%,0 100%); z-index: -1; }.medal .home-icon { font-size: calc(43 * var(--u)); }.task-content { display: flex; align-items: center; gap: calc(12 * var(--u)); margin-top: calc(9 * var(--u)); }.target-icon { font-size: calc(57 * var(--u)); }.task-copy { flex: 1; }.task-copy h3 { font-size: calc(18 * var(--u)); margin-bottom: calc(15 * var(--u)); white-space: nowrap; }.task-progress { display: flex; gap: calc(10 * var(--u)); align-items: center; }.task-progress .progress-track { flex: 1; height: calc(15 * var(--u)); }.task-progress span { font-size: calc(15 * var(--u)); color: #718395; font-weight: 800; white-space: nowrap; }.gift-button { text-align: center; box-sizing: border-box; position: relative; height: calc(84 * var(--u)); width: calc(120 * var(--u)); border: 0; border-radius: calc(16 * var(--u)); background: #ffebba; flex-shrink: 0; padding-top: calc(36 * var(--u)); font-size: calc(13 * var(--u)); line-height: 1.15; }.gift-button .home-icon { position: absolute; font-size: calc(57 * var(--u)); top: calc(-22 * var(--u)); left: calc(32 * var(--u)); }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
</style>










