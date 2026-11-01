import autocannon from 'autocannon';
import fs from 'fs';

const BASE_URL = 'http://localhost:4173';

const requestMix = [
  { path: '/', method: 'GET', weight: 4 },
  { path: '/assets/index-33O5yfxw.css', method: 'GET', weight: 3 },
  { path: '/assets/index-DC5H8HGy.js', method: 'GET', weight: 3 },
  { path: '/assets/vendor-react-CE6H0GrF.js', method: 'GET', weight: 3 },
  { path: '/assets/HomePage-eefGbu5V.js', method: 'GET', weight: 2 },
  { path: '/manifest.json', method: 'GET', weight: 1 }
];

// Expanded requests list matching weights
const requests = [];
requestMix.forEach(item => {
  for (let i = 0; i < item.weight; i++) {
    requests.push({ method: 'GET', path: item.path });
  }
});

const STAGES = [
  { name: 'Stage 1 (10 VUs)', connections: 10, duration: 5 },
  { name: 'Stage 2 (50 VUs)', connections: 50, duration: 5 },
  { name: 'Stage 3 (100 VUs)', connections: 100, duration: 5 },
  { name: 'Stage 4 (250 VUs)', connections: 250, duration: 5 },
  { name: 'Stage 5 (500 VUs)', connections: 500, duration: 5 },
  { name: 'Stage 6 (1,000 VUs)', connections: 1000, duration: 5 },
  { name: 'Stage 7 (2,000 VUs)', connections: 2000, duration: 5 }
];

async function runStage(stage) {
  console.log(`\n==================================================`);
  console.log(`Starting ${stage.name} - Concurrency: ${stage.connections}, Duration: ${stage.duration}s`);
  console.log(`==================================================`);

  return new Promise((resolve) => {
    const instance = autocannon({
      url: BASE_URL,
      connections: stage.connections,
      duration: stage.duration,
      requests: requests,
      pipelining: 1,
      timeout: 10
    }, (err, result) => {
      if (err) {
        console.error(`Error in ${stage.name}:`, err);
        return resolve({ stage: stage.name, error: err.message, status: 'FAILED' });
      }

      const totalRequests = result.requests.total;
      const rps = Math.round(result.requests.average);
      const errors = result.errors + result.timeouts;
      const errorRate = totalRequests > 0 ? ((errors / totalRequests) * 100).toFixed(2) : 0;
      const throughputMB = (result.throughput.total / 1024 / 1024).toFixed(2);
      
      const metrics = {
        stage: stage.name,
        connections: stage.connections,
        totalRequests,
        requestsPerSec: rps,
        p50LatencyMs: result.latency.p50,
        p90LatencyMs: result.latency.p90,
        p95LatencyMs: result.latency.p95 || result.latency.p97_5,
        p99LatencyMs: result.latency.p99,
        throughputMB: parseFloat(throughputMB),
        status2xx: result['2xx'],
        status4xx: result['4xx'],
        status5xx: result['5xx'],
        timeouts: result.timeouts,
        errors: result.errors,
        errorRate: parseFloat(errorRate),
        status: errorRate < 1 ? 'PASS' : 'DEGRADED'
      };

      console.log(`Results for ${stage.name}:`);
      console.log(`  Total Requests:  ${metrics.totalRequests}`);
      console.log(`  Requests / sec:  ${metrics.requestsPerSec} RPS`);
      console.log(`  p50 Latency:     ${metrics.p50LatencyMs} ms`);
      console.log(`  p90 Latency:     ${metrics.p90LatencyMs} ms`);
      console.log(`  p95 Latency:     ${metrics.p95LatencyMs} ms`);
      console.log(`  p99 Latency:     ${metrics.p99LatencyMs} ms`);
      console.log(`  Data Transfer:   ${metrics.throughputMB} MB`);
      console.log(`  2xx Responses:   ${metrics.status2xx}`);
      console.log(`  Errors/Timeouts: ${errors} (${metrics.errorRate}%)`);
      console.log(`  Stage Status:    ${metrics.status}`);

      resolve(metrics);
    });

    autocannon.track(instance, { renderProgressBar: false });
  });
}

async function runAll() {
  const allResults = [];
  for (const stage of STAGES) {
    const res = await runStage(stage);
    allResults.push(res);
    // Safety check: if errors > 5%, do not proceed to higher VUs to prevent OS socket exhaustion
    if (res.errorRate > 5 || res.errors > 500) {
      console.warn(`Stopping load test at ${stage.name} due to error threshold exceeded.`);
      break;
    }
  }

  fs.writeFileSync('scripts/load_test_results.json', JSON.stringify(allResults, null, 2));
  console.log(`\nAll stages completed. Results saved to scripts/load_test_results.json`);
}

runAll();

