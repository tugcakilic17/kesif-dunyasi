# Daha ferah dünya haritası

14 Ekim 2026. Mod: built-in imagegen, deniz genişletme düzenlemesi.
Yeni görsel: `apps/web/public/assets/game_map/world-home-v2.png`, gerçek boyut1672 ×941. Önceki ana sayfa görseli korunur.

Ada grubu çevresine açık deniz eklenmiştir. Sunumda139,78,1394,785 görüş alanı kullanılır; eskiye göre ada grubu yaklaşık%20küçülür. Tam ekran su zemini mevcut onaylanan deniz dokusuyla doldurulur. Aynalanan dört dokudan oluşan tekrar, düz birleşim çizgilerini önler; görselin açık deniz kenarları zemine yumuşak maskeyle bağlanır. Adaların sınırları yeni görseldeki konumlara göre yeniden çizilir. Oyun içi harita görselleri ve yerleşimi değişmez.

## İstem

Doğrulama: beş adanın merkezlerinde fareyle seçilen diyar adları kontrol edildi. Bilim Diyarı seçimi doğru oyun bölgesini %100 ölçekte açtı. Derleme başarılı. Son web görünümü `work/world-home-space-after-web.jpg` dosyasındadır.

```text
Use case: precise-object-edit / sea outpainting.
Edit Image1, the approved home world map. Image2 is the approved open-ocean material/palette reference.
ONLY change framing and surrounding sea. All five islands, every landmark, tree, boat and bridge MUST remain exactly the same as Image1, with the same relative positions and proportions. Do not redesign the map.
Show the complete original artwork approximately 20 percent SMALLER at the center of a new wide16:9 canvas: original Image1 footprint x10%..90%, y10%..90%. The same island group is centered with its original aspect ratio, surrounded by new calm empty ocean. Preserve the original's sharp cheerful rounded3D children's art; no additional land, buildings, landmarks, rocks or boats. Absolutely no new sixth island/realm. Any small original outer decorative rocks may remain INSIDE the original area, but the new margins are EMPTY SEA.
Seamlessly extend the turquoise/azure ocean in ALL directions through those margins. Quiet low-contrast small rounded water patches, same colors/lighting as the original sea, harmonized with Image2. NO rectangular old-image border, no abrupt texture/palette change, no flat blue bands, no dark chunky reefs, no large caustic lattice/grid, no glitter/dots and no blurry repeated island image in the background. Remove/fade the original heavy corner-cloud masses so the sea continues outward naturally; add only a few small, delicate soft clouds at the OUTERMOST corners if needed, leaving the islands readable. The sea is the entire background, the islands are the smaller central focal group. Not a framed picture/card/poster.
Do not add any text, UI, border, title, badge, avatar, button, label or interface. No hover outline painted in. Exact wide16:9 framing, complete harmonious ocean scene, bright clear and relaxing, not overly detailed. Strictly keep the identities and interior arrangement of all original islands.
```

