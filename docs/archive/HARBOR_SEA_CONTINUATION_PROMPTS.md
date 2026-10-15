# Liman altı deniz devamı

14 Ekim 2026. Üretim modu: built-in image_gen; iki yerel görsel düzenleme.

## Amaç ve sonuç

Limanın altındaki eski su parçasının büyük, sert lekelerini limandaki sakin turkuaz–mavi suyla eşleştirmek. Liman, bilim ve masal diyarlarının onaylanan yerleşimleri ve kaynakları korunur.

- Görsel: `apps/web/public/harbor-sea-south-v1.png` (gerçek kaynak 1572 × 1001).
- Maske: `apps/web/public/harbor-sea-south-mask-v1.png`.
- Yerleşim: kaynak koordinatlarında x=0, y=1382, genişlik=1672, yükseklik=1065. Dünya ölçeği 3840/1672.
- Referansın üst 500 pikseli doğrudan `island-sea-south-v1.png` alt bölümünden alınmıştır. Geniş örtüşmede renk farkına göre bulunan geçiş maskesi kullanılır; yeni parça altta ve sağda mevcut arka plana yumuşak bağlanır.
- İlk düzenleme sonrası açık denizde oluşan yeni kaya kümeleri ikinci düzenlemeyle temizlenmiştir.
- Önceki 87 public görselin SHA256 değerleri değişmedi.
- `npm.cmd run build` başarılı.
- Aynı kamera, %100 oranında web karşılaştırması: `work/harbor-sea-continuation-before-web.jpg`, `work/harbor-sea-continuation-after-web.jpg`.

## İlk düzenleme istemi

```text
Use case: precise-object-edit / local sea outpainting. This1672x1065 image is the EXACT EDIT TARGET/framing. Its TOP500pixels are the approved harbor's genuine lower edge (islands, cropped houses/docks, sailing boat, rocks/reefs, shore foam and calm water). Its LOWER565pixels are an older incompatible sea continuation. A straight horizontal mismatch is visible at y500. Repaint ONLY the lower open water and its seam into a faithful CONTINUATION of the upper approved harbor sea.
PRIORITY: the approved UPPER WATER defines the exact hue, depth, texture and scale. Continue its clear calm turquoise/azure ocean, soft small rounded wave/ripple color patches and gentle depth gradients downward. Existing lower water has huge hard-edged mottled blotches, stronger darkblue and differently scaled patterns. Reduce these lower color patches to the SAME SCALE as those near the sailboat/upper islands (roughly35–50imagepixels per broad patch, with fine quieter texture around them), lower their contrast, and remove the seam at y500 completely. There must be no line, stripe, sudden palette switch, blurry band, obvious rectangle or different rendering material. Keep medium-blue/AQUA tones consistent with the upper harbor, and let depth change gradually, without a dark left slab, luminous cyan spotlight, pool lattice/caustic net, glitter, giant cloudy pattern, grain, high-contrast dots or overly busy texture.
STRICT PROTECTED: entire upper artwork remains EXACT. Do not move, resize, redesign or add/remove any island, tree, cropped house, pier, boat, rock, reef, foam outline or grass. Preserve input camera/perspective, all existing positions/sizes/colors and the cheerful soft rounded3D children's map style. All LAND/OBJECT pixels and top450rows are unchanged. Only OPEN WATER in roughly y450..1065 may be edited to join naturally. Below y500 is EMPTY OPEN SEA: no additional islands, boats, rocks, reefs/underwater dark masses, clouds, paths, plants, objects or text/UI/people. Clear modest detail, no general blur, natural soothing blue continuation. Exact1672:1065aspect, not a different crop; this will overlap the original harbor, so shore positions and water boundaries must match accurately.
```

## Açık deniz temizleme istemi

```text
Precise local cleanup of this SAME1572x1001image. Keep its exact framing, all original harbor islands/boat/piers/trees/shorefoam, sea hue and surface wave/color patch texture unchanged. The TOP470imagepixels are the protected approved harbor edge. The LOWER530pixels must contain ONLY EMPTY OPEN WATER with the same flat gentle painted ripple/color pattern.
Remove EVERY newly invented DARK BLUE UNDERWATER ROCK/REEF CLUSTER below y470, including the lumpy raised clusters around x550,y535; x620,y600; x710,y655; x1080,y640; x1190,y685; x1320,y525 and any other similarly volumetric boulder group in the LOWER half. Replace them with the surrounding unbroken softly mottled blue/turquoise SURFACE WATER, matching its color and pattern density exactly. Do NOT remove the original underwater rocks/reefs ABOVE470around the existing islands. Flat blue surface color patches remain, but no solid stone-shaped/lumpy raised forms or underwater objects appear below470.
No additional objects, no changes to water colors/gradients, no new caustic net or glitter, no blurry smear or obvious painted rectangles. Keep the faithful cute rounded3D game-map aesthetic, quiet natural sea-only continuation, and original geometry. This is ONLY removing the introduced lower underwater rock shapes from empty sea; absolutely preserve everything else.
```

