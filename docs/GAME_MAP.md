# Harita dosyaları

## Bölge haritası

`game-map.ts`, dünya ölçülerini, diyarları ve `worldImages` katmanlarını tanımlar. `MapArtwork.vue` görselleri maskeleriyle yerleştirir; `GameMap.vue` sürükleme, yakınlaştırma ve kamerayı yönetir.

`public/assets/game_map/` altında kullanılan 15 görsel ve 12 dosya maskesi vardır. Aynı bölgede birden fazla görsel bulunması gereklidir: genel kaynaklar arka planı tamamlar, ayrıntı görselleri maskelerle üzerlerine yerleşir. Dosya adındaki sürüm numarası, dosyanın kullanılmadığı anlamına gelmez.

| Alan | Kullanılan görseller |
| --- | --- |
| Deniz | `world-ocean-storybook-v1.png` |
| Orman | `forest-valley-original.png` |
| Şekiller | `geometry-garden-main-v3.png`, `geometry-garden-east-v2.png` |
| Liman | `island-sea-south-storybook-v1.png`, `island-sea-east-garden-storybook-v1.png`, `harbor-beach-south-storybook-v1.png`, `coast-valley-link-storybook-v1.png` |
| Bilim | `science-realm-storybook-v1.png`, `science-campus-storybook-v1.png`, `science-campus-north-storybook-v1.png`, `science-campus-south-storybook-v1.png` |
| Masal | `cloud-fairy-realm-storybook-v1.png`, `cloud-fairy-north-storybook-v1.png`, `cloud-fairy-south-storybook-v1.png` |

Katman sırası ve maskeler birlikte çalışır. Kıyı geçişlerinde dosya maskelerine ek olarak kodda tanımlı gradyanlar kullanılır.

## Ana sayfa ve arayüz

- Ana sayfa arka planı: `public/assets/world_map/background/world-home-v10.png`.
- Kullanılan arayüz görselleri: `public/assets/world_map/ui/`; görsel sınırları `HomeSurface.vue` içinde tanımlıdır.
- Font ve lisansı: `public/assets/fonts/`.
- Oyun simgeleri: `GameMarkers.vue`; orman ve liman konumları ilgili `*-games.ts` dosyalarındadır.

Varlık adresleri Vite `BASE_URL` ile oluşturulur. Bu sayede GitHub Pages alt dizininde de aynı dosyalar yüklenir.
