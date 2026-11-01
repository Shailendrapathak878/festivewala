import fs from 'fs';
import path from 'path';

const templateDir = 'd:/FestiveWala/src/features/greeting-studio/data/templates';
const files = fs.readdirSync(templateDir).filter(f => f.endsWith('.ts'));

let all = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(templateDir, file), 'utf8');
  const idMatches = Array.from(content.matchAll(/"id":\s*"([^"]+)"/g));
  const nameMatches = Array.from(content.matchAll(/"name":\s*"([^"]+)"/g));
  const catMatches = Array.from(content.matchAll(/"category":\s*"([^"]+)"/g));
  const vectorMatches = Array.from(content.matchAll(/"vectorStyle":\s*"([^"]+)"/g));
  const borderMatches = Array.from(content.matchAll(/"borderStyle":\s*"([^"]+)"/g));
  const fontMatches = Array.from(content.matchAll(/"fontFamily":\s*"([^"]+)"/g));
  const primaryMatches = Array.from(content.matchAll(/"primary":\s*"([^"]+)"/g));
  const goldMatches = Array.from(content.matchAll(/"gold":\s*"([^"]+)"/g));
  const gradientMatches = Array.from(content.matchAll(/"bgGradientType":\s*"([^"]+)"/g));
  const compositionMatches = Array.from(content.matchAll(/"compositionStyle":\s*"([^"]+)"/g));
  
  for (let i = 0; i < idMatches.length; i++) {
    all.push({
      file: file.replace('.ts',''),
      id: idMatches[i] && idMatches[i][1],
      name: nameMatches[i] && nameMatches[i][1],
      category: catMatches[i] && catMatches[i][1],
      vectorStyle: vectorMatches[i] && vectorMatches[i][1],
      borderStyle: borderMatches[i] && borderMatches[i][1],
      fontFamily: fontMatches[i] && fontMatches[i][1],
      primary: primaryMatches[i] && primaryMatches[i][1],
      gold: goldMatches[i] && goldMatches[i][1],
      gradient: gradientMatches[i] && gradientMatches[i][1],
      composition: compositionMatches[i] && compositionMatches[i][1]
    });
  }
}
console.log('TOTAL TEMPLATES:', all.length);
all.forEach((t, i) => {
  console.log(`${String(i+1).padStart(3)}. [${t.file}] id="${t.id}" name="${t.name}" vector=${t.vectorStyle} border=${t.borderStyle} font=${t.fontFamily} bg=${t.primary} gradient=${t.gradient}`);
});

