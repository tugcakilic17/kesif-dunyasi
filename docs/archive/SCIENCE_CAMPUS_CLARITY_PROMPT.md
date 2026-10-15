# Bilim kampüsü netlik düzenlemesi, v6

Yerleşik image_gen ile science-campus-v5.png üzerinde ayrıntı netliği düzenlendi. Çatı çizgileri, cam kubbe, yapı ve duvar kenarları, ağaçlar ve avlu odakları daha belirgin hale getirildi. Yerleşim çerçevesi, ölçek ve kamera değiştirilmedi. Kaynak piksel boyutu hem önce hem sonra 1690×931'dir: yüksek çözünürlük istendi fakat araç bu boyutta çıktı verdi. Bu sürüm daha yüksek piksel çözünürlüğü olarak sunulmaz; ayrıntı netliği iyileştirilmiş sürümdür. Çok yakın ölçekte kaynak çözünürlüğünün sınırı devam eder.

Kaydedilen varlıklar:
- apps/web/public/science-campus-v6.png
- apps/web/public/science-campus-mask-v6.png

Önceki kaynak dosyalar korundu, onaylı maskenin içeriği yeni dosyaya aynı biçimde kopyalandı.

## Üretim istemi

Use case: precise-object-edit / image restoration.
Input image is the EXACT EDIT TARGET, the approved children's game map science campus and neighboring harbor. The sole task is to enhance RESOLUTION and CLARITY of this same illustration for a large scrollable desktop game map. Deliver a native HIGH-RESOLUTION output, ideally 3840 pixels wide (same aspect ratio, roughly 2115 pixels high), at minimum 3072 pixels wide if possible. Do not merely rescale a small blurry image; reconstruct clean fine edges and material detail faithfully from this reference while preserving the exact artwork.
Make architecture, roof tile boundaries, windows, glass dome ribs, pavement tile lines, white-blue retaining-wall edges, blue/turquoise trees, small foliage, robot, planet model, solar panels, gears, boats and shoreline visibly crisp at normal viewing scale. Match the original soft rounded polished 3D children's illustration: clean controlled edges and readable forms, without harsh oversharpening, halo outlines, noise, grain, gritty textures, photorealism or extra detail/clutter. Keep pleasant soft lighting and original color palette; existing soft object shading remains smooth but the map must not have a blurry/low-resolution veil.
STRICT INVARIANTS: preserve EXACT full canvas aspect/framing, camera perspective, all object positions, sizes, shapes and counts, the entire land silhouette and widened water separation, every existing building/instrument, all blue scientific trees/low plants, circular planet exhibit with benches and robot experiment court, all paths/walls/lawns, wooden bridge from Shapes Garden, top garden strip, left forest/harbor islands/cottages/boats/docks. No changed placement, no additional objects, no removed objects, no redesigned buildings, no palette shifts. Preserve clean science sea, no new rocks. No UI, text, labels, borders, people, new realms or style change. This is faithful high-resolution clarity restoration ONLY, not a creative redesign. Prioritize actually higher pixel dimensions and crisp faithful edges for use in a scrolling map.

## Kontrol

Normal web keşif ölçeğinde önceki ve yeni okul/avlu görünümü karşılaştırıldı; kenarlar ve yapı detayları daha belirgin. TypeScript ve Vite derlemesi başarılı. Önceki 48 görsel dosyasının hash değerleri değişmedi. Mobil uyum çalışması yapılmadı.

Tarayıcı kanıtları:
- work/science-campus-v5-clarity-before.jpg
- work/science-campus-v6-clarity-web-preview.jpg

