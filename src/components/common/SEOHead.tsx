import { useEffect } from 'react';
import type { MetaTagsConfig } from '../../data/seo/types';
import { useSeoCollector } from './SeoContext';

interface SEOHeadProps extends MetaTagsConfig {
  lang?: 'en' | 'hi' | 'hi-Latn' | 'hinglish';
  noindex?: boolean;
}

function updateOrCreateMeta(attributeName: string, attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateOrCreateLink(rel: string, href: string, extraAttributes: Record<string, string> = {}) {
  let selector = `link[rel="${rel}"]`;
  if (extraAttributes.hreflang) {
    selector += `[hreflang="${extraAttributes.hreflang}"]`;
  }
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  Object.entries(extraAttributes).forEach(([key, val]) => {
    element!.setAttribute(key, val);
  });
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://festivewala.in/assets/brand/og-festivewala.png',
  jsonLd,
  lang = 'en',
  noindex = false,
}) => {
  const resolvedCanonical =
    canonicalUrl ??
    (typeof window !== 'undefined' ? window.location.href.split('?')[0] : 'https://festivewala.in/');

  const collectSeo = useSeoCollector();
  if (collectSeo) {
    collectSeo({
      title,
      description,
      keywords,
      canonicalUrl: resolvedCanonical,
      ogType,
      ogImage,
      jsonLd,
      lang,
      noindex,
    });
  }

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Language attribute on <html> element
    const normalizedHtmlLang =
      lang === 'hi' ? 'hi' : lang === 'hi-Latn' || lang === 'hinglish' ? 'hi-Latn' : 'en';
    document.documentElement.lang = normalizedHtmlLang;

    // 2. Title
    document.title = title;

    // 3. Robots directive & Canonical Tag
    if (noindex) {
      updateOrCreateMeta('name', 'robots', 'noindex, nofollow');
      // On 404 or non-indexable routes, do not emit a canonical tag to a non-existent URL
      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) {
        canonicalEl.remove();
      }
    } else {
      updateOrCreateMeta('name', 'robots', 'index, follow');
      // Clean up any legacy hreflang tags to prevent Google Search Console conflicting canonical errors.
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
      updateOrCreateLink('canonical', resolvedCanonical);
    }

    // 4. Primary Meta Tags
    updateOrCreateMeta('name', 'description', description);
    if (keywords) {
      updateOrCreateMeta('name', 'keywords', keywords);
    }
    updateOrCreateMeta('name', 'author', 'Shailendra Pathak — FestiveWala');

    // 5. Open Graph / Facebook
    updateOrCreateMeta('property', 'og:title', title);
    updateOrCreateMeta('property', 'og:description', description);
    updateOrCreateMeta('property', 'og:type', ogType);
    if (!noindex) {
      updateOrCreateMeta('property', 'og:url', resolvedCanonical);
    }
    updateOrCreateMeta('property', 'og:image', ogImage);
    updateOrCreateMeta('property', 'og:site_name', 'FestiveWala');
    updateOrCreateMeta('property', 'og:locale', lang === 'hi' ? 'hi_IN' : 'en_IN');

    // 6. Twitter Cards
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', title);
    updateOrCreateMeta('name', 'twitter:description', description);
    updateOrCreateMeta('name', 'twitter:image', ogImage);

    // 7. JSON-LD Structured Data
    const existingJsonLd = document.getElementById('seo-jsonld');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    if (jsonLd && !noindex) {
      const script = document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById('seo-jsonld');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, resolvedCanonical, ogType, ogImage, jsonLd, lang, noindex]);

  return null;
};
