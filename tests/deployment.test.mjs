import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const root = new URL('../', import.meta.url);

test('Vercel build emits a static site instead of invoking the Node server', async () => {
  await rm(new URL('public/', root), { recursive: true, force: true });

  const result = spawnSync('npm', ['run', 'build'], {
    cwd: root,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);

  const config = JSON.parse(await readFile(new URL('vercel.json', root), 'utf8'));
  assert.equal(config.outputDirectory, 'public');

  for (const filename of ['index.html', 'styles.css', 'app.mjs']) {
    const source = await readFile(new URL(filename, root));
    const built = await readFile(new URL(`public/${filename}`, root));
    assert.deepEqual(built, source, `${filename} should be copied unchanged`);
  }
});
