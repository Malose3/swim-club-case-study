# Ejemplo de código: normalización de tiempos de natación

Una función pequeña y ejecutable para mostrar cómo abordar un problema de la app: recibir tiempos escritos de distintas formas y convertirlos a un formato consistente.

## Origen y alcance

Adaptación para el portafolio de una utilidad de lectura de tiempos existente en la aplicación privada, revisada al preparar esta muestra. Está escrita en JavaScript con módulos ES para ejecutarla sin instalar dependencias. La aplicación utiliza TypeScript.

Esta versión añade un contrato de entrada estricto y usa centésimas enteras. Es una adaptación didáctica, no una copia exacta ni una actualización del código de producción. Se ha preparado con asistencia de Codex. No incluye pantallas, servicios, fórmulas de conversión entre piscinas, datos ni reglas internas del club.

## Del problema a la solución

1. **Necesidad:** una marca puede llegar como `1:02,35` o como `62.35`.
2. **Decisión:** aceptar segundos o minutos y segundos, con punto o coma decimal.
3. **Validación:** rechazar entradas incompletas, negativas, ambiguas o con más de dos decimales.
4. **Representación:** guardar centésimas enteras para evitar errores de suma de decimales.
5. **Presentación:** producir siempre `MM:SS.cc`.

| Entrada inventada | Centésimas | Salida |
| --- | ---: | --- |
| `1:02,35` | 6235 | `01:02.35` |
| `62.35` | 6235 | `01:02.35` |
| `29,5` | 2950 | `00:29.50` |
| `1:60` | — | Entrada rechazada |

## Leer y ejecutar

- [Implementación](swim-times.mjs)
- [Demostración](demo.mjs)
- [Pruebas](swim-times.test.mjs)

Requisito: Node.js 22 o posterior. Validado con Node.js 24.21.0. Desde la raíz de este repositorio:

```sh
node examples/swim-times/demo.mjs
node --test examples/swim-times/swim-times.test.mjs
```

No requiere `npm install`, claves ni acceso a la app. La demo imprime el resultado y no modifica archivos.

## Límites

El rango de esta muestra es de `00:00.00` a `99:59.99`, incluido el cero como valor de formato. No verifica si una marca es deportivamente válida. No interpreta horas ni aplica equivalencias entre piscinas o tipos de cronometraje. Las pruebas comprueban esta utilidad, no el funcionamiento de toda la aplicación.
