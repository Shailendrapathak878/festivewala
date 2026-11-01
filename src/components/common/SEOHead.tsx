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
    // 1. Title
    document.title = title;

    // 2. Primary Meta Tags
    updateOrCreateMeta('name', 'description', description);
    if (keywords) {
      updateOrCreateMeta('name', 'keywords', keywords);
    }
    updateOrCreateMeta('name', 'author', 'FestiveWala Editorial Board');

    // 3. Open Graph / Facebook
    updateOrCreateMeta('property', 'og:title', title);
    updateOrCreateMeta('property', 'og:description', description);
    updateOrCreateMeta('property', 'og:type', ogType);
    updateOrCreateMeta('property', 'og:url', canonicalUrl);
    updateOrCreateMeta('property', 'og:image', ogImage);
    updateOrCreateMeta('property', 'og:site_name', 'FestiveWala');
    updateOrCreateMeta('property', 'og:locale', lang === 'hi' ? 'hi_IN' : 'en_IN');

    // 4. Twitter Cards
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', title);
    updateOrCreateMeta('name', 'twitter:description', description);
    updateOrCreateMeta('name', 'twitter:image', ogImage);

    // 5. Canonical & Hreflang Tags
    updateOrCreateLink('canonical', canonicalUrl);
    updateOrCreateLink('alternate', canonicalUrl, { hreflang: 'en' });
    updateOrCreateLink('alternate', canonicalUrl, { hreflang: 'hi' });
    updateOrCreateLink('alternate', canonicalUrl, { hreflang: 'x-default' });

    // 6. JSON-LD Structured Data
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

