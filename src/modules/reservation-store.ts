export interface Reservation {
  id: string;
  name: string;
  region: string;
  days: number;
  ticketClass: string;
  meal: string;
  totalARS: number;
  image: string;
  savedAt: number;
}

const KEY = 'viajaya_reservations';

function parseAll(raw: string | null): Reservation[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (x): x is Reservation =>
        typeof x === 'object' &&
        x !== null &&
        typeof (x as Reservation).id === 'string' &&
        typeof (x as Reservation).name === 'string',
    ) as Reservation[];
  } catch {
    return [];
  }
}

export function getAll(): Reservation[] {
  return parseAll(localStorage.getItem(KEY));
}

export function save(r: Reservation): void {
  const all = getAll().filter((x) => x.id !== r.id);
  localStorage.setItem(KEY, JSON.stringify([...all, r]));
  window.dispatchEvent(new Event('viajaya-reservations'));
}

export function remove(id: string): void {
  const updated = getAll().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('viajaya-reservations'));
}

export function isSaved(id: string): boolean {
  return getAll().some((r) => r.id === id);
}

export function getCount(): number {
  return getAll().length;
}
