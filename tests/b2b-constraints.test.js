import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

function getFilesRecursively(dir, filterRegex) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, filterRegex));
    } else if (filterRegex.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

test('Strict Copywriting: Zero em-dashes or en-dashes across all src files', () => {
  const srcFiles = getFilesRecursively(path.join(process.cwd(), 'src'), /\.(astro|js|ts|html|css)$/);
  
  const violations = [];
  srcFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('—')) {
      violations.push(`File ${path.relative(process.cwd(), file)} contains em-dash (—)`);
    }
    if (content.includes('–')) {
      violations.push(`File ${path.relative(process.cwd(), file)} contains en-dash (–)`);
    }
  });

  assert.deepStrictEqual(violations, [], `Found dash violations:\n${violations.join('\n')}`);
});

test('Strict Copywriting: Zero AI buzzwords across all src files', () => {
  const srcFiles = getFilesRecursively(path.join(process.cwd(), 'src'), /\.(astro|js|ts|html)$/);
  
  const buzzwords = [
    'delve',
    'tapestry',
    'beacon',
    'testament',
    'unlock',
    'unleash',
    'game-changer',
    'revolutionize',
    'synergy',
    'seamless',
    'crucial',
    'vital',
    'foster',
    'elevate',
    "in today's fast-paced world"
  ];

  const violations = [];
  srcFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8').toLowerCase();
    buzzwords.forEach((word) => {
      // Check word boundary or exact match
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(content)) {
        violations.push(`File ${path.relative(process.cwd(), file)} contains banned AI buzzword: "${word}"`);
      }
    });
  });

  assert.deepStrictEqual(violations, [], `Found buzzword violations:\n${violations.join('\n')}`);
});

test('Strict Copywriting: Zero unicode emojis across all src files', () => {
  const srcFiles = getFilesRecursively(path.join(process.cwd(), 'src'), /\.(astro|js|ts|html)$/);
  
  // Regex to match emojis
  const emojiRegex = /[\u{1F300}-\u{1FAD6}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

  const violations = [];
  srcFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    if (emojiRegex.test(content)) {
      violations.push(`File ${path.relative(process.cwd(), file)} contains emoji character`);
    }
  });

  assert.deepStrictEqual(violations, [], `Found emoji violations:\n${violations.join('\n')}`);
});
