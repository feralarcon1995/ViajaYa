export function initFooterYear(): void {
  const y = String(new Date().getFullYear());
  document.querySelectorAll<HTMLElement>('[data-footer-year]').forEach((el) => {
    el.textContent = y;
  });
}
