# Alt denizin doku ölçeği ve devamlılığı

Yerleşik image_gen düzenleme modu ile boş deniz arka planı, onaylı masal görselinin sağ alt denizine göre düzenlendi. Büyük bulanık renk kütleleri yerine aynı ailede küçük, sakin mavi/turkuaz su alanları üretildi. Sağ köşenin cloud-fairy-realm-v8.png görseli ve maskesi değiştirilmedi.

## Varlık

- apps/web/public/world-ocean-backdrop-v3.png
- Önceki deniz arka planları ve diyarlar saklandı.

## Yerleştirme

Deniz arka planı artık tek görselin bütün dünya boyutuna büyütülmesiyle çizilmez. Kamera konumunu/ölçeğini takip eden görünür parçalar kullanılır: kaynak ölçekte2508×1254, yani1.5orman ekranı genişliği ve yarısı kadar yükseklik. Komşu parçalar yatay/dikey dönüşümlü yansıtılır; iki tarafın aynı kaynak kenarı yan yana geldiğinden düz birleşim çizgileri oluşmaz. Bu tek arka plan ekranı kaplar ve haritanın altından devam eder. Önceki ayrı alt yansıma şeridi kaldırıldı. Gökyüzü uzantısı, sağ sınır, kıyılar ve diyar yerleşimleri korunur.

## Kontrol

Webde bilim kıyısının altı ve genel görünüm incelendi. Alt devamın doku ölçeği tutarlı ve parça birleşimleri kesintisiz. Sağ masal görseli ve maskesinin hash değerleri değişmedi. TypeScript ve Vite derlemesi başarılı. Kanıt: work/bottom-sea-continuity-web.jpg.

## Üretim istemi

Use case: precise-object-edit / compositing. Input1 is the EDIT TARGET, the current empty ocean backdrop. Input2 is the style reference ONLY: use the clear BLUE SEA in its lower-right FAIRY corner, not the land/buildings/clouds. The problem is that Input1's giant smeared color patches and large turquoise glow look different and too enlarged when used below the map. Convert this empty sea into a seamless repeatable background with SAME visual scale and quiet painted water style as the reference's lower-right sea.
Create consistent medium blue/turquoise calm open water with softly defined modest rounded color patches, faint restrained ripple highlights, clean readable forms and NO oversized hazy masses. No giant turquoise spotlight, dark blue rectangle, horizontal band, straight grid, pool caustic net, diamond lattice, glitter, high contrast noise or blur. Use a balanced medium azure-blue base similar to reference's right corner, with small natural hue variations everywhere, NOT dark left/pale right gradient.
SEAMLESS EDGES: top/bottom and left/right edges must match color, brightness and pattern density so this is tileable in both directions. No border/stripe/seam when tiles touch; uniform edge palette and gentle patch shapes across boundaries. Aspect2:1, native high quality, no stretching.
ONLY EMPTY SEA across entire frame. Absolutely NO islands, cliffs, shorefoam, shallow beaches, rocks, reefs, plants, boats, sky/horizon, clouds, text/UI/objects imported from the reference. It is a calm unobtrusive child's game-map water continuation, crisp enough at standard zoom, matching the existing lower-right sea.

