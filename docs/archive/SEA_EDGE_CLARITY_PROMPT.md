# Sağ deniz sınırı ve sol alt su dokusu

Sağ harita sınırı3.5orman ekranından3.30ekrana daraltıldı. Masal uçurumları ve bulutları korunarak sağda küçük bir deniz payı bırakıldı. Masal bölgesinin gezinme genişliği yeni sınıra uyarlandı. Dünya katmanı sınırında kırpılır; arka planın önceki doku ölçeği korunur.

Sol alttaki deniz devamı science-campus-sea-v1.png üzerinde yerleşik image_gen düzenleme modu ile netleştirildi. Kıyılar ve üstteki adalar korunarak bulanık su dokusu temiz, sakin dalga/ışık desenleriyle tamamlandı. Panelin kaynak yerleşimi x0,y1682,1672×765 olarak korundu. Yeni geçiş maskesi üst200pikselde mevcut liman suyuna, sağda260ve altta70pikselde arka plana karışır. Alt su dokusu erken silinmediği için sol alt yumuşak alan azalır.

Büyük harita katmanlarının genel görünümde kesik dikdörtgenler halinde çizilmesine yol açan zorunlu3Dkatman yükseltmesi kaldırıldı; aynı kamera hesabı2Dtranslate/scale ile çalışır.

## Varlıklar

- apps/web/public/science-campus-sea-v2.png
- apps/web/public/science-campus-sea-mask-v2.png
- Masal diyarının cloud-fairy-realm-v7.png kaynağı ve geçiş maskesi değişmedi.
- Önceki görseller korunur.

## Kontrol

Webde sağdaki masal uçurumlarının kesilmeden kaldığı, küçük deniz payı ile haritanın bittiği, sol alt suyun netleştiği ve genel görünümde tüm katmanların tamamının çizildiği incelendi. TypeScript ve Vite derlemesi başarılı. Önceki71görsel dosyasının hash değerleri değişmedi. Tarayıcı kanıtı: work/sea-edge-clarity-web.jpg.

## Üretim istemi

Use case: precise-object-edit / image restoration. Input is the exact EDIT TARGET: a wide turquoise ocean continuation below the approved children's game map, with cropped island shorelines in the TOP STRIP. Its LOWER TWO THIRDS currently have large smeared, hazy blurred water areas, while the upper water has clear gentle illustrated caustic ripples.
Edit ONLY the plain open WATER below the top shore band to remove the blur and make its water texture consistent with the upper portion. Reconstruct calm, fine, clean rounded wave/caustic pattern boundaries throughout, at the same natural pattern scale as the water around the shores. It must look like clear turquoise illustrated sea, not an out-of-focus painted gradient. Keep restrained low contrast and soothing blue/aqua depth gradients, no noisy busy glitter, grid, moire, sharp geometric repeated tiles, photorealism or heavy outlines. Maintain exact overall hues and brightness, never make the lower portion darker or a different shade.
STRICT invariants: SAME full canvas framing/aspect/camera, exact TOP25percent of image unchanged (cropped islands, rocks, grass, sand, shore foam, upper wave patterns). Exact LEFT/RIGHT/BOTTOM water-edge colors must continue naturally into neighboring water, no new borders or straight seams. No additional rocks, islands, land, plants, boats, reefs, dark underwater masses, paths, people, text/UI. Restore ONLY watery texture sharpness, not the world layout. Match the soft polished rounded3D children's map style but WATER DETAILS must be clean and readable. Native high fidelity/quality as high as supported, ideally at least original1854x848dimensions. Preserve the tranquil empty sea without blur.


Son sınır daraltması: dünya genişliği3.30orman ekranıdır. Masal arazisinin en sağ kara kenarı yaklaşık3.288ekrandadır; kara kesilmeden hemen ardından harita biter. Web kontrolü ve derleme başarılı. Güncel kanıt: work/fairy-tight-right-edge-web.jpg.

