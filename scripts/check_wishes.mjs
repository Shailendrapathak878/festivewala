import fs from 'fs';
import path from 'path';

const cats = ['traditional', 'family', 'friends', 'love', 'professional', 'funny', 'emotional', 'short', 'captions', 'business'];
let total = 0;
for (const c of cats) {
  const file = `src/data/wishes/${c}.ts`;
  const content = fs.readFileSync(file, 'utf8');
  const count = (content.match(/"id":/g) || []).length;
  console.log(`${c}: ${count}`);
  total += count;
}
console.log(`Total across 10 ts files: ${total}`);

const jsonContent = JSON.parse(fs.readFileSync('src/data/wishes/wishes.json', 'utf8'));
console.log(`Total in wishes.json: ${jsonContent.length}`);

