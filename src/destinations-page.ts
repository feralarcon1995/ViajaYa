import { initTheme, toggleTheme } from './modules/theme';
import { initFooterYear } from './modules/footer-year';
import { initNavbar } from './modules/navbar';
import { getCount } from './modules/reservation-store';
import { staggerCards } from './modules/animations';
import { destinations, type DestinationCategory } from './data/destinations';
import { createDestinationCard } from './modules/destination-card';

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
const introEl = document.querySelector('[data-page-intro]');
if (introEl) {
  introEl.textContent = `Filtrá por categoría o recorré los ${destinations.length} viajes pensados para viajeros desde Argentina.`;
}
window.addEventListener('viajaya-reservations', updateBadge);
document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => toggleTheme());

const grid = document.querySelector<HTMLElement>('[data-dest-grid-all]');
const bar = document.querySelector<HTMLElement>('[data-filter-bar]');

function render(filter: DestinationCategory | 'all'): void {
  if (!grid) return;
  grid.replaceChildren();
  const list =
    filter === 'all' ? destinations : destinations.filter((d) => d.categories.includes(filter));
  list.forEach((dest) => {
    grid.appendChild(createDestinationCard(dest, updateBadge));
  });
}

bar?.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    bar.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((b) => {
      b.classList.toggle('tag--active', b === btn);
    });
    if (f === 'beach' || f === 'city' || f === 'nature' || f === 'culture') {
      render(f);
    } else {
      render('all');
    }
  });
});

render('all');
staggerCards('[data-dest-card]');
