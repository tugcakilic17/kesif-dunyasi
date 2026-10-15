# Küçültülmüş haritada gökyüzü ve deniz devamı

IslandWorldFive.vue, kameranın y konumu ve ölçeğiyle haritanın ekrandaki üst/alt sınırını hesaplar. Üst boşluk ortak gökyüzü renklerini sürdüren bir arka planla doldurulur. Alt boşluk mevcut world-ocean-backdrop-v2.png deniz dokusunu kullanır; dikey yansıma alt kenarın aynı renk ve desenlerle devam etmesini sağlar. Doku haritadaki yatay konumu ve ölçeği takip eder, uzun boşluklarda görünür alanı tamamen örter.

Arka planlar haritanın arkasında, etkileşimsiz ve erişilebilirlik ağacından gizlidir. Harita sınırları, kamera ölçeği, diyar görselleri ve koordinatları korunur. Yeni raster görsel üretilmedi.

Genel görünümde ve yakınlaştırmada üst/alt boşlukların doldurulduğu webde kontrol edildi. TypeScript ve Vite derlemesi başarılı. Kanıt: work/sky-sea-viewport-extension-web.jpg.
