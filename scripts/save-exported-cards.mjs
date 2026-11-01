import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('artifacts/qa/phase-3-5');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

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
    const url = new URL(req.url, 'http://localhost:3001');
    const filename = url.searchParams.get('filename') || 'card.png';
    const filePath = path.join(outDir, filename);

    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(filePath, buffer);
      console.log(`Saved ${filename} (${buffer.length} bytes) to ${filePath}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, filename, bytes: buffer.length }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, () => {
  console.log('Image saver server running on port 3001');
});

