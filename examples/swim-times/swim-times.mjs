/**
 * Adaptación de portafolio de la lectura de tiempos de una app de natación.
 * Sin dependencias, datos de deportistas ni conexión con la aplicación.
 */
const MAX_CENTISECONDS = 599999; // 99:59.99: límite de esta demostración.

/** Convierte SS.cc o MM:SS.cc (punto o coma) a centésimas enteras. */
export function parseSwimTime(input) {
  if (typeof input !== 'string') return null;
  const match = /^(?:(\d{1,2}):(\d{1,2})|(\d{1,4}))(?:[.,](\d{1,2}))?$/.exec(input.trim());
  if (!match) return null;

  const minutes = Number(match[1] ?? 0);
  const seconds = Number(match[2] ?? match[3]);
  if (match[1] !== undefined && seconds >= 60) return null;

  // Trabajar en centésimas evita sumar fracciones binarias de segundo.
  const fraction = Number((match[4] ?? '').padEnd(2, '0'));
  const total = (minutes * 60 + seconds) * 100 + fraction;
  return total <= MAX_CENTISECONDS ? total : null;
}

/** Devuelve MM:SS.cc; rechaza valores fuera del contrato. */
export function formatSwimTime(centiseconds) {
  if (!Number.isInteger(centiseconds) || centiseconds < 0 || centiseconds > MAX_CENTISECONDS) {
    throw new RangeError('Se requieren centésimas enteras entre 0 y 599999.');
  }
  const minutes = Math.floor(centiseconds / 6000);
  const seconds = Math.floor(centiseconds / 100) % 60;
  const fraction = centiseconds % 100;
  return [minutes, seconds].map(value => String(value).padStart(2, '0')).join(':')
    + '.' + String(fraction).padStart(2, '0');
}
