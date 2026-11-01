import fs from 'fs';

console.log('=== FESTIVEWALA PHASE 7.1 SEO VALIDATION SCRIPT ===\n');

// 1. Validate keyword-map.json
const jsonPath = 'd:/FestiveWala/docs/seo/keyword-map.json';
const csvPath = 'd:/FestiveWala/docs/seo/keyword-map.csv';

if (!fs.existsSync(jsonPath)) {
  console.error('FAIL: keyword-map.json does not exist!');
  process.exit(1);
}
if (!fs.existsSync(csvPath)) {
  console.error('FAIL: keyword-map.csv does not exist!');
  process.exit(1);
}

const jsonRaw = fs.readFileSync(jsonPath, 'utf8');
let keywords;
try {
  keywords = JSON.parse(jsonRaw);
  console.log(`PASS: keyword-map.json parsed successfully. Total keywords: ${keywords.length}`);
} catch (e) {
  console.error(`FAIL: Invalid JSON in keyword-map.json: ${e.message}`);
  process.exit(1);
}

// 2. Validate keyword-map.csv
const csvRaw = fs.readFileSync(csvPath, 'utf8');
const csvLines = csvRaw.trim().split('\n');
console.log(`PASS: keyword-map.csv has ${csvLines.length} lines (1 header + ${csvLines.length - 1} data rows).`);

if (keywords.length !== csvLines.length - 1) {
  console.error(`FAIL: Count mismatch between JSON (${keywords.length}) and CSV (${csvLines.length - 1})`);
  process.exit(1);
}
console.log('PASS: JSON and CSV record counts match 100%.\n');

// 3. Language distribution
const langCounts = { English: 0, Hindi: 0, Hinglish: 0, Other: 0 };
keywords.forEach(k => {
  if (langCounts[k.language] !== undefined) {
    langCounts[k.language]++;
  } else {
    langCounts.Other++;
  }
});
console.log('Language Distribution:');
console.log(JSON.stringify(langCounts, null, 2));

// 4. Intent distribution
const intentCounts = {};
keywords.forEach(k => {
  intentCounts[k.intent] = (intentCounts[k.intent] || 0) + 1;
});
console.log('\nSearch Intent Distribution:');
console.log(JSON.stringify(intentCounts, null, 2));

// 5. Festival distribution
const festCounts = {};
keywords.forEach(k => {
  festCounts[k.festival] = (festCounts[k.festival] || 0) + 1;
});
console.log('\nFestival Distribution:');
console.log(JSON.stringify(festCounts, null, 2));

// 6. Category distribution
const catCounts = {};
keywords.forEach(k => {
  catCounts[k.category] = (catCounts[k.category] || 0) + 1;
});
console.log('\nCategory Distribution:');
console.log(JSON.stringify(catCounts, null, 2));

// 7. Verify all required docs exist
const requiredDocs = [
  'phase-7.1-audit.md',
  'keyword-research.md',
  'keyword-map.json',
  'keyword-map.csv',
  'search-intent-map.md',
  'url-architecture.md',
  'content-cluster-plan.md',
  'content-quality-guidelines.md',
  'internal-linking-plan.md'
];

console.log('\nChecking required documents in docs/seo/:');
let allDocsExist = true;
requiredDocs.forEach(doc => {
  const exists = fs.existsSync(`d:/FestiveWala/docs/seo/${doc}`);
  console.log(`- ${doc}: ${exists ? 'EXISTS' : 'MISSING'}`);
  if (!exists) allDocsExist = false;
});

// Write summary validation results to artifacts/qa/phase-7.1/validation-results.json
const validationResult = {
  timestamp: new Date().toISOString(),
  status: allDocsExist ? 'PASS' : 'FAIL',
  totalKeywords: keywords.length,
  languageDistribution: langCounts,
  intentDistribution: intentCounts,
  festivalDistribution: festCounts,
  categoryDistribution: catCounts,
  requiredDocsVerified: allDocsExist
};

fs.writeFileSync('d:/FestiveWala/artifacts/qa/phase-7.1/validation-results.json', JSON.stringify(validationResult, null, 2), 'utf8');
console.log('\nValidation result saved to artifacts/qa/phase-7.1/validation-results.json');

