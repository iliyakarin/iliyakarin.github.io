
const { performance } = await import('perf_hooks');

const NUM_LINKS = 100;
const ITERATIONS = 100000;

const activeClasses = ["text-blue-700", "dark:text-blue-500", "md:text-blue-700"];
const inactiveClasses = ["text-gray-900", "dark:text-white"];

// Mock DOM element
class MockElement {
    constructor(id) {
        this.attributes = { id, href: `#${id}` };
        this.classList = new Set(inactiveClasses);
    }
    getAttribute(name) {
        return this.attributes[name];
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
}

const navLinks = Array.from({ length: NUM_LINKS }, (_, i) => new MockElement(`section-${i}`));

// Current O(N) Logic
function currentLogic(id) {
    navLinks.forEach((link) => {
        activeClasses.forEach(c => link.classList.delete(c));
        inactiveClasses.forEach(c => link.classList.add(c));
        if (link.getAttribute("href") === `#${id}`) {
            activeClasses.forEach(c => link.classList.add(c));
            inactiveClasses.forEach(c => link.classList.delete(c));
        }
    });
}

// Optimized O(1) Logic
const navLinkMap = new Map();
navLinks.forEach(link => {
    navLinkMap.set(link.getAttribute("href"), link);
});
let currentActiveLink = null;

function optimizedLogic(id) {
    const targetLink = navLinkMap.get(`#${id}`);
    if (targetLink && targetLink !== currentActiveLink) {
        if (currentActiveLink) {
            activeClasses.forEach(c => currentActiveLink.classList.delete(c));
            inactiveClasses.forEach(c => currentActiveLink.classList.add(c));
        }
        activeClasses.forEach(c => targetLink.classList.add(c));
        inactiveClasses.forEach(c => targetLink.classList.delete(c));
        currentActiveLink = targetLink;
    }
}

function runBenchmark() {
    console.log(`Running benchmark with ${NUM_LINKS} links and ${ITERATIONS} iterations...`);

    // Warm up
    for (let i = 0; i < 1000; i++) {
        currentLogic(`section-${i % NUM_LINKS}`);
        optimizedLogic(`section-${i % NUM_LINKS}`);
    }

    const startOld = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        currentLogic(`section-${i % NUM_LINKS}`);
    }
    const endOld = performance.now();
    const timeOld = endOld - startOld;

    // Reset currentActiveLink for fair comparison
    currentActiveLink = null;
    const startNew = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        optimizedLogic(`section-${i % NUM_LINKS}`);
    }
    const endNew = performance.now();
    const timeNew = endNew - startNew;

    console.log(`Current O(N) Logic: ${timeOld.toFixed(4)}ms`);
    console.log(`Optimized O(1) Logic: ${timeNew.toFixed(4)}ms`);
    console.log(`Improvement: ${((timeOld - timeNew) / timeOld * 100).toFixed(2)}%`);
}

runBenchmark();
