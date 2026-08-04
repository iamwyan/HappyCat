import test from 'node:test';
import assert from 'node:assert/strict';

import { createCatUrl, pickNextQuote, shootConfetti } from '../app.mjs';

test('createCatUrl adds the supplied cache-busting value', () => {
  assert.equal(createCatUrl(12345), 'https://cataas.com/cat?cache=12345');
});

test('pickNextQuote avoids immediately repeating the current quote', () => {
  const quotes = ['Uno', 'Dos', 'Tres'];
  const result = pickNextQuote(quotes, 1, 0.5);

  assert.notEqual(result.index, 1);
  assert.equal(result.quote, quotes[result.index]);
});

test('pickNextQuote handles a single quote', () => {
  assert.deepEqual(pickNextQuote(['Sigue adelante'], 0, 0.8), {
    quote: 'Sigue adelante',
    index: 0,
  });
});

function createFakeDom() {
  const appended = [];
  const document = {
    body: { append: (element) => appended.push(element) },
    createElement: () => ({
      children: [],
      style: { values: {}, setProperty(name, value) { this.values[name] = value; } },
      append(child) { this.children.push(child); },
      remove() { this.removed = true; },
    }),
  };
  return { document, appended };
}

test('shootConfetti creates a pastel burst around the button and cleans it up', () => {
  const { document, appended } = createFakeDom();
  let cleanup;
  const button = { getBoundingClientRect: () => ({ left: 100, top: 200, width: 220, height: 58 }) };

  const layer = shootConfetti(button, {
    document,
    matchMedia: () => ({ matches: false }),
    random: () => 0.5,
    setTimeout: (callback) => { cleanup = callback; },
    innerWidth: 1000,
    innerHeight: 800,
  });

  assert.equal(appended[0], layer);
  assert.equal(layer.className, 'confetti-layer');
  assert.equal(layer.children.length, 100);
  assert.match(layer.children[0].className, /confetti-piece/);
  assert.equal(layer.children[0].style.values['--x'], '210px');
  assert.equal(layer.children[0].style.values['--y'], '229px');
  assert.equal(layer.children[0].style.values['--burst-x'], '-190px');
  assert.equal(layer.children[99].style.values['--burst-x'], '770px');
  assert.equal(layer.children[0].style.values['--fall-y'], '920px');
  cleanup();
  assert.equal(layer.removed, true);
});

test('shootConfetti skips animation when reduced motion is preferred', () => {
  const { document, appended } = createFakeDom();
  const button = { getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 40 }) };

  const result = shootConfetti(button, {
    document,
    matchMedia: () => ({ matches: true }),
  });

  assert.equal(result, null);
  assert.equal(appended.length, 0);
});
