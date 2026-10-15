# Dünya haritası ana sayfası

Üretim modu: built-in imagegen. 14 Ekim 2026. Gerçek kaynak: 1672 × 941.

Görsel `apps/web/public/assets/game_map/world-home-v1.png` dosyasındadır. Etkileşim `WorldHome.vue`, görsel koordinatlarına bağlı sınırlar `world-home.ts` içindedir. Arka plana UI veya metin basılmamıştır; fare/klavye ile seçimde parlama kodda eklenir.

Orman, liman, şekiller, bilim ve masal olmak üzere beş diyar vardır. Karlı bölge mevcut oyun haritasında olmadığı için eklenmedi. Diyar seçimi `?region=...` üzerinden ilgili oyun bölgesini normal %100 ölçekte açar. Sürükleme, yakınlaştırma ve oyun katmanları korunur. Dünya haritasına dönüş düğmesi sadece oyun ekranındadır.

## İstem

Doğrulama: beş diyar bağlantısı %100 ölçekte doğru kamerayı açtı. Bilim kıyısında sürükleme kamera konumunu değiştirdi. Ana sayfaya dönüş, Enter ile seçim ve fareyle sınır parlama kontrol edildi. `npm.cmd run build` başarılı.

```text
Use case: stylized-concept.
Asset type: a SINGLE finished 16:9 landscape raster illustration for the interactive HOME WORLD MAP of a children's educational exploration game, ideally 2560x1440 or similarly high-resolution. This is ONLY the background art, with NO user interface and NO text.
References: Image1 is the user's desired home world-map composition/mood ONLY (its UI must disappear and its snow realm must NOT be included). Images2–5 are the actual approved in-game art: forest, shape garden, science campus and fairy realm. Match THESE approved references exactly in cute polished rounded 3D storybook rendering, clear edges, sunny bright colors, soft surfaces, friendly architecture and terrain. Re-imagine their identities at a MUCH MORE SIMPLIFIED far-away world-map scale, NOT their dense level details.
Scene: an inviting turquoise/azure ocean and precisely FIVE readable themed island realms, forming one harmonious continuous world. Slightly elevated isometric perspective. Gentle small low-contrast water patches matching approved map, no caustic grid, no dark rock masses in the open sea. Few soft white clouds at OUTER corners only, without obstructing selectable shores. No sixth realm, no ice/snow, no space/galaxy overlay.
Composition tied to actual game geography: forest UPPER LEFT approx x8–34% y10–50%; shapes UPPER MIDDLE approx x39–67% y10–47%; harbor/sea LOWER LEFT approx x6–36% y55–90%; science LOWER MIDDLE approx x40–69% y55–91%; fairy elongated RIGHT approx x74–95% y12–89%. Entire silhouettes fit comfortably inside the canvas, NOT cropped by any edge. Islands occupy most of canvas but have clear modest water channels; no empty central UI hole. Keep visually balanced sizes. Forest→garden can have one thin wooden bridge, garden→science another small bridge, science→lowest fairy meadow one tiny pastel curved bridge, all subordinate to island silhouettes. Most of each island's outer boundary stays clearly visible, organically shaped, so real interactive shoreline outlines can later be drawn.
Realm contents SIMPLIFIED, just a few unmistakable landmarks, much less detailed than references:
1 Forest: soft green rounded trees and a few conifers, one tiny treehouse, one winding golden trail and a single waterfall descending a grey-lavender cliff, restful green open areas. NOT thick dense tree carpet.
2 Shapes: distinctive designed cream tile paths and geometric hedges, one yellow cube, one red sphere, one blue pyramid plus one green cylinder, a modest central fountain. Clean garden, rare flowers, not a forest with shapes.
3 Harbor: warm sandy coast, short wooden pier, red-white lighthouse, two tiny bright-roof cottages, few palms; one small white-sail boat in its shallow turquoise bay. ONE coherent selectable archipelago/shore region, not many tiny scattered islands.
4 Science: pale cream plazas with low white-blue walls, one friendly blue domed science school, one small telescope and a compact solar panel corner; several smooth oval cyan-blue scientific trees. No ordinary forest, no clutter of gears/objects/giant props.
5 Fairy: ONE organic elongated floating land with lavender cliffs and ONLY a restrained cloud cushion beneath its base, sunny green magical meadow, modest lilac/gold castle, smaller open magic book and pastel rainbow arch lower down, handful smooth glowing orb trees in pink/lilac/cyan. No leafy busy blossom trees, no huge cloud sea, no oversized castle/book compared to other realm buildings. Its surface still looks like explorable terrain, not disconnected ornaments.
Lighting and mood: calm cheerful sunny toy-like game-map rendering, premium delightful children's illustration, consistent warm illumination and perspective, legible silhouettes and fewer deliberate details.
STRICT: NO UI, text, labels, cards, button, title, avatar, progress bar, lessons/explore tabs, logo, watermark, borders or frame. Do not copy any of the reference UI. No hover glow painted into the base image. No photorealism, no dense microdetail, no empty center left for UI. This is a complete world illustration with five unmistakable selectable territories and clear shorelines.
```

