// Datos completos de los 30 días.
// type: 'brew' (con timer + pasos) | 'taste' (cata sin timer) | 'reflect' (solo escribir).
// carousel: slides formativos del PDF.
// steps: secuencia para el timer (solo brew).

export const DAYS = [
  // ====================================================================
  // FASE 1 — FUNDAMENTOS
  // ====================================================================
  {
    num: 1, phase: 'Fundamentos', title: 'Reconoce tu OREA', type: 'brew', baristaId: 'hoffmann',
    objective: 'Familiarizarte con los gestos. No buscas la taza perfecta hoy: solo observa cómo cae el agua, cómo se hincha el café, cómo queda el lecho.',
    carousel: [
      { title: 'Hoy es día de ritual', text: 'No buscas la taza perfecta. Buscas familiarizarte con los gestos. Monta el FAST, enjuaga el filtro con agua hirviendo (abundante — ese sabor a papel arruina tazas), y ejecuta la receta sin obsesión por los tiempos.', photoId: 'threeQuarter' },
      { title: 'Qué observar', text: 'Cómo cae el agua. Cómo se hincha el café en el bloom. Cómo queda el lecho al final. La técnica viene después; primero es el ritual.', photoId: 'topView' },
      { title: 'Vídeo recomendado', text: 'James Hoffmann · "The Ultimate V60 Technique" (15 min). No es OREA, pero los fundamentos del swirl, bloom y vertido circular son idénticos. La base de todo.', video: 'youtube.com/watch?v=AI4ynXzkSQo' , youtubeId: 'AI4ynXzkSQo' },
      { title: 'Antes de empezar', text: 'Pesa 14 g de café en grano. Calienta agua a 94 °C. Muele justo antes de preparar — nunca antes. Enjuaga el filtro con 100 g de agua caliente y tira esa agua.' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 94, grind: 'Media-fina (21–25 clicks Comandante)', bottom: 'FAST',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · vierte 28 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl suave (sin cuchara)' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte agua hasta los 100 g, haciéndolo en círculos, y espera' },
      { at: 80, action: 'pour', water: 160, label: 'Vierte agua hasta los 160 g, haciéndolo en círculos, y espera' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g, haciéndolo en círculos, y espera' },
      { at: 140, action: 'rao', label: 'Rao spin · gira la cafetera 10s' },
      { at: 150, action: 'drain', label: 'Drawdown · espera última gota' },
    ]
  },
  {
    num: 2, phase: 'Fundamentos', title: 'El bloom y el swirl', type: 'brew', baristaId: 'hoffmann',
    objective: 'Foco total en los primeros 40 segundos. Sin un bloom correcto, todo lo demás falla.',
    carousel: [
      { title: 'El bloom no es decorativo', text: 'Es el momento en que el CO2 sale del café molido y el agua puede penetrar uniformemente. Sin un bloom correcto, la primera mitad de tu brew está subextraída y la segunda sobreextraída.' },
      { title: 'El swirl tras el bloom', text: 'Agita la cafetera con un movimiento circular suave inmediatamente después de verter los 28 g. No uses cuchara — el swirl mezcla café y agua sin alterar el lecho.' },
      { title: '¿Tu café está fresco?', text: 'Si al hacer bloom se forma una cúpula que se hincha, tu café es fresco. Si apenas sube, tiene más de 4 semanas tostado. Apunta una palabra: activo, plano, espumoso, pasado.' },
      { title: 'Vídeo recomendado', text: 'James Hoffmann · "Why I Still Bloom" (12 min). Por qué el bloom sigue importando aunque algunos defiendan saltárselo.', video: 'youtube.com/watch?v=Ep3OAS5lYCk' , youtubeId: 'Ep3OAS5lYCk' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 94, grind: 'Media-fina', bottom: 'FAST',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · vierte 28 g de agua en 8 s, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl inmediato y observa cúpula' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte agua hasta los 100 g, y espera' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte agua hasta los 165 g, y espera' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g, y espera' },
      { at: 140, action: 'rao', label: 'Rao spin' },
      { at: 150, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 3, phase: 'Fundamentos', title: 'Caudal de vertido', type: 'brew', baristaId: 'hedrick',
    objective: 'Caudal objetivo: 5 g/s. Es decir, 50 g de agua en 10 segundos. Practica primero con báscula vacía.',
    carousel: [
      { title: 'OREA recomienda 5 g/s', text: 'Es decir, 50 g de agua en 10 segundos. Suena fácil hasta que lo intentas.' },
      { title: '¿Por qué importa?', text: 'Un caudal demasiado rápido tira el lecho hacia abajo y crea canales por donde el agua escapa sin extraer. Demasiado lento sobreextrae.' },
      { title: 'Altura del kettle', text: '5 a 8 cm sobre el café. Más alto crea canales, más bajo da poca uniformidad.' },
      { title: 'Practica primero sin café', text: 'Sobre la báscula vacía: vierte 50 g de agua contando "mil-uno, mil-dos…" hasta diez. Repite 5 veces hasta que te salga natural.' },
      { title: 'Vídeo recomendado', text: 'Lance Hedrick · "ULTIMATE POUROVER RECIPE" (24 min). Quédate hoy con la sección de pour rate y altura del kettle.', video: 'youtube.com/watch?v=BG5Tc8MR2_4' , youtubeId: 'BG5Tc8MR2_4' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 94, grind: 'Media-fina', bottom: 'FAST',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · 28 g de agua · 5 g/s, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 90, label: 'Vierte agua hasta los 90 g · ~12 s, y espera' },
      { at: 70, action: 'pour', water: 155, label: 'Vierte agua hasta los 155 g · ~13 s, y espera' },
      { at: 105, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g · ~15 s, y espera' },
      { at: 135, action: 'rao', label: 'Rao spin' },
      { at: 145, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 4, phase: 'Fundamentos', title: 'Lectura del drawdown', type: 'brew', baristaId: 'hedrick',
    objective: 'Aprender a medir y leer el drawdown — el tiempo que tarda el agua en pasar por el lecho.',
    carousel: [
      { title: 'El drawdown es tu indicador clave', text: 'Es el tiempo que tarda el agua en pasar por el lecho después del último pour. Es el indicador más fiable de si tu molienda está bien.' },
      { title: 'Rangos a memorizar', text: 'Si pasa de 3:30 con esta receta: molienda demasiado fina o hay fines bloqueando. Si baja de 2:00: demasiado gruesa.' },
      { title: 'Hoy cronometras 3 momentos', text: 'Inicio del último pour. Cuándo el agua deja el lecho descubierto. Última gota. La resta de los dos últimos = tu drawdown real.' },
      { title: 'Si está fuera de rango', text: '¿Más lento? Mañana sube un click la molienda. ¿Más rápido? Mañana baja un click.' },
      { title: 'Vídeo recomendado', text: 'Lance Hedrick · "How to FIX a Slow Drawdown" (14 min). Diagnóstico de drawdowns lentos y cómo corregirlos en mitad del brew.', video: 'youtube.com/watch?v=YvffHA8YfJk' , youtubeId: 'YvffHA8YfJk' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 94, grind: 'Media-fina', bottom: 'FAST',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · 28 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte agua hasta los 100 g, y espera' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte agua hasta los 165 g, y espera' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g · APUNTA ESTE TIEMPO, y espera' },
      { at: 145, action: 'rao', label: 'Rao spin' },
      { at: 155, action: 'drain', label: 'DRAWDOWN · cronométralo hasta última gota' },
    ]
  },
  {
    num: 5, phase: 'Fundamentos', title: 'Cata progresiva', type: 'taste', baristaId: 'hoffmann',
    objective: 'Probar el mismo café a 4 temperaturas distintas para entender cómo evoluciona.',
    carousel: [
      { title: 'Hoy te centras en probar', text: 'No en preparar. Un buen brew gana sabor al enfriarse. Si pierde, está sobreextraído. Si en frío aparece vacío, está subextraído.' },
      { title: 'La cata a distintas temperaturas', text: 'Es tu radiografía más honesta. Un café bien hecho mejora al templarse. Uno mal hecho se delata.' },
      { title: 'Cuatro momentos de cata', text: 'Recién hecho — primera palabra que te venga. A los 5 min. A los 10 min (templado, aquí aparecen muchas notas). A los 20 min (frío, el café revela todo).' },
      { title: 'Cómo interpretar', text: 'Si en frío amarga: sobreextracción. Si está vacío: subextracción. Si gana dulzor: vas bien.' },
      { title: 'Vídeo recomendado', text: 'James Hoffmann · "How to Taste Coffee" (22 min). Vocabulario y método para describir lo que pruebas.', video: 'youtube.com/watch?v=L40t5AFNuCE' , youtubeId: 'L40t5AFNuCE' },
    ]
  },
  {
    num: 6, phase: 'Fundamentos', title: 'Repetibilidad', type: 'reflect', baristaId: 'hoffmann',
    objective: 'Preparar dos brews idénticos seguidos. Si no salen parecidos, el problema es tu técnica, no la receta.',
    carousel: [
      { title: 'Sin repetibilidad no hay aprendizaje', text: 'Si no puedes preparar dos cafés iguales seguidos, no estás listo para tocar variables. Hoy la prueba es brutalmente simple.' },
      { title: 'La prueba', text: 'Dos brews idénticos, mismo café, mismos parámetros, mismas manos. ¿Saben parecido? ¿El drawdown es similar (±10 s)? Esa es tu base.' },
      { title: 'Diagnóstico', text: 'Si los dos brews son muy distintos, el problema está en tu técnica, no en la receta. Repite la fase 1 antes de avanzar.' },
      { title: 'Vídeo recomendado', text: 'James Hoffmann · "Why is Your Coffee Inconsistent?" (10 min). Las 7 causas más comunes de inconsistencia.', video: 'youtube.com/watch?v=ICw8xjg-bAk' , youtubeId: 'ICw8xjg-bAk' },
    ]
  },
  {
    num: 7, phase: 'Fundamentos', title: 'Reflexión y descanso', type: 'reflect',
    objective: 'No hagas café hoy. Revisa los 6 días anteriores. Si no puedes responder con concreción, repite la fase 1.',
    carousel: [
      { title: 'Hoy no haces café', text: 'Aprender no es solo hacer; también es leer lo que has hecho. Saca tu brew log y revisa los 6 días anteriores.' },
      { title: 'Cuatro preguntas que responder por escrito', text: '¿Cuál ha sido tu drawdown medio esta semana? ¿Cuál ha sido el brew que más te ha gustado y por qué? ¿Cuál el peor y por qué? ¿Qué notas en boca: dulce, ácido, amargo, vacío, equilibrado?' },
      { title: 'Si no puedes contestar con concreción', text: 'Repite la fase 1. No pasa nada por ir despacio: dominar la OREA en 30 días no es una carrera.' },
    ]
  },

  // ====================================================================
  // FASE 2 — VARIABLES
  // ====================================================================
  {
    num: 8, phase: 'Variables', title: 'Molienda más fina', type: 'brew', baristaId: 'hoffmann',
    objective: 'Cambias UNA sola variable: 3 clicks más fina. Todo lo demás idéntico.',
    carousel: [
      { title: 'Una variable, un día', text: 'Hoy cambias UNA sola cosa: la molienda. Bajas 3 clicks respecto a tu base. Todo lo demás idéntico.' },
      { title: 'Qué esperar', text: 'El drawdown se alargará entre 30 y 60 segundos. El café tendrá más cuerpo y posiblemente más amargor.' },
      { title: 'Esto no es bueno ni malo', text: 'Es información sobre cómo responde tu café a moliendas finas. Apunta drawdown y notas de cata.' },
      { title: 'Bandera roja', text: 'Si drawdown supera 4:00, está claramente sobreextraído. Sabor amargo y áspero confirman.' },
      { title: 'Vídeo recomendado', text: 'James Hoffmann · "Grind Size: How to Get It Right" (16 min). Cómo afecta el tamaño de molienda a la extracción.', video: 'youtube.com/watch?v=5yj0sV6aUZc' , youtubeId: '5yj0sV6aUZc' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 94, grind: '3 clicks MÁS FINO que tu base', bottom: 'FAST',
    targetTime: [170, 220],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · 28 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 45, action: 'pour', water: 100, label: 'Vierte agua hasta los 100 g, y espera' },
      { at: 90, action: 'pour', water: 165, label: 'Vierte agua hasta los 165 g, y espera' },
      { at: 135, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g, y espera' },
      { at: 160, action: 'drain', label: 'Drawdown (esperado más largo)' },
    ]
  },
  {
    num: 9, phase: 'Variables', title: 'Molienda más gruesa', type: 'brew',
    objective: 'Lo opuesto a ayer: 3 clicks más grueso. Compara las dos tazas radicalmente distintas.',
    carousel: [
      { title: 'Lo opuesto a ayer', text: 'Subes 3 clicks. Drawdown más rápido, taza más ácida y vacía.' },
      { title: 'Esa diferencia es tu palanca', text: 'Compara hoy con ayer y verás dos tazas radicalmente distintas con el mismo café. Esa diferencia entre 6 clicks es tu control sobre la extracción.' },
      { title: 'Reflexión final', text: '6 clicks de diferencia entre ayer y hoy. Dos cafés distintos. ¿Cuál prefieres? No hay respuesta correcta, hay tu paladar.' },
      { title: 'Lectura recomendada', text: 'Barista Hustle · "Grind Size and Extraction". Artículo + diagrama de cómo la molienda controla la extracción.', video: 'baristahustle.com/blog/grind-size-and-extraction' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 94, grind: '3 clicks MÁS GRUESO que tu base', bottom: 'FAST',
    targetTime: [120, 170],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · 28 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 35, action: 'pour', water: 100, label: 'Vierte agua hasta los 100 g, y espera' },
      { at: 65, action: 'pour', water: 165, label: 'Vierte agua hasta los 165 g, y espera' },
      { at: 95, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g, y espera' },
      { at: 115, action: 'drain', label: 'Drawdown (esperado más corto)' },
    ]
  },
  {
    num: 10, phase: 'Variables', title: 'Temperatura alta · 96 °C', type: 'brew', baristaId: 'hoffmann',
    objective: 'Vuelves a la molienda base. Subes el agua a 96 °C. Más extracción, más cuerpo, posible amargor.',
    carousel: [
      { title: 'Vuelves a molienda base', text: 'Y ahora subes el agua a 96 °C. Una sola variable distinta de la base original.' },
      { title: 'Más temperatura = más extracción', text: 'Más amargor, más cuerpo. En cafés muy claros (light roasts) puede sacar dulzor escondido. En tuestes medios suele ser excesivo.' },
      { title: 'Calienta a 96 °C exactos', text: 'No la dejes hervir y enfriar; mantén el hervidor en esa temperatura.' },
      { title: 'Vídeo recomendado', text: 'James Hoffmann · "Brewing Temperature: How Much Does It Matter?" (11 min). El vídeo definitivo sobre temperatura del agua.', video: 'youtube.com/watch?v=v5gNydILoYQ' , youtubeId: 'v5gNydILoYQ' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 96, grind: 'Media-fina (base)', bottom: 'FAST',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · 28 g de agua · 96 °C, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte agua hasta los 100 g, y espera' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte agua hasta los 165 g, y espera' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g, y espera' },
      { at: 150, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 11, phase: 'Variables', title: 'Temperatura baja · 88 °C', type: 'brew',
    objective: 'Bajas a 88 °C. Menos extracción, taza posiblemente plana. Define tu temperatura "de casa".',
    carousel: [
      { title: 'Hoy bajas a 88 °C', text: 'Menos extracción, taza posiblemente plana. En light roasts suele ser un error.' },
      { title: 'Para tuestes oscuros sí', text: 'Puede salvarte de un café que sale demasiado amargo a temperaturas más altas.' },
      { title: 'Tu mapa térmico', text: 'Después de 3 días con misma molienda y tres temperaturas (94, 96, 88), ya tienes un mapa de cómo responde tu café. Apunta tu temperatura preferida: esa es tu temperatura "de casa" para él.' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 88, grind: 'Media-fina (base)', bottom: 'FAST',
    targetTime: [160, 220],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · 28 g de agua · 88 °C, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte agua hasta los 100 g, y espera' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte agua hasta los 165 g, y espera' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g, y espera' },
      { at: 150, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 12, phase: 'Variables', title: 'Ratio fuerte · 1:14', type: 'brew',
    objective: 'Cambias el ratio a 1:14. Mismos 14 g, solo 196 g de agua. Taza más concentrada.',
    carousel: [
      { title: 'Cambias el ratio a 1:14', text: 'Mismos 14 g de café, pero solo 196 g de agua. Taza más concentrada, más cuerpo, más intensidad.' },
      { title: 'Concentración ≠ sobreextracción', text: 'No confundas las dos cosas. El porcentaje extraído puede ser el mismo, simplemente está más concentrado en menos líquido.' },
      { title: 'Qué buscar', text: '¿Más cuerpo? ¿Más intensidad? ¿O empieza a notar amargor por concentración? Anota la respuesta.' },
      { title: 'Lectura', text: 'Honest Coffee Guide · "Brew Ratios Explained". Artículo de referencia sobre ratios.', video: 'honestcoffeeguide.com/coffee-brewing-fundamentals/coffee-to-water-ratio' },
    ],
    coffee: 14, water: 196, ratio: '1:14', temp: 94, grind: 'Media-fina (base)', bottom: 'FAST',
    targetTime: [130, 180],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · 28 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 90, label: 'Vierte agua hasta los 90 g, y espera' },
      { at: 75, action: 'pour', water: 145, label: 'Vierte agua hasta los 145 g, y espera' },
      { at: 110, action: 'pour', water: 196, label: 'Vierte agua hasta los 196 g, y espera' },
      { at: 135, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 13, phase: 'Variables', title: 'Ratio débil · 1:18', type: 'brew',
    objective: 'Al revés que ayer: 1:18. Más agua, taza más diluida y sutil, más "té".',
    carousel: [
      { title: 'Hoy al revés: 1:18', text: 'Más agua, taza más diluida y sutil, más "té".' },
      { title: 'Qué revela', text: 'A veces revela notas que un ratio fuerte aplasta. Sobre todo en cafés naturales o fermentados, donde la complejidad aromática merece espacio.' },
      { title: 'Tu preferencia', text: 'Compara con ayer: ¿qué prefieres, concentración (1:14) o claridad (1:18)? El ratio "correcto" es el que más te gusta. No hay verdad absoluta.' },
      { title: 'Vídeo', text: 'James Hoffmann · "The Coffee Brewing Control Chart" (13 min). Cómo el ratio mueve tu café por el famoso gráfico TDS/extracción.', video: 'youtube.com/@jameshoffmann' },
    ],
    coffee: 14, water: 252, ratio: '1:18', temp: 94, grind: 'Media-fina (base)', bottom: 'FAST',
    targetTime: [160, 210],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · 28 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 110, label: 'Vierte agua hasta los 110 g, y espera' },
      { at: 80, action: 'pour', water: 180, label: 'Vierte agua hasta los 180 g, y espera' },
      { at: 120, action: 'pour', water: 252, label: 'Vierte agua hasta los 252 g, y espera' },
      { at: 150, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 14, phase: 'Variables', title: 'Rao spin · agitación final', type: 'brew', baristaId: 'rao',
    objective: 'Receta base + Rao spin tras el último pour. Compara con un brew SIN Rao spin para ver la diferencia.',
    carousel: [
      { title: 'Último día de variables', text: 'Hoy haces dos brews seguidos: uno solo con swirl tras el bloom, y otro añadiendo el Rao spin tras el último pour.' },
      { title: 'Qué es el Rao spin', text: 'Giro circular suave de la cafetera durante 10 segundos. Aplana el lecho y mejora la uniformidad de extracción.' },
      { title: 'Inventado por Scott Rao', text: 'Y adoptado por todo el mundo specialty. Hoy lo metes en tu repertorio.' },
      { title: 'Compara los dos brews', text: '¿Más plano el lecho final en B? ¿Más claridad y dulzor en la taza?' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 94, grind: 'Media-fina', bottom: 'FAST',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · 28 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte agua hasta los 100 g, y espera' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte agua hasta los 165 g, y espera' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g, y espera' },
      { at: 140, action: 'rao', label: 'RAO SPIN · gira 10 segundos' },
      { at: 150, action: 'drain', label: 'Drawdown' },
    ]
  },

  // ====================================================================
  // FASE 3 — LOS 4 FONDOS
  // ====================================================================
  {
    num: 15, phase: 'Los 4 fondos', title: 'FAST · el referente', type: 'brew',
    objective: 'La FAST es tu base. Cata muy detallada hoy para usarla de referencia esta semana.',
    carousel: [
      { title: 'FAST es tu vara de medir', text: 'La FAST es la base con la que has trabajado toda la fase 1 y 2. Es rápida, brillante, da claridad en taza.' },
      { title: 'Hoy la usas como referencia mental', text: 'Antes de empezar a explorar los otros 3 fondos. Cata muy detallada.' },
      { title: 'Cinco atributos en escala 1-5', text: 'Dulzor, acidez, cuerpo, claridad, retrogusto. Esa será tu vara de medir esta semana.' },
      { title: 'Tres palabras descriptivas', text: 'Apunta tres palabras que describan esta taza. Las usarás para comparar con los otros fondos.' },
    ],
    coffee: 18, water: 300, ratio: '1:16,6', temp: 93, grind: 'Media-fina', bottom: 'FAST',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 36, label: 'BLOOM · 36 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte agua hasta los 130 g, y espera' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte agua hasta los 215 g, y espera' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte agua hasta los 300 g, y espera' },
      { at: 145, action: 'rao', label: 'Rao spin' },
      { at: 155, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 16, phase: 'Los 4 fondos', title: 'CLASSIC · equilibrio', type: 'brew',
    objective: 'Cambias al CLASSIC. Subes 1 click la molienda. La taza gana equilibrio y profundidad.',
    carousel: [
      { title: 'CLASSIC: agujero más pequeño', text: 'El CLASSIC tiene un agujero de salida más pequeño que el FAST. Eso restringe el flujo y alarga el drawdown.' },
      { title: 'Qué cambia en taza', text: 'Pierde algo de brillo pero gana equilibrio y profundidad. Es el fondo recomendado por OREA cuando quieres una taza más "redonda".' },
      { title: 'Ajusta molienda', text: '1 click más grueso que FAST para compensar el flujo restringido.' },
      { title: 'Cata vs ayer', text: '¿Menos brillo? ¿Más equilibrio? ¿En qué situaciones querrías CLASSIC en vez de FAST?' },
      { title: 'Lectura recomendada', text: 'Caretta Coffee Roasters · "Brewing with the OREA V4". El artículo más completo y actual sobre los 4 fondos (nov 2025).', video: 'carettacoffee.com' },
    ],
    coffee: 18, water: 300, ratio: '1:16,6', temp: 93, grind: '1 click más grueso que FAST', bottom: 'CLASSIC',
    targetTime: [170, 230],
    steps: [
      { at: 0, action: 'pour', water: 36, label: 'BLOOM · 36 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte agua hasta los 130 g, y espera' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte agua hasta los 215 g, y espera' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte agua hasta los 300 g, y espera' },
      { at: 150, action: 'drain', label: 'Drawdown (más largo que FAST)' },
    ]
  },
  {
    num: 17, phase: 'Los 4 fondos', title: 'OPEN · claridad extrema', type: 'brew',
    objective: 'El fondo favorito de muchos competidores. Pours 3 y 4 son CENTRALES, no circulares.',
    carousel: [
      { title: 'OPEN: el favorito de competidores', text: 'Tostadores como Caretta lo usan a diario. Geometría que dirige el flujo al centro, drawdown muy rápido, taza brillante y muy clara.' },
      { title: 'Cambias el patrón de vertido', text: 'Bloom y pour 2 circulares. Pours 3 y 4 CENTRALES (chorro fino justo en el centro del lecho, sin tocar las paredes).' },
      { title: 'Drawdown será rápido', text: '~2:00 a 2:30. Si pasa de 3:00, sube la molienda mañana.' },
      { title: 'Cata', text: '¿Es la taza más limpia que has probado esta semana? Apunta la respuesta.' },
    ],
    coffee: 18, water: 300, ratio: '1:16,6', temp: 93, grind: 'Media-fina (igual que FAST)', bottom: 'OPEN',
    targetTime: [120, 160],
    steps: [
      { at: 0, action: 'pour', water: 36, label: 'BLOOM · 36 g de agua, haciéndolo en círculos, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte agua hasta los 130 g, haciéndolo en círculos, y espera' },
      { at: 75, action: 'pour', water: 215, label: 'Vierte agua hasta los 215 g · CENTRAL, y espera' },
      { at: 105, action: 'pour', water: 300, label: 'Vierte agua hasta los 300 g · CENTRAL, y espera' },
      { at: 135, action: 'drain', label: 'Drawdown rápido' },
    ]
  },
  {
    num: 18, phase: 'Los 4 fondos', title: 'APEX · híbrido', type: 'brew',
    objective: 'Necesitas el Negotiator + filtro cónico. El fondo más raro de la OREA.',
    carousel: [
      { title: 'APEX: el más raro de la OREA', text: 'Necesitas el accesorio Negotiator + un filtro cónico (V60 o CAFEC funcionan bien). Geometría híbrida entre flat y cónico.' },
      { title: 'Qué buscar', text: 'Cuerpo intermedio, dulzor pronunciado, claridad alta.' },
      { title: 'Cuidado con moliendas finas', text: 'Atascan por la geometría puntiaguda. Si ves estancamiento, sube molienda mañana.' },
      { title: 'Si no tienes Negotiator', text: 'Salta este día y haz el FAST de nuevo. No se puede hacer APEX sin el accesorio.' },
      { title: 'Lectura', text: 'Art of Brew · "Brewing with the APEX Bottom". Guía con avisos sobre cuándo el APEX se atasca.', video: 'artofbrew.coffee' },
    ],
    coffee: 18, water: 300, ratio: '1:16,6', temp: 93, grind: '1 click más fino que FAST', bottom: 'APEX + Negotiator',
    targetTime: [160, 210],
    steps: [
      { at: 0, action: 'pour', water: 36, label: 'BLOOM · 36 g de agua, haciéndolo en círculos, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte agua hasta los 130 g, haciéndolo en círculos, y espera' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte agua hasta los 215 g · mezcla, y espera' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte agua hasta los 300 g · central, y espera' },
      { at: 150, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 19, phase: 'Los 4 fondos', title: 'Tu fondo favorito', type: 'brew',
    objective: 'De los 4 días anteriores, ¿cuál sacó la taza que más te gustó? Hoy lo repites.',
    carousel: [
      { title: 'Tu "taza casa"', text: 'De los cuatro días anteriores, ¿cuál sacó la taza que más te gustó? Esa combinación de fondo + molienda + temperatura + ratio es tu "taza casa".' },
      { title: 'Hoy la repites', text: 'La que servirías a alguien sin pensar. Confirmas que sabes hacerla.' },
      { title: 'Test de repetibilidad', text: 'Si no sale igual que el día que la conociste, vuelve a la fase 1. Si sale igual: eso es repetibilidad real, enhorabuena.' },
    ],
    coffee: 18, water: 300, ratio: '1:16,6', temp: 93, grind: 'La que más te gustó', bottom: 'El que más te gustó',
    targetTime: [140, 200],
    steps: [
      { at: 0, action: 'pour', water: 36, label: 'BLOOM · 36 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte agua hasta los 130 g, y espera' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte agua hasta los 215 g, y espera' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte agua hasta los 300 g, y espera' },
      { at: 145, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 20, phase: 'Los 4 fondos', title: 'Cata comparativa', type: 'brew',
    objective: 'Dos brews del mismo café con dos fondos distintos (FAST y OPEN). Cata a ciegas si puedes.',
    carousel: [
      { title: 'Dos brews · dos fondos', text: 'Mismo café, mismas cantidades, misma agua, misma temperatura. Solo cambia el fondo.' },
      { title: 'Cata a ciegas si puedes', text: 'Si tienes un amigo en casa, que te tape las tazas. ¿Sabrías distinguirlas? ¿Cuál es más "café" para ti?' },
      { title: 'Apunta tres diferencias claras', text: 'Reflexión final: no hay respuesta "correcta". Hay tu paladar.' },
    ],
    coffee: 18, water: 300, ratio: '1:16,6', temp: 93, grind: 'Media-fina', bottom: 'FAST + OPEN (uno y otro)',
    targetTime: [140, 200],
    steps: [
      { at: 0, action: 'pour', water: 36, label: 'BLOOM · 36 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte agua hasta los 130 g, y espera' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte agua hasta los 215 g, y espera' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte agua hasta los 300 g, y espera' },
      { at: 145, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 21, phase: 'Los 4 fondos', title: 'Descanso reflexivo', type: 'reflect',
    objective: 'Hoy no preparas café. Escribe una página sobre tu fondo favorito con palabras concretas.',
    carousel: [
      { title: 'Hoy no preparas café', text: 'Escribe una página: cuál es tu fondo favorito y por qué con palabras concretas, no con un "porque me gusta más".' },
      { title: 'Cuatro frases que completar', text: 'Mi fondo favorito es... Lo es porque la taza tiene... (palabras concretas). Lo elegiría sobre el siguiente porque... Esta semana he aprendido que...' },
      { title: 'Si no puedes justificarlo', text: 'Repite la fase 3.' },
    ]
  },

  // ====================================================================
  // FASE 4 — RECETAS DE CAMPEONES
  // ====================================================================
  {
    num: 22, phase: 'Campeones', title: 'Tetsu Kasuya · 4:6', type: 'brew', baristaId: 'kasuya',
    objective: 'World Brewers Cup 2016. La receta más referenciada de los últimos diez años.',
    carousel: [
      { title: 'World Brewers Cup 2016', text: 'Tetsu Kasuya ganó con este método. Es la receta más referenciada de los últimos diez años en specialty coffee.' },
      { title: 'La idea del 4:6', text: 'Los dos primeros pours (40% del agua total) controlan el equilibrio dulzor/acidez. Los tres últimos (60%) controlan la fuerza.' },
      { title: 'Más agua en pour 1', text: '= más acidez. Más pours al final = más cuerpo. Puedes adaptar la receta jugando con esos dos extremos.' },
      { title: 'Molienda MUY gruesa', text: 'Tipo french press. Mucho más gruesa de lo habitual. Si pasa de 4:00 de drawdown, sube todavía más.' },
      { title: 'Vídeo recomendado', text: 'Tetsu Kasuya explica oficialmente el método con el que ganó el mundial.', video: 'youtube.com/watch?v=v8pL6vSuL_I' , youtubeId: 'v8pL6vSuL_I' },
    ],
    coffee: 15, water: 225, ratio: '1:15', temp: 92, grind: 'MUY GRUESA (tipo french press)', bottom: 'FAST',
    targetTime: [200, 240],
    steps: [
      { at: 0, action: 'pour', water: 45, label: 'Pour 1 · 45 g (acidez)' },
      { at: 45, action: 'pour', water: 90, label: 'Pour 2 · 90 g (dulzor)' },
      { at: 90, action: 'pour', water: 135, label: 'Pour 3 · 135 g (fuerza)' },
      { at: 135, action: 'pour', water: 180, label: 'Pour 4 · 180 g (fuerza)' },
      { at: 180, action: 'pour', water: 225, label: 'Pour 5 · 225 g (fuerza)' },
      { at: 210, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 23, phase: 'Campeones', title: 'Hoffmann · Ultimate V60', type: 'brew', baristaId: 'hoffmann',
    objective: 'La receta más vista de YouTube en pour-over. Decenas de millones de visualizaciones.',
    carousel: [
      { title: 'La receta más vista de YouTube', text: 'James Hoffmann es el barista más visto del mundo y su "Ultimate V60" tiene decenas de millones de visualizaciones. Punto de partida estándar.' },
      { title: 'La clave: swirl en lugar de remover', text: 'Olvida la cuchara. El swirl tras el bloom y al final mezcla café y agua sin alterar el lecho.' },
      { title: 'Adaptación a OREA + FAST', text: 'La receta original es para V60, pero se traslada perfectamente a la OREA con FAST.' },
      { title: 'Drawdown objetivo: 3:30', text: 'Mide desde el inicio del primer pour hasta la última gota.' },
    ],
    coffee: 15, water: 250, ratio: '1:16,6', temp: 96, grind: 'Media-fina', bottom: 'FAST',
    targetTime: [180, 230],
    steps: [
      { at: 0, action: 'pour', water: 45, label: 'BLOOM · 45 g de agua, y espera' },
      { at: 5, action: 'swirl', label: 'Swirl inmediato' },
      { at: 45, action: 'pour', water: 150, label: 'Vierte agua hasta los 150 g (30 s), y espera' },
      { at: 95, action: 'pour', water: 250, label: 'Vierte agua hasta los 250 g (30 s), y espera' },
      { at: 125, action: 'swirl', label: 'Swirl final' },
      { at: 130, action: 'drain', label: 'Drawdown · objetivo 3:30 total' },
    ]
  },
  {
    num: 24, phase: 'Campeones', title: 'Woelfl · Campeón Mundial 2024', type: 'brew', baristaId: 'wolfl',
    objective: 'La ÚNICA receta ganadora del Mundial con OREA V4 + FAST. Tu cafetera.',
    carousel: [
      { title: 'Tu cafetera ganó el mundial', text: 'Martin Woelfl ganó el World Brewers Cup 2024 usando exactamente esta cafetera: OREA V4 + fondo FAST. Es la única receta competitiva ganadora del mundial específicamente con tu cafetera.' },
      { title: 'Por eso es referencia obligatoria', text: 'Receta simple, énfasis en dial-in del molinillo. Calibra con precisión.' },
      { title: 'Molienda específica', text: '490 micras = 21-25 clicks Comandante (o equivalente en tu molinillo).' },
      { title: 'Si tu OREA puede ganar el mundial', text: 'También puede sacar tu mejor taza diaria. Sigue practicando.' },
      { title: 'Vídeo recomendado', text: 'European Coffee Trip · "Winning Pour Over Recipe by Martin Wölfl". La receta exacta que ganó el mundial 2024 usando esta misma cafetera, paso a paso en vídeo oficial.', video: 'youtube.com/watch?v=3SIFFaT1MFU', youtubeId: '3SIFFaT1MFU' },
    ],
    coffee: 17, water: 270, ratio: '1:15,9', temp: 93, grind: '490 μm (21-25 clicks Comandante)', bottom: 'FAST',
    targetTime: [170, 200],
    steps: [
      { at: 0, action: 'pour', water: 50, label: 'BLOOM · 50 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 45, action: 'pour', water: 120, label: 'Pour 2 · hasta 120 g' },
      { at: 75, action: 'pour', water: 200, label: 'Pour 3 · hasta 200 g' },
      { at: 110, action: 'pour', water: 270, label: 'Pour 4 · hasta 270 g' },
      { at: 145, action: 'drain', label: 'Drawdown · objetivo ~3:00' },
    ]
  },
  {
    num: 25, phase: 'Campeones', title: 'Lance Hedrick · Ultimate', type: 'brew', baristaId: 'hedrick',
    objective: 'Caudal alto (8 g/s), molienda gruesa para compensar, agua casi hirviendo.',
    carousel: [
      { title: 'Runner-up del US Brewers Cup', text: 'Lance Hedrick. Su receta "Ultimate Pourover" tiene millones de visualizaciones y es la referencia para usuarios intermedios-avanzados.' },
      { title: 'Caudal alto: 8 g/s', text: 'Más rápido que la regla OREA de 5 g/s. Compensas con molienda mucho más gruesa.' },
      { title: 'Agua casi hirviendo: 96-98 °C', text: 'Resultado: lechos planos, dulzor extremo.' },
      { title: 'Cómo subir tanto la molienda', text: 'Cuando te digas "esto está demasiado grueso", ese es el punto. Probablemente 26-30 clicks Comandante.' },
    ],
    coffee: 20, water: 300, ratio: '1:15', temp: 97, grind: 'GRUESA+ (26-30 clicks Comandante)', bottom: 'FAST',
    targetTime: [180, 230],
    steps: [
      { at: 0, action: 'pour', water: 100, label: 'Pour 1 · hasta 100 g · 8 g/s' },
      { at: 13, action: 'swirl', label: 'Swirl' },
      { at: 45, action: 'pour', water: 200, label: 'Pour 2 · hasta 200 g · 8 g/s' },
      { at: 80, action: 'pour', water: 300, label: 'Pour 3 · hasta 300 g · 8 g/s' },
      { at: 95, action: 'rao', label: 'Rao spin' },
      { at: 105, action: 'drain', label: 'Drawdown · objetivo ~3:30' },
    ]
  },
  {
    num: 26, phase: 'Campeones', title: "Matteo D'Ottavio · Bypass", type: 'brew', baristaId: 'dottavio',
    objective: 'UK Brewing Champion. Su receta usa BYPASS: agua limpia al café ya hecho.',
    carousel: [
      { title: 'UK Brewing Champion', text: 'Matteo es UK Brewing Champion y embajador OREA. Su receta usa bypass: añadir agua limpia al café ya hecho.' },
      { title: 'Por qué funciona', text: 'Permite controlar la concentración DESPUÉS del brew, no antes. Si te ha quedado intenso, diluyes. Si está bien, lo dejas.' },
      { title: 'Funciona con OPEN y APEX', text: 'En esos dos fondos saca lo mejor del bypass.' },
      { title: 'El protocolo', text: 'Receta normal. Catas el café. Añades 10 g de agua. Catas. Añades otros 10. Catas. Sigues hasta encontrar tu punto.' },
    ],
    coffee: 18, water: 260, ratio: '1:14,4 + bypass', temp: 92, grind: 'Media-fina', bottom: 'OPEN o APEX',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 36, label: 'BLOOM · 36 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 120, label: 'Vierte agua hasta los 120 g, y espera' },
      { at: 80, action: 'pour', water: 190, label: 'Vierte agua hasta los 190 g, y espera' },
      { at: 120, action: 'pour', water: 260, label: 'Vierte agua hasta los 260 g, y espera' },
      { at: 150, action: 'drain', label: 'Drawdown · luego bypass 15-30 g al gusto' },
    ]
  },
  {
    num: 27, phase: 'Campeones', title: 'DARA Madrid · Balanced', type: 'brew',
    objective: 'Receta de un barista madrileño adoptada oficialmente por OREA. La "casa" si no quieres pensar.',
    carousel: [
      { title: 'Una receta española', text: 'De un barista madrileño, adoptada oficialmente por OREA. Pensada para el fondo OPEN.' },
      { title: 'La receta "casa"', text: 'Si no quieres pensar. Equilibrada, fiable, con personalidad.' },
      { title: 'Espirales cada 40 segundos', text: 'Cuatro pours en espiral con cantidades acumuladas crecientes: 40, 90, 150, 200 g.' },
      { title: 'Cata como receta de barrio', text: '¿Es la taza que serviría un café de barrio bien hecho? Anota si la guardarías como receta de día normal.' },
    ],
    coffee: 13, water: 200, ratio: '1:15,4', temp: 92, grind: 'Media-fina', bottom: 'OPEN',
    targetTime: [150, 180],
    steps: [
      { at: 0, action: 'pour', water: 40, label: 'Pour 1 · hasta 40 g · espiral' },
      { at: 40, action: 'pour', water: 90, label: 'Pour 2 · hasta 90 g · espiral' },
      { at: 80, action: 'pour', water: 150, label: 'Pour 3 · hasta 150 g · espiral' },
      { at: 120, action: 'pour', water: 200, label: 'Pour 4 · hasta 200 g · espiral' },
      { at: 150, action: 'drain', label: 'Drawdown · objetivo 2:30-3:00' },
    ]
  },
  {
    num: 28, phase: 'Campeones', title: 'Mordy · So Soft', type: 'brew',
    objective: 'Para cafés muy delicados que se sobreextraen rápido. APEX, vertidos lentos, limpieza extrema.',
    carousel: [
      { title: 'Para cafés delicados', text: 'Mordy es colaborador oficial OREA. Esta receta está pensada para cafés muy delicados (naturales fermentados, microlotes muy aromáticos) que se sobreextraen rápido.' },
      { title: 'APEX + vertidos lentos', text: 'Drawdown breve. Resultado: limpieza extrema, respeto absoluto al aroma del café.' },
      { title: 'Solo si tienes el café adecuado', text: 'Esta receta brilla con cafés naturales fermentados o microlotes muy aromáticos. Con un café estándar es desaprovecharla.' },
      { title: 'Espirales LENTAS', text: 'No rápidas. El control del caudal aquí es crítico.' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 92, grind: 'Fina', bottom: 'APEX + Negotiator',
    targetTime: [140, 160],
    steps: [
      { at: 0, action: 'pour', water: 30, label: 'BLOOM · 30 g de agua · espiral lenta, y espera' },
      { at: 15, action: 'swirl', label: 'Swirl suave' },
      { at: 45, action: 'pour', water: 110, label: 'Vierte agua hasta los 110 g · espiral lenta, y espera' },
      { at: 85, action: 'pour', water: 175, label: 'Vierte agua hasta los 175 g · espiral lenta, y espera' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte agua hasta los 230 g · espiral lenta, y espera' },
      { at: 140, action: 'drain', label: 'Drawdown breve · 2:20-2:40' },
    ]
  },

  // ====================================================================
  // FASE 5 — CIERRE
  // ====================================================================
  {
    num: 29, phase: 'Cierre', title: 'Tu propia receta', type: 'reflect',
    objective: 'Después de 28 días con datos en mano, escribe TU receta. Una sola hoja.',
    carousel: [
      { title: 'Es el momento', text: 'Después de 28 días con material y datos en mano, escribe tu receta. Una sola hoja.' },
      { title: 'Qué tiene que llevar', text: 'Tu café preferido. Fondo. Ratio. Temperatura. Molienda (clicks o micras). Patrón de vertidos paso a paso. Drawdown esperado. Notas en taza descritas.' },
      { title: 'Esa hoja es el resultado de los 30 días', text: 'Guárdala. Vuelve a ella dentro de 6 meses para ver cuánto has progresado.' },
    ]
  },
  {
    num: 30, phase: 'Cierre', title: 'Cata a ciegas con un amigo', type: 'brew',
    objective: 'Final del viaje. Tu receta del día 29 + otra del mes que te gustara. Cata a ciegas con un invitado.',
    carousel: [
      { title: 'Final del viaje', text: 'Invita a alguien que no entienda mucho de café. Prepárale dos brews: tu receta del día 29 y cualquiera del mes que recuerdes y te gustara.' },
      { title: 'Que pruebe a ciegas', text: '¿Notará la diferencia? ¿Cuál prefiere? Eso es lo que importa, no que tu drawdown sea 3:14 vs 3:21.' },
      { title: 'La OREA es modular', text: 'Para que sigas explorando años. Bienvenido al specialty. Esto no acaba aquí.' },
    ],
    coffee: 18, water: 300, ratio: '1:16,6', temp: 93, grind: 'Tu preferida', bottom: 'Tu favorito',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 36, label: 'BLOOM · 36 g de agua, y espera' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte agua hasta los 130 g, y espera' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte agua hasta los 215 g, y espera' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte agua hasta los 300 g, y espera' },
      { at: 145, action: 'drain', label: 'Drawdown' },
    ]
  },
];
