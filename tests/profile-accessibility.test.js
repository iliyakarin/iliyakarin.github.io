import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

test('Profile image in built output has correct alt text for accessibility', () => {
  // Ensure the build exists
  const distPath = path.join(process.cwd(), 'dist/index.html');
  if (!fs.existsSync(distPath)) {
    try {
        console.log('Building project for test...');
        execSync('npm run build', { stdio: 'pipe' }); // Use pipe to suppress output unless it fails
    } catch (error) {
        assert.fail('Failed to build project for testing');
    }
  }

  const content = fs.readFileSync(distPath, 'utf8');
  const expectedAlt = "Iliya Karin - DevSecOps Expert";

  // This regex matches an <img> tag that contains the alt attribute with the specific value.
  // It handles:
  // - <img ... alt="value" ... >
  // - <img ... alt='value' ... >
  // - Handles attributes before and after the alt attribute
  // - Case insensitive
  const imgRegex = new RegExp(`<img[^>]+alt=["']${expectedAlt}["'][^>]*>`, 'i');

  const match = content.match(imgRegex);

  assert.ok(match, `Built HTML should contain an <img> tag with alt="${expectedAlt}"`);
});
