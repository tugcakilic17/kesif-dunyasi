# İki ekranlık Şekiller Bahçesi ve bahçeden sahile geçiş

Yerleşik `image_gen` kullanıldı. Dördüncü haritanın ormanının sağına iki tam genişlikte bahçe görseli eklendi. Kullanıcının referansı şekiller, çitler, çiçekli ağaçlar ve bahçe estetiği için kullanıldı; yuvarlak ada biçimi, çevreleyen deniz, etiket ve arayüz işaretleri alınmadı.

Son proje varlıkları:

- `apps/web/public/shape-garden-west-v1.png`: küre, küp, piramit, çeşme ve çiçekli bahçe.
- `apps/web/public/shape-garden-east-v1.png`: silindir, koni, prizma, halka ve çit labirenti; ilk bahçenin devamı.
- `apps/web/public/island-sea-east-garden-v5.png`: bahçeden sahile inen çimenli/çiçekli kıyı, üç ev ve kayık iskelesi. Geniş çöl gibi boş kum alanı kullanılmaz.
- `apps/web/public/shape-garden-west-join-mask-v1.png`, `shape-garden-east-join-mask-v1.png`, `island-sea-east-garden-mask-v5.png`: çizimdeki nesneleri saydamlaştırmadan bağlantı yapan uygulama maskeleri.

Üst sıra: orman (x0–3840), ilk bahçe (x3840–7680), ikinci bahçe (x7680–11520). Her bölüm yaklaşık 2161 dünya pikseli yüksekliğinde. Alt sıra: değiştirilmeyen sol deniz (x0–3840) ve düzenlenen kıyı (x3840–5760), y2161–4322. Dünya 11520 × yaklaşık 4322 pikseldir. Kamera alt sıranın sağındaki görselsiz alanı dışarıda tutar. İlk üç sekme, orman kaynağı ve sol deniz kaynağı korunur.

Bahçe üretim tuvalleri 2092 × 941: solda 420 kaynak piksellik komşu şeridi, sağda 1672 piksellik tek tam yeni ekran. Kıyı tuvali 1256 × 1141: solda 420 piksellik deniz bağlantısı ve üstte 200 piksellik orman/bahçe bağlantısı. Nesnelerde dar kontur birleştirmesi; ortak mavi alanlarda yumuşak renk geçişi. Maskeleri yeniden oluşturma aracı `work/build-world-join-mask.ps1`. İlk kıyı üretimindeki düz yatay kesik ImageGen ile ayrıca onarıldı.

Yerleşim `apps/web/src/island-world.ts`; bileşen `apps/web/src/IslandWorldFour.vue`. Derleme, korunan 16 orman noktası, iki tam bahçe alanı ve 900 kamera hareketi `work/verify-island-world.ts` ile kontrol edilir. Üç bağlantı ayrıca tarayıcıda görsel olarak incelendi.

## İlk bahçe istemi

```text
Use case: compositing / illustration-story.
Asset type: FIRST of TWO screen-width garden tiles in a continuous educational adventure map.
Input 1 is an EDIT TARGET, a 2092 x 941 wide canvas: LEFT 420 columns are the EXACT right edge of the existing forest valley, including distant blue sky and mountains above, connected grassy mainland, trees, rocks, and its path below. The blank green area to the right is 1672 columns wide, exactly ONE FULL SCREEN of new garden. Preserve the left 420 columns precisely in place and scale. Paint only the blank area.
Input 2 is the complete original forest, exact STYLE, camera and scale reference.
Input 3 is the USER'S SHAPES GARDEN CONTENT reference: giant colorful geometric solids, fountain, curving paths, clipped hedges, flower arches, pink flowering trees and flowerbeds. Do NOT copy its island silhouette, surrounding sea, cliffs, labels, UI badges or circular selection marker. Our garden is CONNECTED MAINLAND to the right of the forest, not an island.

Output 2092 x 941 landscape. Critical seam at x420: continue the existing connected ground, rolling land contour, golden paths, tree trunks, rock shapes, sunlight and grass palette at their exact heights. The forest edge gradually opens over the first 180-250 new pixels into a cared-for garden meadow; no dividing wall or hard biome line. Absolutely NO sea, moat or water barrier between forest and garden. The existing distant upper sky/hills can continue very subtly at the same height near the top edge, but the foreground remains one gently elevated oblique exploration map; don't restart a new aerial camera.
NEW FIRST GARDEN SCREEN: an expansive rectangular mainland garden district, gentle bright yellow-lime green rolling lawn, softly rounded trimmed hedge beds and curving warm golden walking paths. Large colored geometric solids serve as spaced destinations: a glossy-but-soft pink-red SPHERE to the left-middle of the NEW area, a warm yellow CUBE in the middle-upper clearing, and a saturated blue PYRAMID to the right-middle. Each is modest enough to leave spacious lawns and walking areas, roughly the reference's shape scale, not monumental skyscrapers. A small cheerful round blue garden FOUNTAIN sits near middle-lower, separated from other clearings. Soft rounded pink flowering trees, rounded leafy trees, low conifers mixed sparingly near the forest transition, flowerbeds in simple neat patches, a few vine-covered garden arches, honey-orange small benches. Connected clear paths from forest enter and wind between destinations. No text or labels on the shapes.
Southern/bottom edge: MAINLAND MEADOW with paths and low flowers extends continuously to the border. The beach district will be directly BELOW the LEFT HALF of this new garden; make its bottom-left gentle low grassy garden meadow fading to some sandy flecks near the very bottom, not a cliff, sea or stone wall. One modest golden path exits bottom around x720-850 of the full output canvas so it can reach the coastal cottages below. Do not draw a beach or big coastline inside this garden tile.
Rightmost 250 columns: uncomplicated connected garden meadow and one continuing golden path, with small low flowerbeds, no giant cropped shape monument at the edge. A second FULL-SCREEN garden tile will continue to the right. No circular island frame, water surrounding the garden, shoreline, sea cliffs, clouds covering edges, labels, borders or split-panel layout.
EXACT original forest aesthetic: bright sunny soft sculpted 3D toy-like children's storybook world, round puffy tree foliage, vivid lime yellow-green grass, smooth pale gray-lilac rocks, warm honey-orange wood, golden paths, gentle volumetric light and soft ambient shadows, same elevated oblique map camera and object scale. Smooth rounded geometric objects, rich colors, no outlines, gritty textures or photorealism.
No people, characters, game circles, numbers, writing, UI badges, icons, border or watermark. Paint ONE first garden screen to the right of the unchanged forest strip. Whole canvas is seamless, not a standalone round garden island.
```

## İkinci bahçe istemi

```text
Use case: compositing / illustration-story.
Asset type: SECOND full-screen shapes garden tile, continuous to the right of the first garden.
Input 1 is the EDIT TARGET: 2092 x 941. Leftmost 420 pixel columns are the precise right edge of the FIRST garden screen. Remaining 1672 columns are blank, to be painted as one complete new screen. Preserve the left strip at its exact position and scale.
Input 2 is the whole first garden, exact aesthetic, lighting, camera, scale and geographic reference.
Input 3 is the user's shape-garden subject reference, no island framing and no UI.
Output exactly 2092 x 941, wide landscape. Continue the same sunny yellow-lime MAINLAND garden at the seam x420, with continuous warm golden paths, grass, hedge borders, sparse rounded trees and the same thin distant sky/mountain backdrop near the upper edge. No sea or water barrier, island border, coastline, surrounding moat or cliffs. This is one large connected garden spanning TWO SCREENS, not a second separate island.

NEW SECOND SCREEN must be DIFFERENT from the first while belonging to it. Build new spacious exploration clearings with a soft glossy teal-blue CYLINDER near left-middle of the new area, a warm orange-red CONE near upper-middle, a violet RECTANGULAR PRISM near right-middle, and a small set of colorful geometric stepping solids or a simple golden TORUS sculpture in a lower clearing. The solids are large learning landmarks but modest at the same scale as first screen's sphere/cube/pyramid. No labels on them. Do not repeat another sphere, cube, blue pyramid or central fountain layout from the first.
Paths gently connect each activity clearing, a small rounded hedge MAZE or hedge spiral opening in the middle-lower area, a small archway with pastel flowers, a few small benches, simple colorful flowerbeds, several puffy round pink flowering trees and lime leafy trees. Leave useful open lawn and paths between places. Upper distant green hills continue gently; foreground garden colors and light remain identical. Right edge remains open connected grassy garden, no circular boundary or water. Bottom edge remains meadow with low flowers, no beach or cliffs.
Exact style of first screen: cheerful soft sculpted 3D toy-like children's storybook game map, puffy round foliage, bright yellow-lime grass, warm golden paths, smooth softly shaded colored geometric solids, honey-orange wood, pale smooth lavender-gray rocks, bright gentle sunny light and soft ambient shadows. Same elevated oblique camera and object sizes. Avoid harsh outlines, gritty surface detail, realistic photo texture, UI composition or disconnected diorama.
No text, labels, UI panels, selection dot, numbers, game circles, people, clouds hiding edges, border or watermark. One seamless second garden screen to the right of the fixed input strip.
```

## Kıyı düzenlemesi istemi

```text
Use case: compositing / illustration-story.
Asset type: updated seaside district BELOW the first shapes garden, and RIGHT of the approved island sea map.
INPUT 1 is a 1256 x 1141 EDIT TARGET with TWO fixed connection edges:
- TOP 200 pixel rows are the exact neighboring forest/garden's southern edge: meadow, low flowers, bushes and a golden walking path. Keep them unchanged and at the same size.
- LEFT 420 pixel columns below those top rows (y200..1140) are the approved left sea world's right edge: tree-covered coast turning into beach, turquoise water and cropped island tips. Keep them unchanged, at the same size and position.
- ONLY bottom-right region x420..1255, y200..1140 is blank, to be newly painted.
INPUT 2 is the former right beach v3: reference for its three cottages, short jetty and coastal layout, NOT its desert-like vast empty sand field.
INPUT 3 is the complete new first SHAPES GARDEN which sits directly above. Match its mainland meadow, soft rounded illustration, flowers and path direction.
Output exactly 1256 x 1141 landscape aspect 1.101. Paint only the blank bottom-right region. No text or UI.

CRITICAL JOIN: extend the same grass, ground contour, golden garden path and flowers vertically from the fixed top strip into the new region, and the same coastline/rocks/water colors horizontally from the fixed left strip. No abrupt line, overlaid translucent tree, duplicated rock, disconnected path or seam in water. Keep water depth colors continuous row by row. The first 100-160 pixels below the garden must still read as a GENTLE COASTAL MEADOW, not a sudden solid yellow desert. Scattered low rounded shrubs, little white/pink/yellow flowers and natural green grass patches fade gradually into cream golden SAND as you approach the water.

REDESIGN: keep the inviting LONG SANDY COASTAL PENINSULA extending diagonally towards the lower-right, with THREE modest coastal cottages (orange/red, blue, warm yellow roofs), a connected golden sandy walking path from the garden above to the cottages, and a short wooden landing with one little rowboat at the sandy tip. The UPPER NEW REGION should be a green-and-sandy coastal garden meadow with scattered low flowers, a few leafy shade trees, gentle grassy mounds and softly shaped shallow tidal inlets. Replace the enormous featureless yellow sand field with varied natural coastal ground: cream sand coves, patches of lime grass, low flowering bushes, smooth lilac-gray rocks and open usable walking areas. Broad beaches remain by the shoreline, but no dunes, arid wasteland, cactus or desert plateau. This is a sunny living beach next to an ornamental garden.
Greenery thins gradually southwards. Houses remain small and well spaced; not a harbor town, no huge docks. Keep only TWO or THREE widely separated palms in the newly painted area; prefer low rounded shrubs and 2 small broadleaf shade trees near the upper coastal meadow. Do not add rows of palms. Do not repeat another big round palm island. Lower-left of the new region is open continuous brilliant turquoise sea; southern/right shoreline foam and mint shallow water match the left map. Sparse submerged rocks, no abruptly darker blue texture patch.
The boundary directly ABOVE this region is the SHAPES GARDEN, already in the top strip: no ocean or moat between garden and coastal meadow. No geometric statues, fountain or UI repeated in the beach region; they stay in the garden above.
Exact existing aesthetic: bright cheerful softly sculpted 3D children's storybook game map, round foliage, lime grass, pale golden cream sand, smooth lavender-gray rocks, honey-orange timber, saturated cyan/turquoise water with fine white foam, soft sunny diffuse light and gentle ambient volume/shadows. Same oblique elevated camera and object size as garden and sea references.
Preserve top 200 rows and left 420 columns, change only blank area. No sky, horizon, clouds, characters, numbers, lettering, labels, UI, game circles, border or watermark.
```

## Kıyı bağlantısının onarım istemi

```text
Use case: precise-object-edit / compositing.
Edit INPUT 1, the current garden-to-coast illustration. It has an unwanted pasted HORIZONTAL CUT LINE about 17.5% down from the top (around y200 on a 1256 x 1141 normalized canvas), particularly across the left-to-middle grassy region. Tree crowns and ground patches are visibly cut at that row because the top garden connection strip and lower coastal strip don't agree.
Repair ONLY a horizontal band from roughly 12% to 28% down the image. Repaint that band as ONE natural continuous coastal garden meadow, without a straight edge, duplicated tree row, sliced crown, repeated rock, opaque pasted strip, color stripe or translucent crossfade. Complete trees and bushes as whole objects if they touch the cut, or remove those intersecting objects and use connected grass, small low bushes and a few flowers. Paths must flow smoothly from the upper garden through the band into the existing coastal cottage area. Grass contours vary organically across the image, then gradually thin into sand. The colors and light must match both sides of this repaired band.
INPUT 2 is the garden directly ABOVE the coastal map, style and meadow reference. Its lower grass and golden path should naturally continue into the meadow of INPUT 1, without a separate new sky or garden statue.
Keep the topmost 10% of INPUT 1 in the same position for attachment to the upper garden. Keep everything below 30% unchanged: existing three colored-roof cottages, sea and left island tips, few palms, shoreline, rocks, beach, jetty, rowboat, scale and camera. Preserve original canvas proportions and object positions outside this one repair band.
Same bright soft round sculpted 3D storybook toy-map aesthetic, sunny lime greenery, soft flowers, cream golden sand, cyan turquoise water. No new scene, no text, no UI, no labels, no new palms, no new geometric solids. This is a targeted invisible seam repair, not a composition redesign.
```
