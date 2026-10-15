# Haritanın UI arasına ortalanması

Bu yerleşim geçmiş sürümdür. Güncel ana sayfa tek kesintisiz sahne kullanır; tekrarlanan deniz zemini kaldırıldı. Güncel kayıt: [WORLD_HOME_HORIZONTAL_SCENE_PROMPTS.md](WORLD_HOME_HORIZONTAL_SCENE_PROMPTS.md).

14 Ekim 2026. `world-home-v5.png` yeniden üretilmedi veya değiştirilmedi.

Harita ekranı kaplamak yerine ortadaki keşif alanında orantılı küçültülür. Ölçek, ekran genişliğinin %88'i ve üst/alt UI için ayrılan yükseklikten küçük olanıyla belirlenir. Ada grubu üst menüyle alt kartların arasına ortalanır. Başlık, etiketler ve tıklama sınırları aynı harita ölçeğine bağlıdır; menü ve kart boyutları korunur.

Ekranın çevresi mevcut `world-home-v5.png` içindeki boş su alanıyla doldurulur. Dört aynalanmış parçanın tekrarı doku kenarlarını eşleştirir. Görselin dış kenarı su zeminine yumuşak maskeyle bağlanır. Eski deniz görseli veya ikinci ada kopyası kullanılmaz. Pencereler/profil kodu eklenmedi; yardımcı UI alanları statiktir.

Kontrol:

- Derleme başarılı.
- 1920 ×868 görünümde tüm ada sınırları menünün en az16piksel altında ve kartların en az8piksel üstünde kaldı.
- 1672 ×941 görünümde aynı kontrol geçti.
- Beş diyarın fare seçim alanları doğrulandı; bilim etiketi oyun haritasındaki doğru bölgeyi %100 ölçekte açtı.
- Ekran görüntüsü: `work/world-home-centered-distance-web.png`.
