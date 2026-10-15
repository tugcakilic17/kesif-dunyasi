# Geometrik Şekiller Bahçesi — Beşinci Harita

Bu belge ilk beşinci haritanın v1 bahçe üretimini kaydeder. Çiçekleri azaltılmış v2 bahçe ve eklenen bilim, sihir, karlı diyarların güncel üretimi `SIX_REALMS_PROMPTS.md` dosyasındadır.

Bu tasarım yerleşik ImageGen aracıyla üretildi. Dördüncü harita ve kaynakları korunur. Yeni sayfa `?harita=5` adresinden veya sağ üstteki **5. Harita** düğmesinden açılır.

## Yerleşim ve görseller

Bahçe ormanın sağında başlar; ana parça bir ekran, sağ devam yarım ekran genişliğindedir. 420 kaynak pikseli bindirme bu ölçülere dahil değildir. Orman 3840 birim, bahçe 5760 birim; üst sıra toplam 9600 birimdir. Alt sıradaki onaylanmış deniz ve kıyı 5760 birim genişliğinde aynen kullanılır.

- `apps/web/public/geometry-garden-main-v1.png`: açık taş meydan, mozaik yollar, küre, küp, piramit, silindir ve çeşme.
- `apps/web/public/geometry-garden-east-v1.png`: yarım ekran devamı; koni, prizma, halka ve alçak geometrik çitler.
- `apps/web/public/geometry-garden-main-mask-v1.png`: orman sınırı için bağlantı maskesi, 2092 × 941.
- `apps/web/public/geometry-garden-east-mask-v1.png`: bahçe devamı için bağlantı maskesi, 1256 × 941.

Aynen yeniden kullanılan kaynaklar: `forest-valley-original.png`, `island-sea-south-v1.png`, `island-sea-east-garden-v5.png` ve mevcut kıyı maskesi. Eski bahçe görselleri değiştirilmedi.

## Referans ve geçiş yöntemi

Ana üretim kılavuzu 2092 × 941 boyutundadır: soldaki 420 piksel onaylanmış ormanın sağ kenarıdır. Alt kenarın ilgili bölümünde onaylanmış kıyının üst 200 pikseli bulunur. Devam kılavuzu 1256 × 941 boyutundadır; soldaki 420 piksel yeni ana bahçenin sağ kenarıdır. Bağlantı maskeleri `work/build-world-join-mask.ps1` ile ortak içerikte en az fark gösteren sınır boyunca hazırlanır. Referans ağaçlar yalnızca girişte kalır; bahçenin ana kimliği açık taş zemin ve geometrik peyzajdır.

## İlk ana üretim istemi

```text
Use case: compositing / illustration-story.
Asset type: new FIFTH page's distinctly themed SHAPES GARDEN, first full-screen section of a total 1.5-screen garden.
INPUT 1 is the 2092 x 941 edit-target layout. The entire LEFT 420 columns are the exact neighboring forest edge. A fixed BOTTOM 200-row strip at x420..1255 shows the existing coastal meadow directly below the future garden, including its golden path and a few leafy bushes/rocks. Preserve both these illustrated neighbor reference regions in place and scale. Paint ONLY the remaining blank cream region as a NEW distinct garden world.
INPUT 2 is the old garden. Keep its beloved colorful shape solids and the same soft sculpted 3D drawing aesthetic, but replace its forest-dominated scenery and layout completely. It must NOT look like a forest clearing with shapes added.
INPUT 3 is the existing coast directly below. It is already finished and must stay unchanged. The new garden's bottom-left meadow and path must naturally lead into this coastal meadow, matching colors, scale and ground contours.

Output exactly 2092 x 941 landscape. First 420 columns stay fixed. Follow the original land levels and warm golden forest path at the seam x420. No sea, moat, cliff or wall between forest and garden. A short first 160-220 pixels of new land gently transforms from sparse last forest trees and organic grass to ordered ornamental garden. The main garden then becomes a clearly NEW THEMED REALM with a deliberately different visual identity.

MAIN NEW GARDEN VISUAL IDENTITY: an airy colorful GEOMETRY GARDEN with an OPEN CREAM-IVORY STONE PLAZA, light stone/mosaic walking paths, neatly cut geometric mint-green lawns (circle, square, triangle and rounded polygon shapes), low clipped hedge borders, vivid flower ribbons and little pastel mosaic inlays. Smooth architectural garden order, bright flowers and open sky/light, rather than dense woodland. Shape-themed ground design is everywhere, so the environment itself tells the geometry theme. The central plaza and light stone surfaces occupy significant visible area, perhaps 35-45% of the new region; lawn remains lively, not a desert or gray city.
Keep the iconic bright pink-red SPHERE, warm yellow CUBE and rich blue PYRAMID, and add the teal CYLINDER in their own distinct spacious geometric courts around a modest elegant blue fountain in the central open plaza. Shapes are soft shaded solids at the same scale as the old garden. Their courts have different simple paving outlines and flower borders. They are learning destinations, not skyscrapers. Curving or gently angular light-stone paths connect all courts and a small flower-covered entry arch near the forest transition. A few tiny honey-orange benches, low flowering shrubs, clipped rounded/cubic topiary accents. Leave clear spacious stopping places.
VERY FEW FULL TREES: at most THREE small pink flowering ornamental trees in the entire NEW field beyond the fixed reference strips. NO new conifer rows, no dark forest canopy, no bulky green broadleaf tree clusters. Existing trees in the fixed reference strips may remain. Trees must be decorative edge accents; the geometry courts, bright mosaic paths and flowerbeds are the landscape's dominant features.
BACKGROUND: preserve the thin blue-sky continuity at the far left border, while distant purple mountains and dense forest gradually recede within the short transition. Behind the MAIN garden use low open flower-covered rolling hills and a light airy horizon, no snowy mountain range marching across the whole new garden. Keep the same elevated oblique map camera and sunny lighting; no floating islands, no outer water ring, no separate circular diorama.
BOTTOM JOIN: preserve the bottom-left reference meadow. Light stone paths gradually become the existing warm golden coastal path leading out at the bottom-left of the new garden. Ornamental beds loosen into low coastal flowers and lime grass; no abrupt gray pavement to yellow sand line. The existing coast below is not re-created. Bottom-right remains open garden meadow for possible later regions.
RIGHT 250 columns should provide a simple continuation of geometric lawn and light-stone path with low flowerbeds, no cropped giant shape or large tree. A HALF-SCREEN garden continuation will be attached next. Main area is not to be stretched later; create at original object scale.
EXACT drawing medium: same vibrant soft round 3D toy-like children's storybook illustration as references, smooth rounded geometry, saturated happy colors, softly volumed pink flowers and low clipped hedges, cream ivory stone, mint and lime lawn, gentle warm sunny light and ambient shadows. Same camera and object scale. Different THEME, same ART AESTHETIC. No outlines, gritty texture or realistic photo materials.
No characters, labels, writing, text, UI, numbered circles, game markers, icons, borders or watermark. Preserve both reference connection strips; do not add any new sea in this garden.
```

## Ana görselin hedefli düzeltme istemi

İlk üretimdeki yeni kozalaklı ağaçlar alçak şekilli çitlerle değiştirildi; orman sınırındaki arka plan şeridi düzeltildi.

```text
Use case: precise-object-edit / compositing.
Edit this generated SHAPES GARDEN while preserving its colored geometric solids, fountain, light stone plaza, paths, flower arches, camera, object scale and overall layout.
Two focused corrections:
1. In the NEW garden area to the RIGHT of the left forest strip (approximately right of 20% image width), REMOVE EVERY pointed teal conifer / evergreen-tree silhouette. There are several around the sphere, cube, pyramid, cylinder and flowerbeds. Replace those tree-like silhouettes with SMALL LOW TRIMMED ROUND OR CUBIC HEDGES, geometric lawn islands, flowerbeds or open grass. Do not replace the actual blue geometric PYRAMID, yellow CUBE, pink SPHERE, teal CYLINDER or any solid sculpture. The garden should read as an open formal GEOMETRY REALM with plaza and low topiary, not woodland. Keep only the existing two modest pink blossom trees. No new tall trees. Keep the original conifers inside the FAR LEFT forest reference region.
2. Fix the visible straight vertical reference border near 20% image width, especially the cut-off distant mountains/sky and lower grass. Repair a narrow band roughly from 16% to 27% image width as one continuous natural forest-to-formal-garden transition. Extend the last distant mountain contour into lower gentle flower hills smoothly, not a straight cliff-like cut; carry blue sky continuously without a line. Ground grass and paths cross this band naturally with gradually more low clipped hedges and light stone paving. No pasted rectangle boundary, straight color divider, overlapping ghost tree, duplicated rock or hard stripe. Keep the far-left 12% unchanged so the neighboring original forest still matches.
The bottom-left coastal meadow connection strip should remain grass and golden path, matching its current cottage coast neighbor; remove only the visible vertical patch edge there. Do not turn that bottom meadow into paving or new shape statues. Keep all other parts as they are.
Same colorful soft sculpted 3D storybook toy-map style, warm sunny soft volume, bright flower colors, ivory stone and mint-lime garden grass. No woodland in the main garden, no new sea, no text, labels, people, UI or game circles. Maintain the same wide canvas aspect.
```

## Sağdaki yarım ekran devamının istemi

```text
Use case: compositing / illustration-story.
Asset type: HALF-SCREEN eastern extension of the NEW distinct geometry garden. The complete garden must occupy only 1.5 forest-screen widths.
INPUT 1 is the EDIT TARGET: 1256 x 941 canvas, leftmost 420 pixel columns are the exact right edge of the new formal garden. The blank cream area to its RIGHT is 836 columns wide, HALF a forest screen. Preserve the reference strip at the same position, size, camera and lighting. Paint ONLY the blank right area.
INPUT 2 is the complete new formal garden, exact theme/aesthetic/scale reference.
Output 1256 x 941. Continue ivory stone paths, pastel geometric mosaic patterns, neatly cut mint-green geometric lawns, flower ribbons and low rounded/cubic hedge borders across x420 with no visible seam, repeated object or color stripe. Continue the SAME open low flower-covered hills and thin blue sky horizon, no mountains or forest. The blue cylinder in the fixed strip belongs to the preceding section; don't duplicate it.

NEW HALF-SCREEN: a compact but airy set of 3 distinct geometric learning courts around connecting LIGHT STONE walking paths. One rich orange-red CONE in an upper clearing, one violet RECTANGULAR PRISM in a middle court, one warm golden TORUS (ring-shaped solid) in a lower court. They have distinct circular/rectangular/polygonal lawn outlines and simple mosaic paving borders, at the SAME scale as the first screen's shapes. Fit them with clear open walking space between them; don't make the solids oversized to fill this shorter width. A SMALL LOW CLIPPED HEDGE PUZZLE / compact maze can sit near lower-middle, not another massive garden island. A few little benches, a simple flower-covered arch or hedge opening, bright low flowerbeds. No new big fountain. Do not repeat the sphere, cube, pyramid or cylinder.
Main landscape identity is an OPEN FORMAL GEOMETRY GARDEN: ivory stone/pastel mosaic paths, geometric lawn panels, sphere-and-cube-shaped clipped shrubs and flower patches. NOT a forest. Absolutely NO new conifers, evergreen tree silhouettes, large green tree canopy, mountain range or big woodland clusters anywhere in the new area. At most ONE small ornamental pink blossom tree near a distant edge; all other vegetation is LOW shrubs, clipped hedges and flowers. Lots of airy sunlit space.
The right edge ends naturally with low flowerbeds, open lawn and a path edge for future map growth, no surrounding sea or island outline. Bottom is low grassy garden meadow and flowers, no cliff or shoreline. Scene remains connected mainland, not an enclosed round diorama.
Exact illustration medium of input2: vibrant soft sculpted 3D toy-like children's storybook world, round smooth solids, colorful flowers and shaped hedges, pale cream ivory paving, mint-lime lawn, soft warm sunny light and gentle ambient volume/shadows. Same elevated oblique camera and object size. Avoid photo realism, black outlines, gritty detail, crowded ornate buildings or forest palette dominance.
No people, text, UI, labels, game circles, numbered markers, icons, clouds covering edges, border or watermark. Critical: half-screen continuation only, seamless match to reference, no return to woodland.
```

## Doğrulama

- `npm.cmd run build` başarılı.
- `node --import tsx work/verify-geometry-world.ts`: ölçüler, kaynakların aynen kullanılması ve masaüstü/mobil kamera hareketleri; 900 kontrol başarılı.
- `node --import tsx work/verify-island-world.ts`: dördüncü haritanın 900 kamera kontrolü başarılı.
- Dördüncü haritanın yerleşimi, bileşeni ve onaylanmış orman/deniz/bahçe kaynakları SHA-256 karşılaştırmasıyla değişmeden doğrulandı.
- Tarayıcıda orman–bahçe, ana–yarım ekran bahçe ve bahçe–kıyı birleşimleri incelendi. 4/5 geçişinde kamera konumu korunuyor; yeni sayfadaki beş görsel de yüklendi.

Tarayıcı önizlemeleri yerel `work/fifth-world-forest-garden-join.jpg`, `work/fifth-world-garden-main-preview.jpg`, `work/fifth-world-garden-east-preview.jpg` ve `work/fifth-world-garden-coast-join.jpg` dosyalarındadır. `work` üretim/inceleme alanıdır ve Git dışında tutulur.

