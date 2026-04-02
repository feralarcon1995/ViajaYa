export type DestinationCategory = 'beach' | 'city' | 'nature' | 'culture';

export type TicketClass = 'economica' | 'ejecutiva' | 'primera';
export type MealPlan = 'sin-comidas' | 'desayuno' | 'todo-incluido';
export type Season = 'verano' | 'otoño' | 'invierno' | 'primavera' | 'todo-el-año';

export interface PracticalInfo {
  language: string;
  currency: string;
  timezone: string;
  voltage: string;
  visaRequired: boolean;
  visaNote: string;
  bestSeason: Season[];
  climate: string;
  tipicalTemp: string;
}

export interface Itinerary {
  day: number;
  title: string;
  description: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  country: string;
  continent: string;
  categories: DestinationCategory[];
  tagline: string;
  description: string;
  longDescription: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  tips: string[];
  itinerary: Itinerary[];
  practicalInfo: PracticalInfo;
  pricePerDay: number;
  minDays: number;
  maxDays: number;
  ticketMultipliers: Record<TicketClass, number>;
  mealAddons: Record<MealPlan, number>;
  image: string;
  gallery: string[];
  mapEmbed: string;
  rating: number;
  reviewCount: number;
}

export const destinations: Destination[] = [
  {
    id: '1',
    slug: 'miami',
    name: 'Miami',
    region: 'Florida',
    country: 'Estados Unidos',
    continent: 'América del Norte',
    categories: ['beach', 'city'],
    tagline: 'Sol, diseño y la energía que nunca duerme.',
    description:
      'Miami es la ciudad donde el lujo se mezcla con la cultura latina. South Beach, el Art Deco District y Wynwood Walls conviven con playas de arena blanca y una gastronomía que no tiene comparación.',
    longDescription:
      'Miami es mucho más que playas: es una ciudad que vive de noche y se reinventa cada temporada. El Art Deco District de South Beach es un museo al aire libre de arquitectura de los años 30, mientras que Wynwood Walls transformó un barrio industrial en la meca del arte urbano global. La influencia cubana de Little Havana se siente en cada café con leche y en los dominós jugados en la vereda. Para los amantes de la naturaleza, los Everglades están a menos de una hora y ofrecen un ecosistema único en el mundo. Miami es, en definitiva, el mejor portal de entrada entre Argentina y el mundo anglosajón.',
    highlights: [
      'South Beach y Ocean Drive al atardecer',
      'Arte urbano en Wynwood Walls',
      'Gastronomía latina en Little Havana',
      'Kayak en los Everglades',
      'Compras en Bal Harbour y Design District',
      'Vida nocturna en el barrio de Brickell',
    ],
    included: [
      'Vuelo directo desde EZE (Aerolíneas Argentinas o LATAM)',
      'Hotel 4 estrellas frente al mar en South Beach',
      'Traslados aeropuerto–hotel–aeropuerto',
      'City pass turístico con acceso a 5 atracciones',
      'Seguro de viaje básico',
    ],
    notIncluded: [
      'Visado ESTA (se gestiona online, ~USD 21)',
      'Comidas (salvo el plan contratado)',
      'Excursiones opcionales',
      'Propinas (costumbre local, ~15–20%)',
    ],
    tips: [
      'Visitá Wynwood los sábados a la noche: las galerías abren hasta medianoche y el ambiente es único.',
      'Para moverse por la ciudad, el free trolley de Miami Beach y el Metromover del centro son gratis.',
      'Reservá mesa en Versailles (Little Havana) con anticipación: es el restaurante cubano más famoso del mundo.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Llegada y primer contacto con South Beach',
        description:
          'Llegada al Aeropuerto Internacional de Miami, traslado al hotel y check-in. Por la tarde, primer paseo por Ocean Drive para absorber la atmósfera Art Deco. Cena en uno de los restaurantes frente al mar.',
      },
      {
        day: 2,
        title: 'Arte, diseño y Wynwood',
        description:
          'Mañana dedicada al Wynwood Walls y las galerías del barrio. Almuerzo en el mercado de Wynwood Kitchen & Bar. Por la tarde, recorrido por el Design District y las tiendas de lujo. Noche libre.',
      },
      {
        day: 3,
        title: 'Little Havana y vida local',
        description:
          'Visita al Calle Ocho y el corazón de Little Havana. Café con leche en La Ventanita, dominós en el Máximo Gómez Park y almuerzo en Versailles. Por la tarde, playa en South Beach. Atardecer en el SkyBar del Shore Club.',
      },
      {
        day: 4,
        title: 'Everglades y naturaleza',
        description:
          'Excursión de día completo a los Everglades: airboat ride por los pantanos, avistamiento de caimanes y visita al centro de visitantes. Regreso a Miami por la tarde. Cena libre en Brickell.',
      },
      {
        day: 5,
        title: 'Compras y despedida',
        description:
          'Mañana de compras en el Dolphin Mall o Bal Harbour Shops. Almuerzo y regreso al aeropuerto para el vuelo de vuelta.',
      },
    ],
    practicalInfo: {
      language: 'Inglés (con fuerte presencia del español)',
      currency: 'Dólar estadounidense (USD)',
      timezone: 'EST / UTC−5 (EDT en verano)',
      voltage: '120V / 60Hz — se necesita adaptador',
      visaRequired: true,
      visaNote: 'Se requiere autorización ESTA (Electronic System for Travel Authorization). Se gestiona online en 72h, cuesta USD 21 y es válida por 2 años.',
      bestSeason: ['otoño', 'invierno', 'primavera'],
      climate: 'Subtropical húmedo. Veranos muy calurosos y húmedos con riesgo de huracanes (junio–noviembre). El resto del año es cálido y soleado.',
      tipicalTemp: '20–32 °C',
    },
    pricePerDay: 180000,
    minDays: 3,
    maxDays: 14,
    ticketMultipliers: { economica: 1, ejecutiva: 1.8, primera: 2.6 },
    mealAddons: { 'sin-comidas': 0, desayuno: 9000, 'todo-incluido': 28000 },
    image: '/images/miami.jpg',
    gallery: ['/images/miami-2.jpg', '/images/miami-3.jpg', '/images/miami-4.jpg'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114022.97282370!2d-80.31895!3d25.77427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL!5e0!3m2!1ses!2sar',
    rating: 4.8,
    reviewCount: 342,
  },

  {
    id: '2',
    slug: 'las-vegas',
    name: 'Las Vegas',
    region: 'Nevada',
    country: 'Estados Unidos',
    continent: 'América del Norte',
    categories: ['city'],
    tagline: 'La capital del entretenimiento sin límites.',
    description:
      'Las Vegas es más que casinos. El Strip de noche, los shows de Broadway, la gastronomía de chefs con estrella Michelin y la cercanía al Gran Cañón hacen de este destino una experiencia irrepetible.',
    longDescription:
      'Las Vegas es la ciudad que inventó el exceso y lo convirtió en arte. El Strip es una avenida de casi 7 kilómetros donde conviven réplicas de la Torre Eiffel, el Coliseo romano y los canales de Venecia, todo iluminado con millones de luces LED. Pero detrás de las mesas de juego hay una escena gastronómica extraordinaria: más de una docena de restaurantes con estrella Michelin concentrados en apenas unos kilómetros. Los shows de Cirque du Soleil, los residentes como Adele o Beyoncé en el Sphere, y las producciones de Broadway hacen de cada noche algo irrepetible. A menos de 5 horas en auto, el Gran Cañón del Colorado espera con su silencio absoluto como el contraste perfecto.',
    highlights: [
      'El Strip iluminado de noche: el espectáculo gratis más grande del mundo',
      'Shows en el Sphere (U2, Dead & Company)',
      'Cirque du Soleil en el Bellagio',
      'Gastronomía Michelin: Joël Robuchon, Guy Savoy',
      'Excursión de un día al Gran Cañón (South Rim)',
      'Fremont Street Experience en el centro histórico',
    ],
    included: [
      'Vuelo con escala (generalmente en Lima o Ciudad de México)',
      'Hotel en The Strip (categoría elegida)',
      'Traslados aeropuerto–hotel–aeropuerto',
      'Welcome package ViajaYa con guía de shows recomendados',
      'Seguro de viaje básico',
    ],
    notIncluded: [
      'Visado ESTA (obligatorio, ~USD 21)',
      'Entradas a shows y espectáculos',
      'Juego en casinos',
      'Comidas (salvo el plan contratado)',
      'Excursión al Gran Cañón (opcional, desde USD 80)',
    ],
    tips: [
      'Reservá los shows con mínimo 3 semanas de anticipación, especialmente los del Sphere y el Cirque du Soleil.',
      'Los bufets de los casinos como Aria o Bellagio son una experiencia en sí mismos y tienen excelente relación precio–calidad.',
      'Visitá el Fremont Street Experience los martes o miércoles: hay menos gente y los shows de luces se disfrutan mejor.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Llegada y primera noche en el Strip',
        description:
          'Llegada al Aeropuerto Internacional Harry Reid, traslado al hotel. Por la noche, primer recorrido a pie por el Strip para ver las fuentes del Bellagio, el Venetian y el New York-New York. Cena en un restaurante del casino.',
      },
      {
        day: 2,
        title: 'Shows, gastronomía y Fremont Street',
        description:
          'Día libre para explorar los casinos. Por la tarde, visita al centro histórico y el Fremont Street Experience. Por la noche, show elegido (Cirque du Soleil o similar). Cena en un restaurante con estrella.',
      },
      {
        day: 3,
        title: 'Gran Cañón (excursión opcional)',
        description:
          'Excursión de día completo al Gran Cañón South Rim. Salida temprano, llegada al mirador principal, almuerzo con vista al cañón, regreso a Las Vegas. Cena libre y última noche en el Strip.',
      },
      {
        day: 4,
        title: 'Compras y despedida',
        description:
          'Mañana de compras en las tiendas del Crystals o Forum Shops en Caesars Palace. Almuerzo y traslado al aeropuerto.',
      },
    ],
    practicalInfo: {
      language: 'Inglés',
      currency: 'Dólar estadounidense (USD)',
      timezone: 'PST / UTC−8 (PDT en verano)',
      voltage: '120V / 60Hz — se necesita adaptador',
      visaRequired: true,
      visaNote: 'ESTA obligatorio. Se gestiona online, cuesta USD 21 y tarda hasta 72h en aprobarse.',
      bestSeason: ['otoño', 'primavera'],
      climate: 'Desértico árido. Veranos extremadamente calurosos (hasta 45 °C). Primavera y otoño son ideales. Inviernos suaves pero con noches frías.',
      tipicalTemp: '10–42 °C según la época',
    },
    pricePerDay: 210000,
    minDays: 3,
    maxDays: 10,
    ticketMultipliers: { economica: 1, ejecutiva: 1.8, primera: 2.6 },
    mealAddons: { 'sin-comidas': 0, desayuno: 9000, 'todo-incluido': 30000 },
    image: '/images/las-vegas.jpg',
    gallery: ['/images/las-vegas-2.jpg', '/images/las-vegas-3.jpg', '/images/las-vegas-4.jpg'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104652!2d-115.17398!3d36.17497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3acf5b0b0ea543aa!2sLas%20Vegas%2C%20NV!5e0!3m2!1ses!2sar',
    rating: 4.7,
    reviewCount: 289,
  },

  {
    id: '3',
    slug: 'rio-de-janeiro',
    name: 'Río de Janeiro',
    region: 'Río de Janeiro',
    country: 'Brasil',
    continent: 'América del Sur',
    categories: ['beach', 'culture', 'city'],
    tagline: 'La cidade maravilhosa que enamora a primera vista.',
    description:
      'Río de Janeiro es única: el Cristo Redentor sobre el Pan de Azúcar, Copacabana e Ipanema a sus pies, y la energía del samba que impregna cada rincón. Un destino que te cambia.',
    longDescription:
      'Río de Janeiro es la ciudad más fotogénica del mundo, y no es casualidad. Está construida entre montañas y mar, con la selva atlántica colándose entre los edificios y el Océano Atlántico como horizonte. El Cristo Redentor sobre el Corcovado es uno de los monumentos más visitados del planeta, pero la ciudad tiene mucho más: el samba en las esquinas de Lapa, las vistas desde la Pedra do Telegrafo, la bohemia de Santa Teresa y los bares de Ipanema donde nació la Bossa Nova. El Carnaval de Río es, simplemente, el mayor espectáculo sobre la tierra.',
    highlights: [
      'Cristo Redentor al amanecer (evitá las multitudes)',
      'Playas de Copacabana e Ipanema',
      'Subida al Pan de Azúcar en teleférico',
      'Samba en vivo en el barrio de Lapa',
      'Barrio bohemio de Santa Teresa en tranvía',
      'Feijoada completa en un restaurante de domingo',
    ],
    included: [
      'Vuelo directo desde EZE (Aerolíneas Argentinas o GOL)',
      'Hotel boutique en Ipanema o Leblon',
      'Traslados aeropuerto–hotel–aeropuerto',
      'Tour panorámico de bienvenida en bus descapotable',
      'Seguro de viaje básico',
    ],
    notIncluded: [
      'Visa (argentinos no necesitan visa para Brasil)',
      'Comidas (salvo el plan contratado)',
      'Entradas a atracciones (Cristo, Pan de Azúcar)',
      'Excursiones opcionales a Petrópolis o Angra dos Reis',
    ],
    tips: [
      'Visitá el Cristo Redentor a las 8am cuando abre: antes de las 10am ya está lleno. Comprá el ticket online con anticipación.',
      'En Ipanema, la cuadra 9 (frente a la calle Vinicius de Moraes) es el punto de encuentro de los cariocas los fines de semana.',
      'Nunca llevés objetos de valor a la playa. Los "canguros" o bolsos pequeños sin logos son la mejor opción.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Llegada y primer atardecer en Ipanema',
        description:
          'Llegada al Aeropuerto Galeão o Santos Dumont, traslado al hotel en Ipanema. Check-in y primer paseo por el barrio. Atardecer en el Arpoador con vista a la Pedra da Gávea. Cena de frutos del mar en Leblon.',
      },
      {
        day: 2,
        title: 'Cristo Redentor y Pan de Azúcar',
        description:
          'Mañana temprana en el Corcovado para ver el Cristo Redentor antes de la multitud. Almuerzo en Santa Teresa. Por la tarde, subida al Pan de Azúcar en teleférico para ver la ciudad desde arriba al atardecer.',
      },
      {
        day: 3,
        title: 'Lapa, samba y vida nocturna',
        description:
          'Día libre de playa en Copacabana o Ipanema. Por la tarde, barrio histórico de la Lapa: los Arcos, las escaleras de Selarón y, al caer la noche, samba en vivo en los bares de la calle.',
      },
      {
        day: 4,
        title: 'Santa Teresa y mercado de arte',
        description:
          'Mañana en el tranvía de Santa Teresa, el barrio más bohemio de Río. Visita al Museu do Amanhã en la zona portuaria. Almuerzo de feijoada (obligatorio los domingos). Tarde libre de compras en el Shopping Leblon.',
      },
      {
        day: 5,
        title: 'Última playa y regreso',
        description:
          'Mañana de playa libre. Almuerzo de despedida con una caipirinha en la orilla. Traslado al aeropuerto.',
      },
    ],
    practicalInfo: {
      language: 'Portugués (los argentinos son bien recibidos y el español se entiende en zonas turísticas)',
      currency: 'Real brasileño (BRL). Los argentinos pueden pagar con tarjeta sin problema.',
      timezone: 'BRT / UTC−3 (mismo huso que Argentina)',
      voltage: '127V / 60Hz en Río (igual que Argentina en la mayoría de los enchufes)',
      visaRequired: false,
      visaNote: 'Los ciudadanos argentinos no necesitan visa para Brasil. Solo se requiere DNI vigente.',
      bestSeason: ['otoño', 'invierno', 'primavera'],
      climate: 'Tropical. Veranos calurosos y húmedos con lluvias intensas (diciembre–marzo). El resto del año es cálido y más seco, ideal para visitar.',
      tipicalTemp: '22–35 °C',
    },
    pricePerDay: 95000,
    minDays: 5,
    maxDays: 14,
    ticketMultipliers: { economica: 1, ejecutiva: 1.7, primera: 2.4 },
    mealAddons: { 'sin-comidas': 0, desayuno: 7000, 'todo-incluido': 22000 },
    image: '/images/rio.jpg',
    gallery: ['/images/rio-2.jpg', '/images/rio-3.jpg', '/images/rio-4.jpg'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234075!2d-43.45694!3d-22.90278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bde559108a05b%3A0x50dc5369e3a49a!2sR%C3%ADo%20de%20Janeiro!5e0!3m2!1ses!2sar',
    rating: 4.9,
    reviewCount: 518,
  },

  {
    id: '4',
    slug: 'buzios',
    name: 'Búzios',
    region: 'Río de Janeiro',
    country: 'Brasil',
    continent: 'América del Sur',
    categories: ['beach', 'nature'],
    tagline: 'La perla del Atlántico, íntima y sin apuros.',
    description:
      'Búzios es la respuesta cuando se quiere playa con estilo. Con más de 20 playas escondidas entre rocas y arena fina, Rua das Pedras y una atmósfera que invita a desacelerar.',
    longDescription:
      'Búzios fue descubierta por Brigitte Bardot en los años 60 y desde entonces no perdió su encanto mediterráneo. La península tiene 23 playas completamente distintas entre sí: las del lado atlántico son bravas y perfectas para el surf, las de la bahía son calmas y cristalinas, ideales para el snorkel. La Rua das Pedras es el corazón nocturno, con restaurantes de pescado fresco, bares y boutiques de diseño que cierran tarde. Es el destino favorito de los cariocas cuando quieren escapar de Río y no sorprende: está a solo 2 horas en bus.',
    highlights: [
      'Passeio de escuna por las 23 playas (con paradas para nadar)',
      'Snorkel en Praia João Fernandes',
      'Rua das Pedras al atardecer y de noche',
      'Surf y bodyboard en Praia Brava',
      'Langosta y frutos del mar en el puerto',
      'Estatua de Brigitte Bardot en el muelle',
    ],
    included: [
      'Vuelo a Río de Janeiro + transfer en van premium a Búzios (2hs)',
      'Pousada 4 estrellas con vista al mar',
      'Desayuno diario incluido',
      'Paseo en escuna de 4 horas por las playas',
      'Seguro de viaje básico',
    ],
    notIncluded: [
      'Visa (argentinos no necesitan para Brasil)',
      'Almuerzos y cenas',
      'Equipos de buceo o snorkel (se alquilan en la playa, ~BRL 30)',
      'Excursiones adicionales',
    ],
    tips: [
      'La Praia Azeda y Azedinha son las más lindas para nadar y están a solo 10 minutos a pie del centro. Llegá antes de las 10am.',
      'Alquilá un buggy o moto para recorrer las playas del otro lado: es la forma más divertida y económica de explorar.',
      'Para el pescado más fresco, pedí en los quioscos de playa directamente: langosta, camarón y ostra a precio de lugar.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Llegada desde Río y primera tarde en Búzios',
        description:
          'Transfer desde el aeropuerto de Río a la terminal de buses de Novo Rio. Bus o van privada a Búzios (2 horas). Check-in en la pousada. Por la tarde, primer paseo por la Rua das Pedras. Cena de frutos del mar en el puerto.',
      },
      {
        day: 2,
        title: 'Escuna por las playas',
        description:
          'Día completo en el paseo en escuna por las 23 playas de la península. El barco para en las más lindas para nadar con snorkel. Regreso al puerto al atardecer. Cena libre en algún restaurante de la Rua das Pedras.',
      },
      {
        day: 3,
        title: 'Playas bravas y buggy',
        description:
          'Mañana en la Praia Brava (surf y bodyboard) o la Praia da Ferradura (tranquila y familiar). Alquiler de buggy por la tarde para recorrer las playas del sur de la península. Sunset en la Praia do Forno.',
      },
      {
        day: 4,
        title: 'Día libre y regreso a Río',
        description:
          'Mañana libre de playa. Almuerzo de despedida con langosta en el puerto. Transfer de regreso a Río para el vuelo de vuelta.',
      },
    ],
    practicalInfo: {
      language: 'Portugués (los argentinos se comunican bien con español)',
      currency: 'Real brasileño (BRL)',
      timezone: 'BRT / UTC−3',
      voltage: '127V / 60Hz',
      visaRequired: false,
      visaNote: 'Los argentinos entran a Brasil solo con DNI vigente. Sin visa ni trámites.',
      bestSeason: ['verano', 'primavera'],
      climate: 'Tropical costero. Ideal de noviembre a abril, con el agua del mar a 26–28 °C. De mayo a septiembre hay más viento y las playas se despopulan.',
      tipicalTemp: '22–32 °C',
    },
    pricePerDay: 85000,
    minDays: 4,
    maxDays: 12,
    ticketMultipliers: { economica: 1, ejecutiva: 1.7, primera: 2.4 },
    mealAddons: { 'sin-comidas': 0, desayuno: 6000, 'todo-incluido': 20000 },
    image: '/images/buzios.jpg',
    gallery: ['/images/buzios-2.jpg', '/images/buzios-3.jpg', '/images/buzios-4.jpg'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29440!2d-41.88193!3d-22.74696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9b9e8e3b1f2a!2sBúzios!5e0!3m2!1ses!2sar',
    rating: 4.7,
    reviewCount: 203,
  },

  {
    id: '5',
    slug: 'vina-del-mar',
    name: 'Viña del Mar',
    region: 'Valparaíso',
    country: 'Chile',
    continent: 'América del Sur',
    categories: ['beach', 'city'],
    tagline: 'La ciudad jardín donde el Pacífico marca el ritmo.',
    description:
      'Viña del Mar es la ciudad balneario más clásica de Sudamérica. Casino, festival de música, jardines exuberantes y el cerro de Valparaíso a metros: un destino que combina cultura y playa.',
    longDescription:
      'Viña del Mar lleva décadas siendo el balneario favorito de los sudamericanos. Su Avenida Perú frente al Pacífico, el Reloj de Flores que marca la entrada a la ciudad, el imponente Casino Municipal y los jardines del Palacio Vergara componen una postal clásica. Pero la ciudad también tiene una escena gastronómica en crecimiento y una vida nocturna animada. A 10 minutos, Valparaíso es su contrapunto bohemio: los cerros con ascensores centenarios, el street art más conocido de Latinoamérica y los bares de los que nacieron generaciones de poetas.',
    highlights: [
      'Casino Municipal de Viña del Mar',
      'Festival Internacional de la Canción (febrero)',
      'Playa de Viña, Reñaca y Concon',
      'Cerros y ascensores de Valparaíso',
      'Street art de Valparaíso: el museo a cielo abierto',
      'Gastronomía marina: machas a la parmesana y locos',
    ],
    included: [
      'Vuelo a Santiago + bus ejecutivo a Viña del Mar (1h30)',
      'Hotel 4 estrellas frente al mar en Avenida Perú',
      'Traslados aeropuerto–hotel–aeropuerto',
      'Excursión de medio día a Valparaíso',
      'Seguro de viaje básico',
    ],
    notIncluded: [
      'Visa (argentinos no necesitan para Chile)',
      'Entradas al Casino',
      'Comidas (salvo el plan contratado)',
      'Alquiler de autos para visitar Concon o Casablanca',
    ],
    tips: [
      'Si viajás en febrero, comprá las entradas al Festival con meses de anticipación: es el evento más importante de Chile.',
      'Para ir a Valparaíso, el micro (bus) sale cada 10 minutos desde el Terminal Rodoviario de Viña y cuesta menos de USD 1.',
      'Las machas a la parmesana son el plato local por excelencia. El mejor lugar para comerlas es el Divinus en el Puerto de Valparaíso.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Llegada y primer paseo costero',
        description:
          'Vuelo a Santiago y bus ejecutivo a Viña del Mar. Check-in en el hotel. Paseo por la Avenida Perú y el Reloj de Flores. Cena en un restaurante del centro.',
      },
      {
        day: 2,
        title: 'Valparaíso bohemio',
        description:
          'Excursión a Valparaíso. Recorrido en ascensor por los cerros Concepción y Alegre, el museo a cielo abierto de street art. Almuerzo en el Café Vinilo. Regreso a Viña al atardecer. Noche en el Casino si se desea.',
      },
      {
        day: 3,
        title: 'Playas del norte: Reñaca y Concon',
        description:
          'Día de playa en Reñaca (la más activa y juvenil) o Concon (dunas de arena única). Almuerzo en un chiringuito de mariscos. Tarde libre de compras en el centro de Viña.',
      },
      {
        day: 4,
        title: 'Ruta del vino en Casablanca (opcional)',
        description:
          'Excursión de medio día al Valle de Casablanca, el valle vinícola más cercano, famoso por sus blancos. Degustación en 2 bodegas. Regreso y última cena en Viña.',
      },
      {
        day: 5,
        title: 'Mañana libre y regreso',
        description:
          'Mañana libre de playa o compras. Bus de regreso a Santiago para el vuelo de vuelta.',
      },
    ],
    practicalInfo: {
      language: 'Español',
      currency: 'Peso chileno (CLP). Los argentinos también pueden pagar con pesos o con tarjeta.',
      timezone: 'CLT / UTC−4 (CLST en verano: UTC−3)',
      voltage: '220V / 50Hz — igual que Argentina, sin adaptador',
      visaRequired: false,
      visaNote: 'Los argentinos ingresan a Chile con DNI. No se requiere visa ni pasaporte.',
      bestSeason: ['verano', 'primavera'],
      climate: 'Mediterráneo. Veranos secos y cálidos, inviernos lluviosos y frescos. El mar del Pacífico es frío todo el año (15–18 °C).',
      tipicalTemp: '12–26 °C',
    },
    pricePerDay: 72000,
    minDays: 3,
    maxDays: 10,
    ticketMultipliers: { economica: 1, ejecutiva: 1.6, primera: 2.2 },
    mealAddons: { 'sin-comidas': 0, desayuno: 5500, 'todo-incluido': 18000 },
    image: '/images/vina.jpg',
    gallery: ['/images/vina-2.jpg', '/images/vina-3.jpg', '/images/vina-4.jpg'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26593!2d-71.55198!3d-33.02457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dff7ce2b40a9%3A0x6c6b2d19c6b!2sViña%20del%20Mar!5e0!3m2!1ses!2sar',
    rating: 4.5,
    reviewCount: 178,
  },

  {
    id: '6',
    slug: 'bariloche',
    name: 'Bariloche',
    region: 'Río Negro',
    country: 'Argentina',
    continent: 'América del Sur',
    categories: ['nature', 'culture'],
    tagline: 'La Suiza argentina entre lagos y montañas.',
    description:
      'San Carlos de Bariloche ofrece lo mejor de la Patagonia andina: esquí en el Catedral, circuitos lacustres, chocolate artesanal y una arquitectura de madera y piedra que parece sacada de un cuento.',
    longDescription:
      'Bariloche es el destino más querido de la Argentina. El Centro Cívico de piedra y madera sobre la orilla del Lago Nahuel Huapi es una de las postales más reproducidas del país, y con razón: tiene una escala humana que pocas ciudades turísticas del mundo conservan. En invierno, el Cerro Catedral es el mejor centro de esquí de América del Sur. En verano, los senderos de la Patagonia se abren para el trekking, la pesca y el kayak. Y en cualquier época del año, el chocolate artesanal, la fondue y la cerveza artesanal de las fábricas locales son motivo suficiente para quedarse.',
    highlights: [
      'Cerro Catedral: esquí y snowboard en temporada (julio–octubre)',
      'Circuito chico: lagos Perito Moreno, Llao Llao y Punto Panorámico',
      'Trekking al Refugio Jakob o Frey',
      'Chocolate artesanal: fábricas Mamuschka, Rapa Nui y Del Turista',
      'Cruce andino a Chile por los lagos (2 días)',
      'Cerveza artesanal en Antares o Blest',
    ],
    included: [
      'Vuelo de cabotaje desde AEP o EZE',
      'Cabaña o hotel boutique en el centro o zona Llao Llao',
      'Traslados aeropuerto–alojamiento–aeropuerto',
      'Excursión en minibús al Circuito Chico',
      'Seguro de viaje básico',
    ],
    notIncluded: [
      'Forfait de esquí (en temporada, ~$20.000–$35.000 ARS por día)',
      'Alquiler de equipo de esquí o snowboard',
      'Comidas (salvo plan contratado)',
      'Excursiones opcionales (trekking, pesca)',
    ],
    tips: [
      'Para el trekking al Refugio Frey, salí muy temprano del Cerro Catedral (8am): son 3hs de subida y el refugio vale cada paso.',
      'En temporada alta (julio y enero) reservá el alojamiento con meses de anticipación. Los precios se duplican y la disponibilidad escasea.',
      'El micro urbano de Bariloche es sorprendentemente bueno y llega hasta el Llao Llao: comprá la tarjeta SUBE (aplica en Bariloche) en el terminal.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Llegada y Centro Cívico',
        description:
          'Vuelo a Bariloche y traslado al alojamiento. Tarde de aclimatación: paseo por el Centro Cívico, la costa del Nahuel Huapi y la Av. Bustillo. Cena y primer chocolate de la noche.',
      },
      {
        day: 2,
        title: 'Circuito Chico',
        description:
          'Excursión en minibús al Circuito Chico: Punto Panorámico, Lago Perito Moreno, Puerto Pañuelo y el mítico Hotel Llao Llao. Almuerzo con vista al lago. Tarde libre de compras de chocolate en el centro.',
      },
      {
        day: 3,
        title: 'Cerro Catedral (esquí en invierno / trekking en verano)',
        description:
          'Día completo en el Cerro Catedral. En invierno: clases de esquí o jornada en las pistas. En verano: silla hasta la media montaña y trekking al Refugio Frey (4–5 horas ida y vuelta). Almuerzo en el refugio.',
      },
      {
        day: 4,
        title: 'Isla Victoria y Bosque de Arrayanes',
        description:
          'Excursión en catamarán al Parque Nacional Nahuel Huapi. Desembarco en Isla Victoria con sendero entre arrayanes y coihues. Almuerzo a bordo. Regreso al puerto al atardecer.',
      },
      {
        day: 5,
        title: 'Mañana libre y regreso',
        description:
          'Mañana libre para compras de chocolate y souvenirs. Última cerveza artesanal en alguna cervecería del centro. Traslado al aeropuerto.',
      },
    ],
    practicalInfo: {
      language: 'Español',
      currency: 'Peso argentino (ARS). Todo el destino es en pesos, sin cambio necesario.',
      timezone: 'ART / UTC−3',
      voltage: '220V / 50Hz — igual que en el resto de Argentina',
      visaRequired: false,
      visaNote: 'Destino nacional. Solo se necesita DNI argentino.',
      bestSeason: ['invierno', 'verano', 'primavera'],
      climate: 'Patagónico andino. Veranos templados (15–25 °C) y soleados. Inviernos fríos con nieve abundante (−5 a 5 °C). El viento patagónico puede sorprender en cualquier época.',
      tipicalTemp: '−5 a 25 °C según la época',
    },
    pricePerDay: 68000,
    minDays: 5,
    maxDays: 14,
    ticketMultipliers: { economica: 1, ejecutiva: 1.5, primera: 2.0 },
    mealAddons: { 'sin-comidas': 0, desayuno: 4500, 'todo-incluido': 15000 },
    image: '/images/bariloche.jpg',
    gallery: ['/images/bariloche-2.jpg', '/images/bariloche-3.jpg', '/images/bariloche-4.jpg'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47574!2d-71.30845!3d-41.13322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a8b5a8c5b!2sBariloche!5e0!3m2!1ses!2sar',
    rating: 4.9,
    reviewCount: 621,
  },

  {
    id: '7',
    slug: 'maldivas',
    name: 'Islas Maldivas',
    region: 'Océano Índico',
    country: 'Maldivas',
    continent: 'Asia',
    categories: ['beach', 'nature'],
    tagline: 'El archipiélago donde el agua es el destino.',
    description:
      'Las Maldivas son el epítome del paraíso tropical: atolones de arena blanca, lagunas turquesas, resorts de villas sobre el agua y la mayor biodiversidad marina del planeta. Un viaje para una vez en la vida.',
    longDescription:
      'Las Islas Maldivas son 1.192 islas de coral distribuidas en 26 atolones en el centro del Océano Índico. Solo unas pocas islas tienen resorts, y cada uno es prácticamente un mundo privado. Las villas sobre el agua con piso de vidrio son la imagen más reconocida, pero las Maldivas tienen mucho más: arrecifes de coral con mantas raya y tiburones ballena, sandbanks privados donde estar solo con el océano, y atardeceres que parecen pintados. Es el destino más lejano del portfolio ViajaYa, y también el más transformador.',
    highlights: [
      'Villas overwater con piso de vidrio y escalera privada al mar',
      'Snorkel con mantas raya en el atolón de Hanifaru',
      'Nado con tiburones ballena (temporada mayo–octubre)',
      'Sandbank privado al atardecer (con picnic incluido en resorts premium)',
      'Buceo en los arrecifes de coral intactos',
      'Desayuno flotante en la laguna (experiencia icónica)',
    ],
    included: [
      'Vuelo internacional con escala (Dubai, Doha o Colombo)',
      'Resort all-inclusive 5 estrellas — seleccionado por ViajaYa',
      'Hidroavión o lancha rápida desde el aeropuerto de Malé al resort',
      'Todas las comidas, bebidas y actividades acuáticas del resort',
      'Seguro de viaje premium con cobertura de emergencias médicas',
    ],
    notIncluded: [
      'Visa (se otorga gratis al llegar para argentinos, 30 días)',
      'Excursiones fuera del resort (buceo certificado, excursiones a otras islas)',
      'Tratamientos de spa',
      'Compras en el resort (tiendas, souvenirs)',
    ],
    tips: [
      'La mejor época para ver tiburones ballena es de mayo a octubre en el atolón de South Ari. Reservá el tour con el resort con anticipación.',
      'Elegí un resort con house reef propio: podés hacer snorkel directamente desde la orilla sin necesidad de tomar un bote.',
      'Llevá efectivo en USD para propinas y compras pequeñas. Las tarjetas funcionan en los resorts, pero no en los islotes locales.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Vuelo y llegada al paraíso',
        description:
          'Vuelo internacional con escala. Llegada al Aeropuerto Internacional de Malé. Transfer en hidroavión (45 min de vuelo sobre los atolones) o lancha rápida al resort. Check-in y primera noche en la villa overwater.',
      },
      {
        day: 2,
        title: 'Arrecife de coral y snorkel',
        description:
          'Mañana de snorkel en el house reef del resort. Almuerzo en el restaurante sobre el agua. Por la tarde, kayak por la laguna turquesa. Atardecer desde la terraza de la villa.',
      },
      {
        day: 3,
        title: 'Excursión a sandbank privado',
        description:
          'Tour en bote a un banco de arena privado en medio del océano. Picnic de mediodía con champagne y frutos del mar. Snorkel en el arrecife cercano. Regreso al resort al atardecer. Cena de degustación.',
      },
      {
        day: 4,
        title: 'Buceo o nado con tiburones ballena',
        description:
          'Excursión de buceo certificado en los mejores arrecifes del atolón, o — en temporada — tour de nado con tiburones ballena. Tarde libre de spa o kayak. Cena a la luz de las velas en la playa.',
      },
      {
        day: 5,
        title: 'Día de resort y desayuno flotante',
        description:
          'Experiencia de desayuno flotante en la laguna (bandeja de frutas y café servida sobre el agua). Tarde libre de playa. Última cena de gala en el resort.',
      },
      {
        day: 6,
        title: 'Despedida y vuelo de regreso',
        description:
          'Check-out y transfer al aeropuerto de Malé. Vuelo internacional de regreso con escala.',
      },
    ],
    practicalInfo: {
      language: 'Divehi (idioma local) e inglés (lengua de negocios y turismo en todos los resorts)',
      currency: 'Rufiyaa maldiva (MVR). En los resorts todo se paga en USD.',
      timezone: 'MVT / UTC+5',
      voltage: '230V / 50Hz — se necesita adaptador de tipo G (clavija inglesa)',
      visaRequired: false,
      visaNote: 'Los argentinos reciben visa gratis al llegar (Visa on Arrival). Válida por 30 días. Solo se necesita pasaporte vigente y reserva del resort.',
      bestSeason: ['verano', 'otoño', 'invierno'],
      climate: 'Tropical monzónico. La estación seca (noviembre–abril) es la ideal: cielos despejados y mar calmo. La estación húmeda (mayo–octubre) tiene más lluvias pero también tiburones ballena.',
      tipicalTemp: '27–31 °C todo el año',
    },
    pricePerDay: 420000,
    minDays: 5,
    maxDays: 14,
    ticketMultipliers: { economica: 1, ejecutiva: 1.9, primera: 2.8 },
    mealAddons: { 'sin-comidas': 0, desayuno: 0, 'todo-incluido': 0 }, // All-inclusive incluido en el precio base
    image: '/images/maldivas.jpg',
    gallery: ['/images/maldivas-2.jpg', '/images/maldivas-3.jpg', '/images/maldivas-4.jpg'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1697636!2d73.09641!3d3.20284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b5c5c5c5c5c5c5c%3A0x1!2sMaldives!5e0!3m2!1ses!2sar',
    rating: 5.0,
    reviewCount: 147,
  },

  {
    id: '8',
    slug: 'cancun',
    name: 'Cancún',
    region: 'Quintana Roo',
    country: 'México',
    continent: 'América del Norte',
    categories: ['beach', 'culture', 'city'],
    tagline: 'Mar Caribe, cenotes y la historia maya a tu alcance.',
    description:
      'Cancún combina las playas más fotogénicas del Caribe con la profundidad cultural del mundo maya. Chichén Itzá, Tulum y Cobá están a pocas horas, mientras el Hotel Zone ofrece nightlife y gastronomía de primer nivel.',
    longDescription:
      'Cancún tiene dos caras que conviven perfectamente. La Zona Hotelera es una franja de 20 km de playas de arena blanca y mar turquesa, con hoteles todo incluido, restaurantes de playa y una vida nocturna que arranca a las 11pm. A solo 2 horas en auto, el mundo maya se abre en toda su magnitud: Chichén Itzá es una de las 7 maravillas del mundo moderno, Tulum combina ruinas mayas sobre un acantilado con el mar Caribe abajo, y los cenotes de la Riviera Maya son formaciones naturales únicas en el planeta. Cancún es, además, el destino con mejor conectividad aérea desde Buenos Aires de todo el Caribe.',
    highlights: [
      'Chichén Itzá: la pirámide de Kukulcán al amanecer',
      'Ruinas de Tulum con vista al Mar Caribe',
      'Cenotes de Valladolid e Ik Kil',
      'Playa Delfines: la más fotogénica del Hotel Zone',
      'Isla Mujeres en ferry: la isla más tranquila del Caribe mexicano',
      'Snorkel en el arrecife de Mesoamérica (segundo más grande del mundo)',
    ],
    included: [
      'Vuelo directo desde EZE (Aerolíneas Argentinas o Volaris)',
      'Hotel todo incluido 4 estrellas en la Zona Hotelera',
      'Traslados aeropuerto–hotel–aeropuerto',
      'Excursión de un día a Chichén Itzá o Tulum (a elección)',
      'Seguro de viaje básico',
    ],
    notIncluded: [
      'Visa (argentinos no necesitan visa para México)',
      'Formulario de Turista (FMM) — se completa online, es gratis',
      'Excursiones adicionales (cenotes, Isla Mujeres, Cobá)',
      'Compras y tours de buceo certificado',
    ],
    tips: [
      'Visitá Chichén Itzá un martes o miércoles (menos gente) y salí antes de las 8am: el sitio abre a las 8 y el calor es brutal a mediodía.',
      'Para los cenotes, el Cenote Ik Kil (cerca de Chichén Itzá) es el más fotogénico pero también el más masivo. El Cenote Dos Ojos y el Gran Cenote, cerca de Tulum, son más salvajes y valen el desvío.',
      'En la Zona Hotelera, la playa pública Playa Delfines (al final del boulevard, frente al hotel Moon Palace) es la más linda y completamente gratis.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Llegada y primera tarde caribeña',
        description:
          'Llegada al Aeropuerto Internacional de Cancún. Traslado al hotel todo incluido. Check-in y primer cóctel frente al mar. Tarde libre de playa. Cena en el hotel o en la Zona Hotelera.',
      },
      {
        day: 2,
        title: 'Chichén Itzá y cenote Ik Kil',
        description:
          'Salida temprana (7am) hacia Chichén Itzá. Visita guiada de 2 horas a la pirámide de Kukulcán y el Castillo. Almuerzo en Valladolid. Tarde: baño en el cenote Ik Kil. Regreso a Cancún al atardecer.',
      },
      {
        day: 3,
        title: 'Tulum y cenotes del sur',
        description:
          'Excursión a Tulum: ruinas mayas sobre el acantilado con vista al Caribe. Almuerzo en el pueblo de Tulum. Por la tarde, visita al Gran Cenote o Dos Ojos. Regreso a Cancún.',
      },
      {
        day: 4,
        title: 'Isla Mujeres',
        description:
          'Ferry desde Puerto Juárez a Isla Mujeres (20 minutos). Recorrido en carrito de golf por la isla, playa Norte y el pueblo de pescadores. Almuerzo de langosta y ceviche. Regreso en ferry al atardecer.',
      },
      {
        day: 5,
        title: 'Día libre y despedida',
        description:
          'Día libre de playa en el hotel o en Playa Delfines. Última cena de tacos y margaritas. Traslado al aeropuerto para el vuelo de regreso.',
      },
    ],
    practicalInfo: {
      language: 'Español',
      currency: 'Peso mexicano (MXN). En la Zona Hotelera se aceptan USD y tarjetas internacionales.',
      timezone: 'CST / UTC−6 (CDT en verano: UTC−5)',
      voltage: '127V / 60Hz — se necesita adaptador (los enchufes son tipo A/B)',
      visaRequired: false,
      visaNote: 'Los argentinos no necesitan visa para México. Solo DNI o pasaporte y el formulario FMM (gratuito, se completa online en migracion.gob.mx).',
      bestSeason: ['invierno', 'primavera'],
      climate: 'Tropical caribeño. Temporada alta de diciembre a abril: calor moderado, sin lluvias y excelente visibilidad en el mar. La temporada de huracanes va de junio a noviembre.',
      tipicalTemp: '24–33 °C',
    },
    pricePerDay: 155000,
    minDays: 5,
    maxDays: 14,
    ticketMultipliers: { economica: 1, ejecutiva: 1.8, primera: 2.5 },
    mealAddons: { 'sin-comidas': 0, desayuno: 8000, 'todo-incluido': 25000 },
    image: '/images/cancun.jpg',
    gallery: ['/images/cancun-2.jpg', '/images/cancun-3.jpg', '/images/cancun-4.jpg'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59680!2d-86.85130!3d21.16129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2b0d0e1a!2sCancún!5e0!3m2!1ses!2sar',
    rating: 4.6,
    reviewCount: 394,
  },

  {
    id: '9',
    slug: 'marbella',
    name: 'Marbella',
    region: 'Andalucía',
    country: 'España',
    continent: 'Europa',
    categories: ['beach', 'city', 'culture'],
    tagline: 'La Costa del Sol en su versión más glamorosa.',
    description:
      'Marbella es la ciudad de la Costa del Sol donde confluyen el lujo, la historia árabe y el Mediterráneo. El Casco Antiguo, Puerto Banús y las playas de Nagüeles definen un destino sofisticado y accesible desde Buenos Aires con conexión en Madrid.',
    longDescription:
      'Marbella lleva décadas siendo sinónimo de glamour mediterráneo. El Puerto Banús, con sus yates y boutiques de lujo, es su cara más conocida, pero la ciudad esconde un Casco Antiguo del siglo XV con callejuelas de cal blanca y la Plaza de los Naranjos que pocas ciudades europeas pueden igualar. Las playas de la Milla de Oro y Nagüeles tienen la calidad de arena y agua del Mediterráneo, y los chiringuitos sirven el mejor espeto de sardinas del mundo. Desde Marbella, Ronda —una de las ciudades más bellas de España— está a solo una hora de curvas y paisaje andaluz.',
    highlights: [
      'Casco Antiguo: Plaza de los Naranjos y calles de cal blanca',
      'Puerto Banús: yates, boutiques y vida nocturna de lujo',
      'Espeto de sardinas en los chiringuitos de la Milla de Oro',
      'Excursión a Ronda: el tajo y el puente Nuevo',
      'Excursión a Granada: la Alhambra (Patrimonio de la Humanidad)',
      'Ruta de los pueblos blancos: Ojén, Istán y Casares',
    ],
    included: [
      'Vuelo con escala en Madrid (Iberia o Air Europa)',
      'Hotel 4 estrellas frente al mar o en el centro histórico',
      'Traslados aeropuerto de Málaga–hotel–aeropuerto',
      'Excursión de día completo a Ronda o Granada (a elección)',
      'Seguro de viaje básico',
    ],
    notIncluded: [
      'Visa Schengen (argentinos no necesitan visa para España hasta 90 días)',
      'ETIAS (desde 2025, trámite online, ~€7)',
      'Comidas (salvo plan contratado)',
      'Alquiler de auto para explorar los pueblos blancos',
      'Entrada a la Alhambra (se reserva online con meses de anticipación, ~€19)',
    ],
    tips: [
      'La entrada a la Alhambra se agota con semanas de anticipación. Reservá online en alhambra-patronato.es el mismo día que comprés el paquete.',
      'Evitá Puerto Banús en agosto: está masificado y los precios se duplican. Mayo, junio o septiembre son los mejores meses.',
      'Los chiringuitos de la playa en Marbella sirven el desayuno más barato de Europa: café con leche y tostada con tomate por menos de €3.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Madrid y vuelo a Málaga',
        description:
          'Vuelo de Buenos Aires con escala en Madrid. Conexión a Málaga. Traslado al hotel en Marbella (45 min). Check-in y primer paseo por el Paseo Marítimo al atardecer. Cena de tapas en el Casco Antiguo.',
      },
      {
        day: 2,
        title: 'Casco Antiguo y Puerto Banús',
        description:
          'Mañana de recorrido por el Casco Antiguo: la Iglesia de Santiago, la Casa del Corregidor y la Plaza de los Naranjos. Almuerzo de espeto de sardinas en la playa. Por la tarde, Puerto Banús: los yates, la Golden Mile y los aperitivos en la terraza.',
      },
      {
        day: 3,
        title: 'Ronda: el tajo y la historia taurina',
        description:
          'Excursión de día completo a Ronda. La ciudad más espectacular de Andalucía: el Tajo de 100 metros de profundidad, el Puente Nuevo del siglo XVIII y la Plaza de Toros más antigua de España. Almuerzo de rabo de toro. Regreso a Marbella.',
      },
      {
        day: 4,
        title: 'Día de playa y pueblos blancos',
        description:
          'Mañana de playa en la Milla de Oro. Por la tarde, ruta en auto de alquiler por los pueblos blancos de la Sierra de las Nieves: Ojén y Mijas. Atardecer con vista al Mediterráneo desde el mirador de Mijas.',
      },
      {
        day: 5,
        title: 'Última mañana mediterránea y regreso',
        description:
          'Desayuno de tostada con tomate y café en la playa. Mañana libre de compras en el centro. Traslado al aeropuerto de Málaga. Vuelo de regreso con escala en Madrid.',
      },
    ],
    practicalInfo: {
      language: 'Español (castellano con acento andaluz)',
      currency: 'Euro (EUR). La Argentina no tiene acceso al mercado oficial del euro, así que conviene llevar efectivo o usar tarjeta Visa/Mastercard con buen tipo de cambio.',
      timezone: 'CET / UTC+1 (CEST en verano: UTC+2)',
      voltage: '230V / 50Hz — igual que en Argentina, sin adaptador (los enchufes son tipo F, el europeo estándar)',
      visaRequired: false,
      visaNote: 'Los argentinos pueden ingresar a España (zona Schengen) sin visa por hasta 90 días con pasaporte vigente. Desde 2025 se requiere ETIAS (~€7), un trámite online que tarda minutos.',
      bestSeason: ['primavera', 'verano', 'otoño'],
      climate: 'Mediterráneo seco. Veranos cálidos y secos (25–35 °C), inviernos suaves y lluviosos (10–18 °C). El agua del Mediterráneo llega a 26 °C en agosto.',
      tipicalTemp: '12–33 °C según la época',
    },
    pricePerDay: 195000,
    minDays: 7,
    maxDays: 14,
    ticketMultipliers: { economica: 1, ejecutiva: 1.9, primera: 2.7 },
    mealAddons: { 'sin-comidas': 0, desayuno: 8500, 'todo-incluido': 26000 },
    image: '/images/marbella.jpg',
    gallery: ['/images/marbella-2.jpg', '/images/marbella-3.jpg', '/images/marbella-4.jpg'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25786!2d-4.88613!3d36.51001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7326a0a6dc0e01%3A0x4a582bb46e2d68!2sMarbella!5e0!3m2!1ses!2sar',
    rating: 4.8,
    reviewCount: 267,
  },
];


export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationsByCategory(category: DestinationCategory): Destination[] {
  return destinations.filter((d) => d.categories.includes(category));
}

export function getDestinationsByContinent(continent: string): Destination[] {
  return destinations.filter((d) => d.continent === continent);
}

export function calculatePrice(
  destination: Destination,
  days: number,
  ticketClass: TicketClass,
  mealPlan: MealPlan
): {
  baseTotal: number;
  ticketExtra: number;
  mealExtra: number;
  subtotal: number;
  discount: number;
  discountRate: number;
  total: number;
} {
  const base = destination.pricePerDay * days;
  const ticketExtra = base * (destination.ticketMultipliers[ticketClass] - 1);
  const mealExtra = destination.mealAddons[mealPlan] * days;
  const subtotal = base + ticketExtra + mealExtra;
  const discountRate = days >= 10 ? 0.10 : 0;
  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  return { baseTotal: base, ticketExtra, mealExtra, subtotal, discount, discountRate, total };
}

export function formatARS(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUSD(arsAmount: number, dolarBlueVenta: number): string {
  const usd = arsAmount / dolarBlueVenta;
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(usd);
}