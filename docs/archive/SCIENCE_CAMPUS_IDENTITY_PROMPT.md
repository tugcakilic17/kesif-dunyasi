# Bilim kampüsü: kimlik ve kıyı mesafesi, v2

Üretim modu: yerleşik image_gen, mevcut science-campus-v1.png üzerinde düzenleme. Önceki 40 görsel dosyasının SHA256 değerleri değişmedi; yeni sürüm ayrı dosyalara kaydedildi.

## Yerel değişiklikler

Bilim alanındaki ağaçlar, çalılar ve çiçek yatakları kaldırıldı. Kampüsün kimliği beyaz–mavi okul ve gözlemevi, geniş geometrik taş avlular, alçak duvarlar ve birkaç küçük çim alanıyla kuruldu. Etkinlik boşlukları yoğun yeni nesnelerle doldurulmadı. Okul sağa, sol kampüs kanadının üst kıyısı aşağıya alınarak liman burnuyla arasında daha geniş bir deniz koyu açıldı. Şekiller Bahçesi köprüsünün girişi korundu. Kampüsün kaynak boyutu ve haritadaki kapladığı çerçeve 2928×1612 olarak kaldı; kamera okulun yeni yatay konumuna göre ortalanır.

Kullanılan dosyalar:
- apps/web/public/science-campus-v2.png
- apps/web/public/science-campus-mask-v2.png

Deniz devamı, orman, liman, bahçe, kar ve masal görselleri ile yerleşim koordinatları önceki sürümdeki gibidir.

## Üretim istemi

Use case: precise-object-edit. Asset: seamless children's exploration game map tile. Input image is the EDIT TARGET. Keep exact full canvas aspect, framing, bright daylight, soft polished rounded 3D illustration, object scale, and match neighboring map style. This is a local SCIENCE CAMPUS redesign, not a whole-world redesign.
PROTECTED INVARIANTS: all left-side forest/harbor coast, its original trees, cottages, beaches, rocks, boats, docks and islands stay exactly where they are, with identical shapes/colors. The strip along the top with Shapes Garden promenade and geometric hedges stays unchanged. The existing wooden bridge coming DOWN from the Shapes Garden is the ONLY science entry: preserve its origin, position, direction and natural continuous landing. Do not add a harbor bridge.
CHANGE 1 — STRONG CAMPUS IDENTITY: remove ALL TREES, CONIFERS, BUSHES, SHRUB CLUSTERS and flower beds from the SCIENCE LAND ONLY (right-hand and bottom campus). No rounded leafy green canopy anywhere in science, no residual forest/park theme. Science island should read as a spacious WHITE/CREAM AND BLUE ACADEMY DISTRICT. Keep the large main science school with broad blue roofs and glass central dome, the northern observatory/telescope, solar/wind zone, modest open experiment stall and gear zone, and lower-right greenhouse. Retain them as few readable landmarks at similar scale; don't fill empty land with extra instruments/buildings. Replace thick green grounds with broad warm ivory/light sand-colored paved courtyards and paths, soft pale blue inset tiles, gentle geometric borders, and low cream walls with blue caps. Use a few SMALL flat rectangular/curved lawns as negative-space accents, maximum about 15 percent of science land, not a green land blanket. No decorative flower pattern, fountains everywhere, lamps everywhere, tiny busy ornamentation or cold industrial clutter. Simple friendly playful learning campus, calm and roomy for future activities. Connect distinct courts with a broad clean loop and occasional low walls. Maintain existing large size, NOT a tiny science islet.
CHANGE 2 — REAL WATER SEPARATION: the current campus north-west shore and the school's western side are uncomfortably close to the harbor's yellow-roof cottage/dock peninsula; the western campus extension also almost touches the lower-left harbor islets. RETREAT the science shore into a noticeably wider open-water inlet. Move the main science school approximately 90 illustration pixels RIGHT and 35 pixels DOWN while preserving its size and architecture. Curve the science shore west of the school substantially RIGHT/east (roughly 120 illustration pixels) at the level of that harbor dock, leaving a broad continuous calm sea channel at least about 160 illustration pixels across between the fixed harbor peninsula and new school-side science shore. The campus western wing must still extend leftward BELOW the harbor: lower its upper coastline roughly 80 illustration pixels, gently curving away from the small original harbor islets with at least 100 illustration pixels of clear water. Keep southern campus shoreline within the canvas; reflow large western open activity courts lower and slightly right as needed. Preserve a generous L-shaped connected campus with broad land connecting to northern science zones; do NOT shrink the entire island or create a detached second islet. The science school and activity land must still occupy a large multi-screen exploration area at unchanged scale.
Water channel: clean turquoise/cyan matched to original ocean with gentle broad ripples, no natural rock islets, no underwater boulder shadows/dark rock clusters in new science water. Smooth sandy or low pale retaining-wall science shoreline. Existing original harbor rocks remain unchanged. Ensure smooth organic coast with complete continuous paths, no abrupt cutoff, no hard straight pasted water-color boundary. No text, labels, UI, border, people, new realms. The result should clearly distinguish leafy harbor/forest at the LEFT from airy architectural science academy on the RIGHT and BELOW, with a visibly generous water gap.

## Doğrulama

Webde geniş kampüs, normal keşif ölçeğindeki okul ve Şekiller Bahçesi köprüsü incelendi. TypeScript ve Vite derlemesi başarılı. Önceki 40 görsel dosyasının değişmediği hash karşılaştırmasıyla doğrulandı. Mobil uyum çalışması yapılmadı.

Tarayıcı önizlemeleri:
- work/science-campus-v2-overview-web-preview.jpg
- work/science-campus-v2-bridge-web-preview.jpg
- work/science-campus-v2-school-web-preview.jpg

