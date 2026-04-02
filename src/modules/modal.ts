let modalKeyHandler: ((e: KeyboardEvent) => void) | null = null;

export function initModal(
  openBtn: HTMLButtonElement,
  modal: HTMLElement,
  onClose?: () => void,
  onBeforeOpen?: () => boolean,
): void {
  const closeBtn = modal.querySelector<HTMLButtonElement>('[data-modal-close]');
  const overlay = modal.querySelector<HTMLElement>('[data-modal-overlay]');

  function cleanupTrap(): void {
    if (modalKeyHandler) {
      modal.removeEventListener('keydown', modalKeyHandler);
      modalKeyHandler = null;
    }
  }

  function close(): void {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    cleanupTrap();
    openBtn.focus();
    onClose?.();
  }

  function open(): void {
    if (onBeforeOpen && !onBeforeOpen()) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusable = Array.from(
      modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute('disabled'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    modalKeyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== 'Tab' || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    modal.addEventListener('keydown', modalKeyHandler);
  }

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}
