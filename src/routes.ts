export const R = {
  home: '/index.html',
  destinations: '/pages/destinations.html',
  detail: (slug: string) => `/pages/detail.html?slug=${encodeURIComponent(slug)}`,
  quote: '/pages/quote.html',
  contact: '/pages/contact.html',
  reservations: '/pages/reservations.html',
} as const;
