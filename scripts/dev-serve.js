const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const dist = path.join(__dirname, '..', 'dist');

app.use(express.static(dist));

// map known SPA routes to their files
app.get('/login', (req, res) => res.sendFile(path.join(dist, 'login', 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(dist, 'dashboard', 'index.html')));
app.get('/tutor', (req, res) => res.sendFile(path.join(dist, 'tutor', 'index.html')));

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Dev server serving ${dist} at http://0.0.0.0:${port}`);
});

server.on('error', (err) => {
  console.error('Dev server error:', err && err.stack ? err.stack : err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception in dev-serve:', err && err.stack ? err.stack : err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('Dev server received SIGTERM, shutting down');
  server.close(() => process.exit(0));
});
