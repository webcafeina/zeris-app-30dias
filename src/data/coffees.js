// Catálogo de cafés Zeri's recomendados por ejercicio.
// `slug` apunta al slug REAL del producto en zeriscoffee.com (WordPress).
// En runtime, `lib/zerisCatalog.js` resuelve nombre, link y imagen destacada
// vía /wp-json/wp/v2/product?slug=... — así la imagen siempre es la
// imagen destacada actual de la web (no requiere mantenimiento aquí).
//
// El resto de campos (notes, summary, process, roast) se mantienen
// editorialmente aquí porque no están todos accesibles vía REST sin
// autenticación. Cuando dispongamos del consumer key de WooCommerce,
// podremos enriquecer también esos campos automáticamente.

// Descuento "ahora" universal: 3% extra al comprar el café recomendado
// del ejercicio en el momento.
export const FLASH_DISCOUNT = {
  code: 'RECETA3',
  percent: 3,
  copy: '3% extra si lo compras ahora desde aquí',
};

export const COFFEES = {
  // Café claro etíope — ejercicios de claridad / cata
  ethiopiaBombe: {
    id: 'ethiopiaBombe',
    slug: 'ethiopia-bombe',
    code: 'ETH',
    process: 'Lavado',
    roast: 'Tueste claro',
    notes: 'Bergamota · jazmín · cítrico · té negro',
    summary: 'Etíope lavado de manual. Aromas florales muy marcados y acidez brillante. Ideal para entrenar el paladar y para recetas que buscan destacar matices.',
    bagColor: '#C44D2E',
    bagAccent: '#F5C56B',
    // shopUrl/photo/name/price salen automáticamente del WP REST.
  },

  // Lavado balanceado / dulzor estructurado
  fincaElDescansoLavado: {
    id: 'fincaElDescansoLavado',
    slug: 'finca-el-descanso-lavado',
    code: 'COL',
    process: 'Lavado',
    roast: 'Tueste claro-medio',
    notes: 'Caramelo · pera · cacao · panela',
    summary: 'Dulzor estructurado y acidez controlada. Una receta universal: si quieres una taza "todo bien" sin sorpresas, esta es la base.',
    bagColor: '#8B5A2B',
    bagAccent: '#D8B27E',
  },

  // Más cuerpo / fruta dulce — exploración de cuerpo
  fincaBethania: {
    id: 'fincaBethania',
    slug: 'finca-bethania',
    code: 'BET',
    process: 'Natural',
    roast: 'Tueste medio',
    notes: 'Chocolate con leche · avellana · fruta roja',
    summary: 'Más cuerpo, menos acidez. Ideal cuando trabajamos extracciones largas o queremos sentir el lado dulce-tostado.',
    bagColor: '#4A2E1A',
    bagAccent: '#C29768',
  },

  // Para los días de Campeones: algo experimental y memorable
  fincaSanFranciscoAnaerobico: {
    id: 'fincaSanFranciscoAnaerobico',
    slug: 'finca-san-francisco-natural-anaerobico',
    code: 'SFR',
    process: 'Natural anaeróbico',
    roast: 'Tueste claro',
    notes: 'Frutos rojos fermentados · ron · cacao',
    summary: 'Una taza con personalidad y notas funky. Idónea para los días de Campeones y para cuando quieras un café que se recuerde.',
    bagColor: '#7A2E2E',
    bagAccent: '#E3B16F',
  },
};

// Mapa fase del curso → café por defecto.
const DEFAULT_BY_PHASE = {
  Fundamentos: 'fincaElDescansoLavado',
  Variables: 'ethiopiaBombe',
  'Los 4 fondos': 'fincaBethania',
  Campeones: 'fincaSanFranciscoAnaerobico',
  Cierre: 'ethiopiaBombe',
};

export const getCoffee = (id) => COFFEES[id] || null;

export const getRecommendedCoffeeForDay = (day) => {
  if (!day) return null;
  if (day.coffeeId && COFFEES[day.coffeeId]) return COFFEES[day.coffeeId];
  const fallbackId = DEFAULT_BY_PHASE[day.phase];
  return fallbackId ? COFFEES[fallbackId] : null;
};
