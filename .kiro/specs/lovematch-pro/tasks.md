# Plan de Implementación: LoveMatch Pro

## Descripción General

Implementación de LoveMatch Pro como una aplicación web de una sola página (SPA) usando únicamente HTML, CSS y JavaScript puro. La estructura de archivos es:
- `lovematch-pro/index.html` — Estructura HTML completa con todas las secciones
- `lovematch-pro/styles.css` — Estilos responsive con paleta diferenciada por sección
- `lovematch-pro/script.js` — Lógica de la aplicación, navegación y persistencia

## Tareas

- [ ] 1. Crear estructura base del proyecto y navegación principal
  - Crear `lovematch-pro/index.html` con el esqueleto HTML: `<head>`, `<nav>`, y contenedores `<section>` para cada módulo (Compatibilidad Crush, Compatibilidad Pareja, Infidelidad, Chat, Álbum, Contador, Calendario, Bienestar)
  - Crear `lovematch-pro/styles.css` con reset CSS, variables de color por sección, layout responsive (flexbox/grid), y estilos de navegación
  - Crear `lovematch-pro/script.js` con la función de navegación SPA: mostrar/ocultar secciones al hacer clic en el menú, sin recarga de página
  - Implementar diseño responsive: una columna en pantallas < 768px, múltiples columnas en ≥ 768px
  - Asignar paleta de colores distinta y llamativa a cada sección mediante variables CSS
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 2. Implementar Calculadora de Compatibilidad con el Crush
  - [ ] 2.1 Crear formulario HTML de Compatibilidad Crush en `index.html`
    - Añadir al menos 8 preguntas sobre gustos, personalidad y valores (Usuario_A y Usuario_B)
    - Incluir campo obligatorio de Signo Zodiacal para cada persona
    - Añadir botón de envío y contenedor para mostrar resultado y consejo
    - _Requisitos: 2.1, 2.2_
  - [ ] 2.2 Implementar lógica de cálculo de compatibilidad Crush en `script.js`
    - Función `calcularCompatibilidadCrush()`: puntuar respuestas, incluir factor zodiacal, retornar porcentaje 0–100%
    - Tabla de compatibilidad zodiacal entre los 12 signos
    - Función `mostrarConsejoCrush(porcentaje)`: retornar consejo según rango (0–30%, 31–60%, 61–85%, 86–100%)
    - Validación de campos obligatorios: mostrar errores sin borrar respuestas existentes
    - _Requisitos: 2.3, 2.4, 2.5, 2.6_

- [ ] 3. Implementar Calculadora de Compatibilidad con la Pareja
  - [ ] 3.1 Crear formulario HTML de Compatibilidad Pareja en `index.html`
    - Añadir al menos 10 preguntas orientadas a relaciones establecidas (comunicación, valores, metas, convivencia)
    - Incluir campo obligatorio de Signo Zodiacal para cada persona
    - Añadir contenedor para mostrar resultado con desglose por categorías y consejo
    - _Requisitos: 3.1, 3.2_
  - [ ] 3.2 Implementar lógica de cálculo de compatibilidad Pareja en `script.js`
    - Función `calcularCompatibilidadPareja()`: calcular puntuación por categorías (comunicación, valores, atracción) y total
    - Función `mostrarDesglose(categorias)`: renderizar resultado con desglose visual por categoría
    - Función `mostrarConsejoPareja(porcentaje)`: consejo personalizado por rango de resultado
    - Validación de campos obligatorios con mensaje de error
    - _Requisitos: 3.3, 3.4, 3.5_

- [ ] 4. Checkpoint — Verificar calculadoras de compatibilidad
  - Asegurarse de que ambos formularios validan correctamente, calculan porcentajes y muestran consejos. Consultar al usuario si hay dudas.

- [ ] 5. Implementar Calculadora de Probabilidad de Infidelidad
  - [ ] 5.1 Crear formulario HTML de Infidelidad en `index.html`
    - Añadir al menos 10 preguntas sobre comportamientos y actitudes, separadas claramente por Usuario_A y Usuario_B
    - Añadir advertencia visible de que los resultados son orientativos
    - Añadir contenedor para resultado y consejo
    - _Requisitos: 4.1, 4.2, 4.7_
  - [ ] 5.2 Implementar lógica de cálculo de infidelidad en `script.js`
    - Función `calcularInfidelidad()`: ponderar respuestas y retornar porcentaje 0–100%
    - Función `mostrarConsejoInfidelidad(porcentaje)`: 5 mensajes distintos para rangos 0–20%, 21–40%, 41–60%, 61–80%, 81–100%
    - Validación de campos obligatorios con mensaje de error
    - _Requisitos: 4.3, 4.4, 4.5, 4.6_

- [ ] 6. Implementar Chat de Pareja con Distancia
  - [ ] 6.1 Crear HTML del Chat de Pareja en `index.html`
    - Campos para nombre de Usuario_A y Usuario_B
    - Área de texto (máx. 500 caracteres) y botón de envío de nota
    - Elemento `<canvas>` para dibujo a mano alzada con selector de 3+ colores y botón borrar
    - Historial de mensajes con hora de envío
    - Campos de ciudad para Usuario_A y Usuario_B con botón calcular distancia
    - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5_
  - [ ] 6.2 Implementar lógica del canvas de dibujo en `script.js`
    - Eventos `mousedown`, `mousemove`, `mouseup` y equivalentes touch para dibujo a mano alzada
    - Función `cambiarColor(color)` y función `borrarCanvas()`
    - Función `guardarDibujoComoImagen()`: convertir canvas a base64 para almacenar
    - _Requisitos: 5.3_
  - [ ] 6.3 Implementar envío de notas, historial y distancia en `script.js`
    - Función `enviarNota()`: agregar nota al historial con timestamp, guardar en localStorage
    - Función `enviarDibujo()`: guardar imagen del canvas en historial con timestamp
    - Función `calcularDistancia(ciudadA, ciudadB)`: usar tabla de distancias predefinidas entre ciudades principales; mostrar mensaje de error si ciudad no reconocida
    - Función `cargarHistorial()`: restaurar notas y dibujos desde localStorage al cargar la sección
    - _Requisitos: 5.4, 5.6, 5.7, 5.8_

- [ ] 7. Implementar Contador de Días Juntos
  - Crear HTML del Contador en `index.html`: campo de fecha, área de resultado (días, meses, años)
  - Función `calcularDiasJuntos(fechaInicio)`: calcular diferencia exacta en días, meses y años hasta hoy
  - Función `cargarContador()`: leer fecha desde localStorage y mostrar conteo al cargar la página
  - Validación: mostrar error si la fecha ingresada es futura; guardar fecha válida en localStorage
  - _Requisitos: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 8. Checkpoint — Verificar Chat, Distancia y Contador
  - Confirmar que el canvas funciona, el historial persiste en localStorage y el contador calcula correctamente. Consultar al usuario si hay dudas.

- [ ] 9. Implementar Álbum de Fotos con Memorias
  - [ ] 9.1 Crear HTML del Álbum en `index.html`
    - Galería de fotos guardadas, botón "Agregar foto", modal/formulario con input de archivo e imagen y campo de descripción (máx. 300 caracteres)
    - Modal de vista ampliada con descripción completa
    - _Requisitos: 7.1, 7.2, 7.5_
  - [ ] 9.2 Implementar lógica del Álbum en `script.js`
    - Función `agregarFoto(archivo, descripcion)`: leer imagen con FileReader, convertir a base64, guardar entrada en localStorage con fecha
    - Función `renderizarGaleria()`: mostrar todas las entradas guardadas con foto, descripción y fecha
    - Función `ampliarFoto(id)`: mostrar foto en tamaño completo con descripción
    - Función `eliminarFoto(id)`: solicitar confirmación y eliminar entrada de localStorage y galería
    - Validación: mostrar error si se intenta guardar sin imagen seleccionada
    - _Requisitos: 7.3, 7.4, 7.6, 7.7_

- [ ] 10. Implementar Calendario de Fechas Especiales
  - [ ] 10.1 Crear HTML del Calendario en `index.html`
    - Calendario mensual navegable (botones anterior/siguiente mes), formulario para agregar evento (nombre obligatorio, descripción opcional), área de detalle de evento
    - _Requisitos: 8.1, 8.2_
  - [ ] 10.2 Implementar lógica del Calendario en `script.js`
    - Función `renderizarCalendario(mes, anio)`: generar grid del mes con días marcados si tienen eventos
    - Función `agregarEvento(fecha, nombre, descripcion)`: guardar evento en localStorage; validar que nombre no esté vacío
    - Función `mostrarEvento(fecha)`: mostrar nombre y descripción del evento al seleccionar día marcado
    - Función `eliminarEvento(id)`: solicitar confirmación y eliminar de localStorage
    - Función `verificarProximosEventos()`: al cargar la app, alertar si hay eventos en los próximos 3 días
    - _Requisitos: 8.3, 8.4, 8.5, 8.6, 8.7_

- [ ] 11. Implementar Formulario Mensual de Bienestar Relacional
  - [ ] 11.1 Crear HTML del Formulario de Bienestar en `index.html`
    - Encabezado con mes y año actual, al menos 6 preguntas sobre estado emocional, comunicación, apoyo mutuo y áreas de mejora
    - Sección de historial de formularios anteriores (solo lectura)
    - _Requisitos: 9.1, 9.2, 9.5_
  - [ ] 11.2 Implementar lógica del Formulario de Bienestar en `script.js`
    - Función `enviarBienestar(respuestas)`: guardar respuestas en localStorage con clave `bienestar-YYYY-MM`; validar campos obligatorios
    - Función `mostrarResumen(respuestas)`: identificar áreas de mejora y mostrar mensaje motivacional personalizado
    - Función `cargarHistorialBienestar()`: listar formularios anteriores guardados; renderizar en modo solo lectura
    - _Requisitos: 9.3, 9.4, 9.6, 9.7_

- [ ] 12. Checkpoint — Verificar Álbum, Calendario y Bienestar
  - Confirmar que las tres secciones persisten datos en localStorage, validan entradas y muestran correctamente. Consultar al usuario si hay dudas.

- [ ] 13. Implementar persistencia global, animaciones y manejo de errores de localStorage
  - Función `inicializarApp()`: al cargar la página, restaurar todos los datos guardados (contador, historial chat, álbum, eventos, formularios)
  - Añadir transiciones CSS suaves (`transition`, `animation`) al navegar entre secciones
  - Función `guardarEnStorage(clave, valor)`: wrapper que detecta errores de cuota de localStorage y muestra mensaje informativo al usuario
  - Indicador de carga visual (spinner/overlay) para operaciones que puedan tardar > 500ms (ej. procesamiento de imágenes grandes)
  - _Requisitos: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 14. Checkpoint final — Verificar integración completa
  - Asegurarse de que toda la navegación funciona, todos los datos persisten entre recargas y el diseño es responsive en móvil y escritorio. Consultar al usuario si hay dudas.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints garantizan validación incremental antes de continuar
- Toda la persistencia usa localStorage sin servidor externo
- La distancia entre ciudades se implementa con una tabla predefinida de ciudades principales (sin API externa)
