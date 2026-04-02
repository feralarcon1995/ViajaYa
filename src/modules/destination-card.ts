import type { Destination, MealPlan, TicketClass } from '../data/destinations';
import { isSaved, save, remove } from './reservation-store';
import { showToast } from './toast';
import { computeTripTotal, mealLabel, ticketClassLabel } from './pricing';
import { R } from '../routes';

export type BadgeUpdater = () => void;

export function createDestinationCard(dest: Destination, onChange?: BadgeUpdater): HTMLElement {
  const el = document.createElement('article');
  el.className = 'dest-card';
  el.dataset.destCard = dest.slug;
  const saved = isSaved(dest.slug);
  const iconName = saved ? 'bookmark' : 'bookmark_add';
  const tc: TicketClass = 'economica';
  const meal: MealPlan = 'sin-comidas';
  const { totalARS } = computeTripTotal(dest, dest.minDays, tc, meal);
  el.innerHTML = `
    <div class="dest-card__image-wrap">
      <img src="${dest.image}" alt="Vista de ${dest.name}" loading="lazy" class="dest-card__img" width="800" height="600" />
      <button
        type="button"
        class="dest-card__save${saved ? ' dest-card__save--active' : ''}"
        aria-label="${saved ? 'Quitar' : 'Guardar'} ${dest.name} en mis viajes"
        data-save="${dest.slug}"
      >
        <span class="material-symbols-outlined" aria-hidden="true">${iconName}</span>
      </button>
    </div>
    <div class="dest-card__body">
      <span class="label dest-card__region">${dest.region}, ${dest.country}</span>
      <h3 class="dest-card__name">${dest.name}</h3>
      <p class="dest-card__tagline small">${dest.tagline}</p>
      <p class="dest-card__meta small">${dest.continent} · ${dest.rating.toFixed(1)} ★ (${dest.reviewCount})</p>
      <p class="dest-card__price">Desde $${dest.pricePerDay.toLocaleString('es-AR')} ARS por día</p>
      <a href="${R.detail(dest.slug)}" class="btn btn--ghost btn--sm">
        Ver detalles
        <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
      </a>
    </div>
  `;
  el.querySelector<HTMLButtonElement>('[data-save]')?.addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.currentTarget as HTMLButtonElement;
    const icon = btn.querySelector('.material-symbols-outlined');
    if (isSaved(dest.slug)) {
      remove(dest.slug);
      btn.classList.remove('dest-card__save--active');
      btn.setAttribute('aria-label', `Guardar ${dest.name} en mis viajes`);
      if (icon) icon.textContent = 'bookmark_add';
      showToast(`${dest.name} eliminado de tus viajes`, 'neutral');
    } else {
      save({
        id: dest.slug,
        name: dest.name,
        region: dest.region,
        days: dest.minDays,
        ticketClass: ticketClassLabel(tc),
        meal: mealLabel(meal),
        totalARS,
        image: dest.image,
        savedAt: Date.now(),
      });
      btn.classList.add('dest-card__save--active');
      btn.setAttribute('aria-label', `Quitar ${dest.name} de mis viajes`);
      if (icon) icon.textContent = 'bookmark';
      showToast(`${dest.name} guardado en tus viajes`, 'success');
    }
    onChange?.();
  });
  return el;
}
