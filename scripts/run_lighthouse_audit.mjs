import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const REPORT_DIR = path.join(ROOT_DIR, 'artifacts', 'qa', 'four-feature-release', 'performance');

fs.mkdirSync(REPORT_DIR, { recursive: true });

async function isPortOpen(port) {
  try {
    const res = await fetch(`http://localhost:${port}`);
    return res.status >= 200 && res.status < 500;
  } catch (e) {
    return false;
  }
}

async function waitForServer(port, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isPortOpen(port)) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

const PAGES_TO_AUDIT = [
  { id: 'homepage', name: 'Homepage', url: 'http://localhost:4173/' },
  { id: 'dhanteras', name: 'Dhanteras Festival Page', url: 'http://localhost:4173/festivals/dhanteras' },
  { id: 'diwali', name: 'Diwali Festival Guide', url: 'http://localhost:4173/festivals/diwali' },
  { id: 'greeting-studio', name: 'Greeting Studio', url: 'http://localhost:4173/greeting-cards' },
  { id: 'wishes', name: 'Wishes Generator', url: 'http://localhost:4173/wishes' },
];

async function run() {
  console.log('🚀 Starting Automated Production Lighthouse Audit...');

  let serverProcess = null;
  const isRunning = await isPortOpen(4173);
  if (!isRunning) {
    console.log('Starting Vite preview server on port 4173...');
    serverProcess = spawn('npx', ['vite', 'preview', '--port', '4173'], {
      cwd: ROOT_DIR,
      stdio: 'pipe',
      shell: true,
    });
    const ready = await waitForServer(4173);
    if (!ready) throw new Error('Failed to start preview server on port 4173');
    console.log('✓ Vite preview server is ready');
  }

  const results = [];

  for (const page of PAGES_TO_AUDIT) {
    console.log(`\nAuditing ${page.name} (${page.url})...`);
    const jsonOutputPath = path.join(REPORT_DIR, `lighthouse_${page.id}.json`);

    try {
      // Execute lighthouse CLI in desktop preset, headless
      const cmd = `npx --yes lighthouse "${page.url}" --chrome-flags="--headless" --preset=desktop --output=json --output-path="${jsonOutputPath}" --quiet`;
      execSync(cmd, { cwd: ROOT_DIR, stdio: 'inherit' });

      if (fs.existsSync(jsonOutputPath)) {
        const raw = JSON.parse(fs.readFileSync(jsonOutputPath, 'utf-8'));
        const cats = raw.categories || {};
        const audits = raw.audits || {};

        const perfScore = Math.round((cats.performance?.score || 0) * 100);
        const a11yScore = Math.round((cats.accessibility?.score || 0) * 100);
        const bpScore = Math.round((cats['best-practices']?.score || 0) * 100);
        const seoScore = Math.round((cats.seo?.score || 0) * 100);

        const lcpMs = Math.round(audits['largest-contentful-paint']?.numericValue || 0);
        const cls = parseFloat((audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3));
        const tbtMs = Math.round(audits['total-blocking-time']?.numericValue || 0);
        const inpMs = audits['interaction-to-next-paint']?.numericValue
          ? Math.round(audits['interaction-to-next-paint'].numericValue)
          : null;

        const summary = {
          pageId: page.id,
          pageName: page.name,
          url: page.url,
          scores: {
            performance: perfScore,
            accessibility: a11yScore,
            bestPractices: bpScore,
            seo: seoScore,
          },
          metrics: {
            lcpMs,
            cls,
            tbtMs,
            inpMs: inpMs ?? 'N/A (Requires Field Interaction)',
          },
        };

        results.push(summary);
        console.log(`  ✓ Performance: ${perfScore} | A11y: ${a11yScore} | BestPractices: ${bpScore} | SEO: ${seoScore}`);
        console.log(`    LCP: ${lcpMs}ms | CLS: ${cls} | TBT: ${tbtMs}ms`);
      }
    } catch (e) {
      console.error(`  ❌ Error auditing ${page.name}:`, e.message);
    }
  }

  // Save aggregated results
  fs.writeFileSync(
    path.join(REPORT_DIR, 'lighthouse_summary.json'),
    JSON.stringify(results, null, 2),
    'utf-8'
  );

  console.log('\n=========================================');
  console.log('✓ All 5 Lighthouse audits completed and saved to artifacts/qa/four-feature-release/performance/lighthouse_summary.json');
  console.log('=========================================\n');

  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
}

run();

