import type { Destination } from '../data/destinations';
import { getDestinationBySlug } from '../data/destinations';
import { R } from '../routes';

export const HOME_HERO_SLUG = 'bariloche';

export const HOME_EDITORIAL_SLUGS: readonly string[] = ['miami', 'rio-de-janeiro', 'vina-del-mar'];

function formatPricePerDay(d: Destination): string {
  return `Desde $${d.pricePerDay.toLocaleString('es-AR')} ARS/día`;
}

function formatPriceShort(d: Destination): string {
  return `Desde $${d.pricePerDay.toLocaleString('es-AR')}`;
}

function truncateDesc(text: string, max = 320): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const i = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf(' '));
  return `${(i > 120 ? cut.slice(0, i + 1) : cut).trim()}…`;
}

function createIcon(name: string): HTMLSpanElement {
  const s = document.createElement('span');
  s.className = 'material-symbols-outlined';
  s.setAttribute('aria-hidden', 'true');
  s.textContent = name;
  return s;
}

function renderFeature(dest: Destination): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'home-editorial__feature';

  const visual = document.createElement('div');
  visual.className = 'home-editorial__feature-visual';

  const frame = document.createElement('div');
  frame.className = 'home-editorial__frame';

  const img = document.createElement('img');
  img.className = 'home-editorial__feature-img';
  img.src = dest.image;
  img.alt = `Vista de ${dest.name}`;
  img.width = 1200;
  img.height = 750;
  img.loading = 'lazy';

  const shade = document.createElement('div');
  shade.className = 'home-editorial__frame-shade';
  shade.setAttribute('aria-hidden', 'true');

  frame.append(img, shade);

  const save = document.createElement('button');
  save.type = 'button';
  save.className = 'home-editorial__save';
  save.dataset.homeSave = dest.slug;
  save.setAttribute('aria-label', `Guardar ${dest.name} en mis viajes`);
  save.setAttribute('aria-pressed', 'false');
  save.appendChild(createIcon('bookmark'));

  visual.append(frame, save);

  const aside = document.createElement('div');
  aside.className = 'home-editorial__feature-aside';

  const card = document.createElement('div');
  card.className = 'home-editorial__card';

  const region = document.createElement('span');
  region.className = 'home-editorial__region';
  region.textContent = `${dest.region} · ${dest.country}`;

  const name = document.createElement('h3');
  name.className = 'home-editorial__name';
  name.textContent = dest.name;

  const desc = document.createElement('p');
  desc.className = 'home-editorial__desc';
  desc.textContent = truncateDesc(dest.description);

  const meta = document.createElement('div');
  meta.className = 'home-editorial__meta';

  const metaInner = document.createElement('div');
  const metaLabel = document.createElement('span');
  metaLabel.className = 'home-editorial__meta-label';
  metaLabel.textContent = 'Inversión estimada';
  const metaPrice = document.createElement('span');
  metaPrice.className = 'home-editorial__meta-price';
  metaPrice.textContent = formatPricePerDay(dest);
  metaInner.append(metaLabel, metaPrice);

  const iconLink = document.createElement('a');
  iconLink.className = 'home-editorial__icon-link';
  iconLink.href = R.detail(dest.slug);
  iconLink.setAttribute('aria-label', `Ver detalle de ${dest.name}`);
  iconLink.appendChild(createIcon('arrow_outward'));

  meta.append(metaInner, iconLink);
  card.append(region, name, desc, meta);
  aside.appendChild(card);

  wrap.append(visual, aside);
  return wrap;
}

function renderThumbCard(dest: Destination, offset: boolean): HTMLElement {
  const col = document.createElement('div');
  col.className = offset ? 'home-editorial__col home-editorial__col--offset' : 'home-editorial__col';

  const thumb = document.createElement('div');
  thumb.className = 'home-editorial__thumb';

  const img = document.createElement('img');
  img.className = 'home-editorial__thumb-img';
  img.src = dest.image;
  img.alt = `Vista de ${dest.name}`;
  img.width = 800;
  img.height = 1000;
  img.loading = 'lazy';

  const tint = document.createElement('div');
  tint.className = 'home-editorial__thumb-tint';
  tint.setAttribute('aria-hidden', 'true');

  const save = document.createElement('button');
  save.type = 'button';
  save.className = 'home-editorial__save home-editorial__save--sm';
  save.dataset.homeSave = dest.slug;
  save.setAttribute('aria-label', `Guardar ${dest.name} en mis viajes`);
  save.setAttribute('aria-pressed', 'false');
  save.appendChild(createIcon('bookmark'));

  thumb.append(img, tint, save);

  const body = document.createElement('div');

  const rowHead = document.createElement('div');
  rowHead.className = 'home-editorial__row-head';

  const left = document.createElement('div');
  const place = document.createElement('span');
  place.className = 'home-editorial__place';
  place.textContent = `${dest.region} · ${dest.country}`;
  const subtitle = document.createElement('h3');
  subtitle.className = 'home-editorial__subtitle';
  subtitle.textContent = dest.name;
  left.append(place, subtitle);

  const priceTag = document.createElement('span');
  priceTag.className = 'home-editorial__price-tag';
  priceTag.textContent = formatPriceShort(dest);

  rowHead.append(left, priceTag);

  const excerpt = document.createElement('p');
  excerpt.className = 'home-editorial__excerpt';
  excerpt.textContent = dest.tagline;

  const link = document.createElement('a');
  link.className = 'home-editorial__text-link';
  link.href = R.detail(dest.slug);
  link.textContent = 'Ver detalle';

  body.append(rowHead, excerpt, link);
  col.append(thumb, body);
  return col;
}

export function mountHomeEditorial(root: HTMLElement | null): void {
  if (!root) return;
  const resolved: Destination[] = [];
  for (const slug of HOME_EDITORIAL_SLUGS) {
    const d = getDestinationBySlug(slug);
    if (d) resolved.push(d);
  }
  const [primary, second, third] = resolved;
  if (!primary || !second || !third) return;

  root.replaceChildren();
  root.appendChild(renderFeature(primary));

  const grid = document.createElement('div');
  grid.className = 'home-editorial__grid';
  grid.append(renderThumbCard(second, false), renderThumbCard(third, true));
  root.appendChild(grid);
}

export function setHomeHeroMedia(img: HTMLImageElement | null, slug: string = HOME_HERO_SLUG): void {
  const d = getDestinationBySlug(slug);
  if (!d || !img) return;
  img.src = d.image;
  img.alt = `Vista de ${d.name}`;
}
