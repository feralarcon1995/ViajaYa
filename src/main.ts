import { initTheme, toggleTheme } from './modules/theme';
import { initFooterYear } from './modules/footer-year';
import { initNavbar } from './modules/navbar';
import { initDolar } from './modules/dolar';
import { getCount } from './modules/reservation-store';
import { heroEntrance, staggerCards, fadeInUp } from './modules/animations';
import { destinations } from './data/destinations';
import { initHomeBookmarks } from './modules/home-bookmarks';
import { mountHomeEditorial, setHomeHeroMedia } from './modules/home-editorial-render';

function updateBadge(): void {
  document.querySelectorAll<HTMLElement>('[data-res-badge]').forEach((badge) => {
    const n = getCount();
    badge.textContent = n > 0 ? String(n) : '';
  });
}

initTheme();
initFooterYear();
initNavbar();
updateBadge();

setHomeHeroMedia(document.querySelector<HTMLImageElement>('.home-hero__img'));
mountHomeEditorial(document.querySelector<HTMLElement>('[data-home-editorial-root]'));
initHomeBookmarks();

const destCountEl = document.querySelector('[data-dest-count]');
if (destCountEl) destCountEl.textContent = String(destinations.length);
window.addEventListener('viajaya-reservations', updateBadge);

const panel = document.querySelector<HTMLElement>('[data-dolar-panel]');
const tpl = document.getElementById('tpl-dolar') as HTMLTemplateElement | null;
if (panel && tpl) {
  panel.appendChild(tpl.content.cloneNode(true));
}
void initDolar();

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => toggleTheme());

heroEntrance('.home-hero__title', '.home-hero__lead', '.home-hero__ctas');
staggerCards('[data-value-card]');
fadeInUp('.home-dolar', 0.15);
