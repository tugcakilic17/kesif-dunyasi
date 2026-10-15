# Sade Üç Sıralı Oyun Haritası — Güncel Beşinci Sayfa

Son yerel kıyı yolu, bahçenin kıyı bitişi ve büyütülmüş bilim adası düzeltmeleri `COAST_SCIENCE_LINK_PROMPTS.md` dosyasında kayıtlıdır. Bilim artık liman yerine Şekiller Bahçesi'nden köprüyle bağlanır.

Bu sürüm, iki sıralı haritanın ardından verilen yerleşim, ayrım ve sadelik düzeltmelerini uygular. Yerleşik **ImageGen** kullanıldı. Harita `?harita=5` adresindedir; önceki görseller sürümlü dosyalarda ve dördüncü sayfada korunur.

## Yerleşim

| Sıra | Sol | Sağ |
| --- | --- | --- |
| 1 | Keşif Ormanı, 1 ekran | Şekiller Bahçesi, 1,5 ekran |
| 2 | Deniz–Liman, 1,5 ekran | Bilim Adası, 1 ekran |
| 3 | Karlı Diyar, 1,5 ekran | Havada Süzülen Masal Adası, 1 ekran |

Dünya 9600 × yaklaşık 6483 birimdir: önceki iki sıraya karşı **üç sıra**; yatay genişlik 3,5 ekrandan 2,5 ekrana indirildi. Kar doğrudan limanın altındadır; bilim doğrudan limanın sağındadır. Alt sıra daha önceki yatay uzantının yerine gelir.

## Görsel kararlar ve son dosyalar

Ana orman ve liman estetiği referans alındı: geniş açık yüzeyler, yumuşak oyuncak benzeri biçimler, az sayıda yapı ve sade patikalar.

Tüm son dosyalar `apps/web/public` içindedir:

- `geometry-garden-main-v3.png`, `geometry-garden-main-mask-v3.png`: orman–bahçe sınırında geniş kuru vadi ve uzun asma köprü. Bahçenin renkli şekilleri ve az çiçekli düzeni korunur.
- Bahçenin sağ devamı `geometry-garden-east-v2.png` ve mevcut v2 maskesidir; aynı bahçenin iç bağlantısı korunur.
- `science-realm-v2.png`, `science-realm-mask-v2.png`: geniş açık denizle ayrılmış bilim adası, yalnızca sade gözlemevi ve küçük teleskop. Limandan uzun ahşap köprü gelir.
- `snow-realm-v2.png`, `snow-realm-mask-v2.png`: limanın altında, arada açık deniz bulunan kar adası; alçak buz mağarası, küçük dağ evi, donmuş gölet ve geniş boş kar alanları.
- `magic-realm-v2.png`, `magic-realm-mask-v2.png`: tek küçük şato, birkaç pembe ağaç ve geniş çim. Sivrilen kayalık alt, altından geçen bulutlar ve denize düşen ayrı gölge adanın havada olduğunu gösterir.
- `snow-magic-bridge-v1.png`, `snow-magic-bridge-mask-v1.png`: gerçek birleşim görünümünden üretilen yerel köprü bağlantı düzeltmesi; kar kıyısı ile masal adası arasındaki ahşap köprüyü kesintisiz bağlar.

`forest-valley-original.png`, `island-sea-south-v1.png`, `island-sea-east-garden-v5.png` ve onaylanmış kıyı maskesi aynı ölçek ve konumla yeniden kullanılır. Bu dosyalar ve dördüncü haritanın kaynakları SHA-256 karşılaştırmasında değişmemiştir. Yeni üç diyarın v1 görselleri de saklanır.

## Birleşim yöntemi

Kaynak koordinatlarında dünya 4180 × 2823 birimdir. Bilim kılavuzu solda 420 ve üstte 200 piksel komşu içeriği taşır. Kar kılavuzu 2508 × 1141, üst 200 piksel limanın mevcut alt kenarıdır. Masal kılavuzu 2092 × 1141, solda kar kenarı ve üstte bilim kenarı bulunur. Bunlar `work/build-calm-world-guides.ps1` ile onaylanmış/üretilmiş parçaların gerçek birleşiminden alınır.

Su bölgelerinde geniş renk eşleşmesi ve yumuşak maske, katı nesnelerde dar kontur kullanılır. Kar görselinin ilk üretimindeki yatay su bandı ImageGen ile hedefli olarak düzeltildi. Masal köprüsü kenar maskesinde kaybolmasın diye yalnızca köprü pikselleri için alfa görünürlüğü sağlandı. Son bağlantı, birleştirilmiş haritanın 900 × 600 piksellik gerçek kesitinde tekrar ImageGen ile düzeltildi; dış 60 kaynak pikselde yumuşak maske ile yerleştirildi.

## Kullanım ve doğrulama

- **Tüm Harita** üç sırayı birlikte gösterir; **Diyara git** seçilen bölgeyi çevresinde pay bırakarak gösterir.
- **+ / −** düğmeleri mobilde de yakınlaşma ve uzaklaşma sağlar. Fare tekerleği ve sürükleme çalışır.
- `npm.cmd run build`: TypeScript ve Vite derlemesi başarılı.
- `node --import tsx work/verify-calm-three-rows.ts`: üç sıra, karın limanın altında ve bilimin sağında olması, mevcut kaynakların aynen kullanılması, altı merkez erişimi ve 225 kamera kontrolü başarılı.
- `node --import tsx work/verify-island-world.ts`: dördüncü haritanın 900 kamera kontrolü başarılı.
- Tarayıcıda genel görünüm, masal adasının havada görünmesi ve köprünün gerçek kar kıyısına bağlanması doğrulandı. Dokuz görsel yükleniyor.
- 390 × 844 görünümde tüm gezinme düğmeleri ekran içinde; yakınlaşma, uzaklaşma ve sürükleme kontrol edildi. Geçici ekran boyutu inceleme sonunda kaldırıldı.

Gerçek tarayıcı önizlemeleri yerel `work/calm-three-row-browser-overview.jpg`, `work/calm-floating-magic-browser.jpg`, `work/calm-snow-magic-bridge-browser.jpg` dosyalarındadır. Büyük birleşim önizlemesi `work/calm-three-row-overview.png` dosyasıdır. `work` Git dışında tutulur.

## ImageGen istemleri

### Orman–bahçe için kuru vadi ve köprü

```text
Use case: precise-object-edit. Image is the approved Shapes Garden panel, EDIT TARGET. Change ONLY the connection between the organic forest on the left and the geometric garden on the right, so these two realms are visually separated. Create one broad, quiet, DRY meadow ravine in the transitional vertical strip approximately x360–680 of this1870x841 image: gentle grassy banks with a simple few grey stone faces and airy pale-blue shadow below, NO RIVER and NO waterfall. One LONG simple timber suspension footbridge should span this wide gap diagonally from the forest path to the garden's existing hedge arch entrance. The only visible crossing of this boundary should be this long bridge; remove the continuous flat path/grass joining across the ravine. Keep both banks gentle and clean, leave lots of open space, no dense bushes or decorative detail in the gap. Preserve the approved forest in the first330pixels and sky, preserve the pink sphere, yellow cube, pyramid, teal cylinder, fountain, all benches, geometry, clipped hedges and mosaic paths in the garden EXACTLY in their current positions. Keep the sparse flower density; don't add blossoms. Keep the far-right800pixels unchanged because another garden panel follows it. The bottommost160pixels outside the narrow ravine strip stay unchanged because the approved coast joins below. A calm child-friendly transition rather than a dramatic canyon: soft cartoon proportions, original lighting, same simple rounded forest/harbor game aesthetic, no extra structures, no tiny ornamentation, no text or UI, exact framing and aspect ratio.
```

### Sade bilim adası

```text
Use case: compositing / illustration-story. Fill ALL cream space in image1 with a CALM SCIENCE ISLAND, directly RIGHT of the approved harbor. Image1 is the exact2092x1141 EDGE GUIDE: preserve its LEFT420px harbor strip and TOP200px garden strip in exact positions. Image2 is the ONLY AESTHETIC REFERENCE: the approved simple forest/harbor illustration, with soft toy-like shapes, broad clean surfaces and lots of breathing space. Match THIS quiet low-detail children's illustration, not ornate fantasy architecture.
The science realm MUST be a visibly SEPARATE ISLAND with a broad belt of turquoise open water between it and both the upper garden shore and left harbor. Extend the upper garden's clipped grass into one quiet shore, ending its paths at the shoreline: NO continuous land or road to the science island. Leave at least300px of calm open water between the left reference shore and the new island where possible. Match the EXACT turquoise water color and gentle underwater texture of the reference. ONE long, simple wooden footbridge extends from the existing small harbor dock/shore toward the science island; it crosses broad still water, no river, no cascades or waterfall under the bridge.
New science island mainly occupies x800..2030 and y430..1000, with gentle grass and a few rounded gray coastal rocks. ONLY TWO landmarks: a modest blue glass-domed observatory/lab with simple cream walls and minimal trim, and one small telescope on a plain round lawn or stone pad. The dome is friendly and modest in scale like the harbor's lighthouse, not a palace. One simple curving sandy path links these two landmarks and the bridge; plenty of EMPTY green lawn, only3small round trees/shrubs. No experiments, solar panels, machinery, crystals, ornate railings, stairs, columns, lamps, fancy tiled plazas, flower beds, furniture or scattered tiny props. Let at least half of the new island surface be peaceful open lawn and keep the surroundings open water. Sparse simple highlights, bright warm daytime and original isometric camera. Bottom and right edges continue calm same-color water for later neighboring panels. No sky band at the top (garden terrain is above), no border, beige leftovers, labels, UI, text or icons. Large simple readable forms for small children, relaxing, gentle and uncluttered.
```

### Limanın altındaki kar adası

```text
Use case: compositing / illustration-story. Fill the blank cream area of image1 with a CALM SNOW REALM, a separate snowy island directly BELOW the approved harbor. Image1 is the exact2508x1141guide; its TOP200px are the approved harbor's bottom-edge WATER AND SMALL ISLANDS. Preserve this exact strip and seamlessly continue its precise azure/turquoise water hue and broad soft underwater rock pattern downward. Do not insert a sky/horizon band under the strip. Image2 is the ONLY AESTHETIC reference: original quiet child-friendly forest/harbor game illustration, rounded toy-like rock/trees, broad gentle areas, modest structures, warm sunlight and airy spacing. Match that simple style, not ornate ice fantasy art.
Leave a broad belt of peaceful OPEN SEA immediately below the top strip, about200 more pixels, before reaching the new snowy island. The island occupies roughly x300..2250,y400..1040, irregular/elongated rather than a forced circle, with a clean softly sculpted gray-rock coastline dusted with snow. Main contents ONLY: one low rounded snow-covered hill with a friendly small blue ICE CAVE (no towering jagged glacier), one tiny warm timber cabin, a modest flat pale-blue frozen pond and a single gently curving snow path between them. Just4–5small snow-dusted firs arranged in loose groups, lots of UNBROKEN white snowfields, no speckled snow clutter. One tiny simple timber landing pier on the upper shore can suggest access from harbor by boat; NO bridge needed here because wide sea separates these realms. Calm bright daylight, same object scale, original camera pitch/soft3D children's illustration. Snow dominant on the land, open smooth snowfields at least half of island surface. No ice crystals, waterfalls, cascading cliffs, many stairs/railings/lamps, ornaments, fences everywhere, giant building, excessive trees, flower gardens, props or spectacle. Keep the surrounding sea same-color at left/right/bottom edges, especially the last420right pixels for a later neighboring floating magic island. No beige leftovers, text, labels, icons, UI, border or extra islands densely filling the ocean. Relaxing, simple, broad readable shapes.
```

### Kar adasının üst su bandının onarımı

```text
Use case: precise-object-edit. EDIT this snow-island image ONLY to repair the sea continuity at the top. There is an unwanted perfectly horizontal abrupt water-color seam at y150 (approximately18% from top) where an upper reference strip was pasted above the rest. Remove this horizontal band boundary by repainting ONLY the upper water area y80..320 into one completely continuous gently varying azure/turquoise ocean with matching soft underwater boulder shadows and subtle ripple pattern. Retain the darker/deeper blue at the top corners and smoothly grade into the same cyan below, no straight horizontal stripe, no rectangle edge, no two stacked photographs. Keep the small partial tropical islets at the TOP EDGE exactly fixed, and keep the topmost60px colors unchanged for the neighboring harbor join. Preserve EVERYTHING from y320 downward absolutely unchanged: snowy island, cave, cabin, frozen pond, trees, rocks, dock, lighting, framing and proportions. Do not add objects, waves, bubbles or decoration. Same calm simple child-friendly illustration, exact aspect ratio, no text or UI. This is a local color/texture blend repair, not a redraw of the snow realm.
```

### Havada süzülen sade masal adası

```text
Use case: compositing / illustration-story. Fill the cream blank in image1 with a CALM FLOATING FAIRY/MAGIC ISLAND, in the third row RIGHT of the snow island and BELOW the science island. Image1 is the exact2092x1141neighbor guide: preserve the TOP200px sea from science and LEFT420px sea/small snowy coast from snow in exact positions. Image2 is the ONLY drawing aesthetic reference: original simple forest/harbor children's3D cartoon map, soft rounded forms, broad clean surfaces, relaxing open spacing. Match this style and modest detail level.
Continue the SAME azure/turquoise background as ocean FAR BELOW, so all guide edges blend with no vertical/horizontal color stripes. Create a clearly HOVERING ISLAND in the blank right area, roughly x800..1970 and y380..930: a gently grassy land top with a suspended tapered rocky UNDERSIDE visibly hanging in mid-air. Leave clear AIR SPACE under its pointed base before the ocean below; thin soft white cloud wisps pass BELOW the underside and a separate faint shadow lies far down on the sea. NO shoreline foam wrapping the island, no rocky base touching water, no terrestrial attachment. It must unmistakably float ABOVE the world, not be a rocky island in the ocean.
ONLY ONE modest landmark: a small friendly cream castle with3pink conical-roof towers, simple warm windows, no ornate gold trim, banners everywhere or huge architecture. One plain curving sandy path,3pink rounded ornamental trees and a few small smooth green bushes. At least half the grass surface remains EMPTY lawn. No portal, book cottage, crystals, mushrooms, fountains, flowers, lamps, stairs, terraces or scattered tiny props. Keep lots of calm air/sea around it.
ONE LONG simple timber/rope suspension bridge rises gently from the tiny SNOW COAST visible near x100,y830 in the left guide to the floating island's left edge around x820,y560, crossing a wide open AIR GAP. The bridge connects the two shore/land endpoints without continuous land and without a river/waterfall; only the bridge attachment may extend over the guide strip, all other reference contents remain fixed. Very simple timber boards,2supports at each end, minimal thin ropes. The underside remains visibly detached even though a bridge reaches it. Bright gentle daytime, same object scale/camera as original harbor, smooth toy-like illustrative textures, broad pastel pink/cream/green forms. No sky horizon band at top, labels, text, UI, borders or cream leftovers. Quiet child-friendly fairy setting rather than elaborate fantasy spectacle.
```

### Masal köprüsünün ilk uç düzeltmesi

```text
Use case: precise-object-edit/compositing. Image1 is the EDIT TARGET (floating fairy island1698x926); image2 is the EXACT2092x1141 neighbor-edge guide, and image3 shows the assembled map where the bridge is currently cut off in the middle of water. Repair ONLY the bridge's LEFT END and its attachment to the ACTUAL snow coastline; keep the castle, floating island, right bridge end, airborne rocky underside, shadow/clouds and all of the right half absolutely unchanged.
In target image1 the current left posts around (145,555) attach to an invented snowy boulder. That is the wrong place. Remove that invented isolated boulder and copy/match the TRUE snowy coast from the LEFT strip of image2 without moving it. Attach the LEFT bridge posts/deck to the actual rightmost snowy land edge at approximately (55,690) in image1's1698x926 coordinate frame (approximately x70,y850 in guide image2). Thus move the LEFT anchor about90pixels LEFT and130pixels DOWN; gently reshape/extend the lower half of the same suspension bridge to rise from that actual snow coast up to the unchanged floating-island entrance around(715,340). All bridge boards/ropes must form ONE continuous connected span, no cut mid-water, no detached wooden deck, no new intermediate island, no posts emerging from the sea. The bridge may extend into the left420source-pixel guide strip to connect to its real coast. Preserve all other original background/underwater colors and texture and reference snow rocks. Keep the original calm simple3D children's illustration style. Do not add details, waterfalls, buildings, decorations, text/UI or change framing. This is a precise local left-anchor correction for assembly, not a new scene.
```

### Gerçek harita kesitinde son köprü bağlantısı

```text
Use case: precise-object-edit. This image is an EXACT assembled-map closeup, edit target. The long wooden bridge entering from the upper-right currently ends in open water with two posts near(350,165) and(395,210). REPAIR ONLY THIS CONNECTION. Remove those two mid-water endpoint posts, and extend the same wooden boards and rope handrails LEFT until the bridge deck reaches the actual WHITE SNOWY MAINLAND on the LEFT, at the top of the existing gray cliff, near(120,185) in this900x600frame. Plant the two new endpoint posts on that white snow surface. The deck must touch the snowy land and form ONE uninterrupted walkable wooden span from mainland to the existing upper-right section. DO NOT attach to the detached boulder around(300,315), do not add an island, do not move the mainland/cliff. Keep exactly the existing snow shore and rocks, water colors/patterns, and the rightmost200px of the original bridge unchanged. The only other change is remove the stray isolated white surf scribble near(580,340) in open water and replace it with matching sea texture. Preserve the outside70px frame on all sides exactly for seamless compositing, no cropping/reframing, no extra props, same simple rounded child-friendly3D illustrated style. Clear visible land attachment, no deck or posts terminating in water.
```

