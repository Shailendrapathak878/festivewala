import fs from 'fs';
import path from 'path';

const dir = 'src/features/greeting-studio/data/templates';
const files = fs.readdirSync(dir);
let total = 0;
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const count = (content.match(/"id":/g) || []).length;
  console.log(`${f}: ${count}`);
  total += count;
}
const photoContent = fs.readFileSync('src/features/greeting-studio/data/photoTemplates.ts', 'utf8');
const photoCount = (photoContent.match(/"id":/g) || photoContent.match(/id:\s*'/g) || []).length;
console.log(`photoTemplates.ts: ${photoCount}`);
console.log(`Total Templates: ${total + photoCount}`);

