const { getMetrics } = require('../src/metrics');
const m = getMetrics();
console.assert(m.cpu.length > 0);
console.assert(m.mem.total > 0);
console.log('Tests passed.');
