import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('Email input in Contact.astro has required attributes', () => {
  const filePath = path.join(process.cwd(), 'src/components/Contact.astro');
  const content = fs.readFileSync(filePath, 'utf8');

  // Find the input element with id="email"
  // Using a more flexible regex to account for varying whitespace and quotes
  const inputRegex = /<input[^>]*id=["']email["'][^>]*\/?>/is;
  const match = content.match(inputRegex);

  assert.ok(match, 'Email input with id="email" should exist');

  const inputTag = match[0];

  // Check for type="email" or type='email'
  assert.ok(/type=["']email["']/i.test(inputTag), 'Email input should have type="email"');
  // Check for required attribute
  assert.ok(/required/i.test(inputTag), 'Email input should have required attribute');
});
