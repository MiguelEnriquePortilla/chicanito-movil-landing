const LAUNCH_DATE = new Date('2026-08-24T00:00:00-06:00');

const els = {
  days: document.getElementById('cd-days'),
  hours: document.getElementById('cd-hours'),
  mins: document.getElementById('cd-mins'),
  secs: document.getElementById('cd-secs'),
};

function pad(n) {
  return String(n).padStart(2, '0');
}

function tick() {
  const now = new Date();
  let diff = LAUNCH_DATE - now;

  if (diff <= 0) {
    els.days.textContent = '00';
    els.hours.textContent = '00';
    els.mins.textContent = '00';
    els.secs.textContent = '00';
    return;
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const min = 1000 * 60;

  const days = Math.floor(diff / day);
  diff -= days * day;
  const hours = Math.floor(diff / hour);
  diff -= hours * hour;
  const mins = Math.floor(diff / min);
  diff -= mins * min;
  const secs = Math.floor(diff / 1000);

  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.mins.textContent = pad(mins);
  els.secs.textContent = pad(secs);
}

tick();
setInterval(tick, 1000);

// Header shadow on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });

// Reveal sections on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- Chat bot ----------
const WHATSAPP_LINK = 'https://wa.me/527341260080?text=%C2%A1Hola!%20Tengo%20una%20pregunta%20sobre%20Chicanito%20M%C3%B3vil';
const WHATSAPP_SOCIO_LINK = 'https://wa.me/527341260080?text=%C2%A1Hola!%20Me%20interesa%20ser%20socio%20operativo%20de%20Chicanito%20M%C3%B3vil';

// Base de conocimiento: cada entrada tiene palabras clave (sin acentos) y una respuesta.
const CHAT_KB = [
  {
    keywords: ['menu', 'que incluye', 'paquete', 'precio', 'cuanto cuesta', 'cuanto vale', 'costo'],
    answer: 'Manejamos un solo paquete: 1 pollo rostizado entero (elige tu sabor), incluye salsa verde Chicanito y guarnición de cebollas y chiles asados. Todo por <strong>$199 pesos</strong>.',
  },
  {
    keywords: ['sabor', 'sabores'],
    answer: 'Tenemos 5 sabores: <strong>Original, Tres Chiles, BBQ, Mango Habanero y Finas Hierbas</strong>. ¡Tú eliges!',
  },
  {
    keywords: ['primeros 100', '100 pesos', 'promocion', 'promo', 'descuento', 'oferta'],
    answer: '🔥 <strong>Los Primeros 100</strong>: si te registras por WhatsApp antes de la apertura, tu pollo del día del lanzamiento te sale en <strong>$100 pesos</strong> en vez de $199. Para canjearlo, el día de la apertura tienes que estar en la lista de WhatsApp y mostrar tu INE. ¡Solo para los primeros 100!',
  },
  {
    keywords: ['cuando', 'fecha', 'lanzamiento', 'inaugura', 'apertura'],
    answer: 'Abrimos el <strong>lunes 24 de agosto de 2026</strong>. ¡Ya casi!',
  },
  {
    keywords: ['donde', 'ubicacion', 'zona', 'colonia', 'direccion'],
    answer: 'Nos movemos por <strong>Jojutla, Morelos y alrededores</strong> — cada día en una ubicación distinta. Síguenos en redes para saber dónde estamos hoy.',
  },
  {
    keywords: ['pedido', 'domicilio', 'delivery', 'entrega', 'llevar a mi casa'],
    answer: 'Por ahora los pedidos son <strong>solo en ventanilla</strong>, directo en la moto food cart. No manejamos pedidos por WhatsApp ni delivery a domicilio.',
  },
  {
    keywords: ['whatsapp', 'contacto', 'telefono', 'numero', 'registrar', 'registro'],
    answer: `Escríbenos por WhatsApp al <strong>+52 734 126 0080</strong> para registrarte en la promo Los Primeros 100 o resolver dudas. <a href="${WHATSAPP_LINK}" target="_blank" rel="noopener">Abrir WhatsApp</a>`,
  },
  {
    keywords: ['redes', 'instagram', 'facebook', 'tiktok', 'seguir'],
    answer: 'Síguenos como <strong>@chickenchicanito</strong> en Facebook, Instagram y TikTok — ahí anunciamos la ubicación del día.',
  },
  {
    keywords: ['es lo mismo', 'misma marca', 'marca nueva', 'diferente restaurante', 'es otro negocio', 'es el mismo'],
    answer: 'Sí, es el mismo <strong>Chicken Chicanito</strong> que ya conoces — mismo sabor, misma receta — ahora en formato food cart sobre motocicleta para llegar directo a tu colonia.',
  },
  {
    keywords: ['otros platillos', 'algo mas', 'ademas del pollo', 'bebida', 'bebidas', 'refresco', 'papas', 'extras', 'postre'],
    answer: 'Por ahora Chicanito Móvil maneja <strong>un solo paquete</strong>: el pollo rostizado entero con salsa verde Chicanito y guarnición. No manejamos bebidas ni extras por separado.',
  },
  {
    keywords: ['socio operativo', 'ser socio', 'manejar la moto', 'manejar el carrito', 'manejar el motochicanito', 'trabajar con ustedes', 'reclutamiento', 'vacante', 'quiero trabajar', 'necesitan gente', 'buscan gente'],
    answer: `¡Buscamos socios operativos! No es un empleo, es una <strong>sociedad</strong>: tú operas tu Moto Chicanito y tu ingreso no tiene tope, depende de tus ventas. Escríbenos por WhatsApp y con gusto te damos todos los detalles. <a href="${WHATSAPP_SOCIO_LINK}" target="_blank" rel="noopener">Quiero ser socio operativo</a>`,
  },
  {
    keywords: ['forma de pago', 'formas de pago', 'como pago', 'aceptan tarjeta', 'aceptan efectivo', 'metodo de pago', 'metodos de pago', 'transferencia'],
    answer: 'Aceptamos <strong>efectivo, pago electrónico (tarjeta) y QR</strong>. Por ahora no manejamos transferencia bancaria.',
  },
  {
    keywords: ['medio pollo', 'media orden', 'piezas sueltas', 'por piezas', 'una pieza'],
    answer: 'Por ahora manejamos el pollo <strong>completo únicamente</strong> — no vendemos medios pollos ni piezas sueltas. ¡Estamos evaluando ofrecer medio pollo más adelante!',
  },
  {
    keywords: ['horario', 'a que hora', 'hora abren', 'hora cierran', 'hasta que hora'],
    answer: 'Nuestro horario es de <strong>lunes a domingo, de 10:00 AM a 6:00 PM</strong>, en la ubicación del día.',
  },
  {
    keywords: ['cuantas personas', 'para cuantos', 'alcanza para', 'rinde', 'piezas tiene', 'cuantas piezas'],
    answer: 'El pollo entero trae <strong>8 piezas</strong> — usualmente alcanza para <strong>2 o 3 personas</strong>.',
  },
  {
    keywords: ['canjear', 'canje', 'reclamar', 'como reclamo', 'que necesito para', 'ine', 'identificacion'],
    answer: 'Para tu pollo a $100 el día de la apertura necesitas <strong>estar en la lista de registro de WhatsApp</strong> y <strong>mostrar tu INE</strong> al momento de recogerlo.',
  },
];

const CHAT_QUICK_REPLIES = [
  '¿Qué incluye el menú?',
  '¿Cuándo abren?',
  '¿Dónde los encuentro?',
  '¿Cómo participo en Los Primeros 100?',
  '¿Cómo puedo ser socio operativo?',
];

const CHAT_FALLBACK = `No tengo esa respuesta a la mano 🐔 Escríbenos directo por <a href="${WHATSAPP_LINK}" target="_blank" rel="noopener">WhatsApp</a> y con gusto te ayudamos.`;

const CHAT_GREETING = '¡Hola! Soy el Chicanito Bot 🐔 Pregúntame sobre el menú, promos, ubicación o fechas.';

function normalizeChatText(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function findChatAnswer(text) {
  const normalized = normalizeChatText(text);
  const match = CHAT_KB.find((entry) =>
    entry.keywords.some((kw) => normalized.includes(kw))
  );
  return match ? match.answer : CHAT_FALLBACK;
}

const chatToggle = document.getElementById('chatToggle');
const chatPanel = document.getElementById('chatPanel');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatQuickReplies = document.getElementById('chatQuickReplies');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

let chatInitialized = false;

function appendChatMessage(html, from) {
  const msg = document.createElement('div');
  msg.className = `chat-msg chat-msg-${from}`;
  msg.innerHTML = html;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderQuickReplies() {
  chatQuickReplies.innerHTML = '';
  CHAT_QUICK_REPLIES.forEach((question) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chat-quick-reply';
    btn.textContent = question;
    btn.addEventListener('click', () => handleChatQuestion(question));
    chatQuickReplies.appendChild(btn);
  });
}

function handleChatQuestion(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  appendChatMessage(trimmed, 'user');
  const answer = findChatAnswer(trimmed);
  setTimeout(() => appendChatMessage(answer, 'bot'), 350);
}

function openChat() {
  chatPanel.hidden = false;
  chatToggle.setAttribute('aria-expanded', 'true');
  if (!chatInitialized) {
    appendChatMessage(CHAT_GREETING, 'bot');
    renderQuickReplies();
    chatInitialized = true;
  }
  chatInput.focus();
}

function closeChat() {
  chatPanel.hidden = true;
  chatToggle.setAttribute('aria-expanded', 'false');
}

chatToggle.addEventListener('click', () => {
  const isOpen = chatToggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeChat() : openChat();
});

chatClose.addEventListener('click', closeChat);

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleChatQuestion(chatInput.value);
  chatInput.value = '';
});
