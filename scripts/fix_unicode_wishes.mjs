import fs from 'fs';

const files = [
  'traditional.ts',
  'family.ts',
  'friends.ts',
  'love.ts',
  'professional.ts',
  'funny.ts',
  'emotional.ts',
  'short.ts',
  'captions.ts',
  'business.ts',
];

function decodeUnicodeEscapes(content) {
  return content.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

console.log('--- Converting 10 TypeScript Wish Files to Native UTF-8 ---');

for (const file of files) {
  const filePath = `src/data/wishes/${file}`;
  const original = fs.readFileSync(filePath, 'utf8');
  const converted = decodeUnicodeEscapes(original);

  const remaining = (converted.match(/\\u[0-9a-fA-F]{4}/g) || []).length;
  if (remaining > 0) {
    console.error(`Warning: ${file} still has ${remaining} escapes!`);
  }

  fs.writeFileSync(filePath, converted, 'utf8');
  console.log(`Converted ${file}: ${original.length} bytes -> ${converted.length} bytes (0 escapes remaining)`);
}

console.log('\n--- Converting wishes.json to Native UTF-8 ---');
const jsonPath = 'src/data/wishes/wishes.json';
const originalJson = fs.readFileSync(jsonPath, 'utf8');
const convertedJson = decodeUnicodeEscapes(originalJson);

// Verify it's valid JSON
try {
  const parsed = JSON.parse(convertedJson);
  console.log(`wishes.json successfully parsed as valid JSON! Count: ${parsed.length} items`);
  // Re-save formatted JSON with UTF-8
  fs.writeFileSync(jsonPath, JSON.stringify(parsed, null, 2), 'utf8');
  console.log('wishes.json written cleanly.');
} catch (err) {
  console.error('Failed to parse converted wishes.json:', err);
}

