/**
 * FestiveWala Template Hinglish Enrichment Script
 * Enriches all 100+ templates with natural Hinglish defaultText and metadata.
 */

import fs from 'fs';
import path from 'path';
import { toHinglish } from './enrich_wishes_hinglish.mjs';

const TEMPLATE_DIR = 'src/features/greeting-studio/data/templates';
const files = fs.readdirSync(TEMPLATE_DIR).filter((f) => f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(TEMPLATE_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Parse JSON-like array from export const ... = [ ... ];
  const match = content.match(/export const \w+: GreetingTemplate\[\] = (\[[\s\S]*\]);/);
  if (!match) continue;

  try {
    const templates = JSON.parse(match[1]);
    for (const t of templates) {
      if (t.defaultText) {
        t.defaultText.titleHinglish = t.defaultText.titleEn || toHinglish(t.defaultText.titleHi);
        t.defaultText.subtitleHinglish = toHinglish(t.defaultText.subtitleHi) || t.defaultText.subtitleEn;
        t.defaultText.recipientHinglish = toHinglish(t.defaultText.recipientHi) || t.defaultText.recipientEn;
        t.defaultText.messageHinglish = toHinglish(t.defaultText.messageHi) || t.defaultText.messageEn;
        t.defaultText.senderHinglish = toHinglish(t.defaultText.senderHi) || t.defaultText.senderEn;
      }
      t.nameHinglish = t.name;
      t.descriptionHinglish = toHinglish(t.descriptionHi) || t.description;
      if (t.badgeHi) {
        t.badgeHinglish = toHinglish(t.badgeHi);
      }
      if (t.categoryLabelHi) {
        t.categoryLabelHinglish = t.categoryLabelEn;
      }
    }

    const constName = content.match(/export const (\w+):/)[1];
    const newContent = `import type { GreetingTemplate } from '../../types/template';\n\nexport const ${constName}: GreetingTemplate[] = ${JSON.stringify(templates, null, 2)};\n`;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`[Templates Enrichment] Successfully enriched ${templates.length} templates in ${file}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}

// Also process photoTemplates.ts
const photoPath = 'src/features/greeting-studio/data/photoTemplates.ts';
if (fs.existsSync(photoPath)) {
  const photoContent = fs.readFileSync(photoPath, 'utf8');
  // Strip single-line comments
  const cleanPhotoContent = photoContent.replace(/\/\/.*$/gm, '');
  const match = cleanPhotoContent.match(/export const PHOTO_TEMPLATES: GreetingTemplate\[\] = (\[[\s\S]*\]);/);
  if (match) {
    try {
      // Evaluate array safely
      const templates = Function(`return (${match[1]});`)();
      for (const t of templates) {
        if (t.defaultText) {
          t.defaultText.titleHinglish = t.defaultText.titleEn || toHinglish(t.defaultText.titleHi);
          t.defaultText.subtitleHinglish = toHinglish(t.defaultText.subtitleHi) || t.defaultText.subtitleEn;
          t.defaultText.recipientHinglish = toHinglish(t.defaultText.recipientHi) || t.defaultText.recipientEn;
          t.defaultText.messageHinglish = toHinglish(t.defaultText.messageHi) || t.defaultText.messageEn;
          t.defaultText.senderHinglish = toHinglish(t.defaultText.senderHi) || t.defaultText.senderEn;
        }
        t.nameHinglish = t.name;
        t.descriptionHinglish = toHinglish(t.descriptionHi) || t.description;
        if (t.badgeHi) {
          t.badgeHinglish = toHinglish(t.badgeHi);
        }
        if (t.categoryLabelHi) {
          t.categoryLabelHinglish = t.categoryLabelEn;
        }
      }
      const newPhotoContent = `import type { GreetingTemplate } from '../types/template';\n\nexport const PHOTO_TEMPLATES: GreetingTemplate[] = ${JSON.stringify(templates, null, 2)};\n`;
      fs.writeFileSync(photoPath, newPhotoContent, 'utf8');
      console.log(`[Templates Enrichment] Successfully enriched ${templates.length} photo templates in photoTemplates.ts`);
    } catch (err) {
      console.error('Error processing photoTemplates.ts:', err.message);
    }
  }
}
