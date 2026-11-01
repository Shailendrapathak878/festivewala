import http from 'http';
import fs from 'fs';
import path from 'path';

const outBase = path.resolve('artifacts/qa/phase-4-3');
const brainDir = 'C:\\Users\\abhis\\.gemini\\antigravity\\brain\\63fca421-aaed-4c0a-b95f-26ad7a8666c1';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    const url = new URL(req.url, 'http://localhost:3004');
    const folder = url.searchParams.get('folder') || 'export-verification';
    const filename = url.searchParams.get('filename') || 'card.png';
    const syncBrain = url.searchParams.get('brain') === 'true';
    
    const targetDir = path.join(outBase, folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const filePath = path.join(targetDir, filename);

    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(filePath, buffer);
      
      if (syncBrain && fs.existsSync(brainDir)) {
        try {
          fs.writeFileSync(path.join(brainDir, filename), buffer);
        } catch (e) {
          // ignore
        }
      }

      console.log(`Saved ${filename} (${buffer.length} bytes) to ${filePath}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, filename, bytes: buffer.length }));
    });
  } else if (req.method === 'GET') {
    const url = new URL(req.url, 'http://localhost:3004');
    const relPath = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
    const filePath = path.join(outBase, relPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
                   ext === '.png' ? 'image/png' :
                   ext === '.webp' ? 'image/webp' :
                   ext === '.json' ? 'application/json' : 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3004, () => {
  console.log('Phase 4.3 Asset Saver Server running on port 3004');
});
