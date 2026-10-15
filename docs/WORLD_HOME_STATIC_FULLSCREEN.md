# Statik UI ve tam ekran ana sayfa

Sonraki düzenlemede iki eksende farklı ölçekleme kaldırılmıştır. Güncel çizim genişletilen kadrajla, tek oranda ekrana yerleşir. Bkz. [WORLD_HOME_TOY_STYLE_PROMPTS.md](WORLD_HOME_TOY_STYLE_PROMPTS.md).

14 Ekim 2026. Görsel yeniden üretilmedi; onaylanan `world-home-v3.png` korunur.

Ana Sayfa, Ebeveyn, Ayarlar, profil, rozetler ve alt kartlardaki yardımcı öğeler yalnızca sunumdur. Tıklama işleyicileri, pencereler, pencere CSS'i, profil kayıt modülü ve yerel ilerleme takibi kaldırılmıştır. Bunlar artık klavyeyle tıklanabilir kontrol olarak da sunulmaz. Ada bağlantıları ve bölge etiketleri oyun haritasına geçişi korur.

Önceki sabit 1672 ×941 sahne, tek oranla sığdırılıyordu; oranı farklı ekranlarda kalan boşlukları eski deniz kaplıyordu. Sabit sahne dönüşümü ve eski deniz arka planı kaldırıldı. Sahne/SVG ekranın tüm genişlik ve yüksekliğini kullanır. Ada sınırları ile etiketlerin yüzde konumları aynı görsel koordinatlarına bağlıdır. UI yazı ve ikonları tek ölçekte kalırken üst bar ve alt kartların yerleşimi ekran genişliğine açılır. Arka plan tüm görünüm alanına yayılır; görünüm oranına göre yatay ve dikey ölçeği farklılaşabilir.

Kontrol: 1920 ×868 görünümde sahne/SVG tam olarak1920 ×868, eski arka plan `none`, pencere sayısı0. Üst bar ve üç alt kartta yatay taşma yok. Ana Sayfa/Ebeveyn/Ayarlar/Tümünü Gör tıklamaları rota değiştirmedi ve pencere açmadı. Derleme başarılı.

Ekran görüntüsü: `work/world-home-static-fullscreen-web.png`.
