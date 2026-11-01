import fs from 'fs';
import path from 'path';

const dir = 'src/features/greeting-studio/data/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const blocks = content.split(/\n\s*\{\s*\n/);
  for (const b of blocks) {
    if (!b.includes('"id":')) continue;
    const idMatch = b.match(/"id":\s*"([^"]+)"/);
    const id = idMatch ? idMatch[1] : null;
    const isFeat = b.includes('"isFeatured": true');
    if (isFeat) {
      console.log(f.padEnd(16), '-> FEATURED ID:', id);
    }
  }
}

