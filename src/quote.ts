import { initTheme, toggleTheme } from './modules/theme';
import { initFooterYear } from './modules/footer-year';
import { initNavbar } from './modules/navbar';
import { ensureBlueRate, getDolarBlueVenta } from './modules/dolar';
import { initModal } from './modules/modal';
import { getCount } from './modules/reservation-store';
import { destinations, type MealPlan, type TicketClass } from './data/destinations';
import { computeTripTotal, formatARS, ticketClassLabel, mealLabel } from './modules/pricing';

function updateBadge(): void {
  document.querySelectorAll<HTMLElement>('[data-res-badge]').forEach((badge) => {
    const n = getCount();
    badge.textContent = n > 0 ? String(n) : '';
  });
}

function setLive(text: string): void {
  const el = document.getElementById('live-region');
  if (el) el.textContent = text;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

initTheme();
initFooterYear();
initNavbar();
updateBadge();
window.addEventListener('viajaya-reservations', updateBadge);
document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => toggleTheme());

const form = document.getElementById('quote-form') as HTMLFormElement | null;
const diasSel = document.getElementById('q-dias') as HTMLSelectElement | null;
const destHost = document.querySelector<HTMLElement>('[data-quote-destinations]');
const buyBtn = document.querySelector<HTMLButtonElement>('[data-buy-btn]');
const modal = document.getElementById('quote-modal') as HTMLElement | null;
const modalSummary = document.querySelector<HTMLElement>('[data-modal-summary]');

if (diasSel) {
  for (let d = 3; d <= 14; d += 1) {
    const opt = document.createElement('option');
    opt.value = String(d);
    opt.textContent = `${d} días`;
    diasSel.appendChild(opt);
  }
}

if (destHost) {
  destinations.forEach((dest, i) => {
    const id = `q-dest-${dest.slug}`;
    const label = document.createElement('label');
    label.className = 'quote-dest-card';
    const region = `${dest.region}, ${dest.country}`;
    label.innerHTML = `
      <input class="quote-dest-card__input" type="radio" name="destino" value="${dest.slug}" id="${id}" ${i === 0 ? 'checked' : ''} required />
      <img class="quote-dest-card__img" src="${dest.image}" alt="" width="400" height="260" loading="lazy" />
      <span class="quote-dest-card__shade" aria-hidden="true"></span>
      <span class="quote-dest-card__body">
        <span class="quote-dest-card__region">${region}</span>
        <span class="quote-dest-card__name">${dest.name}</span>
      </span>
      <span class="material-symbols-outlined quote-dest-card__check" aria-hidden="true">check</span>
    `;
    const img = label.querySelector('img');
    if (img) img.alt = `Destino ${dest.name}`;
    destHost.appendChild(label);
  });
}

const elNombre = document.getElementById('q-nombre') as HTMLInputElement | null;
const elApellido = document.getElementById('q-apellido') as HTMLInputElement | null;
const elEdad = document.getElementById('q-edad') as HTMLInputElement | null;
const elEmail = document.getElementById('q-email') as HTMLInputElement | null;
const elClase = document.getElementById('q-clase') as HTMLSelectElement | null;
const elComida = document.getElementById('q-comida') as HTMLSelectElement | null;

const sumDest = document.querySelector<HTMLElement>('[data-sum-dest]');
const sumStayDetail = document.querySelector<HTMLElement>('[data-sum-stay-detail]');
const sumSub = document.querySelector<HTMLElement>('[data-sum-sub]');
const discountRow = document.querySelector<HTMLElement>('[data-quote-discount-row]');
const sumDiscountArs = document.querySelector<HTMLElement>('[data-sum-discount-ars]');
const sumBlueRate = document.querySelector<HTMLElement>('[data-sum-blue-rate]');
const sumTotal = document.querySelector<HTMLElement>('[data-sum-total]');
const sumUsd = document.querySelector<HTMLElement>('[data-sum-usd]');

function getSelectedSlug(): string | null {
  const checked = document.querySelector<HTMLInputElement>('input[name="destino"]:checked');
  return checked?.value ?? null;
}

function getSelectedDestination() {
  const slug = getSelectedSlug();
  return destinations.find((d) => d.slug === slug);
}

function showErr(key: 'nombre' | 'apellido' | 'edad' | 'email', msg: string): void {
  const map = {
    nombre: document.querySelector<HTMLElement>('[data-err-nombre]'),
    apellido: document.querySelector<HTMLElement>('[data-err-apellido]'),
    edad: document.querySelector<HTMLElement>('[data-err-edad]'),
    email: document.querySelector<HTMLElement>('[data-err-email]'),
  };
  const el = map[key];
  if (el) {
    el.textContent = msg;
    el.hidden = false;
  }
}

function clearErr(key: 'nombre' | 'apellido' | 'edad' | 'email'): void {
  const map = {
    nombre: document.querySelector<HTMLElement>('[data-err-nombre]'),
    apellido: document.querySelector<HTMLElement>('[data-err-apellido]'),
    edad: document.querySelector<HTMLElement>('[data-err-edad]'),
    email: document.querySelector<HTMLElement>('[data-err-email]'),
  };
  const el = map[key];
  if (el) {
    el.textContent = '';
    el.hidden = true;
  }
}

function validateNombre(): boolean {
  const v = elNombre?.value.trim() ?? '';
  if (!v) {
    showErr('nombre', 'Completá tu nombre.');
    return false;
  }
  clearErr('nombre');
  return true;
}

function validateApellido(): boolean {
  const v = elApellido?.value.trim() ?? '';
  if (!v) {
    showErr('apellido', 'Completá tu apellido.');
    return false;
  }
  clearErr('apellido');
  return true;
}

function validateEdad(): boolean {
  const n = Number(elEdad?.value);
  if (!elEdad?.value || Number.isNaN(n) || n < 1 || n > 99) {
    showErr('edad', 'Ingresá una edad entre 1 y 99.');
    return false;
  }
  clearErr('edad');
  return true;
}

function validateEmail(): boolean {
  const v = elEmail?.value.trim() ?? '';
  if (!v) {
    showErr('email', 'Completá tu correo.');
    return false;
  }
  if (!EMAIL_RE.test(v)) {
    showErr('email', 'Ingresá un correo válido.');
    return false;
  }
  clearErr('email');
  return true;
}

function validateAll(): boolean {
  return validateNombre() && validateApellido() && validateEdad() && validateEmail() && Boolean(getSelectedSlug());
}

elNombre?.addEventListener('blur', validateNombre);
elApellido?.addEventListener('blur', validateApellido);
elEdad?.addEventListener('blur', validateEdad);
elEmail?.addEventListener('blur', validateEmail);

function fillModalSummary(): void {
  const dest = getSelectedDestination();
  const days = Number(diasSel?.value ?? 3);
  const tc = (elClase?.value ?? 'economica') as TicketClass;
  const meal = (elComida?.value ?? 'sin-comidas') as MealPlan;
  if (!dest || !modalSummary) return;
  const { totalARS } = computeTripTotal(dest, days, tc, meal);
  const usd = getDolarBlueVenta();
  const usdTxt =
    usd && usd > 0
      ? `USD ${(totalARS / usd).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`
      : 'USD pendiente de cotización';
  modalSummary.innerHTML = `
    <p class="modal-summary__p">${elNombre?.value} ${elApellido?.value}, reservaste <strong>${dest.name}</strong> por ${days} días.</p>
    <p class="modal-summary__total">Total: <strong>$${formatARS(totalARS)} ARS</strong> (${usdTxt}).</p>
    <p class="caption modal-summary__note">Te contactaremos al correo ${elEmail?.value}.</p>
  `;
}

function updateSummary(): void {
  const dest = getSelectedDestination();
  const days = Number(diasSel?.value ?? 3);
  const tc = (elClase?.value ?? 'economica') as TicketClass;
  const meal = (elComida?.value ?? 'sin-comidas') as MealPlan;
  if (!dest) {
    if (sumDest) sumDest.textContent = '—';
    if (sumStayDetail) sumStayDetail.textContent = '—';
    if (discountRow) discountRow.hidden = true;
    if (sumDiscountArs) sumDiscountArs.textContent = '—';
    if (sumSub) sumSub.textContent = '—';
    if (sumTotal) sumTotal.textContent = '—';
    if (sumUsd) sumUsd.textContent = '—';
    if (sumBlueRate) sumBlueRate.textContent = '';
    return;
  }
  const { subtotalARS, discountPct, totalARS } = computeTripTotal(dest, days, tc, meal);
  if (sumDest) sumDest.textContent = dest.name;
  if (sumStayDetail) {
    sumStayDetail.textContent = `${days} días · ${ticketClassLabel(tc)} · ${mealLabel(meal)}`;
  }
  if (sumSub) sumSub.textContent = `$${formatARS(subtotalARS)}`;
  const discountAmt = subtotalARS - totalARS;
  if (discountRow) discountRow.hidden = discountPct === 0;
  if (sumDiscountArs) {
    sumDiscountArs.textContent = discountPct > 0 ? `- $${formatARS(discountAmt)}` : '—';
  }
  if (sumTotal) sumTotal.textContent = `$${formatARS(totalARS)}`;
  const usd = getDolarBlueVenta();
  if (sumBlueRate) {
    if (usd && usd > 0) {
      sumBlueRate.textContent = `Blue: ${usd.toLocaleString('es-AR', { maximumFractionDigits: 2 })}`;
    } else {
      sumBlueRate.textContent = '';
    }
  }
  if (sumUsd) {
    if (usd && usd > 0) {
      sumUsd.textContent = `USD ${(totalARS / usd).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`;
    } else {
      sumUsd.innerHTML = '<span class="skeleton-text">cargando</span>';
    }
  }
  setLive(`Total estimado ${totalARS.toLocaleString('es-AR')} pesos argentinos`);
}

diasSel?.addEventListener('change', updateSummary);
elClase?.addEventListener('change', updateSummary);
elComida?.addEventListener('change', updateSummary);
destHost?.addEventListener('change', updateSummary);

void ensureBlueRate().then(() => {
  updateSummary();
});
window.addEventListener('viajaya-dolar', updateSummary);

updateSummary();

if (buyBtn && modal) {
  initModal(
    buyBtn,
    modal,
    () => {
      if (modalSummary) modalSummary.textContent = '';
    },
    () => {
      if (!validateAll()) return false;
      fillModalSummary();
      return true;
    },
  );
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
});
