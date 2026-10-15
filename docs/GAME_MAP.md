# Güncel oyun haritası

Tek haritanın varlıkları `apps/web/public/assets/game_map/` klasöründedir. `apps/web/src/game-map.ts` dosyası tüm görsellerin ve maskelerin adreslerini, katman sırasını ve yerleşimini tanımlar. `apps/web/src/GameMap.vue` görünümü ve kamerayı yönetir.

## Kullanılan görseller

| Alan | Dosyalar |
| --- | --- |
| Deniz arka planı | `world-ocean-backdrop-v3.png` |
| Orman | `forest-valley-original.png` |
| Şekiller Bahçesi | `geometry-garden-main-v3.png`, `geometry-garden-east-v2.png` |
| Liman ve kıyı | `island-sea-south-v1.png`, `island-sea-east-garden-v5.png`, `coast-valley-link-v1.png` |
| Liman altı deniz | `harbor-sea-south-v1.png` |
| Bilim | `science-realm-v3.png`, `science-campus-v6.png`, `science-campus-north-v1.png`, `science-campus-south-v1.png` |
| Masal | `cloud-fairy-realm-v8.png`, `cloud-fairy-north-v1.png`, `cloud-fairy-south-v1.png` |

Toplam 15 görsel ve 12 dosya maskesi vardır. Limanın ormanla geçişinde ayrıca kodda tanımlanan bir gradyan maskesi kullanılır. Bilim ve masalın tam alan görselleri, net ayrıntı panellerinin altında kıyı ve kenar geçişlerini tamamlar; aktif katman oldukları için korunmuştur. Dosyaların sürüm isimleri üretim kayıtlarıyla eşleşmek üzere korunur.

## Temizlik

14 Ekim 2026: Kullanılmayan 62 görsel ve maske silindi; yaklaşık 68 MiB temizlendi. Geçici çalışma alanındaki 200 eski görsel de kaldırıldı. Eski deneme ekranları ve 4/5 harita seçimi kaldırıldı. Kullanılan 27 varlığın SHA256 değerleri taşıma öncesiyle aynı. Dünya ölçüleri, katman sırası, geçişler ve %100 yakınlaştırma sınırı korunur. `/` ve eski `?harita=5` bağlantısı aynı güncel haritayı açar.

Derleme başarılı; çıktıdaki 27 harita dosyası ve kaynak referansları doğrulandı. Tarayıcıda tüm görsellerin yeni adreslerden yüklendiği ve bütün harita görünümünün korunduğu kontrol edildi.

## Üretim geçmişi

Ana sayfa `world-home-v8.png` görselini ve statik arayüz bileşenlerini kullanır. Dünya haritası sınırları `world-home.ts`, görünüm `WorldHome.vue` içindedir. Güncel sadeleştirilmiş sahne ve kartların üstünde tamamlanan kıyılar [WORLD_HOME_ROUNDED_PLAYFUL_PROMPT.md](WORLD_HOME_ROUNDED_PLAYFUL_PROMPT.md), ilk arayüz üretimi [WORLD_HOME_REFERENCE_UI_PROMPT.md](WORLD_HOME_REFERENCE_UI_PROMPT.md) dosyasındadır.

Önceki tasarım kayıtları `archive/` altındadır. Bu kayıtlar geçmişteki dosya yollarını ve kaldırılan sürümleri anlatabilir; güncel varlık listesi yukarıdaki tablo ve `game-map.ts` dosyasıdır.

- [Bilim ve masal netlik panelleri](archive/TWO_PANEL_REALM_CLARITY_PROMPTS.md)
- [Liman altı deniz devamı](archive/HARBOR_SEA_CONTINUATION_PROMPTS.md)
- [Deniz renk uyumu](archive/SEA_COLOR_HARMONY_PROMPTS.md)
