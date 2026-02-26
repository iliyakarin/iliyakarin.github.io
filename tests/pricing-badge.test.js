import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('PricingCard component has Popular badge logic', () => {
  const filePath = path.join(process.cwd(), 'src/components/PricingCard.astro');
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if it accepts isPopular prop
  assert.match(content, /const\s*{\s*[^}]*isPopular[^}]*}\s*=\s*Astro.props/, 'PricingCard should accept isPopular prop');

  // Check if it renders "POPULAR" text conditionally
  assert.ok(content.includes('POPULAR'), 'PricingCard should contain "POPULAR" text');
  // Check for conditional rendering block
  // This is a bit simplistic, but since we don't have a full AST parser for Astro, regex/string matching is practical
  assert.match(content, /isPopular\s*&&\s*\(/, 'PricingCard should have conditional rendering for isPopular');
});

test('Pricing component uses Popular badge', () => {
  const filePath = path.join(process.cwd(), 'src/components/Pricing.astro');
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if at least one PricingCard has isPopular={true}
  // The regex matches <PricingCard followed by any characters until isPopular={true}
  assert.match(content, /<PricingCard[\s\S]*?isPopular={true}/, 'Pricing.astro should have a PricingCard with isPopular={true}');
});
