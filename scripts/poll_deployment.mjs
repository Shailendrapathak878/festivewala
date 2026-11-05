import https from 'https';

let attempts = 0;
const MAX_ATTEMPTS = 15; // 150 seconds max

function check() {
  https.get('https://festivewala.in/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      attempts++;
      const match = data.match(/src="(\/assets\/[^"]+\.js)"/);
      const script = match ? match[1] : 'unknown';
      console.log(`[Attempt ${attempts}/${MAX_ATTEMPTS}] Bundle: ${script} | Server Time: ${res.headers['date']}`);
      
      if (script !== '/assets/index-BjSodS_c.js') {
        console.log(`🎉 NEW DEPLOYMENT DETECTED ON CLOUDFLARE PAGES: ${script}`);
        process.exit(0);
      } else if (attempts >= MAX_ATTEMPTS) {
        console.log('Poll completed. Bundle still index-BjSodS_c.js.');
        process.exit(0);
      } else {
        setTimeout(check, 10000);
      }
    });
  }).on('error', (err) => {
    console.error('Fetch error:', err.message);
    setTimeout(check, 10000);
  });
}

check();

