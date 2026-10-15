# Altı Diyar — Beşinci Haritanın Tamamlanması

Bu belge önceki iki sıralı sürümü kaydeder. Güncel üç sıralı, diyarları ayrılmış ve sadeleştirilmiş tasarım `CALM_THREE_ROW_MAP_PROMPTS.md` dosyasındadır.

Üretim ve hedefli çiçek düzenlemeleri yerleşik **ImageGen** aracıyla yapıldı. Harita `?harita=5` adresinde ve **5. Harita** düğmesindedir. Dördüncü harita korunur; önceki beşinci haritanın v1 bahçe görselleri de saklanır.

## Yerleşim

| Sıra | Sol | Orta | Sağ |
| --- | --- | --- | --- |
| Üst | Keşif Ormanı, 1 ekran | Şekiller Bahçesi, 1,5 ekran | Karlı Diyar, 1 ekran |
| Alt | Deniz–Liman, 1,5 ekran | Bilim Diyarı, 1 ekran | Sihir Diyarı, 1 ekran |

İki sıranın genişliği eşittir: 13440 × yaklaşık 4322 dünya birimi. Harita hem sağa hem aşağıya sürüklenir; dört diyarın ortak köşesinden çapraz geçiş mümkündür. **Tüm Harita** düğmesi genel görünümü açar, **Diyara git** menüsü bir bölgeye yakınlaşır. Referans fotoğraf konu ve çizim estetiği için kullanıldı; görseldeki başlıklar, kilitler ve oyun arayüzü kopyalanmadı.

## Son görseller

Tüm tüketilen dosyalar `apps/web/public` içindedir:

- `geometry-garden-main-v2.png`, `geometry-garden-east-v2.png`: yaklaşık %75 daha az küçük çiçek; şekiller, mozaik yollar, çeşme ve ana yerleşim korunur.
- `geometry-garden-main-mask-v2.png`, `geometry-garden-east-mask-v2.png`: yeni bahçe sürümünün bağlantı maskeleri.
- `snow-realm-v1.png`, `snow-realm-mask-v1.png`: buz mağarası, donmuş göl, karlı dağ ve dağ evi.
- `science-realm-v1.png`, `science-realm-mask-v1.png`: gözlemevi, teleskop, deney pavyonu, güneş panelleri ve dişli düzeneği.
- `magic-realm-v1.png`, `magic-realm-mask-v1.png`: şato, kitap evi, portal, kristaller ve büyülü vadi.

`forest-valley-original.png`, `island-sea-south-v1.png`, `island-sea-east-garden-v5.png` ve onaylanmış kıyı maskesi aynı dosya, ölçek ve konumla yeniden kullanılır. `island-world.ts`, `IslandWorldFour.vue` ve eski bahçe kaynakları değiştirilmedi.

## Komşu kenarların kullanılması

Harita kaynak koordinatlarında orman 1672 × 941, bahçe 2508 × 941 birimdir. Yeni karlı panel 2092 × 941 kılavuzla oluşturuldu; ilk 420 sütun bahçenin mevcut sağ kenarıdır. Bilim ve sihir panelleri 2092 × 1141 kılavuzları kullanır; ilk 420 sütun sol komşudan, üst 200 satır üst komşudan alınır. Bilim kılavuzu kıyı + bahçe; sihir kılavuzu bilim + kar içerir. Arazi, patika ve su dokuları bu gerçek kenarlardan devam ettirilir.

Üretim kılavuzları ve birleştirme önizlemesi `work/build-realms-guides.ps1`, bağlantı maskeleri `work/build-world-join-mask.ps1` ile hazırlanır. Bunlar yeni sahne çizmez; üretilmiş parçaları referans koordinatlarına yerleştirir. Su boyunca yumuşak, katı nesnelerde dar kontur bağlantısı kullanılır.

## Doğrulama

- `npm.cmd run build`: TypeScript ve Vite derlemesi başarılı.
- `node --import tsx work/verify-six-realms.ts`: altı bölge, boşluksuz iki sıra, 1,5 ekran bahçe, mevcut kaynakların aynen kullanılması, 225 kamera kontrolü ve tüm diyar merkezlerine erişim doğrulandı.
- `node --import tsx work/verify-island-world.ts`: eski haritanın 900 kamera kontrolü başarılı.
- Dördüncü haritanın onaylanmış dosyaları SHA-256 ile önceki sürüme karşı değişmeden doğrulandı.
- Tarayıcıda kıyı–bilim, bahçe–bilim, bahçe–kar, kar–sihir ve dört bölgenin ortak köşesi incelendi. Üretimdeki şato kulesinin üst bağlantıda kesilmediği yakın görünümde doğrulandı.
- 390 × 844 mobil görünümde gezinme denetimleri ekran içinde, sürükleme çalışıyor; geçici boyut ayarı inceleme sonunda kaldırıldı. Haritadaki sekiz görsel yükleniyor.

Gerçek tarayıcı ekran görüntüleri yerel `work/six-realms-browser-overview.jpg`, `work/six-realms-four-way-join.jpg`, `work/six-realms-science-preview.jpg`, `work/six-realms-magic-preview.jpg`, `work/six-realms-snow-preview.jpg` ve `work/six-realms-mobile-preview.jpg` dosyalarındadır. Birleştirilmiş büyük önizleme `work/six-realms-overview.png` dosyasıdır. `work` Git dışında tutulur.

## Üretim istemleri

### Ana bahçede çiçekleri azaltma

```text
Use case: precise-object-edit. Input image is the EDIT TARGET, an approved scrollable children's game Shapes Garden panel. Make ONLY one change: reduce the abundance of small white/pink/yellow flowers by about 75 percent throughout the garden, replacing their clumps with clean smooth bright green grass, simple low green geometric hedges or a few uncluttered green leaves. Leave only small sparse accents of blossoms; no continuous dense floral borders. The giant pink sphere, yellow cube, blue pyramid, teal cylinder, fountain, cream stone mosaic paths, benches, arches, clipped spherical/cubic hedges, pink trees, hills, sky, lighting, perspective, all object positions and sizes MUST remain exactly as the original. Keep the reference forest area in the LEFTMOST 360 PIXELS entirely unchanged, and the BOTTOMMOST 160 PIXELS unchanged (joins to approved forest and coastline). Keep the outermost right 60 pixels unchanged for matching. Remove flowers on the arches except a few small accents; keep arch shape. Do not create different terrain, buildings or extra objects. Exact same wide canvas aspect ratio and framing; no crop, no resize of scene, no text, no UI. Maintain the original charming polished soft 3D cartoon illustration aesthetic. The green geometric garden must read quieter and the colored solids must be its clear focal points.
```

### Sağ bahçede çiçekleri azaltma

```text
Use case: precise-object-edit. Image 1 is the EDIT TARGET: approved right continuation of a scrollable Shapes Garden. Image 2 is only the sparse-flower STYLE AND DENSITY REFERENCE, its adjacent left panel. Edit IMAGE 1 ONLY. Reduce its small white/pink/yellow flowers by 75–80 percent, replacing their clumps with smooth clean green grass and simple low green hedges. Keep only occasional tiny sparse blossom accents matching image 2; no thick multicolor flower rings or dense floral borders. Keep exactly the SAME cone, violet rectangular prism, yellow torus, partial blue pyramid and teal cylinder on the left, hedge puzzle, mosaic stone paths, arches, benches, topiary forms, pink trees, hills and sky. All positions, shapes, lighting, perspective, scale and framing must stay fixed. Keep it the same composition with fewer flowers rather than a redesign. The large solids should be the focal points. Maintain the original charming polished soft 3D cartoon game illustration. No text, UI, extra objects, scene crop, or rearrangement. Do not copy the sphere, cube or fountain from image 2 into this panel.
```

### Karlı diyar

```text
Use case: compositing / illustration-story. Create a seamless RIGHTWARD continuation of the supplied game map guide, replacing ALL blank cream space with a new SNOW REALM. Image 1 is the EXACT EDGE/PLACEMENT GUIDE (2092 by 941): leftmost420 pixels are the existing Shapes Garden, preserve them exactly including sky, paths, partial yellow torus, hedge arch, pink tree. Their right edge is a shared land border, not a panel boundary. Continue every cut path and grass contour naturally; the same cyan sky and clouds continue across the top without a vertical color change. Image 2 is ONLY a reference for the SNOW LANDMARKS and overall charming children's 3D cartoon map style; do not copy its UI, labels, locks, title or other realms. Layout: one screen of entirely new snowy mountainous territory to the RIGHT of the preserved garden strip. Within the first200–300 new pixels transition from pale meadow to rocky foothills with patches of frost, then thick white snow. A narrow curving meltwater stream/rocky ravine and one small timber footbridge mark the boundary so snow realm reads as its own place, not a winter garden. Center/right feature a beautiful tall white glacier mountain with blue-violet rock terraces, welcoming blue ice cave, a few snow-covered alpine firs (sparse), a small cozy timber chalet with warm windows, a winding snowy trail and turquoise frozen pond in the foreground. Bright daytime, same camera pitch/object scale, rounded sculpted foliage and rock forms, same detailed soft polished 3D illustration as guide. All new landmarks lie safely in blank region. Snow must be dominant, but not a blank white desert: readable path, pond, ice cave and a few clustered landmarks. Bottom edge continues terrain/ice paths towards a later magic valley below, no footer, sky strip, border, sea all around or standalone circular island. Keep whole exact wide framing, no cropping of the preserved strip; seamlessly paint full right region, no beige remaining, no typography or UI.
```

### Bilim diyarı

```text
Use case: compositing / illustration-story. Paint the entire blank cream region of Image1 into a beautiful SCIENCE REALM seamlessly joining TWO approved adjacent panels. Image1 is the EXACT spatial guide 2092x1141: TOP200 pixels are the lower edge of Shapes Garden and LEFT420 pixels are the approved seaside/shore. Preserve the supplied strips and their exact positions/colors/objects. This artwork will be directly BELOW Shapes Garden and RIGHT of the sea. Therefore NO SKY or horizon band at the top: the grassy paths cut by the bottom edge of the top strip must continue downward into the new terrain, with a gentle transition to pale violet stone and a narrow rocky stream/footbridge separating the garden from the science plateau. Along the LEFT boundary continue the exact turquoise sea hue, underwater rocks and shore curves naturally, then raise a distinctive blue-violet rocky coastal plateau just right of that strip. Image2 is ONLY inspiration for the blue observatory/science objects and the same family friendly polished 3D cartoon aesthetic; ignore its titles, labels, locks, clouds covering objects and other realms.
New blank region landmarks: a blue glass-domed observatory/lab building near center-left of the new terrain, a separate large white telescope on a round platform facing upper-right, a friendly open-air experiment pavilion with two modest glowing glass vessels, a small solar-panel array and a compact copper gear mechanism. These are functional science landmarks, not giant arbitrary shapes or magical castle. Connect them with readable pale lavender tiled paths, steps, low metallic railings; sparse teal round shrubs and few blue-tinted trees, no dense forest or flower carpets. A single short wooden/stone bridge over the border water gives access from the garden/coast. Mostly explorable science land, water mostly at left/lower coastal edge; do not make a detached circular island surrounded by sea. The palette stays bright DAYLIGHT, blue/lilac stone, turquoise glass, white walls and warm copper details; same camera pitch, object scale, soft shading and sculpted rounded forms as guide. Right edge should continue walkable lavender terrain/rocky watercourse into a later magic realm. Compose all large new landmarks below TOP200 and right of LEFT420; do not overlap approved reference objects. Full original aspect ratio, no borders, no beige left, no text, no labels, no lock icons, no UI. Blend land/sea color transitions carefully and keep the old reference panels aligned.
```

### Sihir diyarı

```text
Use case: compositing / illustration-story. Fill the whole cream blank area of IMAGE1 with a distinct MAGIC REALM, an explorable enchanted valley, seamlessly connected BELOW the Snow Realm and RIGHT of the Science Realm. Image1 is an EXACT EDGE GUIDE2092x1141: the TOP200 pixels are the approved snow realm's bottom (snowy path, ice crystals, rocky stream); LEFT420 pixels are approved science realm (telescope edge, pale lavender paths, copper gear, blue shrubs, violet cliff and sea). Keep these supplied strips exactly in place. IMAGE2 is only the style/subject inspiration for a welcoming pink-roofed magic castle; ignore all its UI, text, locks, title and other islands.
Continue the snow path out of the upper strip DOWNWARD naturally: a few melting frost patches then a shallow turquoise stream through rocks, crossed by a small stone footbridge, leads to warm lilac/rosy fairy terrain. NO SKY BAND or horizon at the top, since snow terrain is directly above. Along the left guide, continue the existing lavender cliff/path and water color: a narrow twisting stream/ravine and a small crossing mark the border between science and magic, with violet rocks gradually becoming rosy stone. Create a fully new right/bottom territory with a charming multi-towered cream castle with magenta conical roofs and small pennants on the upper-middle land terrace, one glowing blue-violet stone portal on a separate lower-right platform, a luminous crystal pond and a little enchanted book-shaped cottage/tower in lower-middle. Winding rose-colored stone paths connect the landmarks. A few large pink ornamental trees, 3 charming oversized mushrooms and small luminous crystals provide magic character; vegetation sparse, no flower carpets or dense forest. Some low valley mist may drift along rocky crevices without covering the routes. Mostly playable fairy land, gently raised rocky terraces; turquoise water along the left/bottom edge continues science water smoothly. Not a detached circular island, not a science garden. The magic area clearly differs from the blue mechanical science plateau and white snow mountains. Same polished soft3D children's fantasy illustration, bright daytime, scale/camera/light consistent with guides, pastel purple/pink highlights, cyan stream, clean readable paths, friendly inviting atmosphere. Put all new large buildings safely belowTOP200 and right ofLEFT420. Fill full canvas exactly without cropping reference strips, no cream leftovers, no panel borders, no text/labels/locks or UI.
```

