# Daha sakin ve kompakt ana sayfa

Üretim modu: built-in imagegen. Tarih: 14 Ekim 2026.
Son görsel: `apps/web/public/assets/game_map/world-home-v7.png` (1864 ×843).
Düzenleme hedefi: önceki `world-home-v6.png`.

Beş diyarın yerleşimi ve çizim estetiği korunarak dikey alanları kısaltıldı. Küçük deniz adacıkları, kuşlar ve yoğun su ayrıntıları kaldırıldı. Liman, bilim ve masalın kıyıları kartların üstünde bütünüyle görünür. Etiketler ve fareyle seçilen sınırlar yeni kıyılara göre taşındı. Statik UI ve oyun içi harita değiştirilmedi.

## Kontrol

- Üretim derlemesi başarılı.
- 1920 ×868 masaüstü görünümünde alt kıyılar yaklaşık y=635'te tamamlanır; kartlar y=703'te başlar.
- Beş etiket kartların üstünde, ekran içinde kalır.
- Web görünümü: `work/world-home-calm-compact-web.png`.

## İlk sadeleştirme promptu

Use case: precise-object-edit.
Edit target: the provided world-home-v6 illustration. This is a composition cleanup of the SAME children's game world, not a different map. Preserve its polished, rounded toy-like 3D storybook drawing style, bright colors, soft daytime shading and recognizable realm designs exactly. Preserve the wide ~2.21:1 canvas.

Primary change: make the FIVE major realms horizontally broad but more compact vertically, with every lower shoreline fully visible ABOVE a footer overlay. In normalized 1920x868 coordinates, the entire continuous sea-facing bottom coast of the harbor, science and fairy realms must end by y=660 (76% of image height). No land, staircase, main-island cliffs, waves around main island coast or hero boat extends below that limit. The area y=685..868 is calm sea plus the existing large decorative foreground plants at the two corners, reserved for HTML footer cards. Do not draw footer cards, labels, icons or any UI. Keep the existing blank wooden sign at top center; do not add writing.

COMPOSITION: keep forest upper left, shapes upper middle, harbor lower left, science lower middle, and tall fairy land on right. Retain broad island widths and left-right spread so we do not get huge empty side margins. Upper forest and shapes can become subtly smaller vertically and lift slightly to make room for the lower row. Lift harbor and science upwards about 60-80 scene pixels and make them vertically compact without flattening the art or distorting buildings. The fairy island's lower coast must end level with the science and harbor bottom coasts. Keep complete rocky island bases and a visible ribbon of turquoise water beneath the lower shores before the footer reserve. Main landmarks should be entirely visible. Keep the forest tree house and camping tent; shapes' red sphere, golden cube, blue pyramid, purple cylinder and small fountain; harbor lighthouse, two small colorful cottages and pier; science blue-domed campus and telescope and atom courtyard; fairy castle, magical open book and rainbow, smooth magical bubble trees.

SIMPLICITY: remove almost ALL tiny decorative ocean islands, distant rocklets and numerous foreground mini islands; at most 2 distant tiny silhouettes near the horizon. Remove most gulls and extra boats (one small harbor sailboat is sufficient and must be above y660). Make water calmer with larger, softer turquoise wave patterns, no busy white-speckle texture. Reduce ornamental vegetation/flower clusters/extra props on major islands by approximately 40%; retain just enough iconic trees and scenery to feel friendly and alive. Less dense layering of every tree and bush; give paths and main buildings breathing room. Do not introduce other activities or props.

INVARIANTS: maintain the clear sky-to-sea horizon and cloud bank, cute polished art style and foreground large green leaves and pink flowers at BOTH lower corners. Only three inter-realm bridges: forest to shapes, shapes to science, science to the LOWER fairy platform. Never connect harbor to science. All five realms remain separate across sea. No snow realm, no text, no UI panels, no new land masses. Design for a calm readable home screen, entire lower islands visible above reserved footer area.

## Alt kıyıları yukarı alma promptu

Edit this provided illustration with ONE focused composition correction. Preserve the exact wide aspect ratio, drawing style, sky, blank wood sign, foreground leaves and current simplified calm sea. Preserve the five realm identities and horizontal centers. No text or UI.
The science island and fairy island still end too low. Recompose the whole main island group to fit above a horizontal limit at 72% image height: every island's complete rocky bottom coast, water foam and sailboat must finish ABOVE y=605 on the actual 843 pixel tall canvas. Bottom 28% of the canvas must contain ONLY calm water and the existing two foreground corner plants; there will be large UI cards in this lower strip.
Move the harbor, science, and lower fairy platform upwards noticeably (about 70-90 pixels); reduce their vertical footprint slightly and make buildings a little smaller where needed. Recompose the upper forest and shape islands to finish about y=390, making room for the lower row starting about y=410. Keep the island widths and spread across the scene. Keep complete islands, no cut-off cliff bases. Fairy lower platform and science bottom finish level around y590. The science landmark, dome and telescope remain visible, with a simple campus foreground. Keep the three bridges forest-shapes, shapes-science and science-lower fairy, properly reattached to the raised shores. Harbor remains separate. Do not squeeze, stretch or blur the buildings. Keep polished rounded toy art, no new scenery, no new mini islands, no dense flowers. This is a shorter vertical scene with the same wide lateral spread, NOT a globally shrunken map floating in empty margins.

