# Keşif Dünyası

Vue 3 ve TypeScript ile geliştirilen, beş diyar içeren keşif oyunu projesi. Arayüz Vue, oyun sahneleri Phaser ile hazırlanır. İçe aktarılan oyunun JavaScript sahnesi de desteklenir. React kullanılmaz.

## Mevcut durum

- Dünya haritasından Orman, Şekiller Bahçesi, Deniz ve Liman, Bilim ve Masal diyarlarına girilir.
- Bölge haritası fareyle veya parmakla sürüklenir; fare tekerleğiyle yakınlaştırılır.
- Ormanda ve limanda sekizer oyun simgesi vardır. Üzerine gelince veya odaklanınca büyür ve isimleri görünür. Ormandaki ağaç ev simgesi **Hafıza ve Çizim** oyununu açar; diğer simgeler şimdilik görsel örneklerdir.
- Hafıza ve Çizim, 3×3 / 4×4 / 5×5 ızgaralarda beş tur oynanır. Sonuç ekranı, tekrar oynama ve haritaya dönüş bulunur. Phaser yalnızca oyun açıldığında yüklenir; çıkışta sahne kapatılır ve harita konumu korunur. Doğrudan adres: `?region=forest&game=memory-drawing`.
- Küçük menüde Dünya Haritası, Profilim, Ayarlar ve Nasıl Oynanır? bulunur.
- Profil, yıldız ve rozet değerleri tasarım örnekleridir. Gerçek oyun ilerlemesi, hesap ve diyar kilitleri henüz bağlanmamıştır.
- Hareketi azalt tercihi bu tarayıcıda saklanır. Ana sayfa ve menü küçük ekranlara uyum sağlar.

## Çalıştırma

Node.js 22.12 veya üzeri gerekir.

```sh
npm ci
npm run dev
```

Windows PowerShell komut yürütme ilkesi engelliyorsa `npm.cmd` kullanın.

```sh
npm run build
npm run preview
```

Derleme çıktısı `apps/web/dist/` altına yazılır. Geliştirme kök dizinde, üretim `/kesif-dunyasi/` altında çalışır.

## Dosyalar

| Kaynak | Görevi |
| --- | --- |
| `main.ts`, `App.vue`, `style.css` | Uygulama girişi, gezinme ve genel stiller |
| `WorldHome.vue`, `world-home.ts` | Dünya haritası ana sayfası ve diyar bağlantıları |
| `GameMap.vue`, `MapArtwork.vue`, `game-map.ts` | Bölge haritası, kamera, görsel katmanlar ve maskeler |
| `GameMarkers.vue`, `forest-games.ts`, `harbor-games.ts` | Oyun simgeleri, görselleri ve konumları |
| `GameMenu.vue`, `game-preferences.ts` | Oyun menüsü, profil görünümü ve hareket tercihi |
| `HomeIcon.vue`, `HomeSurface.vue` | Kullanılan arayüz ikonları ve görselleri |

Bu dosyaların hepsi `apps/web/src/` altındadır ve uygulamada kullanılır. Görseller ve fontlar `apps/web/public/assets/` altında tutulur; font lisansı font dosyasının yanındadır.

Oyunlar `apps/web/src/games/` altında tutulur. [Oyun klasör yapısı](docs/GAMES_STRUCTURE.md) ve [harita katmanları](docs/GAME_MAP.md) belgelerine bakılabilir.

## Yayınlama

`.github/workflows/deploy-pages.yml`, `main` dalına gönderilen değişiklikleri derleyip GitHub Pages üzerinde yayınlar. Depodaki Pages ayarında kaynak olarak GitHub Actions seçilmelidir.

Yayın adresi: https://tugcakilic17.github.io/kesif-dunyasi/
