import { useEffect } from 'react';
import type { MetaTagsConfig } from '../../data/seo/types';

interface SEOHeadProps extends MetaTagsConfig {
  lang?: 'en' | 'hi';
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
  canonicalUrl = window.location.href.split('?')[0],
  ogType = 'website',
  ogImage = 'https://festivewala.in/assets/brand/og-festivewala.png',
  jsonLd,
  lang = 'en',
}) => {
  useEffect(() => {
    // 1. Language attribute on <html> element
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';

    // 2. Title
    document.title = title;

    // 3. Primary Meta Tags
    updateOrCreateMeta('name', 'description', description);
    if (keywords) {
      updateOrCreateMeta('name', 'keywords', keywords);
    }
    updateOrCreateMeta('name', 'author', 'FestiveWala Editorial Board');

    // 4. Open Graph / Facebook
    updateOrCreateMeta('property', 'og:title', title);
    updateOrCreateMeta('property', 'og:description', description);
    updateOrCreateMeta('property', 'og:type', ogType);
    updateOrCreateMeta('property', 'og:url', canonicalUrl);
    updateOrCreateMeta('property', 'og:image', ogImage);
    updateOrCreateMeta('property', 'og:site_name', 'FestiveWala');
    updateOrCreateMeta('property', 'og:locale', lang === 'hi' ? 'hi_IN' : 'en_IN');

    // 5. Twitter Cards
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', title);
    updateOrCreateMeta('name', 'twitter:description', description);
    updateOrCreateMeta('name', 'twitter:image', ogImage);

    // 6. Canonical Tag
    // Note: Single-URL client-side language switching does not use separate hreflang URLs.
    // Clean up any legacy hreflang tags to prevent Google Search Console conflicting canonical errors.
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    updateOrCreateLink('canonical', canonicalUrl);

    // 7. JSON-LD Structured Data
    const existingJsonLd = document.getElementById('seo-jsonld');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    if (jsonLd) {
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
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, jsonLd, lang]);

  return null;
};

