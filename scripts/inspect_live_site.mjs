import https from 'https';

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function inspect() {
  const urls = [
    'https://festivewala.in/',
    'https://festivewala.pages.dev/',
    'https://198f464a.festivewala.pages.dev/'
  ];

  for (const url of urls) {
    console.log(`\n================================`);
    console.log(`Target: ${url}`);
    const res = await fetchUrl(url);
    console.log(`Status: ${res.status}`);
    console.log(`Date: ${res.headers['date']}`);
    console.log(`CF-Ray: ${res.headers['cf-ray']}`);
    const scripts = [...res.body.matchAll(/src="(\/assets\/[^"]+\.js)"/g)].map(m => m[1]);
    console.log(`Scripts linked:`, scripts);
    console.log(`Contains Dhanteras:`, res.body.includes('dhanteras') || res.body.includes('Dhanteras'));
  }
}

inspect().catch(console.error);
