import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('page exposes the accessible Happy Cat interface', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');

  assert.match(html, /<html lang="es">/);
  assert.match(html, /name="viewport"/);
  assert.match(html, /id="cat-image"/);
  assert.match(html, /id="quote"/);
  assert.match(html, /id="new-cat-button"/);
  assert.match(html, /id="status"[^>]*role="status"/);
  assert.match(html, /¡Otro gatito!/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="app\.mjs"/);
});

test('styles include keyboard focus and reduced-motion support', async () => {
  const css = await readFile(new URL('styles.css', root), 'utf8');

  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(max-width:/);
});

test('confetti presentation is non-interactive and animated', async () => {
  const css = await readFile(new URL('styles.css', root), 'utf8');

  assert.match(css, /\.confetti-layer\s*\{[^}]*pointer-events:\s*none/s);
  assert.match(css, /\.confetti-piece\s*\{[^}]*animation:\s*confetti-pop/s);
  assert.match(css, /@keyframes\s+confetti-pop/);
});
