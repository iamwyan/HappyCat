import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from 'node:http';

import { handleRequest } from '../server.mjs';

async function requestPath(pathname) {
  const server = createServer(handleRequest);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}${pathname}`);
  const body = await response.text();
  server.close();
  await once(server, 'close');

  return { response, body };
}

test('server serves the Happy Cat page at the root', async () => {
  const { response, body } = await requestPath('/');

  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.match(body, /Happy <em>Cat<\/em>/);
});

test('server returns 404 for missing files', async () => {
  const { response } = await requestPath('/missing.txt');
  assert.equal(response.status, 404);
});
