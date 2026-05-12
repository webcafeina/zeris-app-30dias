// Glosario de términos técnicos del mundo del café de filtro.
// Cada entrada: term (clave única), short (1 línea), long (1-2 párrafos).
// Pensado para resolverse desde el componente <Hint term="bloom" />.

export const GLOSSARY = {
  bloom: {
    term: 'Bloom',
    short: 'Primer vertido pequeño que libera el CO₂ del café molido.',
    long: 'Los primeros 30–40 segundos de la extracción. Viertes una cantidad pequeña de agua (más o menos el doble del peso del café — para 14 g, unos 28 g de agua) y dejas que el café "respire": libera el CO₂ acumulado durante el tueste. Sin bloom, el agua no penetra uniformemente y la extracción queda desigual.\n\nSi tu café es fresco, verás que se forma una cúpula que se hincha. Si apenas sube, el café ya tiene varias semanas tostado.',
  },
  swirl: {
    term: 'Swirl',
    short: 'Movimiento circular suave de la cafetera para mezclar café y agua.',
    long: 'Justo después del bloom, sin usar cuchara, agitas la cafetera con un movimiento circular suave. El swirl mezcla café y agua de forma homogénea sin alterar el lecho del filtro. Es la alternativa a remover con cuchara — más limpia, sin riesgo de canalización.',
  },
  rao: {
    term: 'Rao spin',
    short: 'Giro final de la cafetera para asentar los finos del café molido.',
    long: 'Técnica popularizada por Scott Rao. Al terminar el último vertido, das un giro firme y controlado a la cafetera durante ~10 segundos. El movimiento centrífugo asienta los "finos" (partículas más pequeñas del molido) en el centro del lecho, lo que produce un drawdown más uniforme y una taza más limpia.',
  },
  drawdown: {
    term: 'Drawdown',
    short: 'Tiempo que tarda en caer la última gota de agua tras el último vertido.',
    long: 'La fase final del brew. Has terminado de verter agua y solo queda esperar a que el último líquido pase por el lecho de café hasta la jarra. El drawdown ideal está dentro del rango objetivo del día (normalmente 2:30 – 3:30 minutos en total).\n\nUn drawdown muy largo (>4 min) suele indicar molienda demasiado fina o sobreextracción. Uno muy corto (<2 min) indica molienda gruesa o subextracción.',
  },
  ratio: {
    term: 'Ratio',
    short: 'Proporción entre café molido y agua. Ej: 1:16 = 1 g café por 16 g agua.',
    long: 'La relación entre gramos de café y gramos de agua. Un 1:16,4 significa que por cada 1 g de café usas 16,4 g de agua. Para 14 g de café, eso son 14 × 16,4 ≈ 230 g de agua.\n\nRatios más bajos (1:13–1:14) dan tazas concentradas, intensas. Más altos (1:17–1:18) dan tazas más ligeras y delicadas. El rango "estándar" para filtrado V60 / OREA suele estar entre 1:15 y 1:17.',
  },
  fast: {
    term: 'FAST',
    short: 'El fondo más permeable de la OREA V4 Narrow. Drawdown rápido.',
    long: 'La OREA viene con varios "fondos" (bottoms) intercambiables: FAST, MEDIUM, SLOW. Cada uno tiene perforaciones de distinto tamaño que controlan cuán rápido cae el agua.\n\nFAST es el más permeable: ideal para tostados ligeros o cuando quieres que el café drene rápido. Si tu drawdown se va muy largo con FAST, probablemente estés moliendo demasiado fino.',
  },
  medium: {
    term: 'MEDIUM',
    short: 'Fondo intermedio de la OREA. Balance entre flujo y contacto.',
    long: 'El fondo MEDIUM ofrece un drawdown más controlado que FAST. Es el punto de partida recomendado para tostados de espectro medio o cuando quieres más cuerpo en la taza.',
  },
  slow: {
    term: 'SLOW',
    short: 'Fondo menos permeable. Más contacto agua–café, más extracción.',
    long: 'SLOW restringe el flujo, lo que aumenta el tiempo de contacto entre el agua y el café. Útil para extraer más en tostados muy oscuros o para experimentar con perfiles más intensos. Cuidado con sobreextraer (amargos).',
  },
  pourover: {
    term: 'Pour-over',
    short: 'Método de filtrado en el que viertes agua manualmente sobre café molido.',
    long: 'Familia de métodos de café filtrado en los que controlas manualmente cómo cae el agua sobre un lecho de café molido dentro de un filtro de papel. V60, Kalita Wave, OREA, Chemex y April son ejemplos. El resultado es una taza limpia, sin sedimentos, donde se perciben mucho los matices aromáticos del café.',
  },
  channeling: {
    term: 'Canalización (channeling)',
    short: 'El agua encuentra un camino preferente y deja parte del café sin extraer.',
    long: 'Si el lecho de café no está uniforme, o vertimos con demasiada fuerza, el agua puede crear "canales" por donde escapa sin tocar la mayor parte del molido. El resultado: una taza con sabores subextraídos (ácida, herbosa) y otras zonas sobreextraídas (amargo).\n\nSe previene con: lecho nivelado tras vaciar el molido, vertido suave desde altura moderada (5–8 cm), y un swirl tras el bloom.',
  },
  agitation: {
    term: 'Agitación',
    short: 'Cualquier movimiento que mezcla el agua con el café durante el brew.',
    long: 'El swirl, el rao spin y la propia altura del vertido son formas de agitación. A más agitación, más extracción (la superficie de contacto entre agua y café aumenta). Demasiada agitación puede romper el lecho y causar canalización.',
  },
  kettle: {
    term: 'Kettle (de cuello de cisne)',
    short: 'Hervidor con pico fino y curvado para verter con precisión.',
    long: 'Hervidor diseñado específicamente para pour-over. El cuello largo y estrecho permite controlar caudal, altura y dirección del vertido. Sin él se puede hacer café, pero la precisión es mucho menor — y la precisión es la diferencia entre una taza "ok" y una excelente.',
  },
  caudal: {
    term: 'Caudal',
    short: 'Velocidad a la que viertes agua. OREA recomienda ~5 g/s.',
    long: 'Cuántos gramos de agua estás vertiendo por segundo. Para OREA V4 Narrow, el objetivo es ~5 g/s (50 g en 10 segundos). Demasiado rápido: el lecho se rompe y canaliza. Demasiado lento: sobreextrae y amarga.\n\nSe practica primero con la báscula vacía: vierte 50 g contando "mil-uno, mil-dos…" hasta diez. Repite hasta que sea natural.',
  },
  drip: {
    term: 'Dripper',
    short: 'El cono o cuerpo de la cafetera donde se coloca el filtro y el café.',
    long: 'Es la pieza que sostiene el filtro y donde se extrae el café. La OREA V4 Narrow es un dripper; el V60 de Hario también lo es. Cada dripper tiene una geometría que afecta cómo fluye el agua y cómo se extrae.',
  },
  retro: {
    term: 'Retronasal',
    short: 'Aromas que percibes "por dentro" al respirar tras un sorbo.',
    long: 'En cata, los aromas se perciben de dos formas: ortonasal (los hueles antes de beber) y retronasal (los percibes en la garganta y nariz tras tragar). La retronasal es donde se aprecian los matices complejos: chocolate, frutos rojos, flores, frutos secos. Cierra la boca tras un sorbo y respira por la nariz: ahí están.',
  },
};
