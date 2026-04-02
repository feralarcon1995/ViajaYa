let drawerKeyHandler: ((e: KeyboardEvent) => void) | null = null;

export function initNavbar(): void {
  const header = document.querySelector<HTMLElement>('[data-navbar]');
  const trigger = document.querySelector<HTMLButtonElement>('[data-nav-trigger]');
  const drawer = document.querySelector<HTMLElement>('[data-nav-drawer]');
  const overlay = document.querySelector<HTMLElement>('[data-nav-overlay]');
  if (!header || !trigger || !drawer || !overlay) return;

  const d = drawer;
  const t = trigger;
  const o = overlay;

  window.addEventListener(
    'scroll',
    () => {
      const scrolled = header.classList.contains('home-navbar') ? 'home-navbar--scrolled' : 'navbar--scrolled';
      header.classList.toggle(scrolled, window.scrollY > 40);
    },
    { passive: true },
  );

  function closeDrawer(): void {
    d.setAttribute('aria-hidden', 'true');
    o.hidden = true;
    t.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (drawerKeyHandler) {
      d.removeEventListener('keydown', drawerKeyHandler);
      drawerKeyHandler = null;
    }
    t.focus();
  }

  function openDrawer(): void {
    d.setAttribute('aria-hidden', 'false');
    o.hidden = false;
    t.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const focusable = d.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const list = Array.from(focusable).filter((el) => el.offsetParent !== null || d.contains(el));
    const first = list[0];
    const last = list[list.length - 1];
    first?.focus();

    drawerKeyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeDrawer();
        return;
      }
      if (e.key !== 'Tab' || list.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    d.addEventListener('keydown', drawerKeyHandler);
  }

  t.addEventListener('click', () => {
    const isOpen = d.getAttribute('aria-hidden') === 'false';
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  o.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && d.getAttribute('aria-hidden') === 'false') closeDrawer();
  });
}
