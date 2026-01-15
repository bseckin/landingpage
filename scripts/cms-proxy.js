import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 8081;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  // CORS Headers (Critical for local backend)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  console.log(`[${req.method}] ${req.url}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Decap CMS Local Backend API Implementation

  // 1. Config Endpoint
  if (req.url.startsWith('/api/v1/config')) {
    const configPath = path.join(ROOT_DIR, 'public/admin/config.yml');
    fs.readFile(configPath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading config: ${err}`);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Config not found' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/yaml' });
      res.end(data);
    });
    return;
  }

  // 2. Settings Endpoint (often requested)
  if (req.url.startsWith('/api/v1/settings')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ type: 'local_backend', version: 'custom-proxy' }));
    return;
  }

  // Fallback for debugging
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not implemented yet", url: req.url }));
});

server.listen(PORT, () => {
  console.log(`\n✅ CMS Local Backend running at http://localhost:${PORT}`);
  console.log(`   - Root: ${ROOT_DIR}`);
  console.log(`   - Waiting for Decap CMS requests...`);
});
