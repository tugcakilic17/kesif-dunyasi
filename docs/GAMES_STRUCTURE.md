# Oyun klasörleri

```text
apps/web/src/games/
  forest/
    memory-drawing/
      Game.vue
      MemoryScene.js
      shaders.js
      assets/
  harbor/
  shapes/
  science/
  magic/
  shared/
    ui/
      GameShell.vue
      GameResult.vue
    result.ts
  catalog.ts
```

Küçük ve bağımsız bir oyun, kendi diyarında tek bir `PascalCase.vue` dosyası olabilir. Her oyun için klasör açılması zorunlu değildir. Oyuna özel görseller, Phaser sahneleri veya yardımcı dosyalar varsa `kebab-case` adlı tek bir oyun klasörü kullanılır.

Hafıza ve Çizim özel görselleri ve Phaser sahnesi olduğu için `forest/memory-drawing/` altında tutulur:

- `Game.vue`: Vue arayüzü, durum göstergeleri ve Phaser yaşam döngüsü. Stilleri yalnızca bu oyuna uygulanır.
- `MemoryScene.js`: Oynanış, turlar, kareler ve sahne yerleşimi.
- `shaders.js`: Yaprak hareketi efektleri.
- `assets/`: Yalnızca bu oyunda kullanılan 13 görsel.

Ayrı `package.json`, Vite ayarı, `node_modules`, `dist`, uygulama girişi veya Git deposu gerekmez; oyun ana projenin Vue ve Phaser bağımlılıklarını kullanır. Mevcut JavaScript kodunu korumak için `allowJs` açıktır; ana uygulamada TypeScript denetimi devam eder.

`harbor`, haritadaki `sea` kimlikli Deniz ve Liman diyarıdır. Diğer klasörler doğrudan diyar kimlikleriyle eşleşir.

Ayarlar düğmesi, yıldız göstergesi ve benzeri ortak bileşenler doğrudan `shared/ui/` içine eklenir; şimdilik alt klasörler yoktur. Her oyuna ait özel dosyalar o oyunun içinde kalır.

`shared/ui/GameShell.vue`, tüm oyunların kullanabileceği haritaya dönüş düğmesini, yükleme ve hata görünümünü sağlar. `catalog.ts` oyun kimliklerini ve geç yüklenen giriş bileşenlerini tanımlar. Harita simgesine `gameId` eklenmesi oyunu bu katalogdaki kayıtla eşleştirir.

## Ortak oyun sonucu

`shared/ui/GameResult.vue` bütün diyarlar için tek sonuç tasarımıdır. Oyun adı katalogdan alınır; yıldızlara göre başlık ve teşvik mesajı ortak bileşende belirlenir. Oyunlar kendi sonuç ekranını oluşturmaz; bittiğinde `complete` olayıyla `shared/result.ts` içindeki `GameResult` sözleşmesine uygun veri gönderir:

```ts
emit('complete', {
  stars: 2, // 0, 1, 2 veya 3; kuralı ilgili oyun belirler.
  metrics: [
    { label: 'Tamamlanan tur', value: '4 / 5' },
  ], // En fazla üç kısa bilgi gösterilir.
})
defineExpose({ restart }) // Mevcut zorluğu koruyarak yeni oyun başlatır.
```

Sonuç penceresi klavye odağını içinde tutar, arka plandaki kontrolleri engeller ve iki seçenek sunar: Haritaya Dön ve Tekrar Oyna. Tekrar oynama ortak kabuktan oyunun `restart()` metodunu çağırır. Pencere bir diyarın görseline veya maskotuna bağımlı değildir; dar ve yatay ekranlara uyarlanır, azaltılmış hareket ayarını destekler.

Hafıza ve Çizim'de 5 başarılı tur 3 yıldız, 3–4 tur 2 yıldız, 1–2 tur 1 yıldız, 0 tur 0 yıldız getirir. Gösterilen değerler bu denemenin sonucudur; profil kaydı ve diyar kilidi açma bu bileşenin sorumluluğu değildir.

Henüz oyun eklenmemiş diyarlar, Git ile taşınabilmeleri için boş `.gitkeep` dosyaları içerir. Gerçek ilerleme ve ödül kaydı henüz bağlı değildir.
