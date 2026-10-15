# Masal diyarı: hiza ve nesne ölçeği

Yerleşik image_gen düzenleme modu kullanıldı. Dört bulut terası korunarak daha yukarıda ve kısa bir dikey aralıkta düzenlendi. Son bulut tabanı bilim kampüsünün güney kıyısıyla hizalandı. Genişlik ve diğer bölgelerin yerleşimi korundu; dış köprü yoktur. Şato, kitap/gökkuşağı, ay köşkü, ev, kuyu ve sihirli ağaçlar terasların içinde küçültüldü.

## Varlıklar ve yerleşim

- apps/web/public/cloud-fairy-realm-v4.png
- apps/web/public/cloud-fairy-realm-mask-v4.png
- Kaynak yerleşim x3580, y0, 2272×2353; önceki yükseklik2823.
- Sol600piksel geçiş/referans alanıdır. Diğer bölgelerin kaynakları ve yerleşimleri korunur.
- Masal gezinme alanı x2.5ekran, y0, genişlik1ekran, yükseklik2.5ekran.

## Kontrol

Webde dört teras birlikte incelendi; bilim kampüsüyle alt hizası ve yapıların komşu haritalarla oranı kontrol edildi. Şato ve kitap daha geniş açık avlular içinde küçük ölçekte yer alır. TypeScript ve Vite derlemesi başarılı. Önceki63görsel dosyasının hash değerleri değişmedi. Tarayıcı kanıtı: work/fairy-scale-alignment-web.jpg.

## İlk düzenleme istemi

Use case: precise-object-edit / compositing.
Input1 is the EXACT EDIT TARGET and required final2272x2353 framing: it crops the existing realm at the level of the Science Campus's bottom, so the old lowest fairy terrace is currently cut. Input2 is the complete OLD fairy realm for the four terraces' content/design reference, NOT a request to retain the old gigantic object scale or tall canvas. Input3 is the neighboring Science Campus for OBJECT SCALE reference only; do not add new science objects.
Primary request: move the four fairy terraces slightly upward, shorten/reflow their vertical stack so the LAST CLOUD BASE ENDS AT THE SAME LEVEL AS THE SCIENCE CAMPUS SOUTH SHORE, and make ALL FAIRY BUILDINGS/DECOR PROPORTIONAL TO OBJECTS IN THE OTHER REALMS.
Keep the LEFT600sourcepixels of Input1 in exactly the same positions and scale: existing Shapes Garden and Science Campus, sea gap and closed coasts. Only the FAIRY realm to their RIGHT changes. Preserve the existing one-screen horizontal allocation, four vertically arranged cloud-supported terraces, no external bridge or connector, original soft rounded children's3D aesthetic, daylight and lilac/rose/ivory palette.
LAYOUT: shift the FIRST TERRACE's footprint approximately150–200sourcepixels UP from the old position, then place the next three terraces more compactly below. The first usable terrace should begin around y300–350, fourth terrace and cloud pillow should END around y2240–2270, matching the bottom of the visible Science Campus coast at LEFT. All four terraces must be COMPLETE and clearly separated/readable in this2353-high framing; do not crop away the fourth one. Leave80–110pixels of plain sea below the last cloud edge, just like the sea margin under the science coast. Do not let fairy islands hang below the science land, into the polar row. Reduce excessive gaps and overly deep cloud pillows, instead of stretching/compressing reference neighbors.
SCALE IS CRITICAL: the OLD CASTLE, giant book, cottage, pavilion, trees, columns and well are far too large. Actually REDUCE their illustrated physical size within the terraces, not just the camera zoom. Castle should be approximately350sourcepixels tall and400–450wide, around HALF its old apparent height and comparable to the main Science Academy building scale. Keep its recognizable ivory/lavender architecture and turrets, but no giant hero palace dominating an entire screen. The magical BOOK and its rainbow arch should be about220–270sourcepixels wide (around HALF the old width), a friendly activity exhibit on a courtyard rather than an enormous building-sized book. Crescent pavilion approximately160–190pixels wide and180high. Small storybook COTTAGE approximately170–190wide and160–190high, comparable to harbor cottages; wishing well about120–150wide/high. ENCHANTED TREES about55–80pixels tall, comparable to the blue scientific trees in Input3, still smooth translucent orb/teardrop crowns on ivory twisted trunks. Low retaining walls and posts must be correspondingly modest, about25–45pixels high, consistent with Science Campus path/wall scale, not giant architectural columns.
Retain EXACTLY FOUR destinations: 1 castle terrace, 2 storybook with rainbow arch, 3 crescent/star pavilion, 4 cottage and wishing-well garden. Broader open paths/courts and restrained groups of small enchanted trees/low plants make the smaller objects feel naturally part of an explorable map. Keep tasteful decoration without flower carpets or hundreds of tiny props. Maintain original land width, just reflow island spacing/footprints vertically and reduce individual landmark/decor sizes. Curved internal steps/paths may connect the four fairy terraces. Absolutely NO bridge, stairs, portal, rope, stepping stones or land link from garden/science/polar to this independent floating realm.
Clouds stay ONLY as compact pillows directly UNDER terraces; no cloud blanket or extra sky banks. Preserve the other worlds, water hue and camera perspective, no ordinary leafy trees, new rocks/reef patterns in the sea, text/UI/borders/people. Full exact Input1 aspect/framing, all four complete, actual visibly smaller landmarks at shared world scale, first terrace slightly higher, last cloud ends level with Science Campus's south shore.

## Ölçek ince ayarı istemi

undefined

