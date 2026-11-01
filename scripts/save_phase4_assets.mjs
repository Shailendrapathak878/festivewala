import http from 'http';
import fs from 'fs';
import path from 'path';

const outBase = path.resolve('artifacts/qa/phase-4');
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
    const url = new URL(req.url, 'http://localhost:3002');
    const folder = url.searchParams.get('folder') || 'export-verification';
    const filename = url.searchParams.get('filename') || 'card.png';
    
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
      
      // Also copy to brain directory for direct artifact viewing if in export or contact
      if (fs.existsSync(brainDir)) {
        try {
          fs.writeFileSync(path.join(brainDir, filename), buffer);
        } catch (e) {
          // ignore brain copy error
        }
      }

      console.log(`Saved ${filename} (${buffer.length} bytes) to ${filePath}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, filename, bytes: buffer.length }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3002, () => {
  console.log('Phase 4 Asset Saver Server running on port 3002');
});

