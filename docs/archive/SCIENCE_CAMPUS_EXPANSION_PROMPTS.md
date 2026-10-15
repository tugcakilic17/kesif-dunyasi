# Bilim kampüsünün genişletilmesi

Üretim modu: yerleşik image_gen; mevcut haritayı referans alan iki görsel düzenlemesi. Eski görsellerin üzerine yazılmadı.

## Sonuç ve yerleşim

- Bilim kampüsü aşağıya, ardından deniz içinde sola uzanır. Limanla kara bağlantısı yoktur; giriş Şekiller Bahçesi köprüsündendir.
- Büyük bilim okulu, geniş döngü yolları, alçak duvarlar, boş etkinlik avluları ve sera eklenmiştir. Kuzeydeki dört bilim alanı korunur.
- Yeni bilim denizinde kaya adacıkları ve koyu su altı kaya kümeleri bulunmaz. Önceden onaylanan liman kaynakları değişmemiştir.
- Kampüs görseli kaynak koordinatları: x1252, y741, 2928×1612. Gezinti bölgesi 1.5 orman ekranı genişliğinde ve yüksekliğinde bir sınır alanıdır; gerçek kara bu alan içinde L biçimindedir. Bilime girişte normal keşif ölçeği kullanılır, tamamını tek ekrana küçültmez.
- Alan açmak için kar, masal ve aralarındaki köprü görselleri birlikte 0.6 ekran aşağı taşınmıştır. Kaynak görselleri ve kendi aralarındaki yerleşim aynıdır.
- Sol deniz devamı x0, y1682, 1672×765 konumundadır. Yeni kıyıları kesmeden dış su kenarları yumuşatılmıştır.
- Kamera kapsayıcısında overflow: clip, odaklanan gezinme düğmelerinin harita içeriğini istemeden kaydırmasını önler.

## Dosyalar

- apps/web/public/science-campus-v1.png
- apps/web/public/science-campus-mask-v1.png
- apps/web/public/science-campus-sea-v1.png
- apps/web/public/science-campus-sea-mask-v1.png
- apps/web/src/geometry-world.ts
- apps/web/src/IslandWorldFive.vue

## Kampüs üretim istemi

Use case: precise-object-edit / compositing / illustration-story. This2928x1612 guide is the EDIT TARGET for a REAL LARGE SCIENCE CAMPUS, not another small islet. The upper1141px contain the current approved map; the blank lower471px are newly allocated map space. The LEFT1256columns in those upper1141rows are the approved harbor and must remain fixed: cottages, beach, small docks, boats and coast path. The TOP200rows contain the garden shore and its correct science bridge, keep their layout, paths and bridge location unchanged. The tiny pink sliver at the lower edge of the old reference is a fragment of an unrelated old realm: REMOVE it; don't reproduce any fairy or snow realm.
The science land in the upper-right must now CONTINUE DOWNWARD through its former southern coastline and THEN spread LEFTWARD into the bottom blank region. Make ONE continuous broad L-SHAPED science island/campus: narrow/regular existing northern entry, wide southern campus wing. The southern wing should extend to roughly x420..2850,y1160..1570, joined continuously to the upper science land through a broad grassy neck around x1650..2800,y900..1250. It must NOT join the harbor: all new leftward land is BELOW the original harbor, with a clear calm water channel. No second detached islet and no horizontal sea stripe between upper and lower science ground. Do not squeeze the new land/school back into the original upper screen. The physical campus must occupy about1–1.5screens of actual explorable land at the unchanged scale; use the bottom and lower-left allocation.
Place a LARGE SCIENCE SCHOOL at the center of the enlarged land, approximately x1750,y1200: one connected school complex with two cream/white classroom wings, broad friendly blue roofs, a central glass dome and a large welcoming entrance. Around650sourcepixels wide and300high, a real main landmark rather than a tiny hut. Simple readable school architecture, modest detail, no ornate fantasy palace/gold filigree/text. Keep the existing northern observatory/telescope, solar/wind energy, experiment stall and gear activity areas recognizable, so they form distinct outdoor campus zones. Extend their simple sandy paths into a BROAD LOOP around the school and the new lower-left activity grounds. Add low gently curved cream/blue stone walls along some paths/courtyard edges, and spacious empty paved activity courts and lawns with room for future game interactions. Avoid dense props, lamps everywhere, many stairs, flower carpets or crowded buildings. Few rounded trees/shrubs, wide breathing space. School and courts dominate the new south-west wing.
REMOVE dark underwater rock shadows/clusters and loose rocks from ALL NEW SCIENCE OCEAN, including the water around its northern/eastern sides and new southern/western extension. Sea should be calm clean turquoise/cyan with gentle broad gradients and a few subtle soft ripples, not mottled with rock spots. Mostly smooth sandy or low retaining-wall science shore, no jagged rocky necklace or scattered rock islets around this campus. Original LEFT harbor rocks remain as reference, but do not propagate them into the new sea. Blend water color naturally, no straight strip boundaries, no new bridges from harbor; the accepted bridge from Shapes Garden remains exactly the entry. Same soft polished rounded3D children's game illustration, daylight/object scale as the guide. Full exact aspect/framing, all blank space completed, no UI/labels/text/borders, no fake miniature island. The campus truly grows DOWN and then LEFT and fills the newly added area.

## Sade deniz devamı üretim istemi

Use case: compositing / illustration-story. Fill this1672x765 guide's blank space with a QUIET EMPTY OCEAN continuation below the approved harbor, for the science campus expansion. Keep only the existing tiny partial tropical islets along the very top edge and the topmost60pixels unchanged. Continue the precise turquoise/azure sea hue downward with a naturally smooth gradual blend through the upper250pixels; there must be no horizontal pasted-strip boundary. The existing dark underwater rock-shadow texture in the reference should smoothly FADE OUT within the upper transition, not repeat. From y250downward this is clean empty calm turquoise water: NO rocks above or below water, no boulder shadows, no little islands, no boats, no objects, no foam clusters or busy mottled pattern. Only a soft broad blue/cyan gradient and a few faint wide gentle ripples consistent with the soft3D children's map style. Bottom edge should stay saturated turquoise, right edge a medium bright azure that can join the new smooth-water science panel. No sky horizon, no text/UI/border/beige leftovers. Preserve the exact canvas aspect and framing. This is an uncluttered ocean background, not a new terrain region.

## Doğrulama

Web görünümünde normal ölçekli okul, geniş kampüs, kaydırma ve Şekiller Bahçesi köprüsü incelendi. Tüm kullanılan görseller yüklendi. TypeScript ve Vite üretim derlemesi başarılı. Mobil uyum çalışması bu kapsamda yapılmadı.

Tarayıcı kanıtları work/science-campus-school-web-preview.jpg, work/science-campus-overview-web-preview.jpg ve work/science-campus-bridge-web-preview.jpg dosyalarında.

