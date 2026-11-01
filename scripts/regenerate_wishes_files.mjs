import fs from 'fs';

// 1. Read untouched wishes.json
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

// 2. Read authors map from .ts files (where authors existed)
const categoryFiles = [
  { file: 'traditional.ts', exportName: 'TRADITIONAL_WISHES', category: 'traditional', expected: 50 },
  { file: 'family.ts', exportName: 'FAMILY_WISHES', category: 'family', expected: 60 },
  { file: 'friends.ts', exportName: 'FRIENDS_WISHES', category: 'friends', expected: 60 },
  { file: 'love.ts', exportName: 'LOVE_WISHES', category: 'love', expected: 50 },
  { file: 'professional.ts', exportName: 'PROFESSIONAL_WISHES', category: 'professional', expected: 50 },
  { file: 'funny.ts', exportName: 'FUNNY_WISHES', category: 'funny', expected: 40 },
  { file: 'emotional.ts', exportName: 'EMOTIONAL_WISHES', category: 'emotional', expected: 50 },
  { file: 'short.ts', exportName: 'SHORT_WISHES', category: 'short', expected: 60 },
  { file: 'captions.ts', exportName: 'CAPTIONS_WISHES', category: 'captions', expected: 40 },
  { file: 'business.ts', exportName: 'BUSINESS_WISHES', category: 'business', expected: 40 },
];

const authorMap = new Map();
for (const { file } of categoryFiles) {
  const content = fs.readFileSync(`src/data/wishes/${file}`, 'utf8');
  const items = content.split(/\{\s*id:/).slice(1);
  for (const item of items) {
    const idMatch = item.match(/^\s*"([^"]+)"/);
    if (!idMatch) continue;
    const id = idMatch[1];
    const enMatch = item.match(/authorOrSourceEn:\s*"([^"]*)"/);
    const hiMatch = item.match(/authorOrSourceHi:\s*"([^"]*)"/);
    if (enMatch || hiMatch) {
      authorMap.set(id, {
        authorOrSourceEn: enMatch ? enMatch[1] : undefined,
        authorOrSourceHi: hiMatch ? hiMatch[1].replace(/\\/g, '') : undefined,
      });
    }
  }
}
console.log(`Loaded ${authorMap.size} author attributions.`);

// 3. Process and clean each wish
const cleanedWishes = wishes.map((raw) => {
  const authorInfo = authorMap.get(raw.id);

  const textEn = cleanString(raw.englishText || raw.textEn);
  const textHi = cleanString(raw.hindiText || raw.textHi);

  const cleaned = {
    id: raw.id,
    festivalId: raw.festivalId || 'diwali',
    festivalIds: raw.festivalIds || ['diwali', 'general-festive'],
    category: raw.category,
    categoryLabelEn: cleanString(raw.categoryLabelEn),
    categoryLabelHi: cleanString(raw.categoryLabelHi),
    headlineEn: raw.headlineEn ? cleanString(raw.headlineEn) : undefined,
    headlineHi: raw.headlineHi ? cleanString(raw.headlineHi) : undefined,
    shloka: raw.shloka ? cleanString(raw.shloka) : undefined,
    meaningEn: raw.meaningEn ? cleanString(raw.meaningEn) : undefined,
    meaningHi: raw.meaningHi ? cleanString(raw.meaningHi) : undefined,
    textEn,
    textHi,
    englishText: textEn,
    hindiText: textHi,
    authorOrSourceEn: authorInfo?.authorOrSourceEn || (raw.authorOrSourceEn ? cleanString(raw.authorOrSourceEn) : undefined),
    authorOrSourceHi: authorInfo?.authorOrSourceHi || (raw.authorOrSourceHi ? cleanString(raw.authorOrSourceHi) : undefined),
    tags: Array.isArray(raw.tags) ? raw.tags.map(cleanString) : [],
    recipientTypes: raw.recipientTypes || ['general'],
    tone: raw.tone || 'heartwarming',
    length: raw.length || 'medium',
    dateAdded: raw.dateAdded || '2026-11-01',
  };

  // Remove undefined fields
  Object.keys(cleaned).forEach((key) => {
    if (cleaned[key] === undefined) delete cleaned[key];
  });

  return cleaned;
});

// 4. Save cleaned wishes.json
fs.writeFileSync('src/data/wishes/wishes.json', JSON.stringify(cleanedWishes, null, 2), 'utf8');
console.log(`Saved clean src/data/wishes/wishes.json (${cleanedWishes.length} wishes).`);

// 5. Generate and write the 10 TypeScript files
for (const { file, exportName, category, expected } of categoryFiles) {
  const categoryWishes = cleanedWishes.filter((w) => w.category === category);
  if (categoryWishes.length !== expected) {
    console.error(`Count mismatch for ${category}: expected ${expected}, got ${categoryWishes.length}`);
  }

  const tsContent = `import type { WishMessage } from "../types";\n\nexport const ${exportName}: WishMessage[] = ${JSON.stringify(categoryWishes, null, 2)};\n`;

  fs.writeFileSync(`src/data/wishes/${file}`, tsContent, 'utf8');
  console.log(`Saved src/data/wishes/${file} (${categoryWishes.length} wishes, expected ${expected}).`);
}

console.log('--- All wish files regenerated successfully with native UTF-8! ---');

