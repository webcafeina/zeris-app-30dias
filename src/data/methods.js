// Catálogo de métodos de extracción soportados (o por soportar) en la app.
// `available: true` → habilitado, lleva al flujo de 30 días.
// `available: false` → visible en el selector pero marcado como "próximamente".

export const METHODS = [
  {
    id: 'orea',
    name: 'OREA V4 Narrow',
    category: 'Filtrado · cono moderno',
    description: 'El protagonista del reto. Cono cerámico diseñado para tueste claro de especialidad.',
    available: true,
  },
  {
    id: 'v60',
    name: 'V60 (Hario)',
    category: 'Filtrado · cono clásico',
    description: 'El referente universal del pour-over. Con técnica, una taza compleja y limpia.',
    available: false,
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    category: 'Inmersión + presión',
    description: 'Versátil, fácil, ideal para viaje. Inmersión y presión en un solo gesto.',
    available: false,
  },
  {
    id: 'moka',
    name: 'Cafetera italiana',
    category: 'Estufa · presión por vapor',
    description: 'El clásico español. Toda la vida en la cocina, con técnica se saca otra cosa.',
    available: false,
  },
  {
    id: 'french',
    name: 'Prensa francesa',
    category: 'Inmersión completa',
    description: 'Cuerpo y aceites intactos. Perfecta para tuestes más oscuros y para principiantes.',
    available: false,
  },
  {
    id: 'chemex',
    name: 'Chemex',
    category: 'Filtrado · papel grueso',
    description: 'Filtrado limpio y ceremonial. Idónea para 3-4 tazas y filtros más gruesos.',
    available: false,
  },
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'Máquina · 9 bar de presión',
    description: 'Requiere máquina y molinillo de espresso. Bestia aparte, técnica más exigente.',
    available: false,
  },
];

export const getMethod = (id) => METHODS.find((m) => m.id === id);
