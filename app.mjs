export const quotes = [
  'Cada día es una nueva oportunidad para brillar.',
  'Confía en ti: ya has superado días difíciles antes.',
  'Los pequeños pasos también te llevan muy lejos.',
  'Tu alegría puede iluminar el día de alguien más.',
  'Respira profundo; lo estás haciendo mejor de lo que crees.',
  'Nunca subestimes el poder de volver a intentarlo.',
  'Hoy es un buen día para creer en tus sueños.',
  'Tu ritmo es perfecto: sigue avanzando.',
  'Las cosas bonitas también toman tiempo.',
  'Eres capaz de crear algo maravilloso.',
];

export function createCatUrl(seed) {
  return `https://cataas.com/cat?cache=${encodeURIComponent(seed)}`;
}

export function pickNextQuote(items, currentIndex = -1, randomValue = Math.random()) {
  if (items.length === 0) return { quote: '', index: -1 };
  if (items.length === 1) return { quote: items[0], index: 0 };

  let index = Math.floor(randomValue * (items.length - 1));
  if (index >= currentIndex && currentIndex >= 0) index += 1;

  return { quote: items[index], index };
}

export function shootConfetti(button, options = {}) {
  const doc = options.document ?? document;
  const mediaQuery = options.matchMedia ?? ((query) => window.matchMedia(query));
  const random = options.random ?? Math.random;
  const schedule = options.setTimeout ?? setTimeout;

  if (mediaQuery('(prefers-reduced-motion: reduce)').matches) return null;

  const viewportWidth = options.innerWidth ?? window.innerWidth;
  const viewportHeight = options.innerHeight ?? window.innerHeight;

  const rect = button.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const colors = ['#ff8fba', '#ffe68a', '#bfead9', '#d8c6ff', '#ffb56b'];
  const layer = doc.createElement('div');
  layer.className = 'confetti-layer';
  layer.setAttribute?.('aria-hidden', 'true');

  for (let index = 0; index < 100; index += 1) {
    const piece = doc.createElement('i');
    const targetX = 20 + (index / 99) * (viewportWidth - 40);
    const burstX = targetX - originX;
    const liftY = -(originY * (0.8 + random() * 0.5));
    const fallX = burstX + (-50 + random() * 100);
    const fallY = viewportHeight + 60 + random() * 120;
    const rotation = -720 + random() * 1440;
    const scale = 0.85 + random() * 1.1;

    piece.className = `confetti-piece confetti-piece-${index % 4}`;
    piece.style.setProperty('--x', `${originX}px`);
    piece.style.setProperty('--y', `${originY}px`);
    piece.style.setProperty('--burst-x', `${burstX}px`);
    piece.style.setProperty('--lift-y', `${liftY}px`);
    piece.style.setProperty('--fall-x', `${fallX}px`);
    piece.style.setProperty('--fall-y', `${fallY}px`);
    piece.style.setProperty('--rotation', `${rotation}deg`);
    piece.style.setProperty('--end-rotation', `${rotation * 1.7}deg`);
    piece.style.setProperty('--scale', scale);
    piece.style.setProperty('--end-scale', scale * 0.78);
    piece.style.setProperty('--delay', `${random() * 320}ms`);
    piece.style.setProperty('--color', colors[index % colors.length]);
    layer.append(piece);
  }

  doc.body.append(layer);
  schedule(() => layer.remove(), 2600);
  return layer;
}

export function initializeHappyCat(doc = document) {
  const image = doc.querySelector('#cat-image');
  const quote = doc.querySelector('#quote');
  const button = doc.querySelector('#new-cat-button');
  const status = doc.querySelector('#status');

  if (!image || !quote || !button || !status) return;

  let currentQuoteIndex = -1;
  let requestNumber = 0;

  function setLoading(isLoading) {
    button.disabled = isLoading;
    button.classList.toggle('is-loading', isLoading);
    button.querySelector('.button-label').textContent = isLoading
      ? 'Buscando un gatito…'
      : '¡Otro gatito!';
    image.closest('.photo-frame')?.classList.toggle('is-loading', isLoading);
  }

  function loadHappyMoment(celebrate = false) {
    setLoading(true);
    status.textContent = '';

    const next = pickNextQuote(quotes, currentQuoteIndex);
    const preloader = new Image();
    const seed = `${Date.now()}-${requestNumber++}`;

    preloader.onload = () => {
      image.src = preloader.src;
      image.alt = 'Un adorable gato elegido al azar';
      quote.textContent = `“${next.quote}”`;
      currentQuoteIndex = next.index;
      setLoading(false);
      if (celebrate) shootConfetti(button);
    };

    preloader.onerror = () => {
      status.textContent = 'Ese gatito se escondió. Inténtalo otra vez.';
      setLoading(false);
    };

    preloader.src = createCatUrl(seed);
  }

  button.addEventListener('click', () => loadHappyMoment(true));
  loadHappyMoment();
}

if (typeof document !== 'undefined') {
  initializeHappyCat(document);
}
