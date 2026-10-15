<script setup lang="ts">
defineProps<{ name: string }>();
</script>

<template>
  <svg viewBox="0 0 64 64" class="home-icon" aria-hidden="true">
    <g v-if="name === 'star' || name === 'mascot'">
      <path d="m32 4 9 18 20 3-15 15 4 20-18-10-18 10 4-20L3 25l20-3Z" fill="#ffc629" stroke="#ed9711" stroke-width="2" stroke-linejoin="round" />
      <path d="m32 9 6 15 15 3-16 2-6-13-7 9Z" fill="#fff29c" />
      <g v-if="name === 'mascot'" fill="#5a301a"><ellipse cx="25" cy="32" rx="3" ry="4"/><ellipse cx="40" cy="32" rx="3" ry="4"/><path d="M26 42q6 8 12 0Z"/><ellipse cx="17" cy="39" rx="5" ry="3" fill="#ff935b"/><ellipse cx="47" cy="39" rx="5" ry="3" fill="#ff935b"/></g>
    </g>
    <g v-else-if="name === 'coin'">
      <circle cx="32" cy="32" r="27" fill="#ffb900" stroke="#e48300" stroke-width="3"/><circle cx="32" cy="32" r="21" fill="#ffdc3b" stroke="#fff69c" stroke-width="3"/><path d="M38 21c-16-8-22 10-6 12s10 18-7 10m7-27v32" fill="none" stroke="#e9960d" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g v-else-if="name === 'home'" fill="currentColor"><path d="m4 29 28-24 28 24-5 7-5-4v26H38V39H25v19H12V32l-5 4Z"/></g>
    <g v-else-if="name === 'parent'" fill="currentColor"><circle cx="24" cy="17" r="10"/><circle cx="45" cy="23" r="8"/><path d="M6 56V41c0-19 35-19 35 0v15Zm39-22c12 0 16 6 16 17v5H45Z"/></g>
    <g v-else-if="name === 'settings'" fill="currentColor"><path d="m27 4 10 0 3 9 8-3 7 8-5 7 10 3v10l-10 3 5 7-7 8-8-3-3 9H27l-3-9-8 3-7-8 5-7-10-3V28l10-3-5-7 7-8 8 3Z"/><circle cx="32" cy="33" r="11" fill="#fff9ec"/></g>
    <g v-else-if="name === 'forest'" stroke-linejoin="round"><path d="M26 42h12v19H26Z" fill="#b16925"/><path d="M32 4 14 25h9L7 43h11L5 54h54L46 43h11L41 25h9Z" fill="#49c537" stroke="#249224" stroke-width="2"/><path d="m32 10-9 17 10-5 9 5Z" fill="#94e853"/></g>
    <g v-else-if="name === 'shapes'"><path d="m31 4 14 23H17Z" fill="#ffce30" stroke="#edac19" stroke-width="2"/><rect x="6" y="33" width="25" height="25" rx="5" fill="#208dfa" stroke="#1167c9" stroke-width="2"/><circle cx="48" cy="45" r="14" fill="#ff477b" stroke="#df1b56" stroke-width="2"/><path d="M10 38h16" stroke="#85d7ff" stroke-width="4"/></g>
    <g v-else-if="name === 'sea'"><path d="M8 46h49L46 59H21Z" fill="#ad641f" stroke="#714016" stroke-width="2"/><path d="M31 5v42" stroke="#8e5724" stroke-width="3"/><path d="m27 10-20 30h20Z" fill="#fffcec" stroke="#b3e2e9" stroke-width="2"/><path d="m36 15 17 25H36Z" fill="#8ae5ee"/><path d="M3 61q8-7 16 0t16 0 16 0 12 0" fill="none" stroke="#159de7" stroke-width="4"/></g>
    <g v-else-if="name === 'science'" fill="none" stroke="#6653ef" stroke-width="3.5"><ellipse cx="32" cy="32" rx="28" ry="11"/><ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(120 32 32)"/><circle cx="32" cy="32" r="6" fill="#2ba7fa" stroke="none"/><circle cx="13" cy="16" r="4" fill="#ff5376" stroke="none"/></g>
    <g v-else-if="name === 'magic'"><path d="M31 18q-11-8-26-3v38q16-6 27 2 12-8 27-2V15q-16-5-27 3Z" fill="#fff8da" stroke="#b873eb" stroke-width="3"/><path d="M32 19v33M10 25l15 3m-15 4 15 3m14-10 14-3m-14 10 14-3" stroke="#d5b4f4" stroke-width="2"/><path d="m44 3 3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1Z" fill="#ffcf2c"/></g>
    <g v-else-if="name === 'trophy'"><path d="M18 5h28v23c0 22-28 22-28 0Z" fill="#ffbf20" stroke="#ed9100" stroke-width="2"/><path d="M18 10H6v11q0 17 16 17m24-28h12v11q0 17-16 17" fill="none" stroke="#f9a315" stroke-width="5"/><path d="M30 42h5v12h13v7H17v-7h13" fill="#de870d"/></g>
    <g v-else-if="name === 'calendar'"><rect x="8" y="10" width="48" height="49" rx="7" fill="#fffaf0" stroke="#ed565b" stroke-width="4"/><path d="M10 23h44" stroke="#ed565b" stroke-width="9"/><path d="M20 4v13m24-13v13" stroke="#903d34" stroke-width="5" stroke-linecap="round"/><path d="M20 34h6m12 0h6m-24 11h6m12 0h6" stroke="#b66f68" stroke-width="5"/></g>
    <g v-else-if="name === 'gift'"><rect x="9" y="25" width="47" height="34" rx="4" fill="#ffbf29" stroke="#e3930b" stroke-width="2"/><rect x="5" y="20" width="55" height="12" rx="3" fill="#ffdc54"/><path d="M27 21h11v39H27Z" fill="#f54233"/><path d="M31 20C0 21 10-7 29 9l4 9C55-9 69 18 34 21" fill="#f74b3b" stroke="#ce2723" stroke-width="2"/></g>
    <g v-else-if="name === 'target'" fill="none" stroke="#f4673f" stroke-width="5"><circle cx="29" cy="35" r="23" fill="#fff5df"/><circle cx="29" cy="35" r="14"/><circle cx="29" cy="35" r="5"/><path d="m29 35 25-25m-10 1 11-8-1 13" stroke="#cd4934" stroke-linecap="round"/></g>
    <g v-else-if="name === 'play'"><path d="m23 14 25 18-25 18Z" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></g>
    <g v-else-if="name === 'gamepad'"><path d="M18 15h29l10 12 5 22c0 15-15 10-22-1H23C15 60-1 64 3 46l6-22Z" fill="#098ff3" stroke="#0065c7" stroke-width="2"/><path d="M17 24v18M8 33h18" stroke="white" stroke-width="5"/><circle cx="43" cy="28" r="4" fill="#ffdc28"/><circle cx="51" cy="37" r="4" fill="#ff687a"/></g>
    <g v-else-if="name === 'avatar'"><circle cx="32" cy="32" r="30" fill="#57c7ff" stroke="white" stroke-width="2"/><path d="M12 62c1-27 39-27 40 0" fill="#ffae25"/><ellipse cx="32" cy="31" rx="19" ry="23" fill="#ffcc9b"/><path d="M14 29q-6-21 15-24l5 4 8-4 3 7 9 4-7 17-5-17-9 8-8-6-7 14Z" fill="#61331f"/><ellipse cx="25" cy="33" rx="2.7" ry="3.4" fill="#383126"/><ellipse cx="40" cy="33" rx="2.7" ry="3.4" fill="#383126"/><path d="M25 42q7 11 14 0Z" fill="#9c4336"/><path d="M26 43h12" stroke="white" stroke-width="2"/></g>
  </svg>
</template>

<style scoped>
.home-icon { display: inline-block; width: 1em; height: 1em; vertical-align: middle; flex-shrink: 0; filter: drop-shadow(0 2px 1px #69491520); }
</style>
