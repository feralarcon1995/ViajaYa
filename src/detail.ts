import { initTheme, toggleTheme } from './modules/theme';
import { initFooterYear } from './modules/footer-year';
import { initNavbar } from './modules/navbar';
import { initDolar, getDolarBlueVenta } from './modules/dolar';
import { getCount, isSaved, save, remove } from './modules/reservation-store';
import { showToast } from './modules/toast';
import { fadeInUp } from './modules/animations';
import { getDestinationBySlug, type MealPlan, type Season, type TicketClass } from './data/destinations';
import { computeTripTotal, formatARS, ticketClassLabel, mealLabel } from './modules/pricing';
import { R } from './routes';

const SEASON_LABEL: Record<Season, string> = {
  verano: 'Verano',
  otoño: 'Otoño',
  invierno: 'Invierno',
  primavera: 'Primavera',
  'todo-el-año': 'Todo el año',
};

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

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

initTheme();
initFooterYear();
initNavbar();
updateBadge();
window.addEventListener('viajaya-reservations', updateBadge);
document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => toggleTheme());

const slug = new URLSearchParams(window.location.search).get('slug') ?? '';
const dest = getDestinationBySlug(slug);
const root = document.querySelector<HTMLElement>('[data-detail-root]');
const notFound = document.querySelector<HTMLElement>('[data-not-found]');

if (!dest || !root) {
  notFound?.removeAttribute('hidden');
} else {
  const d = dest;
  notFound?.remove();
  const daysOptions = Array.from({ length: d.maxDays - d.minDays + 1 }, (_, i) => {
    const days = d.minDays + i;
    return `<option value="${days}">${days} días</option>`;
  }).join('');

  const classOpts = (Object.keys(d.ticketMultipliers) as TicketClass[])
    .map((k) => `<option value="${k}">${ticketClassLabel(k)}</option>`)
    .join('');
  const mealOpts = (Object.keys(d.mealAddons) as MealPlan[])
    .map((k) => `<option value="${k}">${mealLabel(k)}</option>`)
    .join('');

  const pi = d.practicalInfo;
  const seasons = pi.bestSeason.map((s) => SEASON_LABEL[s]).join(', ');
  const visaShort = pi.visaRequired ? esc(pi.visaNote) : esc('No requerida (turismo)');

  const itineraryHtml = d.itinerary
    .map(
      (it) => `
    <li class="detail-page__timeline-item">
      <span class="detail-page__timeline-dot" aria-hidden="true"></span>
      <span class="detail-page__timeline-day">Día ${String(it.day).padStart(2, '0')}</span>
      <h4 class="detail-page__timeline-title">${esc(it.title)}</h4>
      <p class="detail-page__timeline-desc">${esc(it.description)}</p>
    </li>`,
    )
    .join('');

  const longParas = d.longDescription.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const firstLong = longParas[0] ?? '';
  const restLongHtml = longParas.slice(1).map((p) => `<p class="detail-page__prose">${esc(p)}</p>`).join('');

  const headlineHtml =
    d.description.length > 160
      ? `<p class="detail-page__lede">${esc(d.description)}</p>`
      : `<h2 class="detail-page__headline">${esc(d.description)}</h2>`;

  const gImgs = d.gallery.length ? d.gallery : [d.image];
  const gi0 = gImgs[0];
  const gi1 = gImgs[1] ?? gImgs[0];
  const gi2 = gImgs[2] ?? gImgs[1] ?? gImgs[0];
  const gc0 = d.highlights[0] ? esc(d.highlights[0]) : esc(`${d.name} · 1`);
  const gc1 = d.highlights[1] ? esc(d.highlights[1]) : esc(`${d.name} · 2`);
  const gc2 = d.highlights[2] ? esc(d.highlights[2]) : esc(`${d.name} · 3`);

  const includedAside = d.included
    .slice(0, 6)
    .map(
      (x) => `
    <li>
      <span class="material-symbols-outlined" aria-hidden="true">check_circle</span>
      <span>${esc(x)}</span>
    </li>`,
    )
    .join('');

  const imperdiblesList = d.highlights.map((h) => `<li>${esc(h)}</li>`).join('');
  const notInclList = d.notIncluded.map((x) => `<li>${esc(x)}</li>`).join('');
  const tipsList = d.tips.map((t) => `<li>${esc(t)}</li>`).join('');

  const quoteHref = `${R.quote}?slug=${encodeURIComponent(d.slug)}`;

  root.innerHTML = `
    <section class="detail-page__hero">
      <img class="detail-page__hero-img" src="${d.image}" alt="${esc(`Panorama de ${d.name}`)}" width="1600" height="900" />
      <div class="detail-page__hero-gradient">
        <div class="detail-page__hero-inner">
          <nav class="detail-page__breadcrumb" aria-label="Migas de pan">
            <a href="${R.home}">Inicio</a> › <a href="${R.destinations}">Destinos</a> › <span>${esc(d.name)}</span>
          </nav>
          <h1 class="detail-page__title">${esc(d.name)}</h1>
          <p class="detail-page__tagline">${esc(d.tagline)}</p>
          <p class="detail-page__hero-meta">${esc(d.region)}, ${esc(d.country)} · ${esc(d.continent)} · ★ ${d.rating.toFixed(1)} (${d.reviewCount} opiniones)</p>
        </div>
      </div>
    </section>
    <div class="detail-page__body" data-detail-main>
      <div class="detail-page__grid">
        <div class="detail-page__main-col">
          <div>
            ${headlineHtml}
            <div class="detail-page__dropcap">${esc(firstLong)}</div>
            ${restLongHtml}
          </div>
          <div class="detail-page__extras">
            <h3>Imperdibles</h3>
            <ul>${imperdiblesList}</ul>
          </div>
          <div class="detail-page__gallery">
            <div class="detail-page__gallery-col">
              <figure class="detail-page__gallery-figure detail-page__gallery-figure--tall">
                <img src="${gi0}" alt="${gc0}" width="800" height="1066" loading="lazy" />
                <figcaption class="detail-page__gallery-cap">${gc0}</figcaption>
              </figure>
              <div class="detail-page__pullquote">
                <span class="material-symbols-outlined" aria-hidden="true">format_quote</span>
                <p>«${esc(d.tagline)}»</p>
              </div>
            </div>
            <div class="detail-page__gallery-col detail-page__gallery-col--offset">
              <figure class="detail-page__gallery-figure detail-page__gallery-figure--square">
                <img src="${gi1}" alt="${gc1}" width="800" height="800" loading="lazy" />
                <figcaption class="detail-page__gallery-cap">${gc1}</figcaption>
              </figure>
              <figure class="detail-page__gallery-figure detail-page__gallery-figure--portrait">
                <img src="${gi2}" alt="${gc2}" width="800" height="1000" loading="lazy" />
                <figcaption class="detail-page__gallery-cap">${gc2}</figcaption>
              </figure>
            </div>
          </div>
          <div>
            <h3 class="detail-page__section-title">Itinerario sugerido</h3>
            <div class="detail-page__timeline-wrap">
              <div class="detail-page__timeline-line" aria-hidden="true"></div>
              <ul class="detail-page__timeline">${itineraryHtml}</ul>
            </div>
          </div>
          <div class="detail-page__practical">
            <div class="detail-page__practical-item">
              <span class="material-symbols-outlined" aria-hidden="true">description</span>
              <h4>Visa</h4>
              <p>${visaShort}</p>
            </div>
            <div class="detail-page__practical-item">
              <span class="material-symbols-outlined" aria-hidden="true">payments</span>
              <h4>Moneda</h4>
              <p>${esc(pi.currency)}</p>
            </div>
            <div class="detail-page__practical-item">
              <span class="material-symbols-outlined" aria-hidden="true">thermostat</span>
              <h4>Clima</h4>
              <p>${esc(pi.tipicalTemp)}</p>
            </div>
            <div class="detail-page__practical-item">
              <span class="material-symbols-outlined" aria-hidden="true">translate</span>
              <h4>Idioma</h4>
              <p>${esc(pi.language)}</p>
            </div>
          </div>
          <div class="detail-page__extras">
            <h3>Mejor época</h3>
            <p class="detail-page__prose detail-page__prose--flush">${esc(seasons)} · ${esc(pi.climate)}</p>
            <h3>No incluye</h3>
            <ul>${notInclList}</ul>
            <h3>Tips locales</h3>
            <ul>${tipsList}</ul>
          </div>
          <div class="detail-page__map-wrap">
            <h2>Ubicación</h2>
            <iframe
              class="detail-page__map"
              title="Mapa de ${esc(d.name)}"
              src="${d.mapEmbed}"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
          </div>
          <section class="detail-page__dolar">
            <h2>Referencia cambiaria</h2>
            <div data-dolar-panel></div>
          </section>
        </div>
        <aside class="detail-page__sidebar" data-detail-pricing>
          <div class="detail-page__calc">
            <h3>Cotizador de viaje</h3>
            <div class="detail-page__calc-row">
              <span>Tarifa base / día</span>
              <span>$${formatARS(d.pricePerDay)}</span>
            </div>
            <div class="detail-page__field">
              <label for="calc-days">Estadía</label>
              <select id="calc-days" class="select" data-calc-days>${daysOptions}</select>
            </div>
            <div class="detail-page__field">
              <label for="calc-class">Clase de vuelo</label>
              <select id="calc-class" class="select" data-calc-class>${classOpts}</select>
            </div>
            <div class="detail-page__field">
              <label for="calc-meal">Plan de comidas</label>
              <select id="calc-meal" class="select" data-calc-meal>${mealOpts}</select>
            </div>
            <div class="detail-page__calc-row">
              <span>Subtotal estimado</span>
              <span data-out-sub>$0</span>
            </div>
            <p class="detail-page__discount" data-discount hidden></p>
            <div class="detail-page__calc-total">
              <div class="detail-page__calc-total-head">
                <span>Inversión total</span>
              </div>
              <div class="detail-page__calc-total-values">
                <p class="detail-page__calc-ars" data-out-ars>$0</p>
                <p class="detail-page__calc-usd" data-out-usd><span class="skeleton-text" data-usd-skel>cargando</span></p>
              </div>
            </div>
            <button type="button" class="detail-page__cta" data-save-trip>Reservar experiencia</button>
            <a href="${quoteHref}" class="detail-page__cta--secondary">Cotización completa</a>
            <p class="detail-page__calc-note">Precios sujetos a disponibilidad y tasa de cambio del día.</p>
          </div>
          <div class="detail-page__included">
            <h4>Servicios incluidos</h4>
            <ul>${includedAside}</ul>
          </div>
        </aside>
      </div>
    </div>
  `;

  document.title = `ViajaYa — ${d.name}`;

  const panel = root.querySelector<HTMLElement>('[data-dolar-panel]');
  const tpl = document.getElementById('tpl-dolar') as HTMLTemplateElement | null;
  if (panel && tpl) {
    panel.appendChild(tpl.content.cloneNode(true));
  }
  void initDolar().then(() => {
    recalc();
  });

  const daysEl = root.querySelector<HTMLSelectElement>('[data-calc-days]');
  const classEl = root.querySelector<HTMLSelectElement>('[data-calc-class]');
  const mealEl = root.querySelector<HTMLSelectElement>('[data-calc-meal]');
  const outSub = root.querySelector<HTMLElement>('[data-out-sub]');
  const outArs = root.querySelector<HTMLElement>('[data-out-ars]');
  const outUsd = root.querySelector<HTMLElement>('[data-out-usd]');
  const discEl = root.querySelector<HTMLElement>('[data-discount]');
  const saveBtn = root.querySelector<HTMLButtonElement>('[data-save-trip]');

  function recalc(): void {
    const days = Number(daysEl?.value ?? d.minDays);
    const tc = (classEl?.value ?? 'economica') as TicketClass;
    const meal = (mealEl?.value ?? 'sin-comidas') as MealPlan;
    const { subtotalARS, discountPct, totalARS } = computeTripTotal(d, days, tc, meal);
    if (outSub) outSub.textContent = `$${formatARS(subtotalARS)}`;
    if (outArs) outArs.textContent = `$${formatARS(totalARS)}`;
    if (discEl) {
      if (discountPct > 0) {
        discEl.hidden = false;
        discEl.textContent = `Bonificación larga estadía: ${discountPct}%`;
      } else {
        discEl.hidden = true;
      }
    }
    const usd = getDolarBlueVenta();
    if (usd && usd > 0) {
      const usdTotal = totalARS / usd;
      if (outUsd) {
        outUsd.textContent = `USD ${usdTotal.toLocaleString('es-AR', { maximumFractionDigits: 0 })} (blue)`;
      }
    } else if (outUsd) {
      outUsd.innerHTML = '<span class="skeleton-text" data-usd-skel>esperando cotización</span>';
    }
    setLive(`Total estimado ${totalARS.toLocaleString('es-AR')} pesos argentinos`);
  }

  daysEl?.addEventListener('change', recalc);
  classEl?.addEventListener('change', recalc);
  mealEl?.addEventListener('change', recalc);

  function syncSaveBtn(): void {
    if (!saveBtn) return;
    const saved = isSaved(d.slug);
    saveBtn.textContent = saved ? 'Quitar de mi lista' : 'Reservar experiencia';
    saveBtn.classList.toggle('detail-page__cta--danger', saved);
  }

  syncSaveBtn();
  saveBtn?.addEventListener('click', () => {
    const days = Number(daysEl?.value ?? d.minDays);
    const tc = (classEl?.value ?? 'economica') as TicketClass;
    const meal = (mealEl?.value ?? 'sin-comidas') as MealPlan;
    const { totalARS } = computeTripTotal(d, days, tc, meal);
    if (isSaved(d.slug)) {
      remove(d.slug);
      showToast(`${d.name} eliminado de tus viajes`, 'neutral');
    } else {
      save({
        id: d.slug,
        name: d.name,
        region: d.region,
        days,
        ticketClass: ticketClassLabel(tc),
        meal: mealLabel(meal),
        totalARS,
        image: d.image,
        savedAt: Date.now(),
      });
      showToast(`${d.name} guardado en tus viajes`, 'success');
    }
    syncSaveBtn();
    updateBadge();
  });

  window.addEventListener('viajaya-dolar', recalc);

  fadeInUp('[data-detail-main]');
  fadeInUp('[data-detail-pricing]', 0.12);
}
