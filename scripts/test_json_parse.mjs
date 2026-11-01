import fs from 'fs';

const rawJson = fs.readFileSync('src/data/wishes/wishes.json', 'utf8');
const wishes = JSON.parse(rawJson);

function cleanString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/\\u([dD][89abAB][0-9a-fA-F]{2})\\u([dD][c-fC-F][0-9a-fA-F]{2})/g, (_, high, low) => {
    return String.fromCharCode(parseInt(high, 16), parseInt(low, 16));
  }).replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

let remainingEscapes = 0;
let emptyTexts = 0;

for (let i = 0; i < wishes.length; i++) {
  const w = wishes[i];
  const fields = [
    'headlineEn',
    'headlineHi',
    'englishText',
    'hindiText',
    'categoryLabelEn',
    'categoryLabelHi',
    'shloka',
    'meaningEn',
    'meaningHi',
  ];

  for (const f of fields) {
    if (w[f]) {
      const cleaned = cleanString(w[f]);
      if (cleaned.includes('\\u')) {
        console.error(`Wish ${w.id} field ${f} still has \\u:`, cleaned);
        remainingEscapes++;
      }
    }
  }

  if (!cleanString(w.englishText) || !cleanString(w.hindiText)) {
    emptyTexts++;
  }
}

console.log('Total wishes checked:', wishes.length);
console.log('Remaining escapes:', remainingEscapes);
console.log('Empty texts:', emptyTexts);
