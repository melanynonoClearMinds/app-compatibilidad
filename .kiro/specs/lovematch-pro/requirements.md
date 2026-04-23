# Documento de Requisitos — LoveMatch Pro

## Introducción

LoveMatch Pro es una página web de compatibilidad amorosa construida con HTML, CSS y JavaScript puro (sin frameworks). Ofrece múltiples herramientas interactivas para parejas y personas enamoradas: cálculo de compatibilidad, predicción de infidelidad, chat privado de pareja con distancia en tiempo real, álbum de fotos compartido, contador de días juntos, calendario de fechas especiales y formulario mensual de bienestar relacional. La interfaz es completamente responsive y utiliza una paleta de colores llamativa y diferenciada por sección.

---

## Glosario

- **Usuario_A**: La persona principal que usa la aplicación.
- **Usuario_B**: La segunda persona (pareja o crush) cuyos datos se ingresan para comparación.
- **Sistema**: La aplicación web LoveMatch Pro.
- **Calculadora_Compatibilidad**: Módulo que evalúa la compatibilidad entre dos personas mediante preguntas y signo zodiacal.
- **Calculadora_Infidelidad**: Módulo que estima la probabilidad de infidelidad mediante preguntas sobre ambas personas.
- **Chat_Pareja**: Módulo de mensajería privada que permite enviar notas de texto y dibujos entre dos usuarios.
- **Album_Fotos**: Módulo para subir fotos y registrar memorias de salidas o eventos.
- **Contador_Dias**: Componente que muestra los días transcurridos desde el inicio de la relación.
- **Calendario_Especial**: Módulo de fechas importantes con recordatorios.
- **Formulario_Bienestar**: Encuesta mensual sobre el estado emocional de la relación.
- **Signo_Zodiacal**: Uno de los 12 signos del zodiaco usado como variable de compatibilidad.
- **Resultado_Compatibilidad**: Puntuación porcentual (0–100%) generada por la Calculadora_Compatibilidad.
- **Resultado_Infidelidad**: Puntuación porcentual (0–100%) generada por la Calculadora_Infidelidad.
- **Consejo**: Mensaje personalizado mostrado al Usuario_A según el resultado obtenido.

---

## Requisitos

### Requisito 1: Navegación principal y diseño responsive

**User Story:** Como usuario, quiero una página principal con navegación clara hacia todas las funciones, para poder acceder fácilmente a cada herramienta desde cualquier dispositivo.

#### Criterios de Aceptación

1. THE Sistema SHALL mostrar una página de inicio con acceso visible a todas las secciones: Compatibilidad con Crush, Compatibilidad con Pareja, Probabilidad de Infidelidad, Chat de Pareja, Álbum de Fotos, Contador de Días, Calendario Especial y Formulario de Bienestar.
2. WHEN el Usuario_A accede desde un dispositivo con pantalla menor a 768px, THE Sistema SHALL adaptar el diseño a una sola columna sin pérdida de funcionalidad.
3. WHEN el Usuario_A accede desde un dispositivo con pantalla mayor o igual a 768px, THE Sistema SHALL mostrar el diseño en múltiples columnas aprovechando el espacio disponible.
4. THE Sistema SHALL asignar una paleta de colores distinta y llamativa a cada sección para diferenciarlas visualmente.
5. THE Sistema SHALL utilizar únicamente HTML, CSS y JavaScript sin dependencias de frameworks externos.

---

### Requisito 2: Compatibilidad con el Crush

**User Story:** Como persona enamorada, quiero ingresar mis datos y los de mi crush para obtener un porcentaje de compatibilidad, para saber qué tan bien hacemos pareja.

#### Criterios de Aceptación

1. WHEN el Usuario_A selecciona la sección "Compatibilidad con Crush", THE Calculadora_Compatibilidad SHALL presentar un formulario con al menos 8 preguntas sobre gustos, personalidad y valores del Usuario_A y del Usuario_B.
2. THE Calculadora_Compatibilidad SHALL incluir una pregunta obligatoria sobre el Signo_Zodiacal de cada persona.
3. WHEN el Usuario_A envía el formulario con todos los campos completos, THE Calculadora_Compatibilidad SHALL calcular y mostrar el Resultado_Compatibilidad como un porcentaje entre 0% y 100%.
4. WHEN el Resultado_Compatibilidad es calculado, THE Sistema SHALL mostrar un Consejo personalizado acorde al rango del resultado (0–30%: bajo, 31–60%: moderado, 61–85%: alto, 86–100%: muy alto).
5. IF el Usuario_A envía el formulario con campos obligatorios vacíos, THEN THE Sistema SHALL mostrar un mensaje de error indicando los campos faltantes sin borrar las respuestas ya ingresadas.
6. THE Calculadora_Compatibilidad SHALL considerar la compatibilidad zodiacal como uno de los factores del cálculo final.

---

### Requisito 3: Compatibilidad con la Pareja

**User Story:** Como persona en una relación, quiero responder preguntas junto con mi pareja para obtener un análisis de compatibilidad más profundo, para entender mejor nuestra dinámica.

#### Criterios de Aceptación

1. WHEN el Usuario_A selecciona la sección "Compatibilidad con Pareja", THE Calculadora_Compatibilidad SHALL presentar un formulario diferenciado con al menos 10 preguntas orientadas a relaciones establecidas (comunicación, valores, metas, convivencia).
2. THE Calculadora_Compatibilidad SHALL incluir una pregunta obligatoria sobre el Signo_Zodiacal de cada persona.
3. WHEN el Usuario_A envía el formulario completo, THE Calculadora_Compatibilidad SHALL mostrar el Resultado_Compatibilidad con un desglose por categorías (ej. comunicación, valores, atracción).
4. WHEN el Resultado_Compatibilidad es mostrado, THE Sistema SHALL presentar un Consejo personalizado según el rango del resultado.
5. IF el Usuario_A envía el formulario con campos obligatorios vacíos, THEN THE Sistema SHALL mostrar un mensaje de error indicando los campos faltantes.

---

### Requisito 4: Probabilidad de Infidelidad

**User Story:** Como usuario, quiero responder preguntas sobre mi pareja y sobre mí mismo para obtener una estimación de probabilidad de infidelidad, para reflexionar sobre señales de alerta en mi relación.

#### Criterios de Aceptación

1. WHEN el Usuario_A selecciona la sección "Probabilidad de Infidelidad", THE Calculadora_Infidelidad SHALL presentar un formulario con al menos 10 preguntas sobre comportamientos, actitudes y situaciones de ambas personas.
2. THE Calculadora_Infidelidad SHALL incluir preguntas sobre el Usuario_A y sobre el Usuario_B de forma separada y claramente etiquetada.
3. WHEN el Usuario_A envía el formulario completo, THE Calculadora_Infidelidad SHALL calcular y mostrar el Resultado_Infidelidad como un porcentaje entre 0% y 100%.
4. WHEN el Resultado_Infidelidad es mostrado, THE Sistema SHALL presentar un Consejo único y diferente para cada rango de resultado: 0–20% (muy bajo), 21–40% (bajo), 41–60% (moderado), 61–80% (alto), 81–100% (muy alto).
5. THE Sistema SHALL mostrar al menos 5 mensajes de Consejo distintos, uno por cada rango de probabilidad definido.
6. IF el Usuario_A envía el formulario con campos obligatorios vacíos, THEN THE Sistema SHALL mostrar un mensaje de error indicando los campos faltantes.
7. THE Sistema SHALL incluir una advertencia visible indicando que los resultados son orientativos y no constituyen un diagnóstico real.

---

### Requisito 5: Chat de Pareja con Distancia

**User Story:** Como integrante de una pareja, quiero tener un espacio privado donde pueda enviarle notas y dibujos a mi pareja y ver a qué distancia estamos, para mantener una conexión especial.

#### Criterios de Aceptación

1. WHEN el Usuario_A accede al Chat_Pareja, THE Sistema SHALL solicitar el nombre del Usuario_A y del Usuario_B para personalizar la sesión.
2. THE Chat_Pareja SHALL permitir al Usuario_A escribir y enviar notas de texto de hasta 500 caracteres.
3. THE Chat_Pareja SHALL incluir un lienzo (canvas) donde el Usuario_A pueda realizar dibujos a mano alzada con al menos 3 colores seleccionables y una opción para borrar.
4. WHEN el Usuario_A envía una nota o dibujo, THE Sistema SHALL mostrarlo en el historial del chat con la hora de envío.
5. THE Chat_Pareja SHALL mostrar un campo donde el Usuario_A pueda ingresar su ubicación (ciudad) y la del Usuario_B para calcular y mostrar la distancia aproximada entre ambos.
6. WHEN el Usuario_A ingresa dos ciudades válidas, THE Sistema SHALL mostrar la distancia aproximada en kilómetros entre ambas ciudades.
7. IF el Usuario_A ingresa una ciudad no reconocida, THEN THE Sistema SHALL mostrar un mensaje indicando que la ciudad no fue encontrada y solicitar una nueva entrada.
8. THE Chat_Pareja SHALL almacenar el historial de notas y dibujos en el almacenamiento local del navegador (localStorage) para que persista entre sesiones.

---

### Requisito 6: Contador de Días Juntos

**User Story:** Como pareja, quiero ingresar la fecha en que comenzó mi relación para ver cuántos días llevamos juntos, para celebrar cada momento compartido.

#### Criterios de Aceptación

1. WHEN el Usuario_A accede al Contador_Dias, THE Sistema SHALL mostrar un campo para ingresar la fecha de inicio de la relación.
2. WHEN el Usuario_A ingresa una fecha válida, THE Contador_Dias SHALL calcular y mostrar el número exacto de días, meses y años transcurridos desde esa fecha hasta la fecha actual.
3. THE Contador_Dias SHALL actualizar el conteo automáticamente cada vez que el Usuario_A carga o recarga la página.
4. THE Sistema SHALL almacenar la fecha de inicio en localStorage para que persista entre sesiones.
5. IF el Usuario_A ingresa una fecha futura, THEN THE Sistema SHALL mostrar un mensaje de error indicando que la fecha debe ser anterior o igual a la fecha actual.

---

### Requisito 7: Álbum de Fotos con Memorias

**User Story:** Como pareja, quiero subir fotos y escribir una descripción de lo que hicimos ese día, para guardar recuerdos especiales de nuestra relación.

#### Criterios de Aceptación

1. WHEN el Usuario_A accede al Album_Fotos, THE Sistema SHALL mostrar una galería con las fotos previamente guardadas y un botón para agregar nuevas.
2. WHEN el Usuario_A selecciona agregar una foto, THE Album_Fotos SHALL permitir seleccionar una imagen desde el dispositivo y agregar un texto descriptivo de hasta 300 caracteres.
3. WHEN el Usuario_A guarda una entrada, THE Album_Fotos SHALL mostrar la foto junto con la descripción y la fecha de registro en la galería.
4. THE Album_Fotos SHALL almacenar las entradas en localStorage para que persistan entre sesiones.
5. WHEN el Usuario_A selecciona una foto de la galería, THE Sistema SHALL mostrarla en tamaño ampliado con su descripción completa.
6. THE Album_Fotos SHALL permitir al Usuario_A eliminar una entrada de la galería con confirmación previa.
7. IF el Usuario_A intenta guardar una entrada sin imagen, THEN THE Sistema SHALL mostrar un mensaje de error indicando que la imagen es obligatoria.

---

### Requisito 8: Calendario de Fechas Especiales

**User Story:** Como pareja, quiero registrar fechas importantes (aniversarios, cumpleaños, citas) en un calendario con recordatorios, para no olvidar los momentos que más importan.

#### Criterios de Aceptación

1. WHEN el Usuario_A accede al Calendario_Especial, THE Sistema SHALL mostrar un calendario mensual navegable con las fechas especiales marcadas visualmente.
2. THE Calendario_Especial SHALL permitir al Usuario_A agregar una fecha especial con nombre del evento y descripción opcional.
3. WHEN el Usuario_A carga la aplicación y existe una fecha especial dentro de los próximos 3 días, THE Sistema SHALL mostrar una notificación o alerta visible con el nombre del evento.
4. THE Sistema SHALL almacenar las fechas especiales en localStorage para que persistan entre sesiones.
5. WHEN el Usuario_A selecciona una fecha marcada en el calendario, THE Sistema SHALL mostrar el nombre y descripción del evento registrado.
6. THE Calendario_Especial SHALL permitir al Usuario_A eliminar un evento registrado con confirmación previa.
7. IF el Usuario_A intenta guardar un evento sin nombre, THEN THE Sistema SHALL mostrar un mensaje de error indicando que el nombre del evento es obligatorio.

---

### Requisito 9: Formulario Mensual de Bienestar Relacional

**User Story:** Como integrante de una pareja, quiero responder un formulario mensual sobre cómo me siento en la relación y en qué debo mejorar, para hacer un seguimiento de mi crecimiento como pareja.

#### Criterios de Aceptación

1. WHEN el Usuario_A accede al Formulario_Bienestar, THE Sistema SHALL mostrar un formulario con al menos 6 preguntas sobre el estado emocional, la comunicación, el apoyo mutuo y las áreas de mejora del mes actual.
2. THE Formulario_Bienestar SHALL incluir el mes y año actual como encabezado del formulario para identificar el período evaluado.
3. WHEN el Usuario_A envía el formulario completo, THE Sistema SHALL guardar las respuestas asociadas al mes y año correspondiente en localStorage.
4. WHEN el Usuario_A envía el formulario, THE Sistema SHALL mostrar un resumen con las áreas de mejora identificadas y un mensaje motivacional personalizado.
5. THE Formulario_Bienestar SHALL permitir al Usuario_A consultar los formularios de meses anteriores guardados.
6. IF el Usuario_A intenta enviar el formulario con preguntas obligatorias sin responder, THEN THE Sistema SHALL mostrar un mensaje de error indicando las preguntas pendientes.
7. WHILE el Usuario_A consulta un formulario de un mes anterior, THE Sistema SHALL mostrar las respuestas en modo solo lectura sin permitir modificaciones.

---

### Requisito 10: Persistencia y Experiencia de Usuario

**User Story:** Como usuario, quiero que mis datos se guarden automáticamente en el navegador, para no perder mi información al cerrar o recargar la página.

#### Criterios de Aceptación

1. THE Sistema SHALL utilizar localStorage para persistir todos los datos del usuario (fechas, fotos, notas, eventos, formularios) sin requerir un servidor externo.
2. WHEN el Usuario_A recarga la página, THE Sistema SHALL restaurar automáticamente todos los datos previamente guardados.
3. THE Sistema SHALL mostrar animaciones o transiciones suaves al navegar entre secciones para mejorar la experiencia visual.
4. THE Sistema SHALL mostrar un indicador de carga visual WHEN una operación de cálculo o guardado tarda más de 500ms.
5. IF el almacenamiento localStorage está lleno o no disponible, THEN THE Sistema SHALL mostrar un mensaje informando al usuario que no es posible guardar datos y sugerir liberar espacio.
