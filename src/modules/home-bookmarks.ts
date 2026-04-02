import type { MealPlan, TicketClass } from '../data/destinations';
import { getDestinationBySlug } from '../data/destinations';
import { isSaved, remove, save } from './reservation-store';
import { computeTripTotal, mealLabel, ticketClassLabel } from './pricing';
import { showToast } from './toast';

const tc: TicketClass = 'economica';
const meal: MealPlan = 'sin-comidas';

function setSaveUi(btn: HTMLButtonElement, active: boolean): void {
  const icon = btn.querySelector<HTMLElement>('.material-symbols-outlined');
  btn.classList.toggle('home-editorial__save--active', active);
  btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  if (icon) {
    icon.style.fontVariationSettings = active
      ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
      : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
  }
}

export function initHomeBookmarks(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-home-save]').forEach((btn) => {
    const slug = btn.dataset.homeSave;
    if (!slug) return;
    const dest = getDestinationBySlug(slug);
    if (!dest) return;

    setSaveUi(btn, isSaved(slug));

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const { totalARS } = computeTripTotal(dest, dest.minDays, tc, meal);
      if (isSaved(slug)) {
        remove(slug);
        setSaveUi(btn, false);
        showToast(`${dest.name} eliminado de tus viajes`, 'neutral');
      } else {
        save({
          id: slug,
          name: dest.name,
          region: dest.region,
          days: dest.minDays,
          ticketClass: ticketClassLabel(tc),
          meal: mealLabel(meal),
          totalARS,
          image: dest.image,
          savedAt: Date.now(),
        });
        setSaveUi(btn, true);
        showToast(`${dest.name} guardado en tus viajes`, 'success');
      }
      window.dispatchEvent(new Event('viajaya-reservations'));
    });
  });
}
