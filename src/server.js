const express = require('express');
const { getMetrics } = require('./metrics');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/metrics', (req, res) => {
  res.json(getMetrics());
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Gravity Works running on http://localhost:${PORT}`);
});
