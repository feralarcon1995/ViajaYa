import { initTheme, toggleTheme } from './modules/theme';
import { initFooterYear } from './modules/footer-year';
import { initNavbar } from './modules/navbar';
import { getCount } from './modules/reservation-store';
import { showToast } from './modules/toast';

function updateBadge(): void {
  document.querySelectorAll<HTMLElement>('[data-res-badge]').forEach((badge) => {
    const n = getCount();
    badge.textContent = n > 0 ? String(n) : '';
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

initTheme();
initFooterYear();
initNavbar();
updateBadge();
window.addEventListener('viajaya-reservations', updateBadge);
document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => toggleTheme());

const form = document.getElementById('contact-form') as HTMLFormElement | null;
const success = document.getElementById('contact-success') as HTMLElement | null;

function showFieldErr(sel: string, msg: string): void {
  const el = document.querySelector<HTMLElement>(sel);
  if (el) {
    el.textContent = msg;
    el.hidden = false;
  }
}

function clearFieldErr(sel: string): void {
  const el = document.querySelector<HTMLElement>(sel);
  if (el) {
    el.textContent = '';
    el.hidden = true;
  }
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = (document.getElementById('c-nombre') as HTMLInputElement | null)?.value.trim() ?? '';
  const apellido = (document.getElementById('c-apellido') as HTMLInputElement | null)?.value.trim() ?? '';
  const email = (document.getElementById('c-email') as HTMLInputElement | null)?.value.trim() ?? '';
  const msg = (document.getElementById('c-msg') as HTMLTextAreaElement | null)?.value.trim() ?? '';
  let ok = true;
  if (!nombre) {
    showFieldErr('[data-c-err-nombre]', 'Completá tu nombre.');
    ok = false;
  } else clearFieldErr('[data-c-err-nombre]');
  if (!apellido) {
    showFieldErr('[data-c-err-apellido]', 'Completá tu apellido.');
    ok = false;
  } else clearFieldErr('[data-c-err-apellido]');
  if (!email) {
    showFieldErr('[data-c-err-email]', 'Completá tu correo.');
    ok = false;
  } else if (!EMAIL_RE.test(email)) {
    showFieldErr('[data-c-err-email]', 'Ingresá un correo válido.');
    ok = false;
  } else clearFieldErr('[data-c-err-email]');
  if (!msg) {
    showFieldErr('[data-c-err-msg]', 'Escribí un mensaje.');
    ok = false;
  } else clearFieldErr('[data-c-err-msg]');
  if (!ok) return;

  window.setTimeout(() => {
    form.hidden = true;
    if (success) {
      success.hidden = false;
      success.focus();
    }
    showToast('Mensaje enviado correctamente', 'success');
  }, 1500);
});
