import { ref, watch } from 'vue';

const storageKey = 'kesif-dunyasi:reduce-motion';
function readMotionPreference() {
  try { return localStorage.getItem(storageKey) === 'true'; }
  catch { return false; }
}

export const reduceMotion = ref(readMotionPreference());
watch(reduceMotion, value => {
  document.documentElement.classList.toggle('reduce-motion', value);
  try { localStorage.setItem(storageKey, String(value)); }
  catch { /* The preference still works when browser storage is unavailable. */ }
}, { immediate: true });
