// Catálogo de cafés de Zeri's Coffee recomendados para cada ejercicio.
//
// ⚠️ DATOS PLACEHOLDER. Cuando dispongamos del catálogo real de
// zeriscoffee.com (vía WooCommerce REST API, CSV exportado o lista
// manual), basta con reemplazar las entradas de COFFEES con los
// nombres / orígenes / precios / URLs verdaderos. La estructura del
// objeto y los baristaIds quedarán intactos.

export const COFFEES = {
  // Café claro, perfilado y limpio — ideal para ejercicios de cata y
  // recetas que buscan claridad/acidez (Fundamentos, Variables).
  ethiopiaWashed: {
    id: 'ethiopiaWashed',
    name: 'Etiopía Yirgacheffe',
    region: 'Yirgacheffe · Etiopía',
    process: 'Lavado',
    roast: 'Tueste claro',
    notes: 'Bergamota · jazmín · cítrico · té negro',
    summary: 'Lavado etiópico de manual. Aromas florales muy marcados, acidez brillante. Perfecto para entrenar el paladar y para recetas pensadas para destacar matices.',
    price: '14,90 €',
    weight: '250 g',
    photo: null, // pendiente de asignar imagen real
    shopUrl: 'https://zeriscoffee.com/tienda/',
  },

  // Lavado balanceado — para días de receta base y ajuste de drawdown.
  colombiaCaturra: {
    id: 'colombiaCaturra',
    name: 'Colombia Huila Caturra',
    region: 'Huila · Colombia',
    process: 'Lavado',
    roast: 'Tueste claro-medio',
    notes: 'Caramelo · pera · cacao · panela',
    summary: 'Dulzor estructurado y acidez controlada. Receta universal: si quieres una taza tipo "todo bien" sin sorpresas, es esta.',
    price: '13,90 €',
    weight: '250 g',
    photo: null,
    shopUrl: 'https://zeriscoffee.com/tienda/',
  },

  // Naturales / honey — más cuerpo, frutas oscuras. Ejercicios de
  // exploración de cuerpo y dulzor.
  brasilNatural: {
    id: 'brasilNatural',
    name: 'Brasil Cerrado Natural',
    region: 'Cerrado · Brasil',
    process: 'Natural',
    roast: 'Tueste medio',
    notes: 'Chocolate con leche · avellana · fruta roja madura',
    summary: 'Más cuerpo, menos acidez. Ideal cuando trabajamos extracciones largas o queremos sentir el lado dulce-tostado.',
    price: '12,50 €',
    weight: '250 g',
    photo: null,
    shopUrl: 'https://zeriscoffee.com/tienda/',
  },

  // Para los días de campeones / receta especial: algo distintivo,
  // procesado anaeróbico o experimental.
  costaRicaAnaerobic: {
    id: 'costaRicaAnaerobic',
    name: 'Costa Rica Naranjo Anaeróbico',
    region: 'Naranjo · Costa Rica',
    process: 'Anaeróbico honey',
    roast: 'Tueste claro',
    notes: 'Frutos rojos fermentados · ron · cacao puro',
    summary: 'Una taza con personalidad: notas funky pero estructuradas. Lo bueno para los días de Campeones y para cuando quieras un café que se acuerden.',
    price: '17,90 €',
    weight: '250 g',
    photo: null,
    shopUrl: 'https://zeriscoffee.com/tienda/',
  },
};

// Heurística por fase: si un día no tiene `coffeeId` explícito, escoge
// el café que mejor encaja con su fase del curso.
const DEFAULT_BY_PHASE = {
  Fundamentos: 'colombiaCaturra',
  Variables: 'ethiopiaWashed',
  'Los 4 fondos': 'brasilNatural',
  Campeones: 'costaRicaAnaerobic',
  Cierre: 'ethiopiaWashed',
};

export const getCoffee = (id) => COFFEES[id] || null;

export const getRecommendedCoffeeForDay = (day) => {
  if (!day) return null;
  if (day.coffeeId && COFFEES[day.coffeeId]) return COFFEES[day.coffeeId];
  const fallbackId = DEFAULT_BY_PHASE[day.phase];
  return fallbackId ? COFFEES[fallbackId] : null;
};
