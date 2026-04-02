const STORAGE_KEY = 'viajaya-theme';

type Theme = 'light' | 'dark';

function getPreferred(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
  const toggle = document.querySelector<HTMLElement>('[data-theme-toggle]');
  if (toggle) {
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro');
    const icon = toggle.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  }
}

export function initTheme(): void {
  apply(getPreferred());
}

export function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme') as Theme | null;
  apply(current === 'dark' ? 'light' : 'dark');
}
