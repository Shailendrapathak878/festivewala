import https from 'https';

https.get('https://198f464a.festivewala.pages.dev/assets/index-BjSodS_c.js', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Size:', data.length);
    console.log('Snippet:', data.substring(0, 300));
    const importRegex = /import\("([^"]+)"\)/g;
    const matches = [];
    let m;
    while ((m = importRegex.exec(data)) !== null) {
      matches.push(m[1]);
    }
    console.log('Dynamic chunk imports:', matches);
  });
});

