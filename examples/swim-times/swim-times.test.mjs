import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSwimTime, formatSwimTime } from './swim-times.mjs';

test('la coma y el punto representan la misma marca', () => {
  assert.equal(parseSwimTime('1:02,35'), 6235);
  assert.equal(parseSwimTime('1:02.35'), 6235);
  assert.equal(parseSwimTime('62.35'), 6235);
});

test('una cifra decimal representa décimas, no centésimas', () => {
  assert.equal(parseSwimTime(' 29,5 '), 2950);
  assert.equal(formatSwimTime(2950), '00:29.50');
});

test('normaliza límites y minutos completos', () => {
  assert.equal(formatSwimTime(parseSwimTime('0')), '00:00.00');
  assert.equal(formatSwimTime(parseSwimTime('60')), '01:00.00');
  assert.equal(parseSwimTime('99:59.99'), 599999);
});

test('rechaza formatos ambiguos, campos incompletos y precisión extra', () => {
  for (const input of ['', ' ', '1:', ':30', '1:60', '1:2:3', '-1', '1e2', '0x10', '29.123', '29.', '1,2.3', 'texto']) {
    assert.equal(parseSwimTime(input), null, input);
  }
});

test('rechaza tipos inesperados y valores fuera del rango', () => {
  for (const input of [null, undefined, 30, {}, '100:00', '6000']) {
    assert.equal(parseSwimTime(input), null);
  }
  for (const value of [-1, 1.5, NaN, Infinity, '100', null, 600000]) {
    assert.throws(() => formatSwimTime(value), RangeError);
  }
});

test('formatear y volver a leer conserva exactamente las centésimas', () => {
  for (const value of [0, 1, 9, 10, 99, 100, 5999, 6000, 6235, 18001, 599999]) {
    assert.equal(parseSwimTime(formatSwimTime(value)), value);
  }
});
