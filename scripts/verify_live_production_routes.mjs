import https from 'https';

const routes = [
  '/',
  '/festivals/dhanteras',
  '/festivals/diwali',
  '/greeting-cards',
  '/greeting-cards?festival=dhanteras',
  '/greeting-cards?festival=diwali',
  '/wishes',
  '/wishes?festival=dhanteras',
  '/wishes?festival=diwali',
  '/gift-ideas',
  '/gift-ideas/dhanteras',
  '/rangoli',
  '/decoration-ideas',
  '/festival-guides',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/disclaimer',
  '/sitemap.xml',
  '/robots.txt',
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    https.get(`https://festivewala.in${route}`, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        resolve({
          route,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length,
          server: res.headers['server'],
          cfRay: res.headers['cf-ray'],
          hsts: !!res.headers['strict-transport-security'],
          csp: !!res.headers['content-security-policy'],
        });
      });
    }).on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

async function run() {
  console.log('=== VERIFYING LIVE PRODUCTION ROUTES ON https://festivewala.in ===');
  const results = [];
  for (const r of routes) {
    const res = await checkRoute(r);
    results.push(res);
    console.log(`${res.status === 200 ? '✅' : '❌'} [${res.status}] https://festivewala.in${res.route} (${res.length} bytes, ${res.contentType})`);
  }

  const all200 = results.every(r => r.status === 200);
  console.log(`\nResult: ${results.filter(r => r.status === 200).length}/${results.length} routes returned 200 OK.`);
  console.log(`All routes 200 OK: ${all200}`);
}

run();

