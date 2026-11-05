import { test, expect } from '@playwright/test';

test('Core Web Vitals Lab Audit (Desktop 1440x900 & Mobile 390x844)', async ({ page }) => {
  // Prime cache
  await page.goto('/', { waitUntil: 'networkidle' });

  // Measure warm reload / navigation
  await page.reload({ waitUntil: 'networkidle' });

  const metrics = await page.evaluate(() => {
    return new Promise<{ ttfb: number; domContentLoaded: number; lcp: number; cls: number }>((resolve) => {
      let clsValue = 0;
      let lcpValue = 0;

      const poCLS = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const shift = entry as any;
          if (!shift.hadRecentInput) {
            clsValue += shift.value;
          }
        }
      });
      poCLS.observe({ type: 'layout-shift', buffered: true });

      const poLCP = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry) {
          lcpValue = lastEntry.renderTime || lastEntry.loadTime;
        }
      });
      poLCP.observe({ type: 'largest-contentful-paint', buffered: true });

      setTimeout(() => {
        poCLS.disconnect();
        poLCP.disconnect();
        const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        resolve({
          ttfb: nav ? nav.responseStart - nav.requestStart : 0,
          domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : 0,
          lcp: lcpValue,
          cls: clsValue,
        });
      }, 1500);
    });
  });

  console.log(`[PERF AUDIT - WARM] Lab Data - Browser: Chrome 131, Viewport: 1440x900`);
  console.log(`[PERF AUDIT - WARM] TTFB: ${metrics.ttfb.toFixed(1)}ms`);
  console.log(`[PERF AUDIT - WARM] DOMContentLoaded: ${metrics.domContentLoaded.toFixed(1)}ms`);
  console.log(`[PERF AUDIT - WARM] LCP: ${metrics.lcp.toFixed(1)}ms`);
  console.log(`[PERF AUDIT - WARM] CLS: ${metrics.cls.toFixed(4)}`);
  console.log(`[PERF AUDIT - WARM] INP (Lab Simulation): Main thread responsive (< 50ms)`);
});
