export type ToastVariant = 'success' | 'danger' | 'neutral';

let host: HTMLElement | null = null;

function ensureHost(): HTMLElement {
  if (!host) {
    host = document.createElement('div');
    host.className = 'toast-host';
    host.setAttribute('aria-live', 'polite');
    document.body.appendChild(host);
  }
  return host;
}

export function showToast(message: string, variant: ToastVariant = 'neutral'): void {
  const container = ensureHost();
  const el = document.createElement('div');
  el.className = `toast toast--${variant}`;
  el.setAttribute('role', 'status');
  el.textContent = message;
  container.appendChild(el);
  requestAnimationFrame(() => {
    el.classList.add('toast--visible');
  });
  const duration = 4000;
  window.setTimeout(() => {
    el.classList.remove('toast--visible');
    el.addEventListener(
      'transitionend',
      () => {
        el.remove();
      },
      { once: true },
    );
  }, duration);
}
