# Keşif Dünyası

Orman, Deniz ve Liman, Şekiller Bahçesi, Bilim Diyarı ve Masal Diyarı içeren keşif oyunu. Ana sayfa, verilen Oyun Dünyası referansının çizim ve arayüz düzenini esas alır: üst bar, ahşap başlık, renkli bölge etiketleri ve son keşif/rozet/günlük görev kartları bulunur. Bir diyarın üzerine gelince sınırı parlar; tıklayınca oyun haritasındaki o bölge normal %100 ölçekte açılır.

Üst menü ve alt kartlar şimdilik yalnızca görsel UI'dır; tıklanınca pencere veya sayfa açılmaz. Profil, ilerleme ve ödül değerleri tasarım örnekleridir. Diyar seçimi oyun haritasına açılır. Ana sayfa, yataya yayılmış adaları olan tek kesintisiz sahneyle ekranın tamamını kaplar. Üstte gökyüzü ve bulutlu deniz ufku, iki alt köşede büyük yapraklar ve çiçekler bulunur. Yuvarlak ve sade çocuk oyunu çizimi kullanılır. Deniz, seyrek kayık ve bulutlarla canlandırılır; alt adaların kıyıları kartların üstünde tamamlanır. Tekrarlanan deniz zemini kullanılmaz. Güncel yerleşim ve görsel üretim kaydı `docs/WORLD_HOME_ROUNDED_PLAYFUL_PROMPT.md` dosyasındadır.

Oyun içindeki **Dünya Haritası** düğmesi ana sayfaya döner. Diyar bağlantıları `?region=forest`, `?region=shapes`, `?region=sea`, `?region=science`, `?region=magic` biçimindedir. Tarayıcının geri/ileri düğmeleri ve klavyeyle seçim desteklenir. Eski deneme sayfaları kaldırılmıştır.

Haritayı fareyle sürükleyerek veya tekerlekle gezin. **Tüm Harita**, **Diyara git** ve **− / +** kontrolleri kullanılabilir. Yakınlaştırma normal açılış ölçeği olan %100 ile sınırlıdır.

## Dosya düzeni

```text
apps/
  web/
    public/assets/game_map/  # Oyun ve ana sayfa görselleri, geçiş maskeleri
    src/
      App.vue               # Uygulama giriş bileşeni
      GameMap.vue           # Harita görünümü, kamera ve kontroller
      game-map.ts           # Diyarlar, katmanlar, ölçüler ve dosya yolları
      WorldHome.vue         # Tıklanabilir dünya haritası ana sayfası
      world-home.ts         # Ana sayfa görseli ve diyar sınırları
      HomeIcon.vue          # Renkli arayüz ikonları
      main.ts
      style.css
  server/                   # Sunucu alanı
docs/
  GAME_MAP.md               # Güncel harita varlıkları ve katman bilgileri
  WORLD_HOME_PROMPT.md       # Ana sayfa görselinin üretim kaydı
  archive/                  # Önceki tasarım ve üretim kayıtları
```

Görseller `public` altında tutulduğu için geliştirmede ve üretimde doğrudan sunulur. Dosya adresleri Vite `BASE_URL` ile oluşturulur; GitHub Pages alt dizini desteklenir. Görsel yerleşimi, maskeler ve katman sırası haritanın geçişlerini birlikte oluşturur.

## Çalıştırma

Node.js 22.12 veya üzeri gerekir.

```sh
npm ci
npm run dev
```

Windows PowerShell komut yürütme ilkesi engelliyorsa `npm.cmd` kullanın.

## Derleme

```sh
npm run build
npm run preview
```

Derleme çıktısı `apps/web/dist` klasörüne yazılır. Statik barındırma için bu klasör kullanılır.

## GitHub Pages

Depoda **Settings → Pages → Build and deployment → GitHub Actions** seçin. **Actions → Deploy to GitHub Pages → Run workflow** ile `main` dalını yayınlayın. `.github/workflows/deploy-pages.yml`, `main` dalına gönderilen değişiklikleri de otomatik derleyip yayınlar.

Yayın adresi: https://tugcakilic17.github.io/kesif-dunyasi/

Yerel geliştirme kök dizinde, üretim önizlemesi `/kesif-dunyasi/` altında çalışır.
