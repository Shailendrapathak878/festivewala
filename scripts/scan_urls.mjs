import fs from 'fs';
import path from 'path';

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === 'dist' || f === '.git' || f === 'artifacts') continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/https?:\/\/[^\s"'`<>)]+/g);
      if (matches) {
        matches.forEach(m => {
          if (!m.includes('schema.org') && !m.includes('festivewala.in') && !m.includes('w3.org') && !m.includes('vite.dev') && !m.includes('react.dev')) {
            console.log(`${f} -> ${m}`);
          }
        });
      }
    }
  }
}

scanDir('.');

