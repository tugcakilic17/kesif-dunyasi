# Kutup kıtasının yatay genişlemesi

Yerleşik image_gen ile iki birbirine devam eden kutup görseli üretildi. Konum y2.6 ekran ve kalınlık1 ekran korundu. Bölgenin yatay tahsisi 1.5 ekrandan 2.5 ekrana çıkarıldı; sağa yaklaşık1 ekran eklendi. Sol ve alt kenarlarda artık denizle çevrili ada silueti yerine kar zemini çerçeve dışına devam eder. Kutup bütün dünya genişliğini kaplamaz; doğusunda açık su ve masal bölgesi için boşluk kalır. Diğer diyarlara köprü/iskeleden giriş yoktur; eski iskele kaldırılmıştır.

Batı bölümünde buz mağarası, kar evi ve donmuş göl tanınır biçimde korunmuştur. Doğu bölümünde iki iglo, düşük buz kemeri ve açık kar alanları yer alır. Yollar ve kar sırtları iki parçanın arasında devam eder. Kuzeyde diğer bölgelerle deniz boşluğu bırakılmıştır.

## Varlıklar ve yerleşim

- apps/web/public/polar-west-v1.png
- apps/web/public/polar-west-mask-v1.png
- apps/web/public/polar-east-v1.png
- apps/web/public/polar-east-mask-v1.png
- apps/web/public/cloud-fairy-polar-edge-mask-v1.png

Kaynak koordinatlarında batı x0,y2246.6,2508×1141; doğu x2088,y2246.6,2092×1141. Ortak yatay örtüşme420, kuzey referans örtüşmesi200 pikseldir. Kar zemini alt kenarda y3387.6 dünya sınırına ulaşır. İlk görselin eski referans su kenarı ve ikinci görselin sol referans su kenarı karı kesmeden yumuşatılmıştır. Masal görselinin ilk600piksellik eski deniz referansı, bilim çiziminin altından itibaren gizlenmiştir; böylece yeni kutup kıyısını örtmez. Masal terasları ve diğer bölgelerin kaynak çizimleri değişmemiştir.

## Batı üretim istemi

Use case: precise-object-edit / compositing. EDIT TARGET is the2508x1141 illustrated snow-region guide. Its TOP200sourcepixels are the exact current sea and Science Campus coast above; preserve that top strip's layout and colors, but blend its abrupt lower horizontal reference boundary naturally into the scene. Below is the old small snowy island, which must become the WESTERN HALF of a broad POLAR CONTINENT at the bottom of this game map.
CRITICAL SHAPE: snow land must extend ALL THE WAY TO THE LEFT CANVAS EDGE and ALL THE WAY TO THE BOTTOM CANVAS EDGE. This is the end of the map, NOT a little island surrounded by sea. NO water margin down the left, NO ocean strip under the lower edge, NO rounded southern island shoreline in front of the viewer. Solid white/snowy ground continues off-frame left and bottom. Keep a northern cold-water gap below the protected top strip, then a gently curved low icy shoreline starting roughly y280..420. The polar land continues to the RIGHT edge too because another screen of connected snowy terrain will attach there. At the RIGHT edge, all lower terrain from roughly y400 down must be continuous snow/ice plains, not another coast or cliff/water gap.
Preserve the recognizable blue ICE CAVE, cozy snow-roof cabin and central frozen pond at similar positions/scale; they should remain the few main western activity destinations. REMOVE the wooden dock entirely and all signs of any bridge, boat or connection to other worlds. No crossing across the northern sea. Make the landscape feel ARCTIC/POLAR: broad open snow fields, gently undulating snowbanks, a few low pale-blue ice ridges, sparse rocks set INTO the ground, just a handful of snowy conifers near the existing cabin/cave. No dense forest, many mountains, crowded props or empty miniature islet. The current vertical band/landmark scale remains, its left/bottom edges simply become connected continental snow; do not add extra tall vertical realms.
Extend one or two clean gentle snow paths into the new left/lower/right ground for future activities, widely spaced landmarks, restful readable child-friendly scenery. The foreground is quiet snowland rather than sea. The TOP sea remains matching turquoise/cold cyan with soft ripples, no dark underwater reef/rock spots or scattered boulder islands in the new water. Soft rounded polished3D children's illustration, original daylight and scale, white/luminous icy blue palette with warm cabin accents, crisp edges. Exact full framing/aspect, no text/UI/labels/borders/characters. Preserve the protected top strip. LEFT+BOTTOM+LOWER RIGHT edges must be SNOW LAND; no isolated island silhouette.

## Doğu üretim istemi

Use case: compositing / illustration-story. EDIT TARGET is this2092x1141 guide, the new EASTWARD EXTENSION of a polar continent at the bottom of a children's world map. LEFT420sourcepixels show the approved snowy western terrain and paths. TOP200pixels show the exact current sea/Science Campus edge above. Preserve both references in place and scale; the beige remaining area must become a connected continuation, not another island.
The main snow region grows RIGHT by about ONE desktop screen, at the SAME vertical thickness. Make continuous broad POLAR SNOW LAND from the left reference into the new middle/right area. Keep the north coastline naturally curving below the top reference, with a generous cold turquoise water gap to Science Campus; no physical land connection. The left reference's snow path and broad snowbanks continue seamlessly into new terrain with no seam, stream, cliff split, sea strip, duplicate cabin or second copy of the western cave/pond.
BOTTOM RULE: snow land reaches ALL THE WAY TO THE LOWER CANVAS EDGE throughout approximately x0..1800. No sea in front/under the polar land; the world ends in continental snow terrain. The far RIGHT side alone can finish with a graceful icy coast around x1850..2010, leaving a modest sliver of clear water outside the eastern end. Do not fill the entire world beyond the allocated extension. No isolated oval islet, southern cliff edge, rim of water all around, bridges, docks, piers, boats, ropes, portals or connectors to other worlds.
Create one simple distinctive IGLOO ACTIVITY AREA: two small friendly blue-white igloos with inviting round entrances, beside one gently curved path and a low sculpted ice arch/glacier ridge farther to the right. Broad clear snow fields and low icy-blue snowbanks between landmarks, plenty of future activity space. A few grounded snowy rocks and occasional gentle pale-blue ice ridges, maximum a couple of tiny snow conifers if useful, no forest theme, countless rocks, mountain wall, enormous buildings, dense decorative props, people or animals. Keep readable sparse children's game design and the same landmark scale as the reference cabin/trees. Original snowy cave/cabin/pond are already on the western panel, don't repeat them.
Match the reference's soft rounded polished3D children's illustration, luminous white snow, pale glacial blues and matching daylight, crisp friendly forms. Continue the EXACT path height/width and terrain shading at LEFT. Match clear cyan/turquoise water at TOP; no dark underwater rock-shadow clusters, loose sea boulders or busy reefs in new water. Blend the top guide boundary gradually without a hard horizontal color stripe. All beige area completed, exact aspect/framing, no text/UI/labels/borders. Preserve the left and top references, continuous snowland to BOTTOM, finish only its far-right coast, and keep this polar continent independent.

## Doğrulama

Webde sol ve alt kenarda kar devamı, sağ uzantıya kaydırma, iglolar, kuzey deniz aralığı ve iki görselin birleşimi incelendi. TypeScript ve Vite derlemesi başarılı. Önceki58görsel dosyasının hash değerleri değişmedi. Mobil uyum çalışması yapılmadı.

Tarayıcı kanıtları:
- work/polar-west-web-preview.jpg
- work/polar-join-web-preview.jpg
- work/polar-east-detail-web-preview.jpg

