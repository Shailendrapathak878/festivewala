import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function measureDir(dir, prefix = '') {
  const items = fs.readdirSync(dir);
  const results = [];
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...measureDir(fullPath, `${prefix}${item}/`));
    } else {
      const content = fs.readFileSync(fullPath);
      const rawSize = content.length;
      const gzipSize = zlib.gzipSync(content).length;
      results.push({ name: `${prefix}${item}`, rawSize, gzipSize });
    }
  }
  return results;
}

const allAssets = measureDir(path.join('dist', 'assets'));
const indexHtml = fs.readFileSync(path.join('dist', 'index.html'));
allAssets.push({ name: 'index.html', rawSize: indexHtml.length, gzipSize: zlib.gzipSync(indexHtml).length });

console.log('=== EXACT ASSET MEASUREMENTS (dist) ===');
allAssets.sort((a, b) => b.gzipSize - a.gzipSize);

let totalRaw = 0;
let totalGzip = 0;
allAssets.forEach(a => {
  totalRaw += a.rawSize;
  totalGzip += a.gzipSize;
  console.log(`${a.name.padEnd(45)}: ${(a.rawSize / 1024).toFixed(2).padStart(8)} KB | Gzip: ${(a.gzipSize / 1024).toFixed(2).padStart(8)} KB`);
});

console.log('--------------------------------------------------------------------------------');
console.log(`TOTAL ASSETS COUNT: ${allAssets.length}`);
console.log(`TOTAL RAW SIZE:     ${(totalRaw / 1024 / 1024).toFixed(3)} MB (${(totalRaw / 1024).toFixed(2)} KB)`);
console.log(`TOTAL GZIP SIZE:    ${(totalGzip / 1024 / 1024).toFixed(3)} MB (${(totalGzip / 1024).toFixed(2)} KB)`);
