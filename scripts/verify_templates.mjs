import fs from 'fs';
import path from 'path';

const categoryDir = path.join('src', 'features', 'greeting-studio', 'data', 'templates');
const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.ts'));

let totalSimpleTemplates = 0;
const categoryCounts = {};
const templateIds = new Set();
const duplicateIds = [];
const allTemplateObjects = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(categoryDir, file), 'utf8');
  // Match template id: "id": "..." or id: "..."
  const matches = [...content.matchAll(/["']?id["']?\s*:\s*["']([^"']+)["']/g)];
  categoryCounts[file] = matches.length;
  totalSimpleTemplates += matches.length;
  for (const m of matches) {
    const id = m[1];
    if (templateIds.has(id)) {
      duplicateIds.push(id);
    } else {
      templateIds.add(id);
      allTemplateObjects.push({ file, id });
    }
  }
}

// Check photo templates
const photoContent = fs.readFileSync(path.join('src', 'features', 'greeting-studio', 'data', 'photoTemplates.ts'), 'utf8');
const photoMatches = [...photoContent.matchAll(/["']?id["']?\s*:\s*["']([^"']+)["']/g)];
let photoCount = 0;
for (const m of photoMatches) {
  const id = m[1];
  if (id.startsWith('photo-')) {
    photoCount++;
    if (templateIds.has(id)) {
      duplicateIds.push(id);
    } else {
      templateIds.add(id);
      allTemplateObjects.push({ file: 'photoTemplates.ts', id });
    }
  }
}

console.log('=== TEMPLATE LIBRARY AUDIT ===');
console.log('Category Counts:');
for (const [k, v] of Object.entries(categoryCounts)) {
  console.log(`  ${k.padEnd(20)}: ${v} templates`);
}
console.log('----------------------------------------------------');
console.log(`TOTAL SIMPLE TEMPLATES: ${totalSimpleTemplates}`);
console.log(`TOTAL PHOTO TEMPLATES:  ${photoCount}`);
console.log(`GRAND TOTAL TEMPLATES:  ${totalSimpleTemplates + photoCount}`);
console.log(`TOTAL UNIQUE IDS:       ${templateIds.size}`);
console.log(`DUPLICATE IDS:          ${duplicateIds.length === 0 ? 'None (PASS)' : duplicateIds.join(', ')}`);
