# ViajaYa — Migration Prompt
### From: Bootstrap 5 + jQuery + Vanilla CSS → TypeScript + SCSS + Vite + GSAP

> Paste this document as a single brief into Cursor, Claude, or any AI coding tool to drive the full migration.

---

## 1. Context

**Project:** "ViajaYa" — a static multi-page travel quoter for an Argentine audience.  
**Goal:** Migrate from Bootstrap 5 (CDN) + jQuery + vanilla CSS to a fully modern, maintainable frontend stack — without introducing a JS framework (no React, no Vue). Output must be a progressively enhanced multi-page static site built and served with Vite.

**Live pages:**

| File | Purpose |
|---|---|
| `index.html` | Home: hero, featured destinations, dollar widget, footer |
| `destinations.html` | Full 9-destination grid with filter bar |
| `detail.html` | Single destination: gallery, description, pricing calculator |
| `reservations.html` | Saved trips list, empty state, delete + confirm |
| `quote.html` | Full quote form + live price summary + buy modal |
| `contact.html` | Standalone contact form |

---

## 2. Target Stack

| Layer | Technology |
|---|---|
| Build tool | Vite (latest stable) |
| Language | TypeScript — `strict: true` |
| Styles | SCSS (modular partials) + CSS custom properties for theming |
| Animations | GSAP 3 with ScrollTrigger plugin |
| Toasts | Sonner (`sonner` npm package) |
| HTTP | Fetch API — no jQuery, no Axios |
| Layout | CSS Grid + Flexbox — no Bootstrap, no Tailwind |
| Icons | Material Symbols Outlined (loaded via Google Fonts `<link>`) |
| Fonts | Newsreader (display) + Inter (body) via Google Fonts |

---

## 3. Project Structure

```
viajaya/
├── index.html
├── destinations.html
├── detail.html
├── reservations.html
├── quote.html
├── contact.html
│
├── src/
│   ├── main.ts                  # Entry → index.html
│   ├── destinations.ts          # Entry → destinations.html
│   ├── detail.ts                # Entry → detail.html
│   ├── reservations.ts          # Entry → reservations.html
│   ├── quote.ts                 # Entry → quote.html
│   ├── contact.ts               # Entry → contact.html
│   │
│   ├── data/
│   │   └── destinations.ts      # All 9 destinations — fully typed, hardcoded
│   │
│   ├── modules/
│   │   ├── theme.ts             # Light/dark toggle, localStorage, prefers-color-scheme
│   │   ├── navbar.ts            # Scroll styling, hamburger drawer, focus trap, Escape key
│   │   ├── dolar.ts             # Fetch Dolarsi API, loading skeletons, error + retry
│   │   ├── reservations.ts      # localStorage CRUD — typed, no duplicates, sync on delete
│   │   ├── modal.ts             # Accessible modal: focus trap, Escape, aria-modal, return focus
│   │   ├── toast.ts             # Sonner wrapper — typed variants: success, danger, neutral
│   │   └── animations.ts        # GSAP init, ScrollTrigger, reusable stagger/fade helpers
│   │
│   └── styles/
│       ├── _tokens.scss         # CSS custom properties: light + dark
│       ├── _reset.scss          # Minimal reset (box-sizing, margins, focus)
│       ├── _typography.scss     # Type scale + font declarations
│       ├── _layout.scss         # Containers, grid utilities, spacing scale
│       ├── _components.scss     # Cards, buttons, inputs, badges, tags
│       ├── _navbar.scss         # Header, drawer, scroll states
│       ├── _hero.scss           # Hero section
│       ├── _modal.scss          # Modal + overlay
│       ├── _toast.scss          # Sonner overrides if needed
│       ├── _animations.scss     # Keyframes, prefers-reduced-motion guard
│       └── main.scss            # @use imports all partials
│
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Design Tokens (`_tokens.scss`)

Define every value as a CSS custom property. No hardcoded colors anywhere else in the codebase.

```scss
:root {
  /* Backgrounds */
  --color-bg:              #f8f9fa;
  --color-surface:         #ffffff;
  --color-surface-raised:  #f0f2f4;

  /* Borders */
  --color-border:          rgba(25, 28, 29, 0.10);
  --color-border-strong:   rgba(25, 28, 29, 0.20);

  /* Accent — deep navy */
  --color-accent:          #041627;
  --color-accent-hover:    #1a2b3c;
  --color-accent-dim:      #b7c8de;  /* For icons, secondary accents */

  /* Text */
  --color-text-primary:    #191c1d;
  --color-text-secondary:  #44474c;
  --color-text-on-accent:  #ffffff;

  /* Semantic */
  --color-danger:          #ba1a1a;
  --color-danger-surface:  #ffdad6;
  --color-success:         #1a6b3a;
  --color-success-surface: #d4edda;

  /* Spacing — 8pt base grid */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;
  --space-3xl: 96px;

  /* Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-pill: 999px;

  /* Elevation */
  --shadow-sm: 0 1px 3px rgba(25,28,29,0.08), 0 1px 2px rgba(25,28,29,0.04);
  --shadow-md: 0 20px 40px rgba(25,28,29,0.08), 0 4px 12px rgba(25,28,29,0.04);

  /* Typography */
  --font-display: 'Newsreader', serif;
  --font-body:    'Inter', sans-serif;

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow:   500ms ease;
}

[data-theme="dark"] {
  --color-bg:              #05101a;
  --color-surface:         #0d1f2d;
  --color-surface-raised:  #152536;
  --color-border:          rgba(183, 200, 222, 0.10);
  --color-border-strong:   rgba(183, 200, 222, 0.20);
  --color-accent:          #b7c8de;
  --color-accent-hover:    #d2e4fb;
  --color-accent-dim:      #4f6073;
  --color-text-primary:    #e8ecf0;
  --color-text-secondary:  #8fa3b8;
  --color-text-on-accent:  #041627;
  --color-danger:          #ffb4ab;
  --color-danger-surface:  #93000a;
  --color-success:         #7dd4a0;
  --color-success-surface: #0d3320;
}
```

**Rules:**
- Never use hex colors or hardcoded values outside `_tokens.scss`
- Always use `var(--token-name)` in all other SCSS partials
- Test every text/background pairing mentally: body text ≥ 4.5:1, large text ≥ 3:1 (WCAG AA)

---

## 5. Typography Scale (`_typography.scss`)

```scss
// Display — Newsreader, serif, italic
.text-display {
  font-family: var(--font-display);
  font-style:  italic;
  font-size:   clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.02em;
}

// Headings
h1 { font-size: clamp(2rem, 4vw, 3.5rem);   font-weight: 700; line-height: 1.1; }
h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 700; line-height: 1.2; }
h3 { font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 600; line-height: 1.3; }

// Body
body    { font-family: var(--font-body); font-size: 1rem; line-height: 1.7; }
.small  { font-size: 0.875rem; }
.caption { font-size: 0.75rem; letter-spacing: 0.02em; }
.label   { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }
```

---

## 6. Data Layer (`src/data/destinations.ts`)

Define all destination data as a typed constant. This is the single source of truth across all pages.

```typescript
export type DestinationCategory = 'beach' | 'city' | 'nature' | 'culture';

export interface Destination {
  id:          string;
  slug:        string;
  name:        string;
  region:      string;
  country:     string;
  categories:  DestinationCategory[];
  tagline:     string;
  description: string;          // 2–3 sentences for detail page
  highlights:  string[];        // 4 bullet points
  included:    string[];        // What's in the package
  pricePerDay: number;          // ARS
  minDays:     number;
  maxDays:     number;
  image:       string;          // Path to /public/images/{slug}.jpg
  gallery:     string[];        // 3 additional image paths
}

export const destinations: Destination[] = [
  {
    id:          '1',
    slug:        'miami',
    name:        'Miami',
    region:      'Florida',
    country:     'Estados Unidos',
    categories:  ['beach', 'city'],
    tagline:     'Sol, diseño y la energía que nunca duerme.',
    description: 'Miami es la ciudad donde el lujo se mezcla con la cultura latina. South Beach, el Art Deco District y Wynwood Walls conviven con playas de arena blanca y una gastronomía que no tiene comparación.',
    highlights:  ['South Beach y Ocean Drive', 'Art Basel y Wynwood Walls', 'Little Havana y gastronomía latina', 'Everglades day trip'],
    included:    ['Vuelo directo desde EZE', 'Hotel 4 estrellas frente al mar', 'Traslados aeropuerto', 'City pass turístico'],
    pricePerDay: 180000,
    minDays:     3,
    maxDays:     14,
    image:       '/images/miami.jpg',
    gallery:     ['/images/miami-2.jpg', '/images/miami-3.jpg', '/images/miami-4.jpg'],
  },
  {
    id:          '2',
    slug:        'las-vegas',
    name:        'Las Vegas',
    region:      'Nevada',
    country:     'Estados Unidos',
    categories:  ['city'],
    tagline:     'La capital del entretenimiento sin límites.',
    description: 'Las Vegas es más que casinos. El Strip de noche, los shows de Broadway, la gastronomía de chefs con estrella Michelin y la cercanía al Gran Cañón hacen de este destino una experiencia irrepetible.',
    highlights:  ['The Strip y casinos icónicos', 'Shows de Cirque du Soleil', 'Excursión al Gran Cañón', 'Restaurantes de chefs estrella'],
    included:    ['Vuelo con escala', 'Hotel en The Strip', 'Traslados', 'Welcome package ViajaYa'],
    pricePerDay: 210000,
    minDays:     3,
    maxDays:     10,
    image:       '/images/las-vegas.jpg',
    gallery:     ['/images/las-vegas-2.jpg', '/images/las-vegas-3.jpg', '/images/las-vegas-4.jpg'],
  },
  {
    id:          '3',
    slug:        'rio-de-janeiro',
    name:        'Río de Janeiro',
    region:      'Río de Janeiro',
    country:     'Brasil',
    categories:  ['beach', 'culture', 'city'],
    tagline:     'La cidade maravilhosa que enamora a primera vista.',
    description: 'Río de Janeiro es única: el Cristo Redentor sobre el Pan de Azúcar, Copacabana e Ipanema a sus pies, y la energía del samba que impregna cada rincón. Un destino que te cambia.',
    highlights:  ['Cristo Redentor y Pan de Azúcar', 'Playas de Copacabana e Ipanema', 'Barrio de Santa Teresa', 'Carnaval (temporada)'],
    included:    ['Vuelo directo desde EZE', 'Hotel boutique en Ipanema', 'Traslados', 'Tour panorámico'],
    pricePerDay: 95000,
    minDays:     5,
    maxDays:     14,
    image:       '/images/rio.jpg',
    gallery:     ['/images/rio-2.jpg', '/images/rio-3.jpg', '/images/rio-4.jpg'],
  },
  {
    id:          '4',
    slug:        'buzios',
    name:        'Búzios',
    region:      'Río de Janeiro',
    country:     'Brasil',
    categories:  ['beach', 'nature'],
    tagline:     'La perla del Atlántico, íntima y sin apuros.',
    description: 'Búzios es la respuesta cuando se quiere playa con estilo. Con más de 20 playas escondidas entre rocas y arena fina, Rua das Pedras y una atmósfera que invita a desacelerar.',
    highlights:  ['Playa João Fernandes', 'Rua das Pedras al atardecer', 'Navegación por las 23 playas', 'Gastronomía de mar'],
    included:    ['Vuelo + transfer en van premium', 'Pousada 4 estrellas', 'Desayuno diario', 'Paseo en escuna'],
    pricePerDay: 85000,
    minDays:     4,
    maxDays:     12,
    image:       '/images/buzios.jpg',
    gallery:     ['/images/buzios-2.jpg', '/images/buzios-3.jpg', '/images/buzios-4.jpg'],
  },
  {
    id:          '5',
    slug:        'vina-del-mar',
    name:        'Viña del Mar',
    region:      'Valparaíso',
    country:     'Chile',
    categories:  ['beach', 'city'],
    tagline:     'La ciudad jardín donde el Pacífico marca el ritmo.',
    description: 'Viña del Mar es la ciudad balneario más clásica de Sudamérica. Casino, festival de música, jardines exuberantes y el cerro de Valparaíso a metros: un destino que combina cultura y playa.',
    highlights:  ['Playa de Viña y Reñaca', 'Festival Internacional de la Canción', 'Cerros de Valparaíso', 'Casino Municipal'],
    included:    ['Vuelo + traslado', 'Hotel frente al mar', 'City tour', 'Excursión a Valparaíso'],
    pricePerDay: 72000,
    minDays:     3,
    maxDays:     10,
    image:       '/images/vina.jpg',
    gallery:     ['/images/vina-2.jpg', '/images/vina-3.jpg', '/images/vina-4.jpg'],
  },
  {
    id:          '6',
    slug:        'bariloche',
    name:        'Bariloche',
    region:      'Río Negro',
    country:     'Argentina',
    categories:  ['nature', 'culture'],
    tagline:     'La Suiza argentina entre lagos y montañas.',
    description: 'San Carlos de Bariloche ofrece lo mejor de la Patagonia andina: esquí en el Catedral, circuitos lacustres, chocolate artesanal y una arquitectura de madera y piedra que parece sacada de un cuento.',
    highlights:  ['Cerro Catedral (esquí y senderismo)', 'Circuito chico lacustre', 'Chocolate y cerveza artesanal', 'Trekking al Refugio Frey'],
    included:    ['Vuelo de cabotaje', 'Cabaña o hotel boutique', 'Traslados', 'Equipo de nieve (temporada)'],
    pricePerDay: 68000,
    minDays:     5,
    maxDays:     14,
    image:       '/images/bariloche.jpg',
    gallery:     ['/images/bariloche-2.jpg', '/images/bariloche-3.jpg', '/images/bariloche-4.jpg'],
  },
  {
    id:          '7',
    slug:        'maldivas',
    name:        'Islas Maldivas',
    region:      'Océano Índico',
    country:     'Maldivas',
    categories:  ['beach', 'nature'],
    tagline:     'El archipiélago donde el agua es el destino.',
    description: 'Las Maldivas son el epítome del paraíso tropical: atolones de arena blanca, lagunas turquesas, resorts de villas sobre el agua y la mayor biodiversidad marina del planeta. Un viaje para una vez en la vida.',
    highlights:  ['Villas suspendidas sobre el agua', 'Snorkel con tiburones ballena', 'Sandbank privado al atardecer', 'Spa con vistas al océano'],
    included:    ['Vuelo internacional con escala', 'Resort all-inclusive 5 estrellas', 'Hidroavión o lancha al resort', 'Actividades acuáticas'],
    pricePerDay: 420000,
    minDays:     5,
    maxDays:     14,
    image:       '/images/maldivas.jpg',
    gallery:     ['/images/maldivas-2.jpg', '/images/maldivas-3.jpg', '/images/maldivas-4.jpg'],
  },
  {
    id:          '8',
    slug:        'cancun',
    name:        'Cancún',
    region:      'Quintana Roo',
    country:     'México',
    categories:  ['beach', 'culture', 'city'],
    tagline:     'Mar Caribe, cenotes y la historia maya a tu alcance.',
    description: 'Cancún combina las playas más fotogénicas del Caribe con la profundidad cultural del mundo maya. Chichén Itzá, Tulum y Cobá están a pocas horas, mientras el Hotel Zone ofrece nightlife y gastronomía de primer nivel.',
    highlights:  ['Zona Hotelera y Playa Delfines', 'Chichén Itzá y Tulum', 'Cenotes de la Riviera Maya', 'Isla Mujeres en ferry'],
    included:    ['Vuelo directo desde EZE', 'Hotel todo incluido 4 estrellas', 'Traslados', 'Excursión a sitio maya'],
    pricePerDay: 155000,
    minDays:     5,
    maxDays:     14,
    image:       '/images/cancun.jpg',
    gallery:     ['/images/cancun-2.jpg', '/images/cancun-3.jpg', '/images/cancun-4.jpg'],
  },
  {
    id:          '9',
    slug:        'marbella',
    name:        'Marbella',
    region:      'Andalucía',
    country:     'España',
    categories:  ['beach', 'city', 'culture'],
    tagline:     'La Costa del Sol en su versión más glamorosa.',
    description: 'Marbella es la ciudad de la Costa del Sol donde confluyen el lujo, la historia árabe y el Mediterráneo. El Casco Antiguo, Puerto Banús y las playas de Nagüeles definen un destino sofisticado y accesible desde Buenos Aires con conexión en Madrid.',
    highlights:  ['Casco Antiguo y Plaza de los Naranjos', 'Puerto Banús', 'Playa de Nagüeles', 'Excursión a Ronda y Málaga'],
    included:    ['Vuelo con escala en Madrid', 'Hotel 4 estrellas frente al mar', 'Traslados', 'City pass Andalucía'],
    pricePerDay: 195000,
    minDays:     7,
    maxDays:     14,
    image:       '/images/marbella.jpg',
    gallery:     ['/images/marbella-2.jpg', '/images/marbella-3.jpg', '/images/marbella-4.jpg'],
  },
];
```

---

## 7. TypeScript Modules

### `src/modules/theme.ts`

```typescript
const STORAGE_KEY = 'viajaya-theme';
type Theme = 'light' | 'dark';

function getPreferred(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function initTheme(): void {
  apply(getPreferred());
}

export function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme') as Theme;
  apply(current === 'dark' ? 'light' : 'dark');
}
```

---

### `src/modules/navbar.ts`

```typescript
export function initNavbar(): void {
  const header  = document.querySelector<HTMLElement>('[data-navbar]')!;
  const trigger = document.querySelector<HTMLButtonElement>('[data-nav-trigger]')!;
  const drawer  = document.querySelector<HTMLElement>('[data-nav-drawer]')!;
  const overlay = document.querySelector<HTMLElement>('[data-nav-overlay]')!;

  // Scroll styling
  window.addEventListener('scroll', () => {
    header.classList.toggle('navbar--scrolled', window.scrollY > 40);
  }, { passive: true });

  // Drawer open/close
  function openDrawer(): void {
    drawer.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    trapFocus(drawer);
  }

  function closeDrawer(): void {
    drawer.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  }

  trigger.addEventListener('click', () => {
    const isOpen = drawer.getAttribute('aria-hidden') === 'false';
    isOpen ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') closeDrawer();
  });
}

function trapFocus(container: HTMLElement): void {
  const focusable = container.querySelectorAll<HTMLElement>(
    'a, button, input, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  first?.focus();

  container.addEventListener('keydown', function handler(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
    if (container.getAttribute('aria-hidden') === 'true') {
      container.removeEventListener('keydown', handler);
    }
  });
}
```

---

### `src/modules/dolar.ts`

```typescript
interface DolarRate {
  nombre: string;
  compra: string;
  venta:  string;
}

const API_URL = 'https://dolarapi.com/v1/dolares';

export async function initDolar(): Promise<void> {
  const containers = document.querySelectorAll<HTMLElement>('[data-dolar-card]');
  if (!containers.length) return;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API error');
    const rates: DolarRate[] = await res.json();

    const targets = ['oficial', 'blue', 'bolsa'];
    targets.forEach((slug) => {
      const rate = rates.find(r => r.nombre.toLowerCase().includes(slug));
      const el   = document.querySelector<HTMLElement>(`[data-dolar="${slug}"]`);
      if (!rate || !el) return;

      el.querySelector<HTMLElement>('[data-compra]')!.textContent = `$${rate.compra}`;
      el.querySelector<HTMLElement>('[data-venta]')!.textContent  = `$${rate.venta}`;
      el.classList.remove('dolar-card--loading');
    });
  } catch {
    containers.forEach(el => {
      el.classList.add('dolar-card--error');
      el.innerHTML = `
        <p class="dolar-card__error-msg">Cotizaciones no disponibles</p>
        <button class="btn btn--ghost btn--sm" data-dolar-retry>Reintentar</button>
      `;
    });
    document.querySelector('[data-dolar-retry]')?.addEventListener('click', () => initDolar());
  }
}

export function getDolarBlueVenta(): number | null {
  const el = document.querySelector<HTMLElement>('[data-dolar="blue"] [data-venta]');
  if (!el) return null;
  return parseFloat(el.textContent?.replace('$', '').replace(',', '.') ?? '0');
}
```

---

### `src/modules/reservations.ts`

```typescript
export interface Reservation {
  id:          string;  // destination slug
  name:        string;
  region:      string;
  days:        number;
  ticketClass: string;
  meal:        string;
  totalARS:    number;
  image:       string;
  savedAt:     number;  // Date.now()
}

const KEY = 'viajaya_reservations';

export function getAll(): Reservation[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function save(r: Reservation): void {
  const all = getAll().filter(x => x.id !== r.id); // prevent duplicates
  localStorage.setItem(KEY, JSON.stringify([...all, r]));
}

export function remove(id: string): void {
  const updated = getAll().filter(r => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function isSaved(id: string): boolean {
  return getAll().some(r => r.id === id);
}

export function getCount(): number {
  return getAll().length;
}
```

---

### `src/modules/modal.ts`

```typescript
export function initModal(
  openBtn: HTMLButtonElement,
  modal:   HTMLElement,
  onClose?: () => void
): void {
  const closeBtn = modal.querySelector<HTMLButtonElement>('[data-modal-close]');
  const overlay  = modal.querySelector<HTMLElement>('[data-modal-overlay]');

  function open(): void {
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    trapFocus(modal);
  }

  function close(): void {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openBtn.focus();
    onClose?.();
  }

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}

function trapFocus(container: HTMLElement): void {
  const focusable = Array.from(container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )).filter(el => !el.hasAttribute('disabled'));
  focusable[0]?.focus();

  container.addEventListener('keydown', function handler(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    if (container.hidden) container.removeEventListener('keydown', handler);
  });
}
```

---

### `src/modules/toast.ts`

```typescript
import { toast } from 'sonner';

export type ToastVariant = 'success' | 'danger' | 'neutral';

export function showToast(message: string, variant: ToastVariant = 'neutral'): void {
  const options = { duration: 4000 };
  if (variant === 'success') toast.success(message, options);
  else if (variant === 'danger') toast.error(message, options);
  else toast(message, options);
}
```

---

### `src/modules/animations.ts`

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function fadeInUp(selector: string, delay = 0): void {
  if (reduced) return;
  gsap.from(selector, {
    y: 40, opacity: 0, duration: 0.7, ease: 'power2.out', delay,
    scrollTrigger: { trigger: selector, start: 'top 85%', once: true },
  });
}

export function staggerCards(selector: string): void {
  if (reduced) return;
  gsap.from(selector, {
    y: 50, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
    scrollTrigger: { trigger: selector, start: 'top 80%', once: true },
  });
}

export function heroEntrance(headline: string, sub: string, ctas: string): void {
  if (reduced) return;
  const tl = gsap.timeline();
  tl.from(headline, { y: 60, opacity: 0, duration: 1,   ease: 'power3.out' })
    .from(sub,      { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    .from(ctas,     { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
}
```

---

## 8. Page Implementations

### `index.html` + `src/main.ts`

**Sections to render:**

1. **Navbar** — logo, nav links (Home active), theme toggle, reservations icon with badge count from `getCount()`
2. **Hero** — full viewport, Newsreader italic headline `"El mundo, contado por ti."`, two CTAs → `destinations.html` and `quote.html`. GSAP `heroEntrance()` on load.
3. **Value prop strip** — 4 items: 9 Destinos, Cotización en Vivo, Sin Comisiones, Soporte. GSAP `staggerCards()` on scroll.
4. **Featured destinations** — show first 6 from `destinations` data. Each card: image, name, region, `pricePerDay` formatted as ARS, "Ver detalles" link → `detail.html?slug={slug}`. Bookmark toggle calls `save()` / `remove()` + `showToast()`.
5. **Dollar widget** — calls `initDolar()`. Loading skeletons while fetching. Error state with retry.
6. **Footer** — 3 columns, newsletter input (mock), legal note.

```typescript
// src/main.ts
import { initTheme, toggleTheme } from './modules/theme';
import { initNavbar }              from './modules/navbar';
import { initDolar }               from './modules/dolar';
import { isSaved, save, remove, getCount } from './modules/reservations';
import { showToast }               from './modules/toast';
import { heroEntrance, staggerCards, fadeInUp } from './modules/animations';
import { destinations }            from './data/destinations';
import { toast }                   from 'sonner';

initTheme();
initNavbar();
initDolar();
toast.setup({ position: 'bottom-right' });

// Render featured destinations (first 6)
const grid = document.querySelector<HTMLElement>('[data-dest-grid]')!;
destinations.slice(0, 6).forEach(dest => {
  const card = createDestinationCard(dest);
  grid.appendChild(card);
});

// Update reservation badge
const badge = document.querySelector<HTMLElement>('[data-res-badge]');
const count = getCount();
if (badge) badge.textContent = count > 0 ? String(count) : '';

// Animations
heroEntrance('.hero__headline', '.hero__sub', '.hero__ctas');
staggerCards('[data-dest-card]');
fadeInUp('.value-strip');
fadeInUp('.dolar-section', 0.2);

// Theme toggle
document.querySelector('[data-theme-toggle]')
  ?.addEventListener('click', toggleTheme);

function createDestinationCard(dest: typeof destinations[0]): HTMLElement {
  const el = document.createElement('article');
  el.className = 'dest-card';
  el.dataset.destCard = dest.slug;
  const saved = isSaved(dest.slug);
  el.innerHTML = `
    <div class="dest-card__image-wrap">
      <img src="${dest.image}" alt="${dest.name}" loading="lazy" class="dest-card__img">
      <button
        class="dest-card__save ${saved ? 'dest-card__save--active' : ''}"
        aria-label="${saved ? 'Quitar de reservas' : 'Guardar'} ${dest.name}"
        data-save="${dest.slug}"
      >
        <span class="material-symbols-outlined">${saved ? 'bookmark' : 'bookmark'}</span>
      </button>
    </div>
    <div class="dest-card__body">
      <span class="label dest-card__region">${dest.region}, ${dest.country}</span>
      <h3 class="dest-card__name">${dest.name}</h3>
      <p class="dest-card__price">Desde $${dest.pricePerDay.toLocaleString('es-AR')} ARS/día</p>
      <a href="detail.html?slug=${dest.slug}" class="btn btn--ghost btn--sm">
        Ver detalles <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
      </a>
    </div>
  `;
  el.querySelector<HTMLButtonElement>('[data-save]')!.addEventListener('click', (e) => {
    e.preventDefault();
    if (isSaved(dest.slug)) {
      remove(dest.slug);
      showToast(`${dest.name} eliminado de tus viajes`, 'neutral');
    } else {
      save({ id: dest.slug, name: dest.name, region: dest.region,
             days: dest.minDays, ticketClass: 'Económica', meal: 'Estándar',
             totalARS: dest.pricePerDay * dest.minDays,
             image: dest.image, savedAt: Date.now() });
      showToast(`${dest.name} guardado en tus viajes`, 'success');
    }
  });
  return el;
}
```

---

### `detail.html` + `src/detail.ts`

Read `?slug=` from URL → find destination in data → render:

- Full-width hero image with name overlay (contrast overlay: `rgba(4,22,39,0.55)`)
- Breadcrumb: `Inicio > Destinos > {name}` using `<nav aria-label="Breadcrumb">`
- Description paragraph + highlights list + included items
- **Pricing calculator:**
  - Select: stay duration (minDays → maxDays)
  - Select: ticket class (Económica / Ejecutiva / Primera — multipliers: 1× / 1.8× / 2.5×)
  - Select: meal (Sin comidas / Desayuno / Todo incluido — flat additions: 0 / +8000 / +25000 per day)
  - Live output: total ARS + total USD (using `getDolarBlueVenta()` — show skeleton if not loaded)
  - Discount badge: –10% if days ≥ 10
- "Guardar viaje" CTA → calls `save()` + `showToast()` + updates button state
- Gallery: 3 images in a CSS Grid, `loading="lazy"`, full alt text
- GSAP: `fadeInUp` on description and pricing panel

---

### `reservations.html` + `src/reservations.ts`

- Read all from `getAll()`
- If empty → show empty state: icon + message + CTA → `destinations.html`
- If items exist → render list of reservation cards:
  - Image thumbnail, name, region, days, class, total ARS + USD equivalent
  - Delete button with `aria-label="Eliminar reserva en {name}"`
  - On delete click: show inline confirmation (`"¿Eliminar este viaje? Sí / Cancelar"`, no `confirm()`)
  - On confirm: call `remove(id)` + `showToast('Reserva eliminada', 'danger')` + re-render list
- Summary sidebar: count, total days, total ARS
- GSAP `staggerCards` on reservation card list
- Mobile bottom nav bar (Explorar / Mis Viajes active / Favoritos / Perfil)

---

### `quote.html` + `src/quote.ts`

Two-panel layout on desktop (sticky right panel):

**Left — Form:**
- Traveler info: nombre (text), apellido (text), edad (number, 1–99)
- Trip preferences: clase (select), comida (select), estadía (select 3–14)
- Destination selector: radio cards with images from `destinations` data
- Inline validation on blur: required fields + age range + email format
- Error messages below each field using `<span role="alert">`

**Right — Live summary (sticky):**
- Updates on every form change
- Shows: destination, days, class, subtotal ARS, discount (if ≥10 days, –10%), total ARS, total USD
- USD line shows skeleton if `getDolarBlueVenta()` returns null

**Buy button:**
- Opens modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`
- Modal content: thank-you message, summary of purchase, "Cerrar" button
- On open: focus trap. On close: focus returns to trigger. Escape closes.
- Use `initModal()` from `modal.ts`

---

### `contact.html` + `src/contact.ts`

- Single column, `max-width: 640px`, centered
- Fields: nombre, apellido, email (required, validated), mensaje (textarea)
- Validate on submit: all required + email format
- On success: replace form with `<div class="success-state">` confirmation message
- Use Formspree placeholder: `action="https://formspree.io/f/YOUR_ID"` — mock with `setTimeout(1500)` in development
- `showToast('Mensaje enviado correctamente', 'success')`

---

## 9. SCSS Component Patterns

### Buttons
```scss
.btn {
  display:         inline-flex;
  align-items:     center;
  gap:             var(--space-sm);
  padding:         var(--space-sm) var(--space-lg);
  border-radius:   var(--radius-md);
  font-family:     var(--font-body);
  font-size:       0.875rem;
  font-weight:     600;
  cursor:          pointer;
  border:          none;
  transition:      transform var(--transition-fast), background var(--transition-fast);

  &:active { transform: scale(0.97); }
  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  &--primary {
    background: var(--color-accent);
    color:      var(--color-text-on-accent);
    &:hover { background: var(--color-accent-hover); }
  }

  &--ghost {
    background:  transparent;
    border:      1px solid var(--color-border-strong);
    color:       var(--color-text-primary);
    &:hover { background: var(--color-surface-raised); }
  }

  &--danger {
    background: var(--color-danger);
    color:      #fff;
  }

  &--sm { padding: var(--space-xs) var(--space-md); font-size: 0.75rem; }
}
```

### Cards
```scss
.dest-card {
  background:    var(--color-surface);
  border-radius: var(--radius-lg);
  overflow:      hidden;
  box-shadow:    var(--shadow-sm);
  transition:    transform var(--transition-normal), box-shadow var(--transition-normal);

  &:hover {
    transform:  translateY(-4px);
    box-shadow: var(--shadow-md);

    .dest-card__img { transform: scale(1.04); }
  }

  &__image-wrap {
    position:   relative;
    overflow:   hidden;
    aspect-ratio: 4/3;
  }

  &__img {
    width:      100%;
    height:     100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  &__save {
    position:        absolute;
    top:             var(--space-md);
    right:           var(--space-md);
    background:      rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    border:          1px solid rgba(255,255,255,0.2);
    border-radius:   var(--radius-pill);
    padding:         var(--space-sm);
    color:           #fff;
    cursor:          pointer;
    transition:      background var(--transition-fast), color var(--transition-fast);

    &--active, &:hover {
      background: var(--color-surface);
      color:      var(--color-accent);
    }

    &:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }
  }

  &__body { padding: var(--space-lg); }
  &__region { color: var(--color-text-secondary); display: block; margin-bottom: var(--space-xs); }
  &__name { font-family: var(--font-display); font-style: italic; font-size: 1.5rem; margin-bottom: var(--space-sm); }
  &__price { color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: var(--space-md); }
}
```

---

## 10. Accessibility — Non-Negotiable Rules

Implement every item below. No exceptions.

- **Focus indicators:** `outline: 2px solid var(--color-accent); outline-offset: 2px` on `:focus-visible`. Never `outline: none` without a replacement.
- **Keyboard nav:** All interactive elements reachable by Tab. Logical reading order.
- **Drawer + modal:** Focus trap in both. Escape closes both. Focus returns to trigger on close.
- **Images:** All `<img>` have descriptive `alt`. Decorative images use `alt=""`.
- **Forms:** Every `<input>` and `<select>` has a `<label for="...">`. No placeholder-only labels.
- **Errors:** `<span role="alert">` below each invalid field. Not just color — include an icon or text.
- **Delete confirm:** Inline inline confirmation in DOM, not `window.confirm()`.
- **Color contrast:** Test every pair. Body text ≥ 4.5:1. Large text and UI ≥ 3:1. Accent background text ≥ 4.5:1.
- **Color alone:** Never use color as the only signal — pair with icon, label, or pattern.
- **Touch targets:** `min-width: 44px; min-height: 44px` on all interactive elements in mobile.
- **Reduced motion:**
  ```scss
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration:   0.01ms !important;
      transition-duration:  0.01ms !important;
    }
  }
  ```
  Also guard all GSAP calls with the `reduced` boolean in `animations.ts`.
- **`aria-current="page"`** on the active nav link of each page.
- **Reservation delete button:** `aria-label="Eliminar reserva en {name}"` — unique per card.
- **Live region:** `<div aria-live="polite" aria-atomic="true" class="sr-only" id="live-region">` for dynamic price updates.

---

## 11. Responsive Breakpoints

Mobile-first SCSS. Use these breakpoints exclusively:

```scss
$bp-sm:  480px;
$bp-md:  768px;
$bp-lg: 1024px;
$bp-xl: 1280px;

@mixin sm  { @media (min-width: $bp-sm)  { @content; } }
@mixin md  { @media (min-width: $bp-md)  { @content; } }
@mixin lg  { @media (min-width: $bp-lg)  { @content; } }
@mixin xl  { @media (min-width: $bp-xl)  { @content; } }
```

**Per section:**
- Navbar: hamburger below `md`, horizontal above
- Hero: `min-height: 80vh` mobile, `100vh` desktop
- Hero headline: `clamp(2.25rem, 5vw, 4.5rem)`
- Destination grid: `repeat(auto-fill, minmax(280px, 1fr))`
- Dollar widget: stacked mobile, 3 columns `md+`
- Quote: single column mobile, 2-panel `lg+` (sticky right)
- Reservation cards: stacked mobile, horizontal `md+`
- Footer: stacked mobile, 3 columns `md+`
- Mobile bottom nav: visible below `md`, hidden above

---

## 12. Vite Config

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:         'index.html',
        destinations: 'destinations.html',
        detail:       'detail.html',
        reservations: 'reservations.html',
        quote:        'quote.html',
        contact:      'contact.html',
      },
    },
  },
});
```

---

## 13. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "lib": ["ES2020", "DOM"],
    "skipLibCheck": true
  }
}
```

---

## 14. `package.json` Dependencies

```json
{
  "scripts": {
    "dev":   "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap":   "^3.12.5",
    "sonner": "^1.5.0"
  },
  "devDependencies": {
    "vite":         "^5.0.0",
    "typescript":   "^5.4.0",
    "sass":         "^1.72.0"
  }
}
```

---

## 15. Deliverable Order

Generate files in this exact order so each step compiles and runs before the next:

1. `package.json` + `vite.config.ts` + `tsconfig.json`
2. `src/styles/_tokens.scss` + `_reset.scss` + `main.scss`
3. `src/data/destinations.ts` (all 9 destinations, fully typed and complete)
4. All `src/modules/*.ts` files
5. `index.html` + `src/main.ts` (home page, fully working)
6. `destinations.html` + `src/destinations.ts`
7. `detail.html` + `src/detail.ts`
8. `reservations.html` + `src/reservations.ts`
9. `quote.html` + `src/quote.ts`
10. `contact.html` + `src/contact.ts`
11. Remaining SCSS partials (`_typography`, `_layout`, `_components`, `_navbar`, `_hero`, `_modal`, `_animations`)

**Rules:**
- All code must compile with `tsc --noEmit` with zero errors
- No `any` types — use proper interfaces from `src/data/destinations.ts`
- No `console.log` in production code
- No `window.alert()`, `window.confirm()`, or `window.prompt()` anywhere
- All user-facing strings in Spanish
- Do not invent a backend — use Formspree placeholder and mock `setTimeout` for contact
- Respond in English. Code comments in English.

---

*ViajaYa migration brief — single source of truth. Last updated: 2025.*