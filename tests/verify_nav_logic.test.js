
import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('Navigation contains optimized IntersectionObserver logic', () => {
    const filePath = path.join(process.cwd(), 'public/scripts/navigation.js');
    const content = fs.readFileSync(filePath, 'utf8');

    // Check for Map creation
    assert.ok(content.includes('const navLinkMap = new Map();'), 'Should create navLinkMap');

    // Check for Map population
    assert.ok(content.includes('navLinkMap.set(href, link);'), 'Should populate navLinkMap');

    // Check for currentActiveLink tracking
    assert.ok(content.includes('let currentActiveLink = null;'), 'Should track currentActiveLink');

    // Check for updateActiveLink function
    assert.ok(content.includes('const updateActiveLink = (targetLink) =>'), 'Should have updateActiveLink function');

    // Check for O(1) lookup in IntersectionObserver
    assert.ok(content.includes('const targetLink = navLinkMap.get(`#${id}`);'), 'Should use O(1) lookup in observer');


    // Verify the O(N) loop is gone from the observer callback
    const observerCallbackRegex = /new IntersectionObserver\(\(entries\) => \{([\s\S]*?)\}, observerOptions\);/m;
    const match = content.match(observerCallbackRegex);
    assert.ok(match, 'Should find IntersectionObserver callback');
    const callbackBody = match[1];
    assert.ok(!callbackBody.includes('navLinks.forEach'), 'Observer callback should not contain O(N) loop');
});

test('Navigation handle initial hash with optimized logic', () => {
    const filePath = path.join(process.cwd(), 'public/scripts/navigation.js');
    const content = fs.readFileSync(filePath, 'utf8');

    // Check window 'load' event listener
    const loadEventRegex = /window\.addEventListener\("load", \(\) => \{[\s\S]*?const hash = window\.location\.hash;[\s\S]*?if \(hash\) \{[\s\S]*?const targetLink = navLinkMap\.get\(hash\);[\s\S]*?if \(targetLink\) \{[\s\S]*?updateActiveLink\(targetLink\);/m;
    assert.ok(loadEventRegex.test(content), 'Initial hash handling should use optimized logic');
});
