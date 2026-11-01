import fs from 'fs';

const data = JSON.parse(fs.readFileSync('d:/FestiveWala/docs/seo/keyword-map.json', 'utf8'));
const headers = ['keyword', 'language', 'festival', 'category', 'intent', 'keyword_type', 'target_url', 'priority', 'research_status'];
const rows = [headers.join(',')];

for (const item of data) {
  const row = headers.map(h => {
    let val = (item[h] || '').toString();
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      val = '"' + val.replace(/"/g, '""') + '"';
    }
    return val;
  });
  rows.push(row.join(','));
}

fs.writeFileSync('d:/FestiveWala/docs/seo/keyword-map.csv', rows.join('\n'), 'utf8');
console.log('Successfully wrote ' + (rows.length - 1) + ' records to keyword-map.csv');

