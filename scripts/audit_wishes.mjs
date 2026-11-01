import fs from 'fs';

const content = fs.readFileSync('src/data/wishes/traditional.ts', 'utf8');
const authorEn = content.match(/authorOrSourceEn:\s*"[^"]+"/g) || [];
const authorHi = content.match(/authorOrSourceHi:\s*"[^"]+"/g) || [];

console.log('traditional.ts authorOrSourceEn count:', authorEn.length);
console.log('traditional.ts authorOrSourceHi count:', authorHi.length);
console.log('sample authorEn:', authorEn.slice(0, 3));
console.log('sample authorHi:', authorHi.slice(0, 3));
