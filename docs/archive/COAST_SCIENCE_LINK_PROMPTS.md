# Kıyı–Vadi Yolu ve Şekiller Bahçesi–Bilim Bağlantısı

Bu yerel düzeltme yerleşik **ImageGen** ile yapıldı. Güncel harita `?harita=5` adresindedir.

## Kapsam ve son dosyalar

- `apps/web/public/coast-valley-link-v1.png`: gerçek birleşimden alınan 1050 × 700 kaynak bölgesinde vadi tabanını kıyıya yumuşak çimenli eğimle bağlayan ve kıyı yolunu orman patikasına devam ettiren çizim.
- `apps/web/public/coast-valley-link-mask-v1.png`: evlerin ve alt kıyının korunması için çizimin yalnızca üst 480 kaynak satırı görünür; kenarlarda 60 piksel yumuşak geçiş bulunur. Yerleşim kaynak koordinatlarında x1400,y500,1050×700.
- `apps/web/public/science-realm-v3.png`: büyüyen bilim adası, üstte bahçenin tamamlanmış kıyı gezinti yolu, bahçeden bilim adasına tek köprü. Liman–bilim köprüsü kaldırıldı; küçük iskele ve kayık kaldı.
- `apps/web/public/science-realm-mask-v3.png`: önceki komşu kenar kılavuzuyla hazırlanan 2092 × 1141 maske; solda 420, üstte 200 kaynak pikseli ortak alan.

Bilim dört geniş etkinlik alanından oluşur: gözlemevi/teleskop, rüzgâr ve güneş enerjisi, açık deney tezgâhı ve büyük renkli dişliler. Alanlar arasında açık çim ve sade patikalar vardır. Küçük ve boş adanın yerine geniş, karakteristik bir bilim bölgesi gelir.

Yalnızca `apps/web/src/geometry-world.ts` içindeki bilim görseli sürümü değişti ve yerel kıyı düzeltmesi eklendi. Dünya ölçüleri, altı diyarın yerleşimi, kamera, arayüz, kar, masal, mevcut uzun köprüler ve diğer kaynak dosyaları korunur. Önceki bilim v2 dosyası da saklanır.

## Doğrulama

- `npm.cmd run build`: TypeScript/Vite derlemesi başarılı.
- Değişiklik öncesi 36 mevcut kaynak/görsel dosyası SHA-256 ile değişmeden doğrulandı.
- Harita modülü karşılaştırması, bilim görseli/maskesi sürümü ve tek yerel kıyı çizimi dışında fark olmadığını doğruladı.
- Masaüstü web tarayıcısında 1280 × 720 görünümde iki gerçek birleşim incelendi; on görsel yüklendi.
- Bu turda kullanıcının tercihi doğrultusunda mobil uyum ve mobil inceleme yapılmadı.

Gerçek web önizlemeleri: `work/science-garden-bridge-web-preview.jpg`, `work/coast-valley-path-web-preview.jpg`. Büyük birleştirilmiş önizleme: `work/coast-science-revision-overview.png`. `work` Git dışında tutulur.

## Kıyı yolunun hedefli düzenleme istemi

```text
Use case: precise-object-edit. This1050x700image is the EXACT assembled-map patch where a high grassy canyon and the original harbor neighborhood fail to join. Repair ONLY the upper/middle terrain-and-path connection. Currently the sandy coastal path at center-right abruptly stops at a vertical cliff around(700,350), and the low foreground meadow forms a straight horizontal cut against the canyon around y300. Replace that abrupt step with a gentle broad grassy descent from the canyon floor into the coastal meadow. The gray cliff bases taper gradually into small rounded rocks/grass; remove the awkward boulder overlapping the middle-left tree canopy. One CONTINUOUS simple sandy trail should run from the existing coastal path around(690,460), bend left across the gentle slope through roughly(500,330), and join the EXISTING FOREST path entering from the left around(100,230). It must visibly connect those two real paths without dead ends, flat cut lines, a new bridge, stairs or a connection onto the Shapes Garden plateau. The high right garden cliff and the long existing suspension bridge at the TOP stay intact; the garden remains accessed via that bridge. Same original quiet child-friendly soft3D illustration, clean broad grass, a few simple rounded rocks, gentle bright light. Do not add flowers, props, buildings or decoration. Keep the red-roof cottage and ALL lower240pixels exactly unchanged, and preserve the outer50pixel frame for seamless overlay. Same crop and aspect ratio, no text/UI. This is a local transition repair; don't redesign the cherished coastline or houses.
```

## Bilim adası ve bahçenin bitişi için düzenleme istemi

```text
Use case: precise-object-edit / illustration-story. EDIT this approved science/harbor panel1698x926. Correct only the garden's southern ending, the bridge route, and enlarge/develop the science island. Same calm rounded children's soft3D illustration, original bright colors/light/camera, clean broad surfaces. Do NOT redesign other realms.
1) REMOVE the entire horizontal wooden bridge connecting the LEFT HARBOR to science. Restore matching turquoise sea where those planks/supports were. Preserve the left harbor coast, houses, original SMALL DOCK and boat (the dock should simply end naturally at sea; no span to science).
2) Finish the GARDEN at the TOP naturally. Preserve the TOPMOST70pixels exactly to align its roads/hedges with the garden above. In the remaining top shore band, let the existing mosaic paths turn into a complete curving coastal promenade and/or small rounded overlook lawns with a clean grassy/sandy rim. No diagonally cut paving ending at water and no unfinished dangling roads. Don't add another shape, dense flowers or ornate railings. Add ONE clear bridge entrance as part of this finished path.
3) Build ONE LONG SIMPLE WOODEN FOOTBRIDGE from that GARDEN shore in upper-middle/right (roughly x1200,y160) diagonally downward to the SCIENCE island's north-west entry (roughly x600,y360). Both ends must clearly sit on land/path. This is the ONLY connection between these two realms; harbor and science remain divided by open water. No river/cascades/waterfalls.
4) The current science land is too tiny/empty. ENLARGE it substantially: roughly x470..1650,y280..750 should become an irregular broad science island, nearly filling the available screen width, while retaining open water between it and both harbor/garden. It should feel like a full explorable realm, not a little islet. Expand coast/lawn to about twice the current land area; keep large relaxed empty lawns between four distinct simple activity zones connected by ONE readable sandy looping path: ASTRONOMY with the modest blue domed observatory and small telescope at upper-right; ENERGY with a small friendly toy wind turbine and two simple solar panels at upper-left; EXPERIMENTS with a low open-air wooden workbench under a plain blue awning and two large readable flasks at lower-left; MECHANICS with a small pad bearing two/three large colorful interlocking gears at lower-right. No labels, no writing. The zones should be spaced like the Shapes Garden's big readable objects, never crowded.
Keep observatory modest/simple as approved, no giant ornate laboratory palace. Smooth blue/cream activity pads, warm timber details, just3–4trees/shrub groups; sparse tiny floral accents at most. No many lamps, stairs/columns/railings, miniature props, elaborate machinery, robots everywhere, multilevel rocky waterfalls, gold filigree or flower carpets. Plenty of open green space remains, but a clear science identity with more than only a dome and a telescope. Keep the BOTTOMMOST165pixels' coast/water/colors exactly fixed because the following map panel depends on it. Maintain framing/aspect ratio, full artwork, no borders/UI/text/water-color seams. The new science island should be large, welcoming and coherent.
```

