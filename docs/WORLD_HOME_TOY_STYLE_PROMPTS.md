# Oyuncak maketi çizim dili ve orantılı kadraj

14 Ekim 2026. Üretim modu: built-in imagegen.
Güncel görsel: `apps/web/public/assets/game_map/world-home-v5.png`; gerçek piksel boyutu1869 ×842.

Referansın daha yuvarlak, pürüzsüz ve hafif parlak maket görünümü hedeflenmiştir. Küçük bitki/taş ayrıntıları azaltılır; ana yapılar daha okunur hale gelir. Orman, şekiller, liman, bilim ve masalın göreli yerleşimi korunur. İlk çizim1672 ×941, ardından yanlardan genişleyen2090:941kadraj üretilmiştir. Önceki sürümler saklanır.

## Ekrana yerleştirme

Sonraki düzenlemede harita üst menü ve alt kartlar arasına küçültülerek ortalanmıştır. Aşağıdaki ilk tam ekran kadraj kontrolünün yerini [WORLD_HOME_CENTERED_DISTANCE.md](WORLD_HOME_CENTERED_DISTANCE.md) alır; çizim aynıdır.

Sahnenin normalleştirilmiş görüş alanı2090 ×941dir. `preserveAspectRatio="xMidYMid slice"` ile her iki eksene aynı ölçek uygulanır; kenarda boşluk bırakmadan yalnızca fazla dış kadraj kırpılır. Etiketler aynı ölçek ve merkez ofsetine bağlıdır. İlk1672koordinatındaki ada sınırları209birim sağa kaydırılır. UI metin/ikonları orantılı ölçekte kalır; yardımcı alanlar pencere açmaz. Oyun içi haritanın27varlığı ve kamera davranışı değişmez.

Kontrol:1920 ×868ekranda görsel1927.86 ×868olarak, standart1672 ×941ekranda2090 ×941olarak çizildi. Her iki durumda görüntü oranı kaynak2090/941ile aynı. Standart ölçüde bar/kartlarda taşma yok. Beş diyarın fare sınırları ve bilim geçişi%100ölçekte doğrulandı. Derleme başarılı.

Web ekran görüntüsü: `work/world-home-toy-style-wide-web.png`.

## Çizim düzenleme istemi

```text
Use case: style-transfer / reference-faithful toy-diorama redraw.
Image1 is the ONLY rendering-style master: the user's glossy children's "Oyun Dünyası" reference. Image2 is the content/placement edit target, but its terrain/textures/lighting must NOT drive the new style.
Redraw Image2 with the EXACT toy-like visual language of Image1. Keep the FIVE realm identities and approximate positions from Image2: forest top-left, shape garden top-middle, harbor bottom-left, science campus bottom-middle, elongated cloud fairy on right. Keep their signature landmarks and the three bridge connections (forest→shapes, shapes→science, science→fairy's bottom area). Do not rearrange realms and do not add letters, numbers or an art island.
Rendering correction is the whole point: larger clean rounded forms, smooth satin-gloss toy surfaces with soft clear highlight bands, stronger sculpted readable volume and gentle clean contact shadows, warm cheerful illumination. It should look like premium hand-designed plastic/clay miniatures in Image1, not a dense detailed gameplay terrain. Make each realm's hero feature immediately visible, with deliberate negative space around it. REMOVE about HALF the minor shrubs, tiny pebbles, small flowers, repeated conifers and little decorative islands. Trees are simple rounded clumps or smooth layered cone miniatures, not clustered jagged leaf texture. Rocks are a few broad softly beveled lavender-grey facets, NOT many vertical strips or craggy rock texture. Paths are broad smooth cream/gold strips. Ocean has smooth turquoise/blue surfaces and modest rounded ripple highlights, not mottled noise, dense caustic lattice or hundreds of foam streaks. Distant decor is subordinate. Sharp polished art, no general blur.
Forest: one unmistakable warm rounded treehouse with only a few large rounded trees, a small camp and one simple waterfall.
Shapes: larger clear yellow cube, red sphere, blue pyramid and purple cylinder around a small fountain, clean smooth geometric hedges; uncluttered.
Harbor: one lighthouse, two simple cottages, short pier, sandy bay, few palms and one small sailboat.
Science: a rounded blue-glass dome school is the hero, one telescope, small solar corner, a few smooth cyan orb trees; keep the campus's distinct pale-blue/cream identity.
Fairy: one modest rounded lilac/gold toy castle and a smaller open book/rainbow, smooth pink/cyan glowing orb trees, lavender floating cliffs with a restrained cloud cushion. No blossom thickets.
COMPOSITION FOR FULL-SCREEN WEB: landscape16:9, source1672x941. Allow some open sky/sea in top0..130 and bottom800..941 so the frame can be cropped slightly top/bottom at wider screen proportions WITHOUT deforming or losing the main islands. Hero objects and selectable land should be within y160..740. All five realms still use most of width. Keep Image2's blank wooden leaf-framed title sign, now centered approx x836,y175, width560,height90, softer/smoother like Image1. No words on sign. Top header and bottom cards will be HTML, so NO UI, text, labels, pill plaques, logo, avatar, badge, counter or card should be painted into the image. Only scenic art and blank wood sign.
PRIORITY: Image1's rounded glossy cheerful miniature aesthetic, immediately readable heroes and fewer tiny details. Do not reproduce Image2's dense foliage, brittle cliffs or level-map texture. Do not stretch shapes: round spheres, round domes, naturally proportioned castle and cottages.
```

## Yan kadraj genişletme istemi

```text
Use case: precise-object-edit / horizontal outpainting ONLY.
Image1 is the approved newly rounded glossy toy-world drawing. Keep all its artwork and interior positions unchanged, including every island, hero object, sphere/dome proportions, bridges, blank wooden sign, corner clouds and foliage. No style changes or extra interior detail.
Expand the canvas HORIZONTALLY ONLY from original1672x941 to a WIDER2090x941framing (aspect2.221:1, roughly21:9). Add209pixels of matching background on the LEFT and209pixels on the RIGHT. Original image is centered at x209..1881,y0..941 with exactly its original size. Do NOT zoom the original composition, do NOT stretch/rescale objects independently, do NOT add top/bottom padding, do NOT crop original upper trees/flags/wood sign or lower islands. The entire original composition should occupy the middle80% of the new canvas's width and its full height.
New side margins contain only harmonious turquoise sea continuing existing waves, soft distant sky/clouds at top and subtle foreground foliage/clouds at bottom to match neighboring image edges. No new island, boat, landmark, extra bridge, floating debris or text. Absolutely no old-image vertical seam, rectangular border or different water texture. Keep the original cheerful smooth rounded glossy3D miniature aesthetic exactly.
OUTPUT MUST BE WIDE2090:941ASPECT, not16:9. This is for a1920x868browser and will prevent chopping off the scene vertically. NO UI, no labels, no title text, no avatar, no card, no watermark. Leave original blank wood sign intact. Only extend the two sides.
```

