import fs from 'fs';

// Read data files directly
const dhanterasGreetings = fs.readFileSync('src/data/greetings/dhanterasGreetings.ts', 'utf-8');
const dhanterasPhoto = fs.readFileSync('src/data/greetings/dhanterasPhotoTemplates.ts', 'utf-8');
const dhanterasWishes = fs.readFileSync('src/data/wishes/dhanterasWishes.ts', 'utf-8');
const dhanterasGifts = fs.readFileSync('src/data/gifts/dhanterasGifts.ts', 'utf-8');

// Match template IDs
const greetingMatches = dhanterasGreetings.match(/id:\s*['"`]dhanteras-[^'"`]+['"`]/g) || [];
const photoMatches = dhanterasPhoto.match(/id:\s*['"`]photo-dhanteras-[^'"`]+['"`]/g) || [];
const wishMatches = dhanterasWishes.match(/id:\s*['"`]dhanteras-wish-[^'"`]+['"`]/g) || [];
const giftMatches = dhanterasGifts.match(/id:\s*['"`]dhanteras-gift-[^'"`]+['"`]/g) || [];

console.log('=== EXACT FESTIVAL CONTENT COUNTS ===');
console.log('Dhanteras Greeting Templates:', greetingMatches.length);
console.log('Dhanteras Photo Templates:', photoMatches.length);
console.log('Dhanteras Wishes:', wishMatches.length);
console.log('Dhanteras Gift Ideas:', giftMatches.length);

// Measure prose word count of Dhanteras & Diwali articles
const dhanterasArticle = fs.readFileSync('src/components/festivals/DhanterasGuideArticle.tsx', 'utf-8');
const diwaliArticle = fs.readFileSync('src/components/festivals/DiwaliGuideArticle.tsx', 'utf-8');

function extractProseWords(code) {
  // Extract string literals and text between JSX tags
  const matches = code.match(/>([^<]+)</g) || [];
  let totalWords = 0;
  for (const m of matches) {
    const text = m.replace(/[><{}]/g, '').trim();
    if (text.length > 0) {
      const words = text.split(/\s+/).filter(w => w.length > 0);
      totalWords += words.length;
    }
  }
  return totalWords;
}

const dhanterasWords = extractProseWords(dhanterasArticle);
const diwaliWords = extractProseWords(diwaliArticle);

console.log('\n=== EXACT ARTICLE WORD COUNTS (RENDERED PROSE TEXT) ===');
console.log('Dhanteras Guide Article prose words:', dhanterasWords);
console.log('Diwali Guide Article prose words:', diwaliWords);
console.log('Dhanteras Guide lines of code:', dhanterasArticle.split('\n').length);
console.log('Diwali Guide lines of code:', diwaliArticle.split('\n').length);
