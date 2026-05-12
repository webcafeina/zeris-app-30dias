// Pool de consejos de voz para los waits del brew.
// Frases cortas (1 oración) en español neutro para Web Speech API.
// Categorizadas por acción del paso actual; `general` aplica a cualquier acción.
// El motor evita repetir un tip dentro de la misma sesión de brew.

export const TIPS = {
  general: [
    'Mantén el pico del kettle entre cinco y ocho centímetros sobre el café.',
    'El caudal objetivo es de cinco gramos por segundo. Constante, sin acelerar.',
    'No toques las paredes del filtro al verter. Deja unos dos centímetros de margen.',
    'Si quieres una taza limpia, no remuevas el café con cuchara.',
    'Observa el lecho al final del brew: cuanto más plano, mejor distribución del agua.',
    'Un filtro bien enjuagado evita que la primera taza tenga sabor a papel.',
    'Pesa siempre el agua, no la midas a ojo. Diez gramos arriba o abajo cambian la taza.',
  ],
  pour: [
    'Vierte en espiral, del centro hacia fuera, sin tocar las paredes del filtro.',
    'Caudal: cinco gramos por segundo. Cuenta "mil uno, mil dos" para mantener el ritmo.',
    'Altura del kettle: entre cinco y ocho centímetros. Más alto crea canales.',
    'Si el agua se acumula y no baja, estás vertiendo demasiado rápido.',
    'Si ves polvo seco en la superficie del café, ajusta el ángulo del vertido para cubrirlo.',
    'En el bloom, usa más o menos el doble del peso del café en gramos de agua.',
  ],
  swirl: [
    'Gira la cafetera con un movimiento de muñeca, sin cuchara.',
    'Solo necesitas un par de giros suaves para mezclar el café con el agua.',
    'El swirl tras el bloom ayuda a que el agua penetre uniformemente en el lecho.',
  ],
  drain: [
    'No agites la cafetera ahora. Deja que el lecho se asiente solo.',
    'Si tarda más de un minuto en drenar tras el último vertido, la próxima vez muele más grueso.',
    'Si drena demasiado rápido, prueba a moler un poco más fino en el siguiente brew.',
    'Mientras el drawdown ocurre, ya puedes empezar a oler la jarra. Los aromas son más intensos en caliente.',
  ],
  rao: [
    'El Rao spin dura unos diez segundos. Un giro firme y mantenido.',
    'Tras el spin, deja la cafetera quieta. Cualquier movimiento extra rompe el efecto.',
    'El Rao spin centra los finos del molido, lo que da un drawdown más uniforme.',
  ],
};
