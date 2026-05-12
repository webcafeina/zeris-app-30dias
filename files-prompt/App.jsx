import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Volume2, VolumeX, BookOpen, Target, Mic, MicOff, AlertTriangle, Lightbulb, Repeat, Coffee, ArrowRight, Sparkles } from 'lucide-react';

// Datos completos de los 30 días con todo el contenido del PDF
// type: 'brew' (con timer + pasos) | 'taste' (cata sin timer) | 'reflect' (solo escribir)
// carousel: pasos del carrusel formativo (lo que estaba en el PDF)
// steps: secuencia para el timer

const DAYS = [
  // ====================================================================
  // FASE 1 — FUNDAMENTOS
  // ====================================================================
  {
    num: 1, phase: 'Fundamentos', title: 'Reconoce tu OREA', type: 'brew',
    objective: 'Familiarizarte con los gestos. No buscas la taza perfecta hoy: solo observa cómo cae el agua, cómo se hincha el café, cómo queda el lecho.',
    carousel: [
      { title: 'Hoy es día de ritual', text: 'No buscas la taza perfecta. Buscas familiarizarte con los gestos. Monta el FAST, enjuaga el filtro con agua hirviendo (abundante — ese sabor a papel arruina tazas), y ejecuta la receta sin obsesión por los tiempos.' },
      { title: 'Qué observar', text: 'Cómo cae el agua. Cómo se hincha el café en el bloom. Cómo queda el lecho al final. La técnica viene después; primero es el ritual.' },
      { title: 'Vídeo recomendado', text: 'James Hoffmann · "The Ultimate V60 Technique" (15 min). No es OREA, pero los fundamentos del swirl, bloom y vertido circular son idénticos. La base de todo.', video: 'youtube.com/watch?v=AI4ynXzkSQo' , youtubeId: 'AI4ynXzkSQo' },
      { title: 'Antes de empezar', text: 'Pesa 14 g de café en grano. Calienta agua a 94 °C. Muele justo antes de preparar — nunca antes. Enjuaga el filtro con 100 g de agua caliente y tira esa agua.' },
    ],
    coffee: 14, water: 230, ratio: '1:16,4', temp: 94, grind: 'Media-fina (21–25 clicks Comandante)', bottom: 'FAST',
    targetTime: [150, 200],
    steps: [
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · vierte hasta 28 g' },
      { at: 10, action: 'swirl', label: 'Swirl suave (sin cuchara)' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte hasta 100 g (circular)' },
      { at: 80, action: 'pour', water: 160, label: 'Vierte hasta 160 g (circular)' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte hasta 230 g (circular)' },
      { at: 140, action: 'rao', label: 'Rao spin · gira la cafetera 10s' },
      { at: 150, action: 'drain', label: 'Drawdown · espera última gota' },
    ]
  },
  {
    num: 2, phase: 'Fundamentos', title: 'El bloom y el swirl', type: 'brew',
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM · vierte 28 g en 8 s' },
      { at: 10, action: 'swirl', label: 'Swirl inmediato y observa cúpula' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte hasta 100 g' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte hasta 165 g' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte hasta 230 g' },
      { at: 140, action: 'rao', label: 'Rao spin' },
      { at: 150, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 3, phase: 'Fundamentos', title: 'Caudal de vertido', type: 'brew',
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM 28 g · 5 g/s' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 90, label: 'Vierte hasta 90 g · ~12 s' },
      { at: 70, action: 'pour', water: 155, label: 'Vierte hasta 155 g · ~13 s' },
      { at: 105, action: 'pour', water: 230, label: 'Vierte hasta 230 g · ~15 s' },
      { at: 135, action: 'rao', label: 'Rao spin' },
      { at: 145, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 4, phase: 'Fundamentos', title: 'Lectura del drawdown', type: 'brew',
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM 28 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte hasta 100 g' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte hasta 165 g' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte hasta 230 g · APUNTA ESTE TIEMPO' },
      { at: 145, action: 'rao', label: 'Rao spin' },
      { at: 155, action: 'drain', label: 'DRAWDOWN · cronométralo hasta última gota' },
    ]
  },
  {
    num: 5, phase: 'Fundamentos', title: 'Cata progresiva', type: 'taste',
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
    num: 6, phase: 'Fundamentos', title: 'Repetibilidad', type: 'reflect',
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
    num: 8, phase: 'Variables', title: 'Molienda más fina', type: 'brew',
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM 28 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 45, action: 'pour', water: 100, label: 'Vierte hasta 100 g' },
      { at: 90, action: 'pour', water: 165, label: 'Vierte hasta 165 g' },
      { at: 135, action: 'pour', water: 230, label: 'Vierte hasta 230 g' },
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM 28 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 35, action: 'pour', water: 100, label: 'Vierte hasta 100 g' },
      { at: 65, action: 'pour', water: 165, label: 'Vierte hasta 165 g' },
      { at: 95, action: 'pour', water: 230, label: 'Vierte hasta 230 g' },
      { at: 115, action: 'drain', label: 'Drawdown (esperado más corto)' },
    ]
  },
  {
    num: 10, phase: 'Variables', title: 'Temperatura alta · 96 °C', type: 'brew',
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM 28 g · 96 °C' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte hasta 100 g' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte hasta 165 g' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte hasta 230 g' },
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM 28 g · 88 °C' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte hasta 100 g' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte hasta 165 g' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte hasta 230 g' },
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM 28 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 90, label: 'Vierte hasta 90 g' },
      { at: 75, action: 'pour', water: 145, label: 'Vierte hasta 145 g' },
      { at: 110, action: 'pour', water: 196, label: 'Vierte hasta 196 g' },
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM 28 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 110, label: 'Vierte hasta 110 g' },
      { at: 80, action: 'pour', water: 180, label: 'Vierte hasta 180 g' },
      { at: 120, action: 'pour', water: 252, label: 'Vierte hasta 252 g' },
      { at: 150, action: 'drain', label: 'Drawdown' },
    ]
  },
  {
    num: 14, phase: 'Variables', title: 'Rao spin · agitación final', type: 'brew',
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
      { at: 0, action: 'pour', water: 28, label: 'BLOOM 28 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 100, label: 'Vierte hasta 100 g' },
      { at: 80, action: 'pour', water: 165, label: 'Vierte hasta 165 g' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte hasta 230 g' },
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
      { at: 0, action: 'pour', water: 36, label: 'BLOOM 36 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte hasta 130 g' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte hasta 215 g' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte hasta 300 g' },
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
      { at: 0, action: 'pour', water: 36, label: 'BLOOM 36 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte hasta 130 g' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte hasta 215 g' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte hasta 300 g' },
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
      { at: 0, action: 'pour', water: 36, label: 'BLOOM 36 g · circular' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte hasta 130 g · circular' },
      { at: 75, action: 'pour', water: 215, label: 'Vierte hasta 215 g · CENTRAL' },
      { at: 105, action: 'pour', water: 300, label: 'Vierte hasta 300 g · CENTRAL' },
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
      { at: 0, action: 'pour', water: 36, label: 'BLOOM 36 g · circular' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte hasta 130 g · circular' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte hasta 215 g · mezcla' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte hasta 300 g · central' },
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
      { at: 0, action: 'pour', water: 36, label: 'BLOOM 36 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte hasta 130 g' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte hasta 215 g' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte hasta 300 g' },
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
      { at: 0, action: 'pour', water: 36, label: 'BLOOM 36 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte hasta 130 g' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte hasta 215 g' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte hasta 300 g' },
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
    num: 22, phase: 'Campeones', title: 'Tetsu Kasuya · 4:6', type: 'brew',
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
    num: 23, phase: 'Campeones', title: 'Hoffmann · Ultimate V60', type: 'brew',
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
      { at: 0, action: 'pour', water: 45, label: 'BLOOM · 45 g' },
      { at: 5, action: 'swirl', label: 'Swirl inmediato' },
      { at: 45, action: 'pour', water: 150, label: 'Vierte hasta 150 g (30 s)' },
      { at: 95, action: 'pour', water: 250, label: 'Vierte hasta 250 g (30 s)' },
      { at: 125, action: 'swirl', label: 'Swirl final' },
      { at: 130, action: 'drain', label: 'Drawdown · objetivo 3:30 total' },
    ]
  },
  {
    num: 24, phase: 'Campeones', title: 'Woelfl · Campeón Mundial 2024', type: 'brew',
    objective: 'La ÚNICA receta ganadora del Mundial con OREA V4 + FAST. Tu cafetera.',
    carousel: [
      { title: 'Tu cafetera ganó el mundial', text: 'Martin Woelfl ganó el World Brewers Cup 2024 usando exactamente esta cafetera: OREA V4 + fondo FAST. Es la única receta competitiva ganadora del mundial específicamente con tu cafetera.' },
      { title: 'Por eso es referencia obligatoria', text: 'Receta simple, énfasis en dial-in del molinillo. Calibra con precisión.' },
      { title: 'Molienda específica', text: '490 micras = 21-25 clicks Comandante (o equivalente en tu molinillo).' },
      { title: 'Si tu OREA puede ganar el mundial', text: 'También puede sacar tu mejor taza diaria. Sigue practicando.' },
      { title: 'Vídeo recomendado', text: 'European Coffee Trip · "Winning Pour Over by Martin Woelfl". Receta completa paso a paso.', video: 'europeancoffeetrip.com' },
    ],
    coffee: 17, water: 270, ratio: '1:15,9', temp: 93, grind: '490 μm (21-25 clicks Comandante)', bottom: 'FAST',
    targetTime: [170, 200],
    steps: [
      { at: 0, action: 'pour', water: 50, label: 'BLOOM · 50 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 45, action: 'pour', water: 120, label: 'Pour 2 · hasta 120 g' },
      { at: 75, action: 'pour', water: 200, label: 'Pour 3 · hasta 200 g' },
      { at: 110, action: 'pour', water: 270, label: 'Pour 4 · hasta 270 g' },
      { at: 145, action: 'drain', label: 'Drawdown · objetivo ~3:00' },
    ]
  },
  {
    num: 25, phase: 'Campeones', title: 'Lance Hedrick · Ultimate', type: 'brew',
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
    num: 26, phase: 'Campeones', title: "Matteo D'Ottavio · Bypass", type: 'brew',
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
      { at: 0, action: 'pour', water: 36, label: 'BLOOM 36 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 120, label: 'Vierte hasta 120 g' },
      { at: 80, action: 'pour', water: 190, label: 'Vierte hasta 190 g' },
      { at: 120, action: 'pour', water: 260, label: 'Vierte hasta 260 g' },
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
      { at: 0, action: 'pour', water: 30, label: 'BLOOM 30 g · espiral lenta' },
      { at: 15, action: 'swirl', label: 'Swirl suave' },
      { at: 45, action: 'pour', water: 110, label: 'Vierte hasta 110 g · espiral lenta' },
      { at: 85, action: 'pour', water: 175, label: 'Vierte hasta 175 g · espiral lenta' },
      { at: 120, action: 'pour', water: 230, label: 'Vierte hasta 230 g · espiral lenta' },
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
      { at: 0, action: 'pour', water: 36, label: 'BLOOM 36 g' },
      { at: 10, action: 'swirl', label: 'Swirl' },
      { at: 40, action: 'pour', water: 130, label: 'Vierte hasta 130 g' },
      { at: 80, action: 'pour', water: 215, label: 'Vierte hasta 215 g' },
      { at: 120, action: 'pour', water: 300, label: 'Vierte hasta 300 g' },
      { at: 145, action: 'drain', label: 'Drawdown' },
    ]
  },
];


// ============================================================================
// PALETA — PASTEL GLASSMORPHISM
// Blancos rotos, grises suaves. Azul para vertidos (acción activa con agua).
// Café oscuro (espresso solo) para drawdown (espera) y elementos importantes.
// ============================================================================
const C = {
  // Fondo: gradiente blanco/gris pastel muy suave
  bg: '#F7F6F4',
  bgGradient: 'linear-gradient(160deg, #FAFAF8 0%, #EFEDE8 100%)',

  // Glass: blancos transparentes para tarjetas glassmorphism MUY marcado
  glass: 'rgba(255, 255, 255, 0.45)',
  glassStrong: 'rgba(255, 255, 255, 0.78)',
  glassBorder: 'rgba(255, 255, 255, 0.85)',
  glassInner: 'rgba(255, 255, 255, 0.35)',

  // Sombras suaves para profundidad
  shadow: '0 8px 32px rgba(60, 40, 25, 0.06), 0 2px 8px rgba(60, 40, 25, 0.04)',
  shadowStrong: '0 20px 60px rgba(60, 40, 25, 0.10), 0 4px 16px rgba(60, 40, 25, 0.06)',

  // Texto en grises oscuros (no negro absoluto)
  text: '#2D2520',        // gris-café oscuro
  textMute: '#605650',    // gris medio
  textFaint: '#8F857D',   // gris claro

  // ACCION ACTIVA: azul de agua (vertidos en curso)
  pour: '#3B82C4',          // azul agua claro
  pourBright: '#5BA3DE',    // azul agua brillante
  pourDark: '#1E5A8F',      // azul agua oscuro
  pourLight: 'rgba(59, 130, 196, 0.08)',

  // ESPERA / DRAWDOWN: café espresso oscuro
  brew: '#3C2415',          // café espresso oscuro
  brewBright: '#5A3519',    // café medio
  brewLight: 'rgba(60, 36, 21, 0.08)',

  // Acento principal — café oscuro tipo espresso para CTAs y elementos clave
  accent: '#3C2415',
  accentBright: '#5A3519',
  accentLight: 'rgba(60, 36, 21, 0.10)',

  // Estados
  success: '#5B8C5A',  // verde sage pastel
  warn: '#C9A85C',     // mostaza suave
  danger: '#C46B6B',   // rojo terracota suave

  // Líneas
  divider: 'rgba(60, 40, 25, 0.08)',
};

// ============================================================================
// UTILIDADES
// ============================================================================

const STORAGE_KEY = 'zeris-orea-coach-v2';

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completed: {}, logs: {} };
  } catch { return { completed: {}, logs: {} }; }
};

const saveState = (state) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
};

const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

// Helper para "calentar" speechSynthesis en navegadores móviles
// (deben haber recibido un gesto del usuario antes del primer speak)
let voiceWarmed = false;
const warmUpVoice = () => {
  if (voiceWarmed || typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    // Crear un utterance vacío y silencioso para "desbloquear" la API
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    u.lang = 'es-ES';
    window.speechSynthesis.speak(u);
    voiceWarmed = true;
  } catch (e) {
    console.warn('[Voice] No se pudo calentar:', e);
  }
};

const speak = (text, enabled) => {
  if (!enabled) return;
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('[Voice] speechSynthesis no disponible en este navegador');
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = 1.05;
    u.pitch = 1.0;
    u.volume = 1.0;
    u.onerror = (e) => console.warn('[Voice] Error al hablar:', e.error, text);
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn('[Voice] Excepción:', e);
  }
};

const beep = (freq = 880, duration = 0.18, volume = 0.4) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {}
};

// ============================================================================
// CATA: ATRIBUTOS + DEFECTOS + MOTOR DE DIAGNÓSTICO
// ============================================================================

const TASTE_ATTRS = [
  { key: 'dulzor',  label: 'Dulzor',  icon: '🍯', lowLabel: 'nada',    highLabel: 'muy dulce' },
  { key: 'acidez',  label: 'Acidez',  icon: '🍋', lowLabel: 'plana',   highLabel: 'muy ácida' },
  { key: 'amargor', label: 'Amargor', icon: '☕', lowLabel: 'ninguno', highLabel: 'muy amarga' },
  { key: 'cuerpo',  label: 'Cuerpo',  icon: '💪', lowLabel: 'aguada',  highLabel: 'denso' },
];

const DEFECTS = [
  { key: 'seca',     label: 'Seca / astringente' },
  { key: 'aspera',   label: 'Áspera en boca' },
  { key: 'vacia',    label: 'Vacía / aguada' },
  { key: 'agria',    label: 'Agria (no ácida)' },
  { key: 'quemada',  label: 'Quemada / a humo' },
  { key: 'salada',   label: 'Salada' },
  { key: 'metalica', label: 'Metálica' },
  { key: 'papel',    label: 'A papel / cartón' },
];

function diagnose({ elapsed, targetMin, targetMax, attrs, defects }) {
  const findings = [];
  const actions = [];

  if (elapsed > targetMax) {
    const exc = elapsed - targetMax;
    findings.push({ type: 'time', severity: exc > 30 ? 'high' : 'medium', text: `Drawdown ${exc}s por encima del rango. Sobreextracción probable.` });
    actions.push('Sube 1 click la molienda mañana.');
    actions.push('Verifica que el papel está bien enjuagado (un papel seco puede ralentizar el flujo).');
    if (exc > 60) actions.push('Si pasa de nuevo: revisa el caudal de vertido (5 g/s objetivo). Caudal lento = drawdown largo.');
  } else if (elapsed < targetMin) {
    const def = targetMin - elapsed;
    findings.push({ type: 'time', severity: def > 30 ? 'high' : 'medium', text: `Drawdown ${def}s por debajo del rango. Subextracción probable.` });
    actions.push('Baja 1 click la molienda mañana.');
    actions.push('Verifica que no haya canalización (lecho desigual al final indica canales).');
  } else {
    findings.push({ type: 'time', severity: 'ok', text: 'Tiempo en rango óptimo. La molienda está bien calibrada.' });
  }

  const { dulzor = 5, acidez = 5, amargor = 5, cuerpo = 5 } = attrs;

  if (amargor >= 7 && dulzor <= 4) {
    findings.push({ type: 'taste', severity: 'high', text: 'Perfil sobreextraído: amargor dominante sin dulzor que lo equilibre.' });
    if (elapsed <= targetMax) {
      actions.push('Sube 1 click la molienda aunque el tiempo esté en rango.');
      actions.push('Baja temperatura 1-2 °C (prueba 92 °C en vez de 94).');
    }
  }
  if (acidez >= 7 && cuerpo <= 4 && dulzor <= 4) {
    findings.push({ type: 'taste', severity: 'high', text: 'Perfil subextraído: acidez agresiva sin cuerpo ni dulzor que la respalden.' });
    if (elapsed >= targetMin) {
      actions.push('Baja 1 click la molienda aunque el tiempo esté en rango.');
      actions.push('Sube temperatura 1-2 °C (prueba 95-96 °C).');
    }
  }
  if (acidez <= 3 && dulzor <= 4 && cuerpo <= 4) {
    findings.push({ type: 'taste', severity: 'medium', text: 'Taza plana en general. Posibles causas: café no fresco, agua mala, o ratio demasiado débil.' });
    actions.push('Verifica fecha de tueste del café (no debería pasar de 4 semanas).');
    actions.push('Si tu agua filtrada tiene TDS muy bajo (<50 ppm), prueba con más minerales.');
  }
  if (defects.seca || defects.aspera) {
    findings.push({ type: 'defect', severity: 'high', text: 'Astringencia detectada. Suele indicar sobreextracción o exceso de fines.' });
    actions.push('Sube molienda 1-2 clicks.');
    actions.push('Si usas papel barato, prueba con Sibarist o filtros premium.');
  }
  if (defects.vacia) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Sensación vacía. Probable subextracción o ratio débil.' });
    actions.push('Baja molienda 1 click o sube temperatura 2 °C.');
  }
  if (defects.quemada) {
    findings.push({ type: 'defect', severity: 'high', text: 'Notas a quemado. Sobreextracción severa o tueste muy oscuro.' });
    actions.push('Baja temperatura del agua a 88-90 °C.');
    actions.push('Sube molienda 2 clicks.');
  }
  if (defects.papel) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Sabor a papel. El filtro no se enjuagó suficiente.' });
    actions.push('Enjuaga el filtro con 150-200 g de agua hirviendo antes de cada brew.');
  }
  if (defects.agria) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Acidez agria (no agradable). Subextracción o café con defectos.' });
    actions.push('Baja molienda y sube temperatura.');
  }
  if (defects.metalica) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Notas metálicas. Agua con minerales en exceso o equipo sucio.' });
    actions.push('Limpia molinillo y cafetera a fondo.');
  }
  if (defects.salada) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Notas saladas. Subextracción muy temprana.' });
    actions.push('Baja molienda 1-2 clicks.');
  }

  return { findings, actions: [...new Set(actions)] };
}

// ============================================================================
// COMPONENTES UI BASE — GLASSMORPHISM
// ============================================================================

const GlassCard = ({ children, strong = false, style = {}, className = '' }) => (
  <div
    className={className}
    style={{
      background: strong ? C.glassStrong : C.glass,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: `1px solid ${C.glassBorder}`,
      borderRadius: 24,
      boxShadow: C.shadow,
      ...style,
    }}
  >
    {children}
  </div>
);

// ============================================================================
// PANTALLA 1 — HOME (lista de días)
// ============================================================================

function HomeScreen({ state, onDayClick }) {
  const completedCount = Object.keys(state.completed).length;
  const progress = (completedCount / 30) * 100;
  const phases = ['Fundamentos', 'Variables', 'Los 4 fondos', 'Campeones', 'Cierre'];

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, paddingBottom: 32 }}>
      {/* Hero header */}
      <div style={{ padding: '32px 20px 24px' }}>
        <div style={{ fontSize: 10, letterSpacing: '4px', color: C.accent, fontWeight: 700 }}>
          ZERI'S COFFEE · CÁCERES
        </div>
        <h1 style={{ color: C.text, fontSize: 36, fontWeight: 200, lineHeight: 0.95, marginTop: 10, letterSpacing: '-1.5px' }}>
          30 días
          <br />
          <span style={{ color: C.accent, fontWeight: 700 }}>con OREA</span>
        </h1>

        {/* Progreso glassmorphism */}
        <GlassCard strong style={{ padding: 18, marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: C.textFaint, letterSpacing: '2px', fontWeight: 700 }}>TU PROGRESO</span>
            <span>
              <span style={{ fontSize: 22, color: C.accent, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{completedCount}</span>
              <span style={{ fontSize: 14, color: C.textFaint }}> / 30</span>
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: 'rgba(90,53,25,0.08)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${C.accent}, ${C.accentBright})`,
                borderRadius: 4,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </GlassCard>
      </div>

      {/* Lista de fases */}
      <div style={{ padding: '0 20px' }}>
        {phases.map(phase => {
          const phaseDays = DAYS.filter(d => d.phase === phase);
          const phaseDone = phaseDays.filter(d => state.completed[d.num]).length;
          return (
            <div key={phase} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700, textTransform: 'uppercase' }}>
                  {phase}
                </span>
                <div style={{ flex: 1, height: 1, background: C.divider }} />
                <span style={{ fontSize: 11, color: C.textFaint, fontWeight: 600 }}>
                  {phaseDone}/{phaseDays.length}
                </span>
              </div>
              {phaseDays.map(day => (
                <DayCard
                  key={day.num}
                  day={day}
                  completed={!!state.completed[day.num]}
                  onClick={() => onDayClick(day.num)}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', color: C.textFaint, fontSize: 10, letterSpacing: '2px', marginTop: 12 }}>
        ZERISCOFFEE.COM
      </div>
    </div>
  );
}

function DayCard({ day, completed, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        background: completed ? `linear-gradient(135deg, rgba(5,150,105,0.08), rgba(5,150,105,0.02))` : C.glass,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: `1px solid ${completed ? 'rgba(5,150,105,0.3)' : C.glassBorder}`,
        borderRadius: 20,
        padding: 14,
        marginBottom: 10,
        boxShadow: C.shadow,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
      onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 52, height: 52, flexShrink: 0,
            borderRadius: 16,
            background: completed ? C.success : C.accentLight,
            color: completed ? '#FFF' : C.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {completed ? <Check size={26} strokeWidth={3} /> : day.num.toString().padStart(2, '0')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.text, fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.2px' }}>
            {day.title}
          </div>
          <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: 9, padding: '2px 8px', borderRadius: 6,
              background: day.type === 'brew' ? C.accentLight : 'rgba(217,119,6,0.12)',
              color: day.type === 'brew' ? C.accent : C.warn,
              letterSpacing: '1px', fontWeight: 700, textTransform: 'uppercase',
            }}>
              {day.type === 'brew' ? '☕ BREW' : day.type === 'taste' ? '👅 CATA' : '✍ REFLEXIÓN'}
            </span>
            {day.type === 'brew' && (
              <span style={{ fontSize: 10, color: C.textFaint }}>
                {day.coffee}g · {day.water}g · {day.temp}°C
              </span>
            )}
          </div>
        </div>
        <ChevronRight size={20} style={{ color: C.textFaint, flexShrink: 0 }} />
      </div>
    </button>
  );
}

// ============================================================================
// PANTALLA 2 — CARRUSEL FORMATIVO
// ============================================================================

function CarouselScreen({ day, onBack, onContinue }) {
  const [idx, setIdx] = useState(0);
  const slides = day.carousel || [];

  const next = () => {
    if (idx < slides.length - 1) setIdx(idx + 1);
    else onContinue();
  };
  const prev = () => {
    if (idx > 0) setIdx(idx - 1);
    else onBack();
  };

  if (slides.length === 0) {
    // Si no hay carrusel definido, pasa directo
    setTimeout(onContinue, 0);
    return null;
  }

  const slide = slides[idx];

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 4, color: C.textMute, cursor: 'pointer', padding: 8 }}
        >
          <ChevronLeft size={20} />
          <span style={{ fontSize: 13 }}>Volver</span>
        </button>
        <span style={{ fontSize: 11, color: C.textFaint, letterSpacing: '2px', fontWeight: 700 }}>
          DÍA {day.num} · {day.phase}
        </span>
      </div>

      {/* Indicadores de slide (puntos arriba) */}
      <div style={{ display: 'flex', gap: 6, padding: '0 20px', marginBottom: 24 }}>
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i === idx ? C.accent : 'rgba(90,53,25,0.15)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Contenido del slide */}
      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, color: C.accent, letterSpacing: '3px', fontWeight: 700, marginBottom: 12 }}>
          {idx === 0 ? 'INTRODUCCIÓN' : `PARTE ${idx + 1}`}
        </div>

        <h2 style={{ color: C.text, fontSize: 30, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 20 }}>
          {slide.title}
        </h2>

        <GlassCard strong style={{ padding: 24 }}>
          <p style={{ color: C.text, fontSize: 16, lineHeight: 1.55, fontWeight: 400 }}>
            {slide.text}
          </p>

          {/* Vídeo embebido de YouTube si hay youtubeId */}
          {slide.youtubeId && (
            <div style={{
              marginTop: 18,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: C.shadowStrong,
              position: 'relative',
              paddingBottom: '56.25%', /* 16:9 */
              height: 0,
              background: '#000',
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${slide.youtubeId}?rel=0`}
                title={slide.title}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Si no hay youtubeId pero hay enlace de referencia (web, canal), mostrarlo como chip */}
          {slide.video && !slide.youtubeId && (
            <div style={{
              marginTop: 16, padding: '12px 16px',
              background: C.accentLight, borderRadius: 12,
              fontSize: 12, color: C.accent, fontWeight: 600,
              wordBreak: 'break-all',
            }}>
              ▶ {slide.video}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Footer con navegación */}
      <div style={{ padding: 20, display: 'flex', gap: 12 }}>
        <button
          onClick={prev}
          style={{
            flex: idx === 0 ? '0 0 60px' : 1,
            background: C.glass,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${C.glassBorder}`,
            borderRadius: 18,
            padding: '18px',
            color: C.textMute,
            fontSize: 14, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            cursor: 'pointer',
            boxShadow: C.shadow,
          }}
        >
          <ChevronLeft size={18} />
          {idx === 0 ? '' : 'Anterior'}
        </button>
        <button
          onClick={next}
          style={{
            flex: 2,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
            border: 'none',
            borderRadius: 18,
            padding: '18px',
            color: '#FFF',
            fontSize: 15, fontWeight: 700, letterSpacing: '1.5px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(194,65,12,0.3)',
          }}
        >
          {idx === slides.length - 1 ? 'VER EJERCICIO' : 'SIGUIENTE'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// PANTALLA 3 — TIMELINE DE PASOS (pre-brew)
// ============================================================================

function TimelineScreen({ day, onBack, onStart }) {
  const steps = day.steps || [];
  const total = steps[steps.length - 1]?.at || 0;

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, paddingBottom: 24 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 12px', display: 'flex', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 4, color: C.textMute, cursor: 'pointer', padding: 8 }}
        >
          <ChevronLeft size={20} />
          <span style={{ fontSize: 13 }}>Volver</span>
        </button>
      </div>

      {/* Título */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700 }}>
          DÍA {day.num} · {day.phase.toUpperCase()}
        </div>
        <h2 style={{ color: C.text, fontSize: 26, fontWeight: 700, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.5px' }}>
          {day.title}
        </h2>
      </div>

      {/* Objetivo destacado */}
      <div style={{ padding: '0 20px 16px' }}>
        <GlassCard strong style={{ padding: 18, borderLeft: `4px solid ${C.warn}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Target size={14} style={{ color: C.warn }} />
            <span style={{ fontSize: 10, letterSpacing: '2px', color: C.warn, fontWeight: 700 }}>OBJETIVO DEL EJERCICIO</span>
          </div>
          <p style={{ color: C.text, fontSize: 14, lineHeight: 1.5 }}>{day.objective}</p>
        </GlassCard>
      </div>

      {/* Receta — chips */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 10, letterSpacing: '2px', color: C.textFaint, fontWeight: 700, marginBottom: 10 }}>
          LA RECETA
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <ParamChip label="Café" value={`${day.coffee} g`} />
          <ParamChip label="Agua" value={`${day.water} g`} />
          <ParamChip label="Ratio" value={day.ratio} />
          <ParamChip label="Temp" value={`${day.temp} °C`} />
          <ParamChip label="Molienda" value={day.grind} fullWidth />
          <ParamChip label="Fondo" value={day.bottom} fullWidth />
        </div>
      </div>

      {/* TIMELINE de pasos */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ fontSize: 10, letterSpacing: '2px', color: C.textFaint, fontWeight: 700, marginBottom: 10 }}>
          PASOS DEL EJERCICIO · TIEMPO TOTAL ~{formatTime(total)}
        </div>
        <div style={{ position: 'relative', paddingLeft: 28 }}>
          {/* Línea vertical */}
          <div style={{
            position: 'absolute', left: 11, top: 8, bottom: 8,
            width: 2, background: `linear-gradient(to bottom, ${C.accent} 0%, ${C.accentBright} 50%, rgba(90,53,25,0.2) 100%)`,
            borderRadius: 1,
          }} />
          {steps.map((step, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 14 }}>
              {/* Bullet */}
              <div style={{
                position: 'absolute', left: -28, top: 10,
                width: 22, height: 22, borderRadius: '50%',
                background: '#FFF',
                border: `3px solid ${C.accent}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: C.accent,
                boxShadow: '0 2px 8px rgba(194,65,12,0.2)',
              }}>
                {i + 1}
              </div>
              {/* Contenido */}
              <GlassCard strong style={{ padding: '10px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: C.text, fontWeight: 600, lineHeight: 1.35 }}>
                      {step.label}
                    </div>
                    {step.water && (
                      <div style={{ fontSize: 11, color: C.accent, marginTop: 2, fontWeight: 600 }}>
                        Báscula: {step.water} g
                      </div>
                    )}
                  </div>
                  <div style={{
                    fontSize: 13, color: C.accent, fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
                  }}>
                    {formatTime(step.at)}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      {/* Botón EMPEZAR (sticky abajo) */}
      <div style={{ padding: '0 20px' }}>
        <button
          onClick={() => { warmUpVoice(); onStart(); }}
          style={{
            width: '100%',
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
            border: 'none',
            borderRadius: 20,
            padding: '20px',
            color: '#FFF',
            fontSize: 16, fontWeight: 700, letterSpacing: '2px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer',
            boxShadow: '0 12px 32px rgba(194,65,12,0.35)',
          }}
        >
          <Play size={22} fill="#FFF" />
          EMPEZAR EJERCICIO
        </button>
        <div style={{ textAlign: 'center', fontSize: 11, color: C.textFaint, marginTop: 10 }}>
          Tendrás 3 segundos de cuenta atrás antes de empezar
        </div>
      </div>
    </div>
  );
}

function ParamChip({ label, value, fullWidth }) {
  return (
    <div style={{
      background: C.glassStrong,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${C.glassBorder}`,
      borderRadius: 14,
      padding: '10px 12px',
      gridColumn: fullWidth ? 'span 2' : 'auto',
      boxShadow: C.shadow,
    }}>
      <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: C.text, fontWeight: 700, marginTop: 2, lineHeight: 1.2 }}>
        {value}
      </div>
    </div>
  );
}

// ============================================================================
// PANTALLA 4 — CUENTA ATRÁS (3, 2, 1)
// ============================================================================

function CountdownScreen({ onDone, voiceOn = true }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      beep(880, 0.3, 0.5);
      speak('Empezamos', voiceOn);
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
    beep(660, 0.15, 0.3);
    speak(count.toString(), voiceOn);
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onDone, voiceOn]);

  return (
    <div style={{
      minHeight: '100vh', background: C.bgGradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontSize: 200, fontWeight: 200, color: C.accent,
        letterSpacing: '-10px', lineHeight: 1,
        textAlign: 'center',
        animation: 'pulse 1s ease-in-out',
      }}>
        {count || '¡YA!'}
      </div>
    </div>
  );
}

// ============================================================================
// PANTALLA 5 — BREW EN MARCHA (cronómetro arriba, tarjetas debajo, sin iconos)
// ============================================================================

function BrewRunningScreen({ day, onFinish }) {
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState('running'); // running | paused
  const [voiceOn, setVoiceOn] = useState(true);
  const announcedRef = useRef(new Set());
  const preAnnouncedRef = useRef(new Set());
  const intervalRef = useRef(null);

  const steps = day.steps || [];
  const targetMin = day.targetTime?.[0] || 150;
  const targetMax = day.targetTime?.[1] || 200;

  // Cronómetro
  useEffect(() => {
    if (phase !== 'running') return;
    intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  // Anuncio por voz EN EL MOMENTO EXACTO del paso
  useEffect(() => {
    if (phase !== 'running') return;
    const justNow = steps.findIndex((s, i) => s.at === elapsed && !announcedRef.current.has(i));
    if (justNow !== -1) {
      announcedRef.current.add(justNow);
      beep(880, 0.2, 0.4);
      if (voiceOn) speak(steps[justNow].label, voiceOn);
    }
  }, [elapsed, phase, steps, voiceOn]);

  // Pre-aviso a 10s: solo beep (sin voz)
  useEffect(() => {
    if (phase !== 'running') return;
    const nextIdx = steps.findIndex((s, i) => s.at > elapsed && !announcedRef.current.has(i));
    if (nextIdx !== -1) {
      const next = steps[nextIdx];
      const t = next.at - elapsed;
      if (t === 10 && !preAnnouncedRef.current.has(nextIdx)) {
        preAnnouncedRef.current.add(nextIdx);
        beep(660, 0.15, 0.3);
      }
    }
  }, [elapsed, phase, steps]);

  // Paso actual + siguiente
  const currentIdx = (() => {
    let last = 0;
    steps.forEach((s, i) => { if (elapsed >= s.at) last = i; });
    return last;
  })();
  const currentStep = steps[currentIdx];
  const nextStep = steps[currentIdx + 1];
  const tToNext = nextStep ? nextStep.at - elapsed : null;
  const stepDuration = nextStep ? (nextStep.at - currentStep.at) : 0;
  const stepProgress = nextStep && stepDuration > 0 ? ((elapsed - currentStep.at) / stepDuration) : 1;

  // Colores desaturados al ~20% según tipo de acción
  // pour → azul muy suave · resto (wait/drain/swirl/rao) → café muy suave
  const tonesForAction = (action) => {
    if (action === 'pour') {
      return {
        currentBg: 'rgba(59, 130, 196, 0.18)',      // azul agua 18%
        currentBorder: 'rgba(59, 130, 196, 0.35)',
        currentText: '#1E5A8F',                      // azul oscuro para texto
        ghostBg: 'rgba(59, 130, 196, 0.08)',         // azul 8%
        ghostBorder: 'rgba(59, 130, 196, 0.18)',
        ghostText: '#5A8AB5',
        progress: '#3B82C4',
      };
    }
    return {
      currentBg: 'rgba(60, 36, 21, 0.14)',          // café 14%
      currentBorder: 'rgba(60, 36, 21, 0.28)',
      currentText: '#3C2415',
      ghostBg: 'rgba(60, 36, 21, 0.06)',
      ghostBorder: 'rgba(60, 36, 21, 0.14)',
      ghostText: '#6B5544',
      progress: '#5A3519',
    };
  };

  const currentTones = currentStep ? tonesForAction(currentStep.action) : tonesForAction('pour');
  const nextTones = nextStep ? tonesForAction(nextStep.action) : null;

  // Color del cronómetro según estado
  const timeColor = (() => {
    if (elapsed < targetMin) return C.text;
    if (elapsed <= targetMax) return C.success;
    return C.danger;
  })();

  const timeStatus = (() => {
    if (elapsed < targetMin) return 'En progreso';
    if (elapsed <= targetMax) return 'Rango óptimo';
    return 'Drawdown largo';
  })();

  const togglePause = () => setPhase(p => p === 'running' ? 'paused' : 'running');

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, display: 'flex', flexDirection: 'column' }}>
      {/* Header mínimo */}
      <div style={{ padding: '14px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2px', fontWeight: 700 }}>
            DÍA {day.num}
          </div>
          <div style={{ fontSize: 12, color: C.textMute, fontWeight: 600, marginTop: 2 }}>
            {day.title}
          </div>
        </div>
        <button
          onClick={() => setVoiceOn(v => !v)}
          style={{
            padding: '8px 14px',
            borderRadius: 14,
            background: voiceOn ? 'rgba(60,36,21,0.08)' : 'rgba(60,40,25,0.03)',
            border: `1px solid ${voiceOn ? 'rgba(60,36,21,0.18)' : C.divider}`,
            color: voiceOn ? C.text : C.textFaint,
            cursor: 'pointer',
            fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
            backdropFilter: 'blur(20px)',
          }}
        >
          {voiceOn ? 'VOZ' : 'MUDO'}
        </button>
      </div>

      {/* CRONÓMETRO ARRIBA DEL TODO */}
      <div style={{ textAlign: 'center', padding: '12px 20px 8px' }}>
        <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700, marginBottom: 2 }}>
          TIEMPO · OBJETIVO {formatTime(targetMin)}–{formatTime(targetMax)}
        </div>
        <div style={{
          fontSize: 96, fontWeight: 200,
          color: timeColor, letterSpacing: '-4px',
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 0.95,
        }}>
          {formatTime(elapsed)}
        </div>
        <div style={{
          fontSize: 11, color: timeColor, marginTop: 2,
          fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
        }}>
          {timeStatus}
        </div>
      </div>

      {/* Barra de progreso al siguiente paso */}
      {nextStep && tToNext > 0 && (
        <div style={{ padding: '4px 20px 14px' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 9, color: C.textFaint, letterSpacing: '1.5px', fontWeight: 700,
            marginBottom: 4,
          }}>
            <span>SIGUIENTE EN</span>
            <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 11, color: tToNext <= 10 ? C.warn : C.textMute }}>
              {tToNext}s
            </span>
          </div>
          <div style={{
            height: 4, borderRadius: 2,
            background: 'rgba(60,40,25,0.08)', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${Math.max(0, Math.min(100, (1 - stepProgress) * 100))}%`,
              background: tToNext <= 10 ? C.warn : currentTones.progress,
              borderRadius: 2,
              transition: 'width 0.9s linear, background 0.3s',
            }} />
          </div>
        </div>
      )}

      {/* TARJETA ACTUAL — DEBAJO DEL CRONÓMETRO */}
      <div style={{ padding: '0 20px', position: 'relative' }}>
        {currentStep && (
          <div
            key={`current-${currentIdx}`}
            style={{
              background: currentTones.currentBg,
              backdropFilter: 'blur(24px) saturate(140%)',
              WebkitBackdropFilter: 'blur(24px) saturate(140%)',
              border: `1px solid ${currentTones.currentBorder}`,
              borderRadius: 22,
              padding: '18px 22px',
              boxShadow: C.shadow,
              animation: 'slideDownIn 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '3px', color: currentTones.currentText, opacity: 0.7, fontWeight: 700 }}>
              AHORA · PASO {currentIdx + 1} DE {steps.length}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginTop: 6, color: currentTones.currentText, letterSpacing: '-0.3px' }}>
              {currentStep.label}
            </div>
            {currentStep.water && (
              <div style={{
                marginTop: 10,
                fontSize: 13, fontWeight: 600,
                color: currentTones.currentText, opacity: 0.85,
                letterSpacing: '0.3px',
              }}>
                Báscula · {currentStep.water} g
              </div>
            )}
          </div>
        )}
      </div>

      {/* TARJETA FANTASMA (SIGUIENTE) — DEBAJO DE LA ACTUAL */}
      <div style={{ padding: '12px 20px 0', flex: 1 }}>
        {/* Aviso visual a 10s antes (reemplaza la fantasma) */}
        {nextStep && tToNext !== null && tToNext <= 10 && tToNext > 0 && (
          <div
            key={`prep-${currentIdx + 1}`}
            style={{
              background: 'rgba(201, 168, 92, 0.20)',
              backdropFilter: 'blur(24px) saturate(140%)',
              WebkitBackdropFilter: 'blur(24px) saturate(140%)',
              border: '1px solid rgba(201, 168, 92, 0.40)',
              borderRadius: 22,
              padding: '14px 20px',
              animation: 'softPulse 1.2s ease-in-out infinite',
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '3px', color: '#8A7333', fontWeight: 700 }}>
              PREPÁRATE EN {tToNext}s
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4, lineHeight: 1.25, color: '#7A6428' }}>
              {nextStep.label}
            </div>
            {nextStep.water && (
              <div style={{ fontSize: 12, color: '#8A7333', marginTop: 4, fontWeight: 600 }}>
                Báscula · {nextStep.water} g
              </div>
            )}
          </div>
        )}

        {/* Fantasma sigueinte — muy desaturada */}
        {nextStep && tToNext > 10 && nextTones && (
          <div
            key={`ghost-${currentIdx + 1}`}
            style={{
              background: nextTones.ghostBg,
              backdropFilter: 'blur(24px) saturate(120%)',
              WebkitBackdropFilter: 'blur(24px) saturate(120%)',
              border: `1px solid ${nextTones.ghostBorder}`,
              borderRadius: 22,
              padding: '14px 22px',
              animation: 'fadeInFromBottom 0.5s ease',
              boxShadow: C.shadow,
            }}
          >
            <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700 }}>
              SIGUIENTE
            </div>
            <div style={{ fontSize: 15, color: nextTones.ghostText, fontWeight: 600, marginTop: 4, lineHeight: 1.3 }}>
              {nextStep.label}
            </div>
            {nextStep.water && (
              <div style={{ fontSize: 11, color: nextTones.ghostText, opacity: 0.75, marginTop: 2 }}>
                Báscula · {nextStep.water} g
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controles inferiores — sin iconos */}
      <div style={{ padding: '12px 20px 20px', display: 'flex', gap: 10 }}>
        <button
          onClick={togglePause}
          style={{
            flex: 1, padding: '16px 0', borderRadius: 16,
            background: C.glassStrong,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${C.glassBorder}`,
            color: C.text,
            fontSize: 12, fontWeight: 700, letterSpacing: '2px',
            cursor: 'pointer',
            boxShadow: C.shadow,
          }}
        >
          {phase === 'paused' ? 'REANUDAR' : 'PAUSA'}
        </button>
        <button
          onClick={() => onFinish(elapsed)}
          style={{
            flex: 1.5, padding: '16px 0', borderRadius: 16,
            background: C.text,
            border: 'none',
            color: '#FFF',
            fontSize: 12, fontWeight: 700, letterSpacing: '2px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(60,40,25,0.20)',
          }}
        >
          TERMINAR
        </button>
      </div>

      <style>{`
        @keyframes slideDownIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInFromBottom {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes softPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}

// PANTALLA 6, 7, 8 — POST-BREW (resumen, cata, diagnóstico, notas)
// ============================================================================

function PostBrewScreen({ day, elapsed, onComplete, onRepeatLater, onRepeatNow }) {
  const [phase, setPhase] = useState('summary'); // summary | tasting | diagnosis | notes
  const [tasteAttrs, setTasteAttrs] = useState({ dulzor: 5, acidez: 5, amargor: 5, cuerpo: 5 });
  const [tasteDefects, setTasteDefects] = useState({});
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const recognitionRef = useRef(null);

  const targetMin = day.targetTime?.[0] || 150;
  const targetMax = day.targetTime?.[1] || 200;

  const timeColor = elapsed < targetMin ? C.accentBright : elapsed <= targetMax ? C.success : C.danger;

  const toggleDictation = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Tu navegador no soporta dictado por voz. Prueba en Chrome móvil.'); return; }
    if (isDictating) { recognitionRef.current?.stop(); setIsDictating(false); return; }
    const rec = new SR();
    rec.lang = 'es-ES';
    rec.interimResults = true;
    rec.continuous = true;
    let baseText = notes;
    rec.onresult = (e) => {
      let interim = '', finalT = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalT += t;
        else interim += t;
      }
      if (finalT) { baseText = (baseText + ' ' + finalT).trim(); setNotes(baseText); }
      else if (interim) setNotes((baseText + ' ' + interim).trim());
    };
    rec.onerror = () => setIsDictating(false);
    rec.onend = () => setIsDictating(false);
    recognitionRef.current = rec;
    rec.start();
    setIsDictating(true);
  };

  const diagnosis = (phase === 'diagnosis' || phase === 'notes')
    ? diagnose({ elapsed, targetMin, targetMax, attrs: tasteAttrs, defects: tasteDefects })
    : null;

  const finish = () => {
    onComplete({ elapsed, tasteAttrs, tasteDefects, rating, notes, diagnosis, timestamp: Date.now() });
  };

  // ---- SUMMARY (paso 1) ----
  if (phase === 'summary') {
    return (
      <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20 }}>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Sparkles size={32} style={{ color: C.accent, marginBottom: 8 }} />
          <h2 style={{ color: C.text, fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>
            ¡Extracción terminada!
          </h2>
        </div>

        <GlassCard strong style={{ padding: 24, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: '3px', color: C.textFaint, fontWeight: 700 }}>
            TIEMPO FINAL DE EXTRACCIÓN
          </div>
          <div style={{
            fontSize: 64, fontWeight: 200,
            color: timeColor, letterSpacing: '-2px',
            fontVariantNumeric: 'tabular-nums', lineHeight: 1,
            marginTop: 8,
          }}>
            {formatTime(elapsed)}
          </div>
          <div style={{ fontSize: 12, color: C.textFaint, marginTop: 8 }}>
            Rango objetivo: {formatTime(targetMin)} – {formatTime(targetMax)}
          </div>

          {elapsed > targetMax && (
            <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <AlertTriangle size={16} style={{ color: C.danger, marginTop: 2, flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: C.danger, fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}>
                    DRAWDOWN LARGO · {elapsed - targetMax}s POR ENCIMA
                  </div>
                  <div style={{ color: C.text, fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>
                    Probable sobreextracción. Cata el café para diagnosticar bien las causas.
                  </div>
                </div>
              </div>
            </div>
          )}
          {elapsed < targetMin && (
            <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <AlertTriangle size={16} style={{ color: C.warn, marginTop: 2, flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: C.warn, fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}>
                    DRAWDOWN CORTO · {targetMin - elapsed}s POR DEBAJO
                  </div>
                  <div style={{ color: C.text, fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>
                    Probable subextracción. Cata para confirmar.
                  </div>
                </div>
              </div>
            </div>
          )}
          {elapsed >= targetMin && elapsed <= targetMax && (
            <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', textAlign: 'left' }}>
              <div style={{ color: C.success, fontSize: 13, fontWeight: 600 }}>
                ✓ Tiempo en rango óptimo. Ahora la cata confirmará si molienda y temperatura son correctas.
              </div>
            </div>
          )}
        </GlassCard>

        <button
          onClick={() => setPhase('tasting')}
          style={{
            width: '100%', marginTop: 20,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
            border: 'none', borderRadius: 20, padding: 18,
            color: '#FFF', fontSize: 15, fontWeight: 700, letterSpacing: '2px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(194,65,12,0.3)',
          }}
        >
          <BookOpen size={20} />
          VAMOS A CATAR
        </button>

        <button
          onClick={onRepeatNow}
          style={{
            width: '100%', marginTop: 10,
            background: 'transparent', border: 'none',
            color: C.textMute, fontSize: 13, padding: 10,
            cursor: 'pointer',
          }}
        >
          Repetir extracción ahora
        </button>
      </div>
    );
  }

  // ---- TASTING (paso 2) ----
  if (phase === 'tasting') {
    return (
      <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20, paddingBottom: 32 }}>
        <button
          onClick={() => setPhase('summary')}
          style={{ background: 'transparent', border: 'none', color: C.textMute, fontSize: 13, padding: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
        >
          <ChevronLeft size={18} /> Volver
        </button>

        <h2 style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 6 }}>
          ¿Cómo te ha quedado?
        </h2>
        <p style={{ color: C.textMute, fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>
          Sé honesto. La intensidad importa más que si está «bien» o «mal».
        </p>

        {TASTE_ATTRS.map(attr => (
          <TasteSlider
            key={attr.key}
            attr={attr}
            value={tasteAttrs[attr.key]}
            onChange={(v) => setTasteAttrs(prev => ({ ...prev, [attr.key]: v }))}
          />
        ))}

        <div style={{ marginTop: 12, marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: '2px', fontWeight: 700 }}>
            ¿DETECTAS ALGÚN DEFECTO?
          </div>
          <div style={{ fontSize: 12, color: C.textFaint, marginTop: 4 }}>
            Marca los que apliquen (puedes marcar varios o ninguno).
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
          {DEFECTS.map(d => {
            const active = !!tasteDefects[d.key];
            return (
              <button
                key={d.key}
                onClick={() => setTasteDefects(prev => ({ ...prev, [d.key]: !prev[d.key] }))}
                style={{
                  padding: '12px 14px', textAlign: 'left',
                  background: active ? 'rgba(220,38,38,0.1)' : C.glassStrong,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${active ? C.danger : C.glassBorder}`,
                  borderRadius: 14,
                  color: active ? C.danger : C.textMute,
                  fontSize: 13, fontWeight: active ? 700 : 500,
                  cursor: 'pointer', boxShadow: C.shadow,
                  transition: 'all 0.2s',
                }}
              >
                {active && '✓ '}{d.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: '2px', fontWeight: 700, marginBottom: 8 }}>
            VALORACIÓN GLOBAL
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1,2,3,4,5].map(n => (
              <button
                key={n}
                onClick={() => setRating(n)}
                style={{
                  flex: 1, padding: '14px 0', borderRadius: 14,
                  background: rating >= n ? `linear-gradient(135deg, ${C.accent}, ${C.accentBright})` : C.glassStrong,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${rating >= n ? 'transparent' : C.glassBorder}`,
                  color: rating >= n ? '#FFF' : C.textFaint,
                  fontSize: 20, fontWeight: 700,
                  cursor: 'pointer', boxShadow: C.shadow,
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setPhase('diagnosis')}
          style={{
            width: '100%', marginTop: 28,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
            border: 'none', borderRadius: 20, padding: 18,
            color: '#FFF', fontSize: 15, fontWeight: 700, letterSpacing: '2px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(194,65,12,0.3)',
          }}
        >
          <Lightbulb size={20} />
          VER DIAGNÓSTICO
        </button>
      </div>
    );
  }

  // ---- DIAGNOSIS (paso 3) ----
  if (phase === 'diagnosis' && diagnosis) {
    return (
      <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20, paddingBottom: 32 }}>
        <button
          onClick={() => setPhase('tasting')}
          style={{ background: 'transparent', border: 'none', color: C.textMute, fontSize: 13, padding: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
        >
          <ChevronLeft size={18} /> Volver
        </button>

        <div style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700 }}>
          DIAGNÓSTICO DE LA TAZA
        </div>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, marginTop: 6, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
          {diagnosis.findings.some(f => f.severity === 'high') ? 'Hay margen de mejora claro' :
           diagnosis.findings.some(f => f.severity === 'medium') ? 'Pequeños ajustes' :
           '✓ Bien ejecutado'}
        </h2>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: '2px', color: C.textFaint, fontWeight: 700, marginBottom: 10 }}>
            QUÉ HA PASADO
          </div>
          {diagnosis.findings.map((f, i) => {
            const c = f.severity === 'high' ? C.danger : f.severity === 'medium' ? C.warn : C.success;
            return (
              <GlassCard key={i} strong style={{ padding: 14, marginBottom: 10, borderLeft: `4px solid ${c}` }}>
                <div style={{ color: c, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px' }}>
                  {f.type === 'time' ? '⏱ TIEMPO' : f.type === 'taste' ? '👅 PERFIL' : '⚠ DEFECTO'}
                </div>
                <div style={{ color: C.text, fontSize: 13.5, marginTop: 5, lineHeight: 1.45 }}>
                  {f.text}
                </div>
              </GlassCard>
            );
          })}
        </div>

        {diagnosis.actions.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: '2px', color: C.accent, fontWeight: 700, marginBottom: 10 }}>
              QUÉ HACER MAÑANA
            </div>
            <GlassCard strong style={{ padding: 18 }}>
              <ol style={{ margin: 0, paddingLeft: 18 }}>
                {diagnosis.actions.map((a, i) => (
                  <li key={i} style={{ color: C.text, fontSize: 13.5, lineHeight: 1.55, marginBottom: 8 }}>
                    {a}
                  </li>
                ))}
              </ol>
            </GlassCard>
          </div>
        )}

        <button
          onClick={() => setPhase('notes')}
          style={{
            width: '100%', marginTop: 24,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
            border: 'none', borderRadius: 20, padding: 18,
            color: '#FFF', fontSize: 15, fontWeight: 700, letterSpacing: '2px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(194,65,12,0.3)',
          }}
        >
          <BookOpen size={20} />
          AÑADIR NOTAS
        </button>
      </div>
    );
  }

  // ---- NOTES (paso 4) ----
  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20, paddingBottom: 32 }}>
      <button
        onClick={() => setPhase('diagnosis')}
        style={{ background: 'transparent', border: 'none', color: C.textMute, fontSize: 13, padding: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
      >
        <ChevronLeft size={18} /> Volver
      </button>

      <div style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700 }}>
        CUADERNO DE CATA
      </div>
      <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, marginTop: 6, letterSpacing: '-0.5px' }}>
        Añade lo que quieras recordar
      </h2>
      <p style={{ color: C.textMute, fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
        Tu cata, tiempo, defectos y recomendaciones ya están guardados. Aquí puedes añadir lo que falte — texto libre o por voz.
      </p>

      <div style={{ position: 'relative', marginTop: 18 }}>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Origen del café, sensaciones, comparaciones..."
          rows={7}
          style={{
            width: '100%', padding: '16px 60px 16px 16px',
            background: C.glassStrong,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDictating ? C.accent : C.glassBorder}`,
            borderRadius: 20,
            color: C.text, fontSize: 14, lineHeight: 1.5,
            fontFamily: 'inherit', resize: 'none',
            outline: 'none', boxShadow: C.shadow,
          }}
        />
        <button
          onClick={toggleDictation}
          style={{
            position: 'absolute', bottom: 12, right: 12,
            width: 48, height: 48, borderRadius: '50%',
            background: isDictating ? `linear-gradient(135deg, ${C.danger}, #EF4444)` : `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
            border: 'none', color: '#FFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: isDictating ? '0 0 0 4px rgba(220,38,38,0.2)' : '0 4px 14px rgba(194,65,12,0.3)',
            animation: isDictating ? 'pulse 1.5s infinite' : 'none',
          }}
        >
          {isDictating ? <MicOff size={22} /> : <Mic size={22} />}
        </button>
      </div>
      <div style={{ fontSize: 11, color: isDictating ? C.accent : C.textFaint, marginTop: 8, fontWeight: isDictating ? 700 : 400 }}>
        {isDictating ? '● Escuchando... toca para parar' : 'Toca el micro para dictar por voz'}
      </div>

      {/* Acciones finales */}
      <button
        onClick={finish}
        style={{
          width: '100%', marginTop: 24,
          background: `linear-gradient(135deg, ${C.success}, #10B981)`,
          border: 'none', borderRadius: 20, padding: 18,
          color: '#FFF', fontSize: 15, fontWeight: 700, letterSpacing: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer', boxShadow: '0 8px 24px rgba(5,150,105,0.3)',
        }}
      >
        <Check size={20} strokeWidth={3} />
        MARCAR DÍA COMO HECHO
      </button>

      <button
        onClick={onRepeatLater}
        style={{
          width: '100%', marginTop: 10,
          background: C.glassStrong,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${C.glassBorder}`,
          borderRadius: 20, padding: 16,
          color: C.textMute, fontSize: 14, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer', boxShadow: C.shadow,
        }}
      >
        <Repeat size={18} />
        Quiero repetir este ejercicio mañana
      </button>
    </div>
  );
}

function TasteSlider({ attr, value, onChange }) {
  const pct = (value / 10) * 100;
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{attr.icon}</span>
          <span style={{ color: C.text, fontSize: 15, fontWeight: 700 }}>{attr.label}</span>
        </div>
        <div style={{
          fontSize: 24, fontWeight: 700,
          color: C.accent, fontVariantNumeric: 'tabular-nums',
          minWidth: 32, textAlign: 'right',
        }}>
          {value}
        </div>
      </div>
      <input
        type="range"
        min={0} max={10}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        style={{
          width: '100%', height: 36,
          appearance: 'none',
          background: `linear-gradient(to right, ${C.accent} 0%, ${C.accentBright} ${pct}%, rgba(90,53,25,0.1) ${pct}%, rgba(90,53,25,0.1) 100%)`,
          borderRadius: 18,
          outline: 'none',
          border: `1px solid ${C.glassBorder}`,
          boxShadow: C.shadow,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, padding: '0 4px' }}>
        <span style={{ fontSize: 10, color: C.textFaint }}>{attr.lowLabel}</span>
        <span style={{ fontSize: 10, color: C.textFaint }}>{attr.highLabel}</span>
      </div>
    </div>
  );
}

// ============================================================================
// PANTALLA — DÍA NO-BREW (taste o reflect)
// ============================================================================

function NonBrewScreen({ day, onBack, onComplete }) {
  const [phase, setPhase] = useState('carousel');
  const [notes, setNotes] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const recognitionRef = useRef(null);

  const toggleDictation = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Tu navegador no soporta dictado por voz.'); return; }
    if (isDictating) { recognitionRef.current?.stop(); setIsDictating(false); return; }
    const rec = new SR();
    rec.lang = 'es-ES'; rec.interimResults = true; rec.continuous = true;
    let baseText = notes;
    rec.onresult = (e) => {
      let interim = '', finalT = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalT += t; else interim += t;
      }
      if (finalT) { baseText = (baseText + ' ' + finalT).trim(); setNotes(baseText); }
      else if (interim) setNotes((baseText + ' ' + interim).trim());
    };
    rec.onerror = () => setIsDictating(false);
    rec.onend = () => setIsDictating(false);
    recognitionRef.current = rec;
    rec.start();
    setIsDictating(true);
  };

  if (phase === 'carousel') {
    return <CarouselScreen day={day} onBack={onBack} onContinue={() => setPhase('exercise')} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20, paddingBottom: 32 }}>
      <button
        onClick={() => setPhase('carousel')}
        style={{ background: 'transparent', border: 'none', color: C.textMute, fontSize: 13, padding: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
      >
        <ChevronLeft size={18} /> Volver
      </button>

      <div style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700 }}>
        DÍA {day.num} · {day.phase.toUpperCase()}
      </div>
      <h2 style={{ color: C.text, fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
        {day.title}
      </h2>

      <GlassCard strong style={{ padding: 20, marginTop: 18, borderLeft: `4px solid ${day.type === 'taste' ? C.warn : C.accent}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          {day.type === 'taste' ? <BookOpen size={16} style={{ color: C.warn }} /> : <Target size={16} style={{ color: C.accent }} />}
          <span style={{ fontSize: 10, letterSpacing: '2px', color: day.type === 'taste' ? C.warn : C.accent, fontWeight: 700 }}>
            {day.type === 'taste' ? 'EJERCICIO DE CATA' : 'EJERCICIO DE REFLEXIÓN'}
          </span>
        </div>
        <p style={{ color: C.text, fontSize: 15, lineHeight: 1.6 }}>{day.objective}</p>
      </GlassCard>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: '2px', fontWeight: 700, marginBottom: 8 }}>
          TUS NOTAS
        </div>
        <div style={{ position: 'relative' }}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={day.type === 'taste' ? "¿Qué notas a cada temperatura?" : "Reflexiones, decisiones, preguntas..."}
            rows={9}
            style={{
              width: '100%', padding: '16px 60px 16px 16px',
              background: C.glassStrong,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${isDictating ? C.accent : C.glassBorder}`,
              borderRadius: 20,
              color: C.text, fontSize: 14, lineHeight: 1.5,
              fontFamily: 'inherit', resize: 'none', outline: 'none',
              boxShadow: C.shadow,
            }}
          />
          <button
            onClick={toggleDictation}
            style={{
              position: 'absolute', bottom: 12, right: 12,
              width: 48, height: 48, borderRadius: '50%',
              background: isDictating ? `linear-gradient(135deg, ${C.danger}, #EF4444)` : `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
              border: 'none', color: '#FFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 4px 14px rgba(194,65,12,0.3)',
              animation: isDictating ? 'pulse 1.5s infinite' : 'none',
            }}
          >
            {isDictating ? <MicOff size={22} /> : <Mic size={22} />}
          </button>
        </div>
      </div>

      <button
        onClick={() => onComplete({ notes, timestamp: Date.now() })}
        style={{
          width: '100%', marginTop: 24,
          background: `linear-gradient(135deg, ${C.success}, #10B981)`,
          border: 'none', borderRadius: 20, padding: 18,
          color: '#FFF', fontSize: 15, fontWeight: 700, letterSpacing: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer', boxShadow: '0 8px 24px rgba(5,150,105,0.3)',
        }}
      >
        <Check size={20} strokeWidth={3} />
        MARCAR DÍA COMO HECHO
      </button>
    </div>
  );
}

// ============================================================================
// APP PRINCIPAL — ORQUESTADOR DE PANTALLAS
// ============================================================================

export default function App() {
  const [state, setState] = useState(loadState);
  const [activeDayNum, setActiveDayNum] = useState(null);
  // Sub-pantalla para brew: 'carousel' | 'timeline' | 'countdown' | 'running' | 'post'
  const [subScreen, setSubScreen] = useState('carousel');
  const [brewElapsed, setBrewElapsed] = useState(0);

  useEffect(() => { saveState(state); }, [state]);

  const handleSelectDay = (num) => {
    setActiveDayNum(num);
    setSubScreen('carousel');
  };

  const handleBackHome = () => {
    setActiveDayNum(null);
    setSubScreen('carousel');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const handleComplete = (dayNum, log) => {
    setState(prev => ({
      ...prev,
      completed: { ...prev.completed, [dayNum]: true },
      logs: { ...prev.logs, [dayNum]: log },
    }));
    handleBackHome();
  };

  const handleRepeatLater = (dayNum, log) => {
    // Guardar log pero NO marcar como completado
    setState(prev => ({
      ...prev,
      logs: { ...prev.logs, [dayNum]: { ...log, repeatRequested: true } },
    }));
    handleBackHome();
  };

  const handleRepeatNow = () => {
    setSubScreen('timeline');
    setBrewElapsed(0);
  };

  if (activeDayNum === null) {
    return <HomeScreen state={state} onDayClick={handleSelectDay} />;
  }

  const day = DAYS.find(d => d.num === activeDayNum);
  if (!day) return null;

  // Días no-brew: carousel + ejercicio directo
  if (day.type !== 'brew') {
    return (
      <NonBrewScreen
        day={day}
        onBack={handleBackHome}
        onComplete={(log) => handleComplete(day.num, log)}
      />
    );
  }

  // Días de brew: flujo en pasos
  if (subScreen === 'carousel') {
    return <CarouselScreen day={day} onBack={handleBackHome} onContinue={() => setSubScreen('timeline')} />;
  }

  if (subScreen === 'timeline') {
    return <TimelineScreen day={day} onBack={() => setSubScreen('carousel')} onStart={() => setSubScreen('countdown')} />;
  }

  if (subScreen === 'countdown') {
    return <CountdownScreen onDone={() => setSubScreen('running')} />;
  }

  if (subScreen === 'running') {
    return <BrewRunningScreen day={day} onFinish={(e) => { setBrewElapsed(e); setSubScreen('post'); }} />;
  }

  if (subScreen === 'post') {
    return (
      <PostBrewScreen
        day={day}
        elapsed={brewElapsed}
        onComplete={(log) => handleComplete(day.num, log)}
        onRepeatLater={(log) => handleRepeatLater(day.num, log)}
        onRepeatNow={() => { setBrewElapsed(0); setSubScreen('timeline'); }}
      />
    );
  }

  return null;
}
