import { initTheme, toggleTheme } from './modules/theme';
import { initFooterYear } from './modules/footer-year';
import { initNavbar } from './modules/navbar';
import { ensureBlueRate } from './modules/dolar';
import { getAll, remove, getCount, type Reservation } from './modules/reservation-store';
import { showToast } from './modules/toast';

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
window.addEventListener('viajaya-reservations', () => {
  updateBadge();
  void paint();
});
document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => toggleTheme());

const emptyEl = document.querySelector<HTMLElement>('[data-res-empty]');
const listEl = document.querySelector<HTMLElement>('[data-res-list]');
const sidebar = document.querySelector<HTMLElement>('[data-res-sidebar]');
const elCount = document.querySelector<HTMLElement>('[data-res-count]');
const elDays = document.querySelector<HTMLElement>('[data-res-days]');
const elTotal = document.querySelector<HTMLElement>('[data-res-total]');
const elUsd = document.querySelector<HTMLElement>('[data-res-usd]');

async function paint(): Promise<void> {
  const items = getAll();
  const usd = await ensureBlueRate();
  if (!listEl || !emptyEl || !sidebar) return;

  if (items.length === 0) {
    emptyEl.hidden = false;
    listEl.replaceChildren();
    sidebar.hidden = true;
    return;
  }

  emptyEl.hidden = true;
  sidebar.hidden = false;
  listEl.replaceChildren();

  let sumDays = 0;
  let sumArs = 0;
  items.forEach((r) => {
    sumDays += r.days;
    sumArs += r.totalARS;
  });

  if (elCount) elCount.textContent = `Viajes guardados: ${items.length}`;
  if (elDays) elDays.textContent = `Días totales (suma): ${sumDays}`;
  if (elTotal) elTotal.textContent = `Total referencia ARS: $${sumArs.toLocaleString('es-AR')}`;
  if (elUsd) {
    if (usd && usd > 0) {
      elUsd.textContent = `Equivalente aprox. USD (blue): ${(sumArs / usd).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`;
    } else {
      elUsd.textContent = 'Cotización USD no disponible en este momento.';
    }
  }

  items.forEach((r) => {
    listEl.appendChild(buildCard(r, usd));
  });
}

function buildCard(r: Reservation, usd: number | null): HTMLElement {
  const card = document.createElement('article');
  card.className = 'res-card';
  card.dataset.resCard = r.id;

  const usdLine =
    usd && usd > 0
      ? `USD ${(r.totalARS / usd).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`
      : 'USD: —';

  card.innerHTML = `
    <img class="res-card__img" src="${r.image}" alt="" width="240" height="160" />
    <div>
      <h2 class="res-card__title">${r.name}</h2>
      <p class="small res-card__meta">${r.region}</p>
      <p class="small">${r.days} días · ${r.ticketClass} · ${r.meal}</p>
      <p class="small res-card__price"><strong>$${r.totalARS.toLocaleString('es-AR')} ARS</strong> · ${usdLine}</p>
    </div>
    <div class="res-card__actions" data-res-actions></div>
  `;

  const img = card.querySelector('img');
  if (img) img.alt = `Miniatura del viaje a ${r.name}`;

  const actions = card.querySelector<HTMLElement>('[data-res-actions]');
  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn btn--ghost btn--sm';
  delBtn.setAttribute('aria-label', `Eliminar reserva en ${r.name}`);
  delBtn.textContent = 'Eliminar';

  delBtn.addEventListener('click', () => {
    if (!actions) return;
    actions.innerHTML = `
      <p class="small" id="confirm-${r.id}">¿Eliminar este viaje?</p>
      <div class="res-card__confirm-row">
        <button type="button" class="btn btn--danger btn--sm" data-confirm-yes>Sí, eliminar</button>
        <button type="button" class="btn btn--ghost btn--sm" data-confirm-no>Cancelar</button>
      </div>
    `;
    actions.querySelector('[data-confirm-yes]')?.addEventListener('click', () => {
      remove(r.id);
      showToast('Reserva eliminada', 'danger');
      void paint();
    });
    actions.querySelector('[data-confirm-no]')?.addEventListener('click', () => {
      void paint();
    });
  });

  actions?.appendChild(delBtn);
  return card;
}

void paint();
