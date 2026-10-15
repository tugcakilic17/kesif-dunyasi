# Referans arayüzüyle dünya haritası

Sonraki düzenlemede bu dosyada anlatılan pencere ve yerel profil davranışları kaldırılmıştır. Güncel ana sayfa yardımcı kontrolleri yalnızca görsel UI'dır. Bkz. [WORLD_HOME_STATIC_FULLSCREEN.md](WORLD_HOME_STATIC_FULLSCREEN.md).

14 Ekim 2026. Üretim modu: built-in imagegen. Görsel: `apps/web/public/assets/game_map/world-home-v3.png` (1672 × 941).

Kullanıcının “Oyun Dünyası Fantastik Haritası.png” görseli çizim ve arayüz düzeni referansıdır. Ada içerikleri mevcut orman, liman, şekiller, bilim ve masal bölgelerine uyarlanır; oyun içi haritanın katmanları ve ölçeği değiştirilmez. Ahşap başlık dışında arayüz görsele basılmaz: üst bar, etiketler, kartlar, yazılar ve düğmeler Vue bileşenleridir.

## Kaynaklar ve davranış

- `WorldHome.vue`: üst bar, etiketler, üç alt kart ve dört yerel pencere. Referansın1672 ×941düzeni, tek bir sahnede ölçeklenir.
- `HomeIcon.vue`: arayüzün kodda çizilen renkli ikonları.
- `world-home.ts`: yeni ada sınırları, etiket yerleşimleri ve dosya adresleri.
- `home-profile.ts`: isim, hareket tercihi, son diyar, keşfedilen diyarlar ve günlük farklı diyarlar; tarayıcıda saklanır. Bunlar ders/oyun tamamlama verisi değildir.
- Referanstaki320yıldız/50altın tasarım örnekleridir; gerçek bir ödül/hesap servisine bağlanmamıştır. Başlangıç profil adı referanstakiKağan'dır ve ayarlardan değiştirilebilir.
- Ebeveyn penceresi yerel keşif özetini, rozet penceresi keşfedilen diyarları gösterir. Günlük görev3farklı diyar ziyaretini sayar. Son oyun kartı mevcut uygulamada son keşfedilen diyarı açar.

## Kontrol

Derleme başarılı. Referans ölçüsünde başlık, bar, etiket ve kartlarda yatay taşma yok. Beş adanın fareyle seçilen sınırları doğrulandı. Orman etiketi oyun haritasındaki ormanı%100ölçekte açtı; dönüşte son diyar/rozet/görev bilgileri güncellendi. Hareket ayarı sayfa yenilenince korundu. Ayarlar, ebeveyn, rozet ve görev pencereleri açılıp kapandı. Geçici masaüstü ölçüsü test sonunda sıfırlanır.

Ekran görüntüsü: `work/world-home-reference-ui-web.png`.

## Görsel istemi

```text
Use case: precise-object-edit / reference-faithful game homepage art.
Image1 is the EXACT VISUAL STYLE and presentation target. Match its polished sunny colorful rounded3D toy storybook illustration, vibrant turquoise ocean, soft landscape shading, cliffs, foam, fluffy clouds and foreground corner foliage EXACTLY. Do not restyle, simplify to flat vector, change material or make a different mood. Image2 is ONLY the correct five realms and geographic arrangement for THIS game; use its realm identities and positions, NOT its rendering/empty layout.
Produce ONE full 16:9 1672x941 game-home BACKGROUND ART for a real HTML UI overlay. Everything should feel like Image1, but its islands must be replaced by OUR five actual realms:
- Upper-left FOREST approx x50–575,y190–460: treehouse, rounded trees/conifers, modest waterfall and golden winding path. NO letter castle/ABC.
- Upper-middle SHAPES approx x600–1120,y205–470: cube/sphere/pyramid/cylinder, central fountain, tidy geometric hedge garden. NO letters/numbers.
- Lower-left HARBOR approx x80–590,y465–740: lighthouse, sandy bay, one pier, two small colored-roof cottages, few palms and white-sail boat.
- Lower-middle SCIENCE approx x625–1140,y470–745: friendly blue domed school, small telescope, solar corner, smooth cyan scientific trees, pale cream plazas. NOT the wrong bottom-left placement in Image1, NO huge rocket or galaxy backdrop.
- Right FAIRY realm approx x1200–1600,y205–745: one elongated floating green meadow on lavender cliffs, restrained cloud cushion underneath, modest lilac/gold castle at top, smaller open magic book and pastel rainbow lower down, smooth glowing orb trees. NO numbers island and NO art/paint island.
Same modest bridges as actual geography: forest→shapes, shapes→science, science→lowest fairy meadow. No harbor→science bridge. Islands have clear boundaries and proportions, no more dense than Image1. Do not add a sixth realm.
KEEP Image1's overall page COMPOSITION and margins: top y0–90 reserved for live offwhite rounded HTML navigation bar; top-center y95–190 has the SAME wooden leaf-framed title sign but completely BLANK WOOD with NO words. Bottom y760–940 reserved for three live HTML cards, sea/clouds/soft foliage behind them. Preserve soft clouds and lush foreground leaves at lower corners, leaving card zones readable.
No header bar, navigation controls, logo, avatar, counters, buttons, card panels, badges, progress bars, UI labels or text should be painted into the image: those will be real HTML over it. EXCEPTION: keep the blank wooden title sign only. NO island-label pill plaques either; real interactive pill labels will be HTML below each island. Place island scenery above their label zones, with labels at forest(310,409),shapes(860,409),harbor(335,687),science(865,687),fairy(1400,687). Enough open calm space for narrow label pills without obscuring main landmarks.
Strict rendering STYLE priority: Image1 itself, EXACT cheerful high-quality aesthetic. The only story-content changes are our five realm identities/positions. No text, no watermark, no added UI; image must be the faithful matching scenic underlay for Image1's original style of interface.
```

