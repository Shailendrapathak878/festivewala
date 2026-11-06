import { test, expect } from '@playwright/test';

interface PageAuditResult {
  url: string;
  title: string;
  description: string;
  canonical: string;
  h1: string[];
  h2Count: number;
  h2s: string[];
  hasJsonLd: boolean;
  jsonLdTypes: string[];
  internalLinksCount: number;
  imagesMissingAlt: number;
  imagesTotal: number;
}

test.describe('FestiveWala Complete SEO Audit Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Abort third-party network scripts to prevent hanging networkidle
    await page.route(/(pagead2|googletagmanager|google-analytics|googleads)/, route => route.abort());
  });

  const pagesToAudit = [
    { name: 'Homepage', path: '/' },
    { name: 'Greeting Cards Hub', path: '/greeting-cards' },
    { name: 'Wishes Generator', path: '/wishes' },
    { name: 'Dhanteras Guide', path: '/festivals/dhanteras' },
    { name: 'Dhanteras Wishes', path: '/wishes/dhanteras' },
    { name: 'Dhanteras Greetings', path: '/greetings/dhanteras' },
    { name: 'Diwali Guide', path: '/festivals/diwali' },
    { name: 'Diwali Wishes', path: '/wishes/diwali' },
    { name: 'Diwali Greetings', path: '/greetings/diwali' },
    { name: 'Rangoli Gallery', path: '/rangoli' },
    { name: 'Gift Ideas', path: '/gift-ideas' },
    { name: 'Decoration Ideas', path: '/decoration-ideas' },
    { name: 'Festival Guides', path: '/festival-guides' },
    { name: 'Inspiration Hub', path: '/inspiration' },
    { name: 'About Page', path: '/about' },
  ];

  for (const pageItem of pagesToAudit) {
    test(`Audit SEO Structure: ${pageItem.name} (${pageItem.path})`, async ({ page }) => {
      await page.goto(pageItem.path, { waitUntil: 'domcontentloaded' });
      // Allow dynamic useEffect for SEOHead and components to run
      await page.waitForTimeout(600);

      const audit: PageAuditResult = await page.evaluate(() => {
        const title = document.title;
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
        
        const h1Elements = Array.from(document.querySelectorAll('h1')).map(el => el.textContent?.trim() || '');
        const h2Elements = Array.from(document.querySelectorAll('h2')).map(el => el.textContent?.trim() || '');

        const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        const jsonLdTypes: string[] = [];
        jsonLdScripts.forEach(script => {
          try {
            const parsed = JSON.parse(script.textContent || '{}');
            if (Array.isArray(parsed)) {
              parsed.forEach(item => {
                if (item['@type']) jsonLdTypes.push(item['@type']);
              });
            } else if (parsed['@type']) {
              jsonLdTypes.push(parsed['@type']);
            }
          } catch {}
        });

        const internalLinks = Array.from(document.querySelectorAll('a[href]'))
          .map(a => a.getAttribute('href') || '')
          .filter(href => href.startsWith('/') || href.includes('festivewala.in'));

        const images = Array.from(document.querySelectorAll('img'));
        const imagesMissingAlt = images.filter(img => !img.hasAttribute('alt') || img.getAttribute('alt')?.trim() === '').length;

        return {
          url: window.location.pathname,
          title,
          description,
          canonical,
          h1: h1Elements,
          h2Count: h2Elements.length,
          h2s: h2Elements.slice(0, 5),
          hasJsonLd: jsonLdScripts.length > 0,
          jsonLdTypes,
          internalLinksCount: internalLinks.length,
          imagesMissingAlt,
          imagesTotal: images.length,
        };
      });

      console.log(`\n--- SEO AUDIT: ${pageItem.name} [${pageItem.path}] ---`);
      console.log(`Title: "${audit.title}" (${audit.title.length} chars)`);
      console.log(`Meta Desc: "${audit.description}" (${audit.description.length} chars)`);
      console.log(`Canonical: ${audit.canonical}`);
      console.log(`H1 (${audit.h1.length}): ${audit.h1.map(h => `"${h}"`).join(' | ') || 'NONE FOUND'}`);
      console.log(`H2 Count: ${audit.h2Count}`);
      console.log(`JSON-LD: ${audit.hasJsonLd ? audit.jsonLdTypes.join(', ') : 'NONE'}`);
      console.log(`Internal Links: ${audit.internalLinksCount}`);
      console.log(`Images: Total ${audit.imagesTotal}, Missing Alt: ${audit.imagesMissingAlt}`);

      expect(audit.title.length).toBeGreaterThan(10);
    });
  }
});
