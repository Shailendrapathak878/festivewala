import fs from 'fs';
import path from 'path';

const dir = 'src/features/greeting-studio/data/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

let total = 0;
let featured = [];
let regular = [];
const categoryCounts = {};
const fontSet = new Set();
const vectorSet = new Set();

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = content.split('\n');
  let currentId = null;
  let currentName = null;
  let currentCat = null;
  let currentFont = null;
  let currentVector = null;
  let isFeat = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const idMatch = line.match(/"id":\s*"([^"]+)"/);
    if (idMatch) currentId = idMatch[1];

    const nameMatch = line.match(/"name":\s*"([^"]+)"/);
    if (nameMatch) currentName = nameMatch[1];

    const catMatch = line.match(/"category":\s*"([^"]+)"/);
    if (catMatch) currentCat = catMatch[1];

    const fontMatch = line.match(/"fontFamily":\s*"([^"]+)"/);
    if (fontMatch) {
      currentFont = fontMatch[1];
      fontSet.add(fontMatch[1]);
    }

    const vecMatch = line.match(/"vectorStyle":\s*"([^"]+)"/);
    if (vecMatch) {
      currentVector = vecMatch[1];
      vectorSet.add(vecMatch[1]);
    }

    if (line.includes('"isFeatured": true')) {
      isFeat = true;
    }

    // End of template object: handles "}," or "}" with whitespace
    if (/^\s*\},?\s*$/.test(line) && currentId) {
      total++;
      categoryCounts[currentCat] = (categoryCounts[currentCat] || 0) + 1;
      const item = { id: currentId, name: currentName, cat: currentCat, font: currentFont, vector: currentVector, file: f };
      if (isFeat) {
        featured.push(item);
      } else {
        regular.push(item);
      }
      currentId = null;
      currentName = null;
      currentCat = null;
      currentFont = null;
      currentVector = null;
      isFeat = false;
    }
  }
}

console.log('=== TEMPLATE DATA VERIFICATION ===');
console.log('Total templates counted:', total);
console.log('Total Featured (Signature):', featured.length);
console.log('Total Regular:', regular.length);
console.log('\nCategory breakdown:', JSON.stringify(categoryCounts, null, 2));
console.log('\nUnique Fonts across 100 templates (' + fontSet.size + '):', Array.from(fontSet));
console.log('\nUnique Vectors across 100 templates (' + vectorSet.size + '):', Array.from(vectorSet));
console.log('\nFEATURED TEMPLATES (' + featured.length + '):');
featured.forEach((t, idx) => {
  console.log(`${idx + 1}. [${t.cat}] id="${t.id}" name="${t.name}" font="${t.font}" vector="${t.vector}" (${t.file})`);
});
