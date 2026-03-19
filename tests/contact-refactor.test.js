import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('Contact social buttons are rendered from socialLinks array', () => {
  const filePath = path.join(process.cwd(), 'src/components/Contact.astro');
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if socialLinks array exists and contains expected data
  assert.match(content, /const socialLinks = \[\s*{\s*name: "WhatsApp"/, 'Should define socialLinks array');
  assert.match(content, /name: "Telegram"/, 'Should include Telegram in socialLinks');

  // Check if buttonBaseClass exists
  assert.match(content, /const buttonBaseClass =/, 'Should define buttonBaseClass');

  // Check if mapping over socialLinks is present
  assert.match(content, /socialLinks\.map\(\(link\) => \(/, 'Should map over socialLinks array');

  // Check if the link attributes are correctly bound
  assert.match(content, /href={link\.href}/, 'Anchor tag should use link.href');
  assert.match(content, /class={`\${buttonBaseClass} \${link\.color} \${link\.hoverColor}`}/, 'Anchor tag should use buttonBaseClass and link colors');
  assert.match(content, /<SocialIcon icon={link\.icon}/, 'SocialIcon should use link.icon');
  assert.match(content, /{link\.name}/, 'Should render link.name');
});
