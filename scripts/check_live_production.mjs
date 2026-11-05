import dns from 'dns';
import https from 'https';

async function resolveDns(domain) {
  return new Promise((resolve) => {
    dns.resolve(domain, (err, addresses) => {
      if (err) resolve({ error: err.message });
      else resolve({ addresses });
    });
  });
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const headersObj = {};
    for (const [k, v] of res.headers.entries()) {
      headersObj[k] = v;
    }
    return {
      status: res.status,
      statusText: res.statusText,
      headers: headersObj,
    };
  } catch (err) {
    return { error: err.message };
  }
}

async function run() {
  console.log('=== 1. DNS RESOLUTION ===');
  console.log('festivewala.in:', await resolveDns('festivewala.in'));
  console.log('www.festivewala.in:', await resolveDns('www.festivewala.in'));

  console.log('\n=== 2. HTTP / SSL CHECKS ===');
  console.log('https://festivewala.in:');
  const mainRes = await checkUrl('https://festivewala.in');
  console.log('Status:', mainRes.status, mainRes.statusText);
  if (mainRes.headers) {
    console.log('Server:', mainRes.headers['server']);
    console.log('CF-Ray:', mainRes.headers['cf-ray']);
    console.log('HSTS:', mainRes.headers['strict-transport-security']);
    console.log('CSP:', mainRes.headers['content-security-policy']?.substring(0, 100));
  } else {
    console.log('Error:', mainRes.error);
  }

  console.log('\nhttps://www.festivewala.in:');
  const wwwRes = await checkUrl('https://www.festivewala.in');
  console.log('Status:', wwwRes.status, wwwRes.statusText);
  if (wwwRes.headers) {
    console.log('Location (Redirect):', wwwRes.headers['location']);
    console.log('Server:', wwwRes.headers['server']);
  } else {
    console.log('Error:', wwwRes.error);
  }

  console.log('\n=== 3. PRODUCTION ROUTE ACCESSIBILITY (CURRENT DEPLOYED STATE) ===');
  const dhanterasRes = await checkUrl('https://festivewala.in/festivals/dhanteras');
  console.log('https://festivewala.in/festivals/dhanteras Status:', dhanterasRes.status, dhanterasRes.statusText);
}

run();

