import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.resolve(__dirname, '../src/content');

const server = http.createServer((req, res) => {
    // CORS Headers (Allow localhost:5173 to connect)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API Endpoint: /api/:filename or /api/:folder/:filename
    if (req.url.startsWith('/api/')) {
        const urlParts = req.url.replace('/api/', '').split('/');

        // Handle list directory: /api/list/foldername
        if (urlParts[0] === 'list' && urlParts[1]) {
            const folderName = urlParts[1];
            // Security: Prevent directory traversal
            if (folderName.includes('..')) {
                res.writeHead(403);
                res.end(JSON.stringify({ error: 'Access denied' }));
                return;
            }

            const folderPath = path.join(CONTENT_DIR, folderName);
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    // Check if it's because folder doesn't exist, create it if so? 
                    // Or just return empty list.
                    if (err.code === 'ENOENT') {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify([]));
                        return;
                    }
                    console.error(`Error listing ${folderName}:`, err);
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: 'List failed' }));
                    return;
                }
                const jsonFiles = files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(jsonFiles));
            });
            return;
        }

        // Handle File Operations
        const filename = urlParts.join('/'); // Rejoin to handle subdirectories like 'case-studies/mypost.json'

        // Security: Prevent directory traversal
        if (filename.includes('..')) {
            res.writeHead(403);
            res.end(JSON.stringify({ error: 'Access denied' }));
            return;
        }

        const filePath = path.join(CONTENT_DIR, filename);

        // DELETE
        if (req.method === 'DELETE') {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting ${filename}:`, err);
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: 'Delete failed' }));
                    return;
                }
                console.log(`Deleted: ${filename}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            });
            return;
        }

        // READ (GET)
        if (req.method === 'GET') {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    // Try adding .json extension if missing
                    if (!filePath.endsWith('.json')) {
                        const jsonPath = filePath + '.json';
                        fs.readFile(jsonPath, 'utf8', (err2, data2) => {
                            if (err2) {
                                console.error(`Error reading ${filename}:`, err2);
                                res.writeHead(404, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ error: 'File not found' }));
                                return;
                            }
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(data2);
                        });
                        return;
                    }

                    console.error(`Error reading ${filename}:`, err);
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'File not found' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            });
            return;
        }

        // WRITE (POST)
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                // Ensure directory exists if it's nested
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                // Validate JSON
                try {
                    const json = JSON.parse(body); // verification it is valid json
                    // Force .json extension if writing
                    const targetPath = filePath.endsWith('.json') ? filePath : filePath + '.json';

                    fs.writeFile(targetPath, JSON.stringify(json, null, 2), (err) => {
                        if (err) {
                            console.error(`Error writing ${filename}:`, err);
                            res.writeHead(500);
                            res.end(JSON.stringify({ error: 'Write failed' }));
                            return;
                        }
                        console.log(`Saved: ${filename}`);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true }));
                    });
                } catch (e) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
            });
            return;
        }
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(PORT, () => {
    console.log(`\n✅ Custom JSON Server running at http://localhost:${PORT}`);
    console.log(`   - Content Directory: ${CONTENT_DIR}`);
});
