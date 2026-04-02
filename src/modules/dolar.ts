interface DolarRate {
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
}

const API_URL = 'https://dolarapi.com/v1/dolares';

let cachedBlueVenta: number | null = null;

function formatArs(n: number): string {
  return `$${n.toLocaleString('es-AR', { maximumFractionDigits: 2 })}`;
}

function cardSkeleton(slug: string, label: string): string {
  return `
    <article class="dolar-card dolar-card--loading" data-dolar-card data-dolar="${slug}">
      <p class="dolar-card__title">${label}</p>
      <div class="dolar-card__skeleton"></div>
      <div class="dolar-card__skeleton dolar-card__skeleton--short"></div>
    </article>
  `;
}

function defaultPanelHtml(): string {
  return `
    <div class="dolar-grid">
      ${cardSkeleton('oficial', 'Dólar oficial')}
      ${cardSkeleton('blue', 'Dólar blue')}
      ${cardSkeleton('bolsa', 'Dólar MEP')}
    </div>
  `;
}

function fillRates(rates: DolarRate[]): void {
  const targets: { slug: string; match: (r: DolarRate) => boolean; label: string }[] = [
    { slug: 'oficial', match: (r) => r.casa === 'oficial', label: 'Dólar oficial' },
    { slug: 'blue', match: (r) => r.casa === 'blue', label: 'Dólar blue' },
    { slug: 'bolsa', match: (r) => r.casa === 'bolsa', label: 'Dólar MEP' },
  ];
  targets.forEach(({ slug, match, label }) => {
    const rate = rates.find(match);
    const host = document.querySelector<HTMLElement>(`[data-dolar="${slug}"]`);
    if (!rate || !host) return;
    host.classList.remove('dolar-card--loading');
    host.innerHTML = `
      <p class="dolar-card__title">${label}</p>
      <div class="dolar-card__row"><span>Compra</span><span data-compra>${formatArs(rate.compra)}</span></div>
      <div class="dolar-card__row"><span>Venta</span><span data-venta>${formatArs(rate.venta)}</span></div>
    `;
    if (slug === 'blue') {
      cachedBlueVenta = rate.venta;
      host.setAttribute('data-blue-venta', String(rate.venta));
    }
  });
  window.dispatchEvent(new CustomEvent('viajaya-dolar'));
}

export async function ensureBlueRate(): Promise<number | null> {
  if (cachedBlueVenta !== null) return cachedBlueVenta;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('err');
    const rates = (await res.json()) as DolarRate[];
    const blue = rates.find((r) => r.casa === 'blue');
    if (blue) {
      cachedBlueVenta = blue.venta;
      window.dispatchEvent(new CustomEvent('viajaya-dolar'));
      return blue.venta;
    }
  } catch {
    return null;
  }
  return null;
}

export async function initDolar(): Promise<void> {
  const panel = document.querySelector<HTMLElement>('[data-dolar-panel]');
  if (!panel) return;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('err');
    const rates = (await res.json()) as DolarRate[];
    if (!panel.querySelector('[data-dolar]')) {
      panel.innerHTML = defaultPanelHtml();
    }
    fillRates(rates);
  } catch {
    panel.innerHTML = `
      <div class="dolar-card dolar-card--error" data-dolar-card>
        <p class="dolar-card__error-msg">Cotizaciones no disponibles</p>
        <button type="button" class="btn btn--ghost btn--sm" data-dolar-retry>Reintentar</button>
      </div>
    `;
    panel.querySelector('[data-dolar-retry]')?.addEventListener('click', () => {
      const tpl = document.getElementById('tpl-dolar') as HTMLTemplateElement | null;
      if (tpl?.content) {
        panel.replaceChildren(tpl.content.cloneNode(true));
      } else {
        panel.innerHTML = defaultPanelHtml();
      }
      void initDolar();
    });
  }
}

export function getDolarBlueVenta(): number | null {
  if (cachedBlueVenta !== null) return cachedBlueVenta;
  const el = document.querySelector('[data-dolar="blue"]');
  const raw = el?.getAttribute('data-blue-venta');
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}
