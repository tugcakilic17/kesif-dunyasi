# Bilim kampüsüne özgü ağaçlar, v3

Yerleşik image_gen ile science-campus-v2.png üzerinde yerel düzenleme yapıldı. Yeni sürüm science-campus-v3.png dosyasında; önceki görsellerin üzerine yazılmadı.

Kampüsün küçük çim alanlarına ince beyaz gövdeli, mavi–turkuaz, yumuşak geometrik taçlı ağaçlar küçük gruplar halinde eklendi. Büyük etkinlik avluları ve yürüyüş yolları açık kaldı. Bilim binası, diğer bilim alanları, kıyı, limanla deniz mesafesi ve Şekiller Bahçesi köprüsü korundu. Yerleşim boyutları ve kamera aynı kaldı. Kıyı ve birleşimler değişmediğinden onaylı v2 maskesi v3 için aynı içerikle ayrı dosyaya kopyalandı.

## Kaydedilen varlıklar

- apps/web/public/science-campus-v3.png
- apps/web/public/science-campus-mask-v3.png

## Üretim istemi

Use case: precise-object-edit.
Asset type: seamless illustrated children's game world map tile.
Input image: EDIT TARGET, the approved white-blue science campus and neighboring harbor. Make ONE restrained change: add a few science-themed trees to the SCIENCE CAMPUS ONLY to soften its bare appearance.
Tree design: slim white/ivory trunks with a few simple white branches, compact blue-turquoise geometric crowns with soft rounded facets and a lightly crystalline appearance. Friendly, airy and playful, same polished soft 3D daylight rendering as the map. The crowns should read as distinctive stylized TREES, not ordinary green woodland, giant crystals, machines, glowing magic props, or pointed sharp spikes. Modest height around 50–80 image pixels, smaller than the observatory. A mixture of muted cyan, aquamarine and soft blue within the existing science palette; gentle matched shadows. No neon illumination, cables, circuits, lamps or complex tiny details.
Placement: about 10 trees TOTAL in 4 widely separated little clusters of 2–3, located in a few of the EXISTING SMALL GREEN LAWN PATCHES alongside the campus paths: one group near the northern science zone, one beside the large western activity court, one around the school approach, and one near the lower right greenhouse approach. Natural small irregular groupings, not a continuous avenue or tree necklace. Leave most lawn patches and all large circular paved activity courts EMPTY and readable. Keep pathways unobstructed and the school door, school facade, observatory/telescope, windmill/solar, experiment stall, gear station and greenhouse fully readable. Reduce bare feeling while maintaining broad breathing space.
STRICT INVARIANTS: preserve the entire composition and camera framing, exact aspect ratio, same scale and style. Keep coastline, widened water channel between science campus and harbor, all sand and retaining walls, geometric paving and path network, existing buildings/instruments and their position, garden at the top, and the exact wooden bridge entry unchanged. Do not reshape or move any land. LEFT forest/harbor and its existing green trees, original islands, cottages, docks, boats and rocks must remain unchanged. No added trees or objects in the sea or neighboring garden. Do not add ordinary green trees, shrubs, flowers, new buildings or new science equipment. Do not regrow a forest. Water remains clean turquoise without new rocks or dark underwater clusters. No text, labels, UI, borders, or people. Preserve everything except these few small blue-white science trees.

## Kontrol

Webde kampüsün geniş görünümü ve köprü girişi incelendi. TypeScript ve Vite derlemesi başarılı. Önceki 42 görsel dosyasının hash değerleri değişmedi. Mobil uyum çalışması yapılmadı.

Tarayıcı kanıtları:
- work/science-campus-v3-overview-web-preview.jpg
- work/science-campus-v3-bridge-web-preview.jpg

