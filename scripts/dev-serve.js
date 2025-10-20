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

app.listen(port, () => {
  console.log(`Dev server serving ${dist} at http://localhost:${port}`);
});
