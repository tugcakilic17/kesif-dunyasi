# Keşif Dünyası

Orman, iki bölümlü Şekiller Bahçesi, kumsal ve adalardan oluşan keşif haritası. Uygulama doğrudan dördüncü tasarımı açar. Harita seçim menüsü ve görsellerin üzerindeki yuvarlak oyun noktaları kaldırılmıştır.

Fareyle veya dokunarak sürükleyin; fare tekerleğiyle yakınlaşın ve uzaklaşın. Kamera haritanın sınırlarında durur.

## Çalıştırma

Node.js 22.12 veya üzeri gereklidir.

```sh
npm ci
npm run dev
```

Windows PowerShell komut yürütme ilkesi npm komutunu engelliyorsa npm.cmd kullanın.

## Derleme

```sh
npm run build
npm run preview
```

Vue 3 ve TypeScript kaynakları `apps/web/src` içindedir. Derleme çıktısı `apps/web/dist` klasörüne yazılır. Statik barındırma için bu klasör kullanılır.

Ana ekran `apps/web/src/IslandWorldFour.vue`, görsel yerleşimi ve kamera sınırları `apps/web/src/island-world.ts` dosyasındadır. Kullanılan görseller `apps/web/public` altında saklanır. Görsel üretim tarifleri `docs` içindedir.
