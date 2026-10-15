# Ana sayfa: yatay sahne ve belirgin ufuk

14 Ekim 2026. Üretim modu: built-in imagegen. Son görsel: `apps/web/public/assets/game_map/world-home-v6.png`, 1866 ×843 piksel. Önceki onaylı sürümler korunur.

## Yerleşim

Tek kesintisiz sahne ekranı kaplar. Adalar yatay alanı doldurur; üstte gökyüzü, bulut kuşağı ve deniz ufku birbirinden okunur. İki alt köşede büyük yapraklar ve pembe çiçekler vardır. Tekrarlanan deniz zemini ve küçültülen iç harita kaldırıldı. 1920 ×868 SVG koordinatları görselle birlikte orantılı ölçeklenir; diyar sınırları ve etiketler aynı koordinat sistemindedir. Üst menü ve alt kartlar statik UI olarak korunur.

Geçerli köprüler: Orman → Şekiller, Şekiller → Bilim, Bilim → Masal. Liman → Bilim köprüsü yoktur.

## Kontrol

- Üretim derlemesi başarılı.
- 1920 ×868 web görünümü incelendi; tek sahne görseli, sıfır deniz deseni, sıfır dialog.
- Beş diyarın fareyle vurgulanan sınırları doğrulandı.
- Bilim etiketi `?region=science` açtı; oyun haritasında %100 yakınlaştırma görüldü.
- Ekran görüntüsü: `work/world-home-horizontal-scene-web.png`.
- Geçici tarayıcı boyutlandırması kontrol sonunda kaldırıldı.

## İlk sahne üretimi: tam prompt

Use case: compositing / full-screen world-map scene redesign.
Image1 is the user's EXACT target composition and illustration style. Image2 supplies our FIVE realm identities and cute rounded toy landmarks. Preserve the smooth glossy cheerful3D miniature drawing style. The problem to fix is framing: NO little map floating in huge empty sea, NO uniform blue water covering the whole upper screen.
Make ONE COMPLETE WIDE1920x868illustration (aspect2.212:1) designed to fill a desktop browser. Do not leave room OUTSIDE the image. Compose the art itself for this wide ratio, rather than padding a16:9image with sea.
COMPOSITION of Image1 is essential: islands spread across almost the FULL WIDTH in a compact upper/lower arrangement, clear SKY ABOVE an actual distant ocean HORIZON, fluffy cloud bank along that horizon, large close-up foliage/flowers/clouds anchoring BOTH BOTTOM CORNERS. The ocean is only the water channels and outer scenery; it must NOT dominate. LAND/REALMS should visually fill roughly70%of the central game-selection area. Leftmost and rightmost main islands approach the frame edges (x2%and98%), but their landmark objects are fully visible.
UI RESERVED BOUNDS in the1920x868canvas: top y0..80 will have a live HTML navigation bar. The center wooden leafy heading sign is BLANK, centered at x960,y120, width580,height95 (similar to Image1), with no words. Bottom y704..868 will have THREE live HTML cards. All important island land/objects fit inside y170..690, clear of both header and cards. Only decorative foreground foliage/clouds may sit behind cards.
ATMOSPHERE: a clearly visible light-blue SKY in upper y0..145, horizon near y145with white fluffy clouds across it and distant small mountains/islets, deeper turquoise ocean BELOW. No ocean-pattern texture above the horizon, no hazy sea pretending to be sky. Avoid a large unused gap above islands: treetops/flags/mountains frame the cloud bank below header.
OUR ACTUAL GEOGRAPHY, with horizontally generous but vertically compact islands (do not squash individual buildings or circles):
FOREST upper-left x30..625,y160..405: one warm treehouse, a few rounded trees/conifers, small camp, one short waterfall and broad path.
SHAPES upper-middle x650..1250,y180..445: yellow cube, red sphere, blue pyramid, purple cylinder and small fountain in smooth geometric hedge garden.
HARBOR lower-left x30..635,y435..688: red-white lighthouse, two small blue/orange-roof cottages, few palms, sandy bay, short pier and one sailboat. Make the island wide enough to occupy this left area and cleanly end above the bottom cards.
SCIENCE lower-middle x675..1260,y455..690: rounded blue dome science school, small telescope, solar corner, cyan orb trees, cream plaza. Wide compact science campus, natural building proportions; no dense forest.
FAIRY right x1310..1890,y165..690: a single floating lavender-cliff meadow, lilac/gold castle in upper area and small open book/rainbow below, smooth pink/cyan magical orb trees, restrained cloud cushion UNDER its cliffs. Do not leave an empty water column at right.
Bridges only forest→shapes, shapes→science, science→fairy's lower side. No harbor→science bridge.
Leave narrow low-detail shore strips for LIVE label pills at forest(340,390),shapes(960,430),harbor(340,655),science(980,655),fairy(1625,655). Labels will be HTML, so NO painted label plates/text.
CRUCIAL FOREGROUND FRAME: large soft glossy green leaves rise from bottom-left and bottom-right, spanning about250–330pxinward and200–240pxup from bottom, with a few pink blossoms like Image1 and fluffy WHITE foreground clouds. They must remain visibly substantial at the outer corners AFTER the cards are overlaid, not tiny decorations in the shrunken map. Small gentle depth blur only on the very close foreground leaves, NOT on islands or landmarks.
Strictly NO UI bar, avatar, logo, badges, counters, buttons, cards or text. Keep just the blank wood sign in the scene. No tiled/repeated water texture, no rectangular inner-picture edges, no unnecessary sea margins or inset map. One continuous full-screen scene matching Image1's horizontal visual richness and atmospheric sky/sea separation. Keep our five realm contents and relative positions, without ABC/numbers/art realms.

## Alt kıyı düzenlemesi: tam prompt

Precise composition cleanup of Image1. Image2 shows WHY the lower20%of the page must be foreground/background only: real HTML cards occupy this area.
Keep Image1's exact wide2.212:1framing, style, sky/cloud horizon, big bottom-corner foliage, upper forest and shape garden, blank wood sign, bridges and five realm identities. The newly spread horizontal composition and glossy rounded toy3D look must stay.
ONLY correct the LOWER THREE TERRAIN AREAS (harbor, science, fairy's lower cliff): their lower coasts currently extend too far down, behind where UI cards will be. In the normalised1920x868canvas, ALL main island coastlines and objects must END at or ABOVE y690 (79.5%of image height). The bottom y704..868 (81%..100%) must contain ONLY foreground leaves, pink blossoms, fluffy white clouds and background sea, NEVER a main island, building, pier, atom model or walking path. This is a hard composition boundary.
Recompose the harbor and science as horizontally WIDE but vertically compact dioramas within y440..680. Keep their horizontal widths and relative x positions; no new big sea gaps. Use shallower ground/plaza depth and slightly smaller naturally proportioned hero objects, not squashing circles or buildings. Keep complete lighthouse, cottages, pier/sailboat, science dome school/telescope/solar corner/orb trees visible above y650. The science front steps/atom and all lower cliffs must be completely visible above y690, not cut off or cropped. Fairy remains on the RIGHT; its castle/rainbow/book stay recognizable, but finish its lower land/cloud cushion above y690 too. Connect science→fairy as before. Do not alter upper forest/shape land except minor seam adjustments for those bridges.
Move the vacated lower part into the SAME continuous scene: bring bottom-left and bottom-right foreground foliage/cloud frame higher so leaves and pink flowers remain boldly visible beside/behind the bottom cards. Preserve clear sky ABOVE the horizon; no tiled water, no inset small picture. NO actual cards, text, buttons, labels, bar or other UI painted into the image.
Everything else stays the same: same style and material, same five landmarks/realm contents, no new objects or extra islands, same colors, same full-width rich scene. Strict lower coast limit y690of868.

## Liman–bilim köprüsünü kaldırma: tam prompt

Precise local object removal only. Keep this SAME1866x843wide illustration EXACTLY as it is: same all land shapes/positions/sizes, same current sky/horizon/clouds, wooden sign, large bottom-corner foliage, all five realm landmarks, colors, lighting and toy rendering. Absolutely no other redraw, no crop/rescale.
REMOVE ONLY the newly added short wooden connector between the LEFT HARBOR PIER and the MIDDLE SCIENCE CAMPUS across the lower sea gap: approximately x610..740,y580..625 in this1866x843input. Keep the original harbor pier itself (x430..620, y580..635) ending in OPEN WATER. Keep the science campus coast itself unchanged. The two realms must be separated by a clean open-water channel, with the original pier protruding into the harbor bay but NOT reaching the science shore.
Replace only this unwanted connecting bridge's planks/posts/railings with matching surrounding turquoise sea and gentle ripples, perfectly seamless. Do not replace it with new land, rocks, boat, path or another bridge. Preserve the valid FOREST→SHAPES bridge, SHAPES→SCIENCE bridge and SCIENCE→FAIRY bridge unchanged. No UI or text. All other pixels/art composition stays unchanged.

