const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve Geist fonts from node_modules
app.use('/fonts/geist', express.static(path.join(__dirname, 'node_modules/geist/dist/fonts')));

// API route for mock protocol data
app.get('/api/protocols', (req, res) => {
  try {
    res.json(require('./data/protocols.json'));
  } catch (error) {
    res.status(500).json({ error: 'Failed to load protocols' });
  }
});

app.get('/api/protocols/:id', (req, res) => {
  try {
    const protocols = require('./data/protocols.json');
    const protocol = protocols.find(p => p.id === req.params.id);
    if (protocol) {
      res.json(protocol);
    } else {
      res.status(404).json({ error: 'Protocol not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load protocol' });
  }
});

// Route for all pages (SPA-style routing)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/explore', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'explore.html'));
});

app.get('/protocol/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'protocol-detail.html'));
});

app.get('/design', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'design.html'));
});

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portfolio.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Onboarding routes
app.get('/onboarding-1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'onboarding-1.html'));
});

app.get('/onboarding-2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'onboarding-2.html'));
});

app.get('/onboarding-3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'onboarding-3.html'));
});

app.get('/onboarding-4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'onboarding-4.html'));
});

app.get('/onboarding-5', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'onboarding-5.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 HOLD server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Kill the process or use a different port.`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});
