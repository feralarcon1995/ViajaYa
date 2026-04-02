import type { Destination, TicketClass, MealPlan } from '../data/destinations';

export type { TicketClass, MealPlan } from '../data/destinations';

export function computeTripTotal(
  dest: Destination,
  days: number,
  ticketClass: TicketClass,
  meal: MealPlan,
): { subtotalARS: number; discountPct: number; totalARS: number } {
  const mult = dest.ticketMultipliers[ticketClass];
  const mealAdd = dest.mealAddons[meal];
  const subtotalARS = dest.pricePerDay * mult * days + mealAdd * days;
  const discountPct = days >= 10 ? 10 : 0;
  const totalARS = subtotalARS * (discountPct ? 0.9 : 1);
  return { subtotalARS, discountPct, totalARS };
}

export function formatARS(n: number): string {
  return n.toLocaleString('es-AR', { maximumFractionDigits: 0 });
}

export function ticketClassLabel(key: TicketClass): string {
  if (key === 'economica') return 'Económica';
  if (key === 'ejecutiva') return 'Ejecutiva';
  return 'Primera';
}

export function mealLabel(key: MealPlan): string {
  if (key === 'sin-comidas') return 'Sin comidas';
  if (key === 'desayuno') return 'Desayuno';
  return 'Todo incluido';
}
