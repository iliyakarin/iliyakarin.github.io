import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('Insecure querySelector with hash is removed from Navigation.astro', () => {
  const filePath = path.join(process.cwd(), 'src/components/Navigation.astro');
  const content = fs.readFileSync(filePath, 'utf8');

  const vulnerablePattern = /document\.querySelector\(\s*[`'"]\.nav-link\[href="\$\{hash\}"\][`'"]\s*,?\s*\)/;
  const match = content.match(vulnerablePattern);

  assert.strictEqual(match, null, 'Insecure querySelector call should NOT be present in Navigation.astro');
});

test('Secure navigation link matching is implemented in Navigation.astro', () => {
  const filePath = path.join(process.cwd(), 'src/components/Navigation.astro');
  const content = fs.readFileSync(filePath, 'utf8');

  // Verify the new secure pattern exists
  const securePattern = /Array\.from\(navLinks\)\.find\(\s*\([^)]+\)\s*=>\s*link\.getAttribute\("href"\)\s*===\s*hash,?\s*\)/;
  const match = content.match(securePattern);

  assert.ok(match, 'Secure link matching (Array.from.find) should be present in Navigation.astro');
});
