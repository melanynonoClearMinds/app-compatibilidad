// ===== SISTEMA DE AUTENTICACIÓN =====
function verificarSesion() {
  const usuarioActual = localStorage.getItem('lovematch_usuario_actual');
  if (usuarioActual) {
    mostrarApp();
  } else {
    mostrarAuth();
  }
}

function mostrarAuth() {
  document.getElementById('auth-screen').classList.remove('hidden');
  document.getElementById('main-app').classList.add('hidden');
}

function mostrarApp() {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
}

function mostrarLogin() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('register-form').classList.add('hidden');
  limpiarErrores('login');
}

function mostrarRegistro() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('register-form').classList.remove('hidden');
  limpiarErrores('register');
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarError(inputId, mensaje) {
  const errorElement = document.getElementById(inputId + '-error');
  const inputElement = document.getElementById(inputId);
  
  if (errorElement) {
    errorElement.textContent = mensaje;
  }
  
  if (inputElement) {
    inputElement.classList.add('input-error');
    setTimeout(() => {
      inputElement.classList.remove('input-error');
    }, 500);
  }
}

function limpiarErrores(formType) {
  const prefix = formType === 'login' ? 'login' : 'register';
  const errorElements = document.querySelectorAll(`#${prefix}-form .error-message`);
  errorElements.forEach(el => el.textContent = '');
}

function iniciarSesion() {
  limpiarErrores('login');
  
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  
  // Validaciones
  if (!email || !password) {
    if (!email) mostrarError('login-email', 'Por favor ingresa tu correo');
    if (!password) mostrarError('login-password', 'Por favor ingresa tu contraseña');
    return;
  }
  
  if (!validarEmail(email)) {
    mostrarError('login-email', 'Correo electrónico inválido');
    return;
  }
  
  // Obtener usuarios registrados
  const usuarios = JSON.parse(localStorage.getItem('lovematch_usuarios') || '{}');
  
  // Verificar credenciales
  if (usuarios[email] && usuarios[email].password === password) {
    // Login exitoso
    localStorage.setItem('lovematch_usuario_actual', email);
    localStorage.setItem('lovematch_nombre', usuarios[email].nombre);
    if (usuarios[email].nombrePareja) {
      localStorage.setItem('lovematch_nombre_pareja', usuarios[email].nombrePareja);
    }
    if (usuarios[email].fechaInicio) {
      localStorage.setItem('lovematch_fecha_inicio', usuarios[email].fechaInicio);
    }
    
    mostrarApp();
    cargarConfiguracionPerfil();
  } else {
    mostrarError('login-password', 'Correo o contraseña incorrectos');
  }
}

function registrarUsuario() {
  limpiarErrores('register');
  
  const nombre = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const passwordConfirm = document.getElementById('register-password-confirm').value;
  const nombrePareja = document.getElementById('register-partner').value.trim();
  const fechaInicio = document.getElementById('register-date').value;
  
  // Validaciones
  let hayErrores = false;
  
  if (!nombre) {
    mostrarError('register-name', 'Por favor ingresa tu nombre');
    hayErrores = true;
  }
  
  if (!email) {
    mostrarError('register-email', 'Por favor ingresa tu correo');
    hayErrores = true;
  } else if (!validarEmail(email)) {
    mostrarError('register-email', 'Correo electrónico inválido');
    hayErrores = true;
  }
  
  if (!password) {
    mostrarError('register-password', 'Por favor ingresa una contraseña');
    hayErrores = true;
  } else if (password.length < 6) {
    mostrarError('register-password', 'Mínimo 6 caracteres');
    hayErrores = true;
  }
  
  if (!passwordConfirm) {
    mostrarError('register-password-confirm', 'Por favor confirma tu contraseña');
    hayErrores = true;
  } else if (password !== passwordConfirm) {
    mostrarError('register-password-confirm', 'Las contraseñas no coinciden');
    hayErrores = true;
  }
  
  if (hayErrores) return;
  
  // Verificar si el usuario ya existe
  const usuarios = JSON.parse(localStorage.getItem('lovematch_usuarios') || '{}');
  
  if (usuarios[email]) {
    mostrarError('register-email', 'Este correo ya está registrado');
    return;
  }
  
  // Registrar nuevo usuario
  usuarios[email] = {
    nombre: nombre,
    password: password,
    nombrePareja: nombrePareja,
    fechaInicio: fechaInicio,
    fechaRegistro: new Date().toISOString()
  };
  
  localStorage.setItem('lovematch_usuarios', JSON.stringify(usuarios));
  localStorage.setItem('lovematch_usuario_actual', email);
  localStorage.setItem('lovematch_nombre', nombre);
  if (nombrePareja) {
    localStorage.setItem('lovematch_nombre_pareja', nombrePareja);
  }
  if (fechaInicio) {
    localStorage.setItem('lovematch_fecha_inicio', fechaInicio);
  }
  
  mostrarApp();
  cargarConfiguracionPerfil();
}

// ===== NAVEGACIÓN CON WIDGETS =====
const SECCIONES = ['probabilidad', 'crush', 'pareja', 'infidelidad', 'chat', 'album', 'dias', 'calendario', 'bienestar'];
let backButton;

function mostrarHome() {
  console.log('Mostrando home screen');
  document.getElementById('home-screen').classList.remove('hidden');
  
  SECCIONES.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  
  if (backButton) backButton.classList.add('hidden');
  
  // Actualizar barra de navegación
  document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector('.bottom-nav-btn[data-nav="home"]').classList.add('active');
}

function navegarA(seccionId) {
  console.log('=== NAVEGANDO A:', seccionId, '===');
  
  // Ocultar home screen
  document.getElementById('home-screen').classList.add('hidden');
  
  // Ocultar todas las secciones
  SECCIONES.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('hidden');
      console.log('✓ Ocultado:', id);
    }
  });

  // Mostrar la sección destino
  const destino = document.getElementById(seccionId);
  if (destino) {
    destino.classList.remove('hidden');
    console.log('✓ Mostrado:', seccionId);
  } else {
    console.error('✗ Sección destino no encontrada:', seccionId);
  }
  
  // Mostrar botón de regreso
  if (backButton) backButton.classList.remove('hidden');
  
  console.log('=== FIN NAVEGACIÓN ===');
}

function inicializarNavegacion() {
  console.log('Inicializando navegación con widgets...');
  
  // Crear botón de regreso
  backButton = document.createElement('button');
  backButton.className = 'back-button hidden';
  backButton.innerHTML = '←';
  backButton.setAttribute('aria-label', 'Volver al inicio');
  backButton.addEventListener('click', mostrarHome);
  document.body.appendChild(backButton);
  
  // Configurar clicks en las tarjetas de widgets
  const widgets = document.querySelectorAll('.widget-card');
  console.log('Widgets encontrados:', widgets.length);
  
  widgets.forEach((widget, index) => {
    const seccion = widget.dataset.section;
    console.log(`Widget ${index}: ${seccion}`);
    
    widget.addEventListener('click', () => {
      console.log('>>> CLICK EN WIDGET:', seccion);
      if (seccion) {
        navegarA(seccion);
      }
    });
  });
  
  // Configurar barra de navegación inferior
  const bottomNavBtns = document.querySelectorAll('.bottom-nav-btn');
  bottomNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const navType = btn.dataset.nav;
      console.log('Click en nav inferior:', navType);
      
      // Actualizar botones activos
      bottomNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Navegar según el botón
      switch(navType) {
        case 'home':
          mostrarHome();
          break;
        case 'chat':
          navegarA('chat');
          break;
        case 'favorites':
          navegarA('album');
          break;
        case 'calendar':
          navegarA('calendario');
          break;
        case 'profile':
          navegarA('bienestar');
          break;
      }
    });
  });
  
  console.log('✓ Navegación inicializada');
}

// ===== COMPATIBILIDAD ZODIACAL =====
const COMPATIBILIDAD_ZODIACAL = {
  'Aries': { 'Leo': 90, 'Sagitario': 85, 'Géminis': 75, 'Acuario': 80, 'Libra': 70 },
  'Tauro': { 'Virgo': 90, 'Capricornio': 85, 'Cáncer': 80, 'Piscis': 75, 'Escorpio': 70 },
  'Géminis': { 'Libra': 90, 'Acuario': 85, 'Aries': 75, 'Leo': 80, 'Sagitario': 70 },
  'Cáncer': { 'Escorpio': 90, 'Piscis': 85, 'Tauro': 80, 'Virgo': 75, 'Capricornio': 70 },
  'Leo': { 'Aries': 90, 'Sagitario': 85, 'Géminis': 80, 'Libra': 75, 'Acuario': 70 },
  'Virgo': { 'Tauro': 90, 'Capricornio': 85, 'Cáncer': 75, 'Escorpio': 80, 'Piscis': 70 },
  'Libra': { 'Géminis': 90, 'Acuario': 85, 'Leo': 75, 'Sagitario': 80, 'Aries': 70 },
  'Escorpio': { 'Cáncer': 90, 'Piscis': 85, 'Virgo': 80, 'Capricornio': 75, 'Tauro': 70 },
  'Sagitario': { 'Aries': 85, 'Leo': 90, 'Libra': 80, 'Acuario': 75, 'Géminis': 70 },
  'Capricornio': { 'Tauro': 85, 'Virgo': 90, 'Escorpio': 75, 'Piscis': 80, 'Cáncer': 70 },
  'Acuario': { 'Géminis': 85, 'Libra': 90, 'Aries': 80, 'Sagitario': 75, 'Leo': 70 },
  'Piscis': { 'Cáncer': 85, 'Escorpio': 90, 'Tauro': 75, 'Capricornio': 80, 'Virgo': 70 }
};

function calcularCompatibilidadZodiacal(signo1, signo2) {
  if (!signo1 || !signo2) return 50;
  if (signo1 === signo2) return 75;
  return COMPATIBILIDAD_ZODIACAL[signo1]?.[signo2] || 
         COMPATIBILIDAD_ZODIACAL[signo2]?.[signo1] || 50;
}

// ===== PROBABILIDAD CRUSH (SOLO NOMBRE) =====
function calcularProbabilidadCrush() {
  const nombreTuyo = document.getElementById('prob-nombre-tuyo').value.trim();
  const nombreCrush = document.getElementById('prob-nombre-crush').value.trim();
  
  if (!nombreTuyo || !nombreCrush) {
    alert('Por favor ingresa ambos nombres');
    return;
  }

  // Generar probabilidad basada en ambos nombres (suma de códigos de caracteres)
  let sumaTuyo = 0;
  let sumaCrush = 0;
  
  for (let i = 0; i < nombreTuyo.length; i++) {
    sumaTuyo += nombreTuyo.charCodeAt(i);
  }
  
  for (let i = 0; i < nombreCrush.length; i++) {
    sumaCrush += nombreCrush.charCodeAt(i);
  }
  
  // Combinar ambas sumas de forma única
  const combinacion = (sumaTuyo * sumaCrush) + (sumaTuyo + sumaCrush);
  
  // Usar la fecha actual para variar el resultado
  const hoy = new Date();
  const semilla = combinacion + hoy.getDate() + hoy.getMonth();
  
  // Generar porcentaje entre 40 y 98 (para que sea más optimista)
  const porcentaje = 40 + (semilla % 59);

  let mensaje, consejo, emoji;
  if (porcentaje >= 85) {
    emoji = '💕';
    mensaje = '¡Probabilidad muy alta!';
    consejo = `${nombreTuyo} y ${nombreCrush} tienen una conexión especial. Las señales son muy positivas. ¡Este es el momento perfecto para dar el siguiente paso y expresar tus sentimientos!`;
  } else if (porcentaje >= 70) {
    emoji = '❤️';
    mensaje = '¡Buena probabilidad!';
    consejo = `Hay muchas posibilidades de que ${nombreTuyo} y ${nombreCrush} funcionen bien juntos. Sigue siendo tú mismo/a y busca oportunidades para acercarte más.`;
  } else if (porcentaje >= 55) {
    emoji = '💛';
    mensaje = 'Probabilidad moderada';
    consejo = `${nombreTuyo} y ${nombreCrush} tienen potencial. Tómate tu tiempo para conocerse mejor y construir una conexión más fuerte.`;
  } else {
    emoji = '💙';
    mensaje = 'Probabilidad incierta';
    consejo = `No te desanimes, ${nombreTuyo}. A veces las mejores relaciones comienzan con calma. Sigue siendo auténtico/a y deja que las cosas fluyan naturalmente con ${nombreCrush}.`;
  }

  document.getElementById('prob-resultado').innerHTML = `
    <h3>${emoji} ${mensaje}</h3>
    <div class="barra-progreso">
      <div class="barra-fill" style="width: ${porcentaje}%; background: linear-gradient(90deg, var(--probabilidad), var(--crush))">${porcentaje}%</div>
    </div>
    <p style="font-size:1.3rem; margin:1rem 0;">
      <strong>${nombreTuyo}</strong> 💕 <strong>${nombreCrush}</strong>
    </p>
    <p>${consejo}</p>
    <p style="margin-top:1.5rem; font-size:0.9rem; color:#666;">
      💫 <em>Recuerda: El amor verdadero se construye con tiempo, respeto y comunicación. ¡Mucha suerte!</em>
    </p>
  `;
  document.getElementById('prob-resultado').classList.remove('hidden');
}

function reiniciarProbabilidad() {
  document.getElementById('prob-nombre-tuyo').value = '';
  document.getElementById('prob-nombre-crush').value = '';
  document.getElementById('prob-resultado').classList.add('hidden');
}

// ===== CRUSH =====
const PREGUNTAS_CRUSH = [
  { pregunta: '¿Comparten gustos musicales similares?', opciones: ['Sí, mucho', 'Un poco', 'No mucho', 'Para nada'] },
  { pregunta: '¿Les gusta el mismo tipo de películas/series?', opciones: ['Sí, totalmente', 'Algunas', 'Pocas', 'Ninguna'] },
  { pregunta: '¿Tienen hobbies en común?', opciones: ['Muchos', 'Algunos', 'Pocos', 'Ninguno'] },
  { pregunta: '¿Qué tan fácil es la comunicación entre ustedes?', opciones: ['Muy fácil', 'Fácil', 'A veces difícil', 'Difícil'] },
  { pregunta: '¿Comparten valores similares?', opciones: ['Sí, muy similares', 'Bastante', 'Algunos', 'Pocos'] },
  { pregunta: '¿Tienen el mismo sentido del humor?', opciones: ['Sí, mucho', 'Bastante', 'Un poco', 'No mucho'] },
  { pregunta: '¿Les gusta pasar tiempo de la misma manera?', opciones: ['Sí, totalmente', 'Mayormente', 'A veces', 'Raramente'] },
  { pregunta: '¿Qué tan compatibles son sus personalidades?', opciones: ['Muy compatibles', 'Compatibles', 'Algo compatibles', 'Poco compatibles'] }
];

function inicializarCrush() {
  const container = document.getElementById('crush-preguntas');
  container.innerHTML = PREGUNTAS_CRUSH.map((p, i) => `
    <div class="form-group">
      <label>${p.pregunta}</label>
      <select id="crush-q${i}">
        <option value="">-- Selecciona --</option>
        ${p.opciones.map((op, j) => `<option value="${3-j}">${op}</option>`).join('')}
      </select>
    </div>
  `).join('');
}

function calcularCrush() {
  const nombreA = document.getElementById('crush-nombre-a').value.trim();
  const nombreB = document.getElementById('crush-nombre-b').value.trim();
  const signoA = document.getElementById('crush-signo-a').value;
  const signoB = document.getElementById('crush-signo-b').value;

  if (!nombreA || !nombreB || !signoA || !signoB) {
    alert('Por favor completa todos los campos obligatorios (nombres y signos zodiacales)');
    return;
  }

  let puntos = 0;
  let respondidas = 0;
  for (let i = 0; i < PREGUNTAS_CRUSH.length; i++) {
    const val = document.getElementById(`crush-q${i}`).value;
    if (val) {
      puntos += parseInt(val);
      respondidas++;
    }
  }

  if (respondidas < PREGUNTAS_CRUSH.length) {
    alert('Por favor responde todas las preguntas');
    return;
  }

  const puntosPreguntas = (puntos / (PREGUNTAS_CRUSH.length * 3)) * 70;
  const puntosZodiacal = (calcularCompatibilidadZodiacal(signoA, signoB) / 100) * 30;
  const porcentaje = Math.round(puntosPreguntas + puntosZodiacal);

  let mensaje, consejo;
  if (porcentaje >= 86) {
    mensaje = '¡Conexión extraordinaria! 💕';
    consejo = 'Tienen una compatibilidad excepcional. No tengas miedo de dar el siguiente paso y expresar tus sentimientos.';
  } else if (porcentaje >= 61) {
    mensaje = '¡Gran compatibilidad! ❤️';
    consejo = 'Hay mucho potencial aquí. Sigue conociéndose y construyendo esa conexión especial.';
  } else if (porcentaje >= 31) {
    mensaje = 'Compatibilidad moderada 💛';
    consejo = 'Tienen algunas cosas en común. Enfócate en descubrir más intereses compartidos y fortalecer la comunicación.';
  } else {
    mensaje = 'Compatibilidad baja 💙';
    consejo = 'Puede que no sean tan compatibles, pero recuerda que las diferencias también pueden complementarse. Conócense mejor antes de decidir.';
  }

  document.getElementById('crush-resultado').innerHTML = `
    <h3>${mensaje}</h3>
    <div class="barra-progreso">
      <div class="barra-fill" style="width: ${porcentaje}%">${porcentaje}%</div>
    </div>
    <p><strong>${nombreA}</strong> y <strong>${nombreB}</strong></p>
    <p>${consejo}</p>
  `;
  document.getElementById('crush-resultado').classList.remove('hidden');
}

function reiniciarCrush() {
  document.getElementById('crush-nombre-a').value = '';
  document.getElementById('crush-nombre-b').value = '';
  document.getElementById('crush-signo-a').value = '';
  document.getElementById('crush-signo-b').value = '';
  for (let i = 0; i < PREGUNTAS_CRUSH.length; i++) {
    document.getElementById(`crush-q${i}`).value = '';
  }
  document.getElementById('crush-resultado').classList.add('hidden');
}

// ===== PAREJA =====
const PREGUNTAS_PAREJA = [
  { pregunta: '¿Qué tan buena es la comunicación en su relación?', cat: 'comunicacion', opciones: ['Excelente', 'Buena', 'Regular', 'Mala'] },
  { pregunta: '¿Se sienten cómodos expresando sus sentimientos?', cat: 'comunicacion', opciones: ['Siempre', 'Casi siempre', 'A veces', 'Raramente'] },
  { pregunta: '¿Confían plenamente el uno en el otro?', cat: 'confianza', opciones: ['Totalmente', 'Mucho', 'Algo', 'Poco'] },
  { pregunta: '¿Respetan los espacios personales del otro?', cat: 'confianza', opciones: ['Siempre', 'Casi siempre', 'A veces', 'Raramente'] },
  { pregunta: '¿Comparten metas y planes a futuro?', cat: 'futuro', opciones: ['Sí, muchos', 'Algunos', 'Pocos', 'Ninguno'] },
  { pregunta: '¿Están de acuerdo en temas importantes (familia, dinero, etc.)?', cat: 'futuro', opciones: ['Totalmente', 'Mayormente', 'Parcialmente', 'Poco'] },
  { pregunta: '¿Qué tan fuerte es la atracción física/emocional?', cat: 'atraccion', opciones: ['Muy fuerte', 'Fuerte', 'Moderada', 'Débil'] },
  { pregunta: '¿Disfrutan pasar tiempo juntos?', cat: 'atraccion', opciones: ['Siempre', 'Casi siempre', 'A veces', 'Raramente'] },
  { pregunta: '¿Se apoyan mutuamente en momentos difíciles?', cat: 'apoyo', opciones: ['Siempre', 'Casi siempre', 'A veces', 'Raramente'] },
  { pregunta: '¿Resuelven conflictos de manera saludable?', cat: 'apoyo', opciones: ['Sí, siempre', 'Generalmente', 'A veces', 'No'] }
];

function inicializarPareja() {
  const container = document.getElementById('pareja-preguntas');
  container.innerHTML = PREGUNTAS_PAREJA.map((p, i) => `
    <div class="form-group">
      <label>${p.pregunta}</label>
      <select id="pareja-q${i}">
        <option value="">-- Selecciona --</option>
        ${p.opciones.map((op, j) => `<option value="${3-j}">${op}</option>`).join('')}
      </select>
    </div>
  `).join('');
}

function calcularPareja() {
  const nombreA = document.getElementById('pareja-nombre-a').value.trim();
  const nombreB = document.getElementById('pareja-nombre-b').value.trim();
  const signoA = document.getElementById('pareja-signo-a').value;
  const signoB = document.getElementById('pareja-signo-b').value;

  if (!nombreA || !nombreB || !signoA || !signoB) {
    alert('Por favor completa todos los campos obligatorios');
    return;
  }

  const categorias = { comunicacion: 0, confianza: 0, futuro: 0, atraccion: 0, apoyo: 0 };
  const contadores = { comunicacion: 0, confianza: 0, futuro: 0, atraccion: 0, apoyo: 0 };

  for (let i = 0; i < PREGUNTAS_PAREJA.length; i++) {
    const val = document.getElementById(`pareja-q${i}`).value;
    if (!val) {
      alert('Por favor responde todas las preguntas');
      return;
    }
    const cat = PREGUNTAS_PAREJA[i].cat;
    categorias[cat] += parseInt(val);
    contadores[cat]++;
  }

  let totalPuntos = 0;
  for (const cat in categorias) {
    categorias[cat] = Math.round((categorias[cat] / (contadores[cat] * 3)) * 100);
    totalPuntos += categorias[cat];
  }

  const promedio = Math.round(totalPuntos / Object.keys(categorias).length);
  const zodiacal = calcularCompatibilidadZodiacal(signoA, signoB);
  const porcentaje = Math.round((promedio * 0.8) + (zodiacal * 0.2));

  let mensaje, consejo;
  if (porcentaje >= 80) {
    mensaje = '¡Relación excepcional! 💕';
    consejo = 'Tienen una relación muy sólida. Sigan cultivando su amor y comunicación.';
  } else if (porcentaje >= 60) {
    mensaje = 'Buena relación ❤️';
    consejo = 'Van por buen camino. Trabajen en las áreas más débiles para fortalecer aún más su vínculo.';
  } else if (porcentaje >= 40) {
    mensaje = 'Relación con desafíos 💛';
    consejo = 'Hay aspectos que necesitan atención. La comunicación abierta y el compromiso son clave.';
  } else {
    mensaje = 'Relación complicada 💙';
    consejo = 'Consideren hablar honestamente sobre sus diferencias y buscar apoyo si lo necesitan.';
  }

  document.getElementById('pareja-resultado').innerHTML = `
    <h3>${mensaje}</h3>
    <div class="barra-progreso">
      <div class="barra-fill" style="width: ${porcentaje}%">${porcentaje}%</div>
    </div>
    <p><strong>${nombreA}</strong> y <strong>${nombreB}</strong></p>
    <h4>Desglose por categorías:</h4>
    <p>💬 Comunicación: ${categorias.comunicacion}%</p>
    <p>🤝 Confianza: ${categorias.confianza}%</p>
    <p>🔮 Futuro: ${categorias.futuro}%</p>
    <p>💖 Atracción: ${categorias.atraccion}%</p>
    <p>🫂 Apoyo: ${categorias.apoyo}%</p>
    <p>${consejo}</p>
  `;
  document.getElementById('pareja-resultado').classList.remove('hidden');
}

function reiniciarPareja() {
  document.getElementById('pareja-nombre-a').value = '';
  document.getElementById('pareja-nombre-b').value = '';
  document.getElementById('pareja-signo-a').value = '';
  document.getElementById('pareja-signo-b').value = '';
  for (let i = 0; i < PREGUNTAS_PAREJA.length; i++) {
    document.getElementById(`pareja-q${i}`).value = '';
  }
  document.getElementById('pareja-resultado').classList.add('hidden');
}

// ===== INFIDELIDAD =====
const PREGUNTAS_INFIDELIDAD = [
  { pregunta: '¿Tu pareja ha cambiado sus hábitos de comunicación contigo?', opciones: ['No', 'Un poco', 'Bastante', 'Mucho'] },
  { pregunta: '¿Protege excesivamente su teléfono o redes sociales?', opciones: ['No', 'A veces', 'Frecuentemente', 'Siempre'] },
  { pregunta: '¿Ha disminuido el tiempo de calidad que pasan juntos?', opciones: ['No', 'Un poco', 'Bastante', 'Mucho'] },
  { pregunta: '¿Notas cambios en su apariencia o rutina sin explicación?', opciones: ['No', 'Algunos', 'Varios', 'Muchos'] },
  { pregunta: '¿Evita hablar sobre su día o actividades?', opciones: ['No', 'A veces', 'Frecuentemente', 'Siempre'] },
  { pregunta: '¿Ha habido cambios en la intimidad física?', opciones: ['No', 'Leves', 'Moderados', 'Significativos'] },
  { pregunta: '¿Se muestra defensivo/a cuando le haces preguntas normales?', opciones: ['No', 'A veces', 'Frecuentemente', 'Siempre'] },
  { pregunta: '¿Menciona frecuentemente a alguien nuevo en su vida?', opciones: ['No', 'Ocasionalmente', 'Frecuentemente', 'Constantemente'] },
  { pregunta: '¿Has notado mentiras o inconsistencias en sus historias?', opciones: ['No', 'Algunas', 'Varias', 'Muchas'] },
  { pregunta: '¿Tu intuición te dice que algo no está bien?', opciones: ['No', 'Un poco', 'Bastante', 'Mucho'] }
];

function inicializarInfidelidad() {
  const container = document.getElementById('infidelidad-preguntas');
  container.innerHTML = PREGUNTAS_INFIDELIDAD.map((p, i) => `
    <div class="form-group">
      <label>${p.pregunta}</label>
      <select id="infidelidad-q${i}">
        <option value="">-- Selecciona --</option>
        ${p.opciones.map((op, j) => `<option value="${j}">${op}</option>`).join('')}
      </select>
    </div>
  `).join('');
}

function calcularInfidelidad() {
  let puntos = 0;
  for (let i = 0; i < PREGUNTAS_INFIDELIDAD.length; i++) {
    const val = document.getElementById(`infidelidad-q${i}`).value;
    if (!val && val !== '0') {
      alert('Por favor responde todas las preguntas');
      return;
    }
    puntos += parseInt(val);
  }

  const porcentaje = Math.round((puntos / (PREGUNTAS_INFIDELIDAD.length * 3)) * 100);

  let categoria, mensaje, consejo, color;
  if (porcentaje <= 20) {
    categoria = 'Muy bajo riesgo';
    mensaje = '✅ Tu relación muestra señales saludables';
    consejo = 'No hay indicios preocupantes. Sigue cultivando la confianza y comunicación en tu relación.';
    color = '#2ed573';
  } else if (porcentaje <= 40) {
    categoria = 'Bajo riesgo';
    mensaje = '🟢 Algunas señales menores';
    consejo = 'Hay algunos aspectos que podrían mejorar. Habla abiertamente con tu pareja sobre tus inquietudes.';
    color = '#55efc4';
  } else if (porcentaje <= 60) {
    categoria = 'Riesgo moderado';
    mensaje = '🟡 Señales de alerta presentes';
    consejo = 'Hay varios indicadores que requieren atención. Es importante tener una conversación honesta con tu pareja.';
    color = '#ffa502';
  } else if (porcentaje <= 80) {
    categoria = 'Alto riesgo';
    mensaje = '🟠 Múltiples señales preocupantes';
    consejo = 'Los indicadores son significativos. Considera buscar apoyo profesional o tener una conversación seria sobre el futuro de la relación.';
    color = '#ff6348';
  } else {
    categoria = 'Muy alto riesgo';
    mensaje = '🔴 Señales muy preocupantes';
    consejo = 'Los indicadores son muy alarmantes. Es crucial que evalúes la situación con calma y consideres buscar apoyo de personas de confianza o profesionales.';
    color = '#ff4757';
  }

  document.getElementById('infidelidad-resultado').innerHTML = `
    <h3>${mensaje}</h3>
    <div class="barra-progreso">
      <div class="barra-fill" style="width: ${porcentaje}%; background: ${color}">${porcentaje}%</div>
    </div>
    <p><strong>Categoría:</strong> ${categoria}</p>
    <p>${consejo}</p>
    <p style="margin-top:1rem; font-size:0.85rem; color:#666;">
      <em>Recuerda: Esta es solo una herramienta orientativa. La confianza y comunicación son fundamentales en cualquier relación.</em>
    </p>
  `;
  document.getElementById('infidelidad-resultado').classList.remove('hidden');
}

function reiniciarInfidelidad() {
  for (let i = 0; i < PREGUNTAS_INFIDELIDAD.length; i++) {
    document.getElementById(`infidelidad-q${i}`).value = '';
  }
  document.getElementById('infidelidad-resultado').classList.add('hidden');
}

// ===== CHAT =====
let canvasActivo = false;
let dibujando = false;
let ctx;
let colorActual = '#ff6b9d';

function inicializarChat() {
  const canvas = document.getElementById('canvas-dibujo');
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorActual;

  canvas.addEventListener('mousedown', iniciarDibujo);
  canvas.addEventListener('mousemove', dibujar);
  canvas.addEventListener('mouseup', detenerDibujo);
  canvas.addEventListener('mouseout', detenerDibujo);

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });

  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  });

  cargarHistorialChat();
}

function iniciarDibujo(e) {
  dibujando = true;
  const rect = e.target.getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function dibujar(e) {
  if (!dibujando) return;
  const rect = e.target.getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
}

function detenerDibujo() {
  dibujando = false;
}

function setColor(color) {
  colorActual = color;
  ctx.strokeStyle = color;
}

function borrarCanvas() {
  const canvas = document.getElementById('canvas-dibujo');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function enviarMensaje() {
  const input = document.getElementById('chat-input');
  const texto = input.value.trim();
  if (!texto) return;

  const nombreA = document.getElementById('chat-nombre-a').value.trim() || 'Tú';
  const mensaje = {
    tipo: 'texto',
    autor: nombreA,
    contenido: texto,
    hora: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
  };

  agregarMensajeAlChat(mensaje);
  guardarMensajeEnStorage(mensaje);
  input.value = '';
}

function enviarDibujo() {
  const canvas = document.getElementById('canvas-dibujo');
  const nombreA = document.getElementById('chat-nombre-a').value.trim() || 'Tú';
  const dataURL = canvas.toDataURL();

  const mensaje = {
    tipo: 'dibujo',
    autor: nombreA,
    contenido: dataURL,
    hora: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
  };

  agregarMensajeAlChat(mensaje);
  guardarMensajeEnStorage(mensaje);
  borrarCanvas();
}

function agregarMensajeAlChat(mensaje) {
  const chatArea = document.getElementById('chat-mensajes');
  const div = document.createElement('div');
  div.className = 'mensaje';

  if (mensaje.tipo === 'texto') {
    div.innerHTML = `
      <strong>${mensaje.autor}</strong>
      <p>${mensaje.contenido}</p>
      <div class="mensaje-hora">${mensaje.hora}</div>
    `;
  } else {
    div.innerHTML = `
      <strong>${mensaje.autor}</strong>
      <img src="${mensaje.contenido}" style="max-width:100%; border-radius:0.5rem; margin-top:0.5rem;" alt="Dibujo" />
      <div class="mensaje-hora">${mensaje.hora}</div>
    `;
  }

  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function guardarMensajeEnStorage(mensaje) {
  const historial = JSON.parse(localStorage.getItem('lovematch_chat') || '[]');
  historial.push(mensaje);
  localStorage.setItem('lovematch_chat', JSON.stringify(historial));
}

function cargarHistorialChat() {
  const historial = JSON.parse(localStorage.getItem('lovematch_chat') || '[]');
  historial.forEach(msg => agregarMensajeAlChat(msg));
}

// ===== DISTANCIA =====
const DISTANCIAS_CIUDADES = {
  'bogota-medellin': 415,
  'bogota-cali': 510,
  'bogota-barranquilla': 990,
  'bogota-cartagena': 1050,
  'medellin-cali': 420,
  'medellin-barranquilla': 710,
  'cali-barranquilla': 1100,
  'madrid-barcelona': 620,
  'madrid-valencia': 355,
  'mexico-guadalajara': 550,
  'mexico-monterrey': 900,
  'buenosaires-cordoba': 700,
  'buenosaires-rosario': 300,
  'lima-arequipa': 1010,
  'lima-cusco': 1100,
  'santiago-valparaiso': 120
};

function normalizarCiudad(ciudad) {
  return ciudad.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');
}

function calcularDistancia() {
  const ciudadA = document.getElementById('ciudad-a').value.trim();
  const ciudadB = document.getElementById('ciudad-b').value.trim();

  if (!ciudadA || !ciudadB) {
    alert('Por favor ingresa ambas ciudades');
    return;
  }

  const keyA = normalizarCiudad(ciudadA);
  const keyB = normalizarCiudad(ciudadB);
  const key1 = `${keyA}-${keyB}`;
  const key2 = `${keyB}-${keyA}`;

  let distancia = DISTANCIAS_CIUDADES[key1] || DISTANCIAS_CIUDADES[key2];

  if (!distancia) {
    document.getElementById('distancia-resultado').innerHTML = `
      <p>❌ No se encontró la distancia entre estas ciudades. Intenta con ciudades principales como: Bogotá, Medellín, Cali, Madrid, Barcelona, México, etc.</p>
    `;
    document.getElementById('distancia-resultado').classList.remove('hidden');
    return;
  }

  let mensaje;
  if (distancia < 100) {
    mensaje = '¡Están muy cerca! 💕 La distancia no es un problema para ustedes.';
  } else if (distancia < 500) {
    mensaje = 'Una distancia manejable 💖 Con esfuerzo pueden verse seguido.';
  } else if (distancia < 1000) {
    mensaje = 'Distancia considerable 💙 Pero el amor verdadero supera cualquier kilómetro.';
  } else {
    mensaje = 'Muy lejos 💜 Pero recuerda: la distancia es temporal, el amor es eterno.';
  }

  document.getElementById('distancia-resultado').innerHTML = `
    <h3>📍 ${distancia} km</h3>
    <p><strong>${ciudadA}</strong> ↔️ <strong>${ciudadB}</strong></p>
    <p>${mensaje}</p>
  `;
  document.getElementById('distancia-resultado').classList.remove('hidden');
}

// ===== ÁLBUM =====
function previewFoto() {
  const input = document.getElementById('album-foto');
  const preview = document.getElementById('album-preview');

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.classList.remove('hidden');
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function guardarFoto() {
  const input = document.getElementById('album-foto');
  const desc = document.getElementById('album-desc').value.trim();
  const preview = document.getElementById('album-preview');

  if (!input.files || !input.files[0]) {
    alert('Por favor selecciona una foto');
    return;
  }

  if (!desc) {
    alert('Por favor escribe una descripción');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const foto = {
      id: Date.now(),
      imagen: e.target.result,
      descripcion: desc,
      fecha: new Date().toLocaleDateString('es')
    };

    const album = JSON.parse(localStorage.getItem('lovematch_album') || '[]');
    album.push(foto);
    localStorage.setItem('lovematch_album', JSON.stringify(album));

    input.value = '';
    document.getElementById('album-desc').value = '';
    preview.classList.add('hidden');
    preview.src = '';

    cargarGaleria();
  };
  reader.readAsDataURL(input.files[0]);
}

function cargarGaleria() {
  const album = JSON.parse(localStorage.getItem('lovematch_album') || '[]');
  const galeria = document.getElementById('album-galeria');

  if (album.length === 0) {
    galeria.innerHTML = '<p style="text-align:center; color:#999;">No hay fotos aún. ¡Agrega tu primer recuerdo!</p>';
    return;
  }

  galeria.innerHTML = album.map(foto => `
    <div class="galeria-item" onclick="ampliarFoto(${foto.id})">
      <img src="${foto.imagen}" alt="Recuerdo" />
      <div class="galeria-item-desc">
        <p>${foto.descripcion}</p>
        <small>${foto.fecha}</small>
      </div>
    </div>
  `).join('');
}

function ampliarFoto(id) {
  const album = JSON.parse(localStorage.getItem('lovematch_album') || '[]');
  const foto = album.find(f => f.id === id);
  if (!foto) return;

  document.getElementById('modal-img').src = foto.imagen;
  document.getElementById('modal-desc').textContent = foto.descripcion;
  document.getElementById('modal-foto').classList.remove('hidden');
}

function cerrarModal() {
  document.getElementById('modal-foto').classList.add('hidden');
}

// ===== DÍAS JUNTOS =====
function calcularDias() {
  const fechaInput = document.getElementById('dias-fecha').value;
  if (!fechaInput) {
    alert('Por favor selecciona una fecha');
    return;
  }

  const fechaInicio = new Date(fechaInput + 'T00:00:00');
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaInicio > hoy) {
    alert('La fecha debe ser anterior o igual a hoy');
    return;
  }

  const diffMs = hoy - fechaInicio;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMeses = Math.floor(diffDias / 30);
  const diffAnios = Math.floor(diffDias / 365);

  let mensaje;
  if (diffDias < 30) {
    mensaje = '¡El comienzo de algo hermoso! 💕';
  } else if (diffDias < 365) {
    mensaje = '¡Construyendo recuerdos juntos! ❤️';
  } else if (diffDias < 1825) {
    mensaje = '¡Una relación sólida y hermosa! 💖';
  } else {
    mensaje = '¡Un amor que perdura en el tiempo! 💍';
  }

  document.getElementById('dias-resultado').innerHTML = `
    <h3>${mensaje}</h3>
    <div style="text-align:center; margin:1.5rem 0;">
      <div style="font-size:3rem; font-weight:700; color:var(--dias);">${diffDias}</div>
      <div style="font-size:1.2rem; margin-top:0.5rem;">días juntos</div>
    </div>
    <p style="text-align:center;">
      <strong>${diffAnios}</strong> años, <strong>${diffMeses % 12}</strong> meses
    </p>
  `;
  document.getElementById('dias-resultado').classList.remove('hidden');

  localStorage.setItem('lovematch_fecha_inicio', fechaInput);
}

function cargarContador() {
  const fechaGuardada = localStorage.getItem('lovematch_fecha_inicio');
  if (fechaGuardada) {
    document.getElementById('dias-fecha').value = fechaGuardada;
  }
}

// ===== CALENDARIO =====
function agregarEvento() {
  const nombre = document.getElementById('cal-nombre').value.trim();
  const fecha = document.getElementById('cal-fecha').value;
  const desc = document.getElementById('cal-desc').value.trim();

  if (!nombre) {
    alert('Por favor ingresa el nombre del evento');
    return;
  }

  if (!fecha) {
    alert('Por favor selecciona una fecha');
    return;
  }

  const evento = {
    id: Date.now(),
    nombre,
    fecha,
    descripcion: desc
  };

  const eventos = JSON.parse(localStorage.getItem('lovematch_eventos') || '[]');
  eventos.push(evento);
  localStorage.setItem('lovematch_eventos', JSON.stringify(eventos));

  document.getElementById('cal-nombre').value = '';
  document.getElementById('cal-fecha').value = '';
  document.getElementById('cal-desc').value = '';

  cargarEventos();
  verificarProximosEventos();
}

function cargarEventos() {
  const eventos = JSON.parse(localStorage.getItem('lovematch_eventos') || '[]');
  const lista = document.getElementById('cal-lista');

  if (eventos.length === 0) {
    lista.innerHTML = '<p style="text-align:center; color:#999;">No hay eventos registrados aún.</p>';
    return;
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  eventos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  lista.innerHTML = eventos.map(evento => {
    const fechaEvento = new Date(evento.fecha + 'T00:00:00');
    const diffMs = fechaEvento - hoy;
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let diasTexto;
    if (diffDias < 0) {
      diasTexto = `Fue hace ${Math.abs(diffDias)} días`;
    } else if (diffDias === 0) {
      diasTexto = '¡Es hoy! 🎉';
    } else if (diffDias === 1) {
      diasTexto = '¡Es mañana! 🎊';
    } else {
      diasTexto = `Faltan ${diffDias} días`;
    }

    return `
      <div class="evento-item">
        <h4>${evento.nombre}</h4>
        <div class="evento-fecha">${new Date(evento.fecha + 'T00:00:00').toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        ${evento.descripcion ? `<p style="margin-top:0.5rem; font-size:0.9rem;">${evento.descripcion}</p>` : ''}
        <div class="evento-dias">${diasTexto}</div>
        <button class="btn-secondary" style="margin-top:0.5rem; padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="eliminarEvento(${evento.id})">🗑️ Eliminar</button>
      </div>
    `;
  }).join('');
}

function eliminarEvento(id) {
  if (!confirm('¿Seguro que quieres eliminar este evento?')) return;

  let eventos = JSON.parse(localStorage.getItem('lovematch_eventos') || '[]');
  eventos = eventos.filter(e => e.id !== id);
  localStorage.setItem('lovematch_eventos', JSON.stringify(eventos));
  cargarEventos();
}

function verificarProximosEventos() {
  const eventos = JSON.parse(localStorage.getItem('lovematch_eventos') || '[]');
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const proximos = eventos.filter(evento => {
    const fechaEvento = new Date(evento.fecha + 'T00:00:00');
    const diffMs = fechaEvento - hoy;
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDias >= 0 && diffDias <= 3;
  });

  if (proximos.length > 0 && !sessionStorage.getItem('lovematch_alerta_mostrada')) {
    const nombres = proximos.map(e => e.nombre).join(', ');
    alert(`🎉 Recordatorio: Tienes eventos próximos: ${nombres}`);
    sessionStorage.setItem('lovematch_alerta_mostrada', 'true');
  }
}

// ===== BIENESTAR =====
const PREGUNTAS_BIENESTAR = [
  { pregunta: '¿Cómo te sientes emocionalmente en tu relación este mes?', opciones: ['Muy feliz', 'Feliz', 'Neutral', 'Triste', 'Muy triste'] },
  { pregunta: '¿Qué tan satisfecho/a estás con la comunicación?', opciones: ['Muy satisfecho/a', 'Satisfecho/a', 'Neutral', 'Insatisfecho/a', 'Muy insatisfecho/a'] },
  { pregunta: '¿Sientes que tu pareja te apoya?', opciones: ['Siempre', 'Casi siempre', 'A veces', 'Raramente', 'Nunca'] },
  { pregunta: '¿Cómo calificarías la calidad del tiempo juntos?', opciones: ['Excelente', 'Buena', 'Regular', 'Mala', 'Muy mala'] },
  { pregunta: '¿Te sientes valorado/a en la relación?', opciones: ['Siempre', 'Casi siempre', 'A veces', 'Raramente', 'Nunca'] },
  { pregunta: '¿En qué área crees que deben mejorar como pareja?', tipo: 'texto', placeholder: 'Ej: Comunicación, tiempo juntos, intimidad...' }
];

function inicializarBienestar() {
  const hoy = new Date();
  const mes = hoy.toLocaleDateString('es', { month: 'long', year: 'numeric' });
  document.getElementById('bienestar-mes-anio').textContent = `📅 ${mes.charAt(0).toUpperCase() + mes.slice(1)}`;

  const container = document.getElementById('bienestar-preguntas');
  container.innerHTML = PREGUNTAS_BIENESTAR.map((p, i) => {
    if (p.tipo === 'texto') {
      return `
        <div class="form-group">
          <label>${p.pregunta}</label>
          <textarea id="bienestar-q${i}" placeholder="${p.placeholder}" rows="2"></textarea>
        </div>
      `;
    } else {
      return `
        <div class="form-group">
          <label>${p.pregunta}</label>
          <select id="bienestar-q${i}">
            <option value="">-- Selecciona --</option>
            ${p.opciones.map(op => `<option value="${op}">${op}</option>`).join('')}
          </select>
        </div>
      `;
    }
  }).join('');

  cargarHistorialBienestar();
}

function enviarBienestar() {
  const respuestas = [];
  for (let i = 0; i < PREGUNTAS_BIENESTAR.length; i++) {
    const val = document.getElementById(`bienestar-q${i}`).value.trim();
    if (!val) {
      alert('Por favor responde todas las preguntas');
      return;
    }
    respuestas.push(val);
  }

  const hoy = new Date();
  const mesAnio = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;

  const entrada = {
    mesAnio,
    fecha: hoy.toLocaleDateString('es'),
    respuestas
  };

  const historial = JSON.parse(localStorage.getItem('lovematch_bienestar') || '[]');
  const index = historial.findIndex(h => h.mesAnio === mesAnio);
  if (index >= 0) {
    historial[index] = entrada;
  } else {
    historial.push(entrada);
  }
  localStorage.setItem('lovematch_bienestar', JSON.stringify(historial));

  const areasMejorar = respuestas[5];
  document.getElementById('bienestar-resultado').innerHTML = `
    <h3>✅ Formulario guardado</h3>
    <p><strong>Área a mejorar:</strong> ${areasMejorar}</p>
    <p>💪 Recuerda: Cada mes es una oportunidad para crecer juntos. ¡Sigue trabajando en tu relación!</p>
  `;
  document.getElementById('bienestar-resultado').classList.remove('hidden');

  cargarHistorialBienestar();
}

function cargarHistorialBienestar() {
  const historial = JSON.parse(localStorage.getItem('lovematch_bienestar') || '[]');
  const container = document.getElementById('bienestar-historial');

  if (historial.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#999;">No hay registros anteriores.</p>';
    return;
  }

  historial.sort((a, b) => b.mesAnio.localeCompare(a.mesAnio));

  container.innerHTML = historial.map(entrada => {
    const [anio, mes] = entrada.mesAnio.split('-');
    const nombreMes = new Date(anio, mes - 1).toLocaleDateString('es', { month: 'long', year: 'numeric' });

    return `
      <div class="evento-item" style="border-left-color: var(--bienestar);">
        <h4>${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)}</h4>
        <small>${entrada.fecha}</small>
        <div style="margin-top:0.75rem; font-size:0.9rem;">
          ${PREGUNTAS_BIENESTAR.map((p, i) => `
            <p><strong>${p.pregunta}</strong><br/>${entrada.respuestas[i]}</p>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Verificar sesión primero
  verificarSesion();
  
  inicializarNavegacion();
  inicializarCrush();
  inicializarPareja();
  inicializarInfidelidad();
  inicializarChat();
  cargarContador();
  cargarGaleria();
  cargarEventos();
  verificarProximosEventos();
  cargarFotoPerfil();
  cargarConfiguracionPerfil();
  
  // Ocultar todas las secciones al inicio
  SECCIONES.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  
  // Permitir Enter para enviar formularios
  document.getElementById('login-password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') iniciarSesion();
  });
  
  document.getElementById('register-password-confirm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') registrarUsuario();
  });
});

// ===== PERFIL =====
function cambiarFotoPerfil() {
  document.getElementById('profile-photo-input').click();
}

function actualizarFotoPerfil() {
  const input = document.getElementById('profile-photo-input');
  const img = document.getElementById('profile-img');
  
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      localStorage.setItem('lovematch_profile_photo', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function cargarFotoPerfil() {
  const fotoGuardada = localStorage.getItem('lovematch_profile_photo');
  if (fotoGuardada) {
    document.getElementById('profile-img').src = fotoGuardada;
  }
}

function mostrarSobreTi() {
  const nombre = prompt('¿Cuál es tu nombre?', localStorage.getItem('lovematch_nombre') || '');
  if (nombre !== null && nombre.trim() !== '') {
    localStorage.setItem('lovematch_nombre', nombre);
    document.getElementById('profile-name').textContent = nombre;
    alert('✅ Nombre guardado correctamente');
  }
}

function mostrarSobreRelacion() {
  const nombrePareja = prompt('¿Cuál es el nombre de tu pareja?', localStorage.getItem('lovematch_nombre_pareja') || '');
  if (nombrePareja !== null && nombrePareja.trim() !== '') {
    localStorage.setItem('lovematch_nombre_pareja', nombrePareja);
    
    const fechaInicio = prompt('¿Desde cuándo están juntos? (YYYY-MM-DD)', localStorage.getItem('lovematch_fecha_inicio') || '');
    if (fechaInicio !== null && fechaInicio.trim() !== '') {
      localStorage.setItem('lovematch_fecha_inicio', fechaInicio);
      alert('✅ Información de la relación guardada correctamente');
    }
  }
}

function mostrarCompraPro() {
  alert('🌟 LoveMatch PRO\n\n' +
        '✨ Características premium:\n' +
        '• Todos los juegos desbloqueados\n' +
        '• Entradas ilimitadas en el diario\n' +
        '• Widgets personalizados\n' +
        '• Sin anuncios\n' +
        '• Soporte prioritario\n\n' +
        'Precio: $4.99/mes\n\n' +
        '💳 Función de pago en desarrollo');
}

function mostrarWidgets() {
  alert('🎨 Widgets Disponibles\n\n' +
        '• Contador de días juntos\n' +
        '• Próximas fechas especiales\n' +
        '• Galería de fotos recientes\n' +
        '• Estado de compatibilidad\n\n' +
        '⭐ Desbloquea más widgets con LoveMatch PRO');
}

function cambiarIdioma() {
  const idiomas = ['Español', 'English', 'Français', 'Deutsch', 'Italiano', 'Português'];
  const idiomaActual = localStorage.getItem('lovematch_idioma') || 'Español';
  const indiceActual = idiomas.indexOf(idiomaActual);
  
  let mensaje = '🌐 Selecciona tu idioma:\n\n';
  idiomas.forEach((idioma, index) => {
    mensaje += `${index + 1}. ${idioma}${idioma === idiomaActual ? ' ✓' : ''}\n`;
  });
  
  const seleccion = prompt(mensaje + '\nEscribe el número del idioma:', (indiceActual + 1).toString());
  
  if (seleccion !== null) {
    const indice = parseInt(seleccion) - 1;
    if (indice >= 0 && indice < idiomas.length) {
      localStorage.setItem('lovematch_idioma', idiomas[indice]);
      document.getElementById('idioma-actual').textContent = idiomas[indice];
      alert(`✅ Idioma cambiado a ${idiomas[indice]}`);
    }
  }
}

function cambiarUnidadDistancia() {
  const unidadActual = localStorage.getItem('lovematch_unidad_distancia') || 'kilómetros';
  const nuevaUnidad = unidadActual === 'kilómetros' ? 'millas' : 'kilómetros';
  
  if (confirm(`¿Cambiar de ${unidadActual} a ${nuevaUnidad}?`)) {
    localStorage.setItem('lovematch_unidad_distancia', nuevaUnidad);
    document.getElementById('unidad-distancia').textContent = nuevaUnidad;
    alert(`✅ Unidad cambiada a ${nuevaUnidad}`);
  }
}

function solicitarPermisoUbicacion() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        localStorage.setItem('lovematch_ubicacion_permitida', 'true');
        document.getElementById('ubicacion-status').textContent = '✓';
        document.getElementById('ubicacion-status').classList.remove('denied');
        document.getElementById('ubicacion-status').classList.add('granted');
        alert('✅ Permiso de ubicación concedido');
      },
      (error) => {
        alert('❌ No se pudo obtener el permiso de ubicación.\n\n' +
              'Por favor, habilita los permisos de ubicación en la configuración de tu navegador.');
      }
    );
  } else {
    alert('❌ Tu navegador no soporta geolocalización');
  }
}

function configurarNotificaciones() {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      alert('✅ Las notificaciones ya están habilitadas');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('LoveMatch', {
            body: '¡Notificaciones habilitadas correctamente! 💕',
            icon: 'https://via.placeholder.com/128'
          });
          alert('✅ Notificaciones habilitadas');
        } else {
          alert('❌ Permiso de notificaciones denegado');
        }
      });
    } else {
      alert('❌ Las notificaciones están bloqueadas.\n\n' +
            'Por favor, habilita las notificaciones en la configuración de tu navegador.');
    }
  } else {
    alert('❌ Tu navegador no soporta notificaciones');
  }
}

function cerrarSesion() {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    // Guardar email del usuario antes de limpiar
    const usuarioActual = localStorage.getItem('lovematch_usuario_actual');
    
    // Limpiar solo los datos de sesión, mantener usuarios registrados
    const usuarios = localStorage.getItem('lovematch_usuarios');
    
    localStorage.clear();
    
    // Restaurar usuarios registrados
    if (usuarios) {
      localStorage.setItem('lovematch_usuarios', usuarios);
    }
    
    sessionStorage.clear();
    
    alert('✅ Sesión cerrada correctamente');
    
    // Volver a la pantalla de login
    mostrarAuth();
    mostrarLogin();
    
    // Limpiar formularios
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
  }
}

// Cargar configuración guardada
function cargarConfiguracionPerfil() {
  // Cargar nombre
  const nombreGuardado = localStorage.getItem('lovematch_nombre');
  if (nombreGuardado) {
    document.getElementById('profile-name').textContent = nombreGuardado;
  }
  
  // Cargar idioma
  const idiomaGuardado = localStorage.getItem('lovematch_idioma');
  if (idiomaGuardado) {
    document.getElementById('idioma-actual').textContent = idiomaGuardado;
  }
  
  // Cargar unidad de distancia
  const unidadGuardada = localStorage.getItem('lovematch_unidad_distancia');
  if (unidadGuardada) {
    document.getElementById('unidad-distancia').textContent = unidadGuardada;
  }
  
  // Cargar estado de ubicación
  const ubicacionPermitida = localStorage.getItem('lovematch_ubicacion_permitida');
  if (ubicacionPermitida === 'true') {
    document.getElementById('ubicacion-status').textContent = '✓';
    document.getElementById('ubicacion-status').classList.remove('denied');
    document.getElementById('ubicacion-status').classList.add('granted');
  }
}
