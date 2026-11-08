import { parseSwimTime, formatSwimTime } from './swim-times.mjs';

// Valores inventados; no son marcas de deportistas.
for (const input of ['1:02,35', '62.35', '29,5', '1:60', 'texto']) {
  const centiseconds = parseSwimTime(input);
  console.log(JSON.stringify({
    input,
    centiseconds,
    normalized: centiseconds === null ? null : formatSwimTime(centiseconds),
  }));
}
