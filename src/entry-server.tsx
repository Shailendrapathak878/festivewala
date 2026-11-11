import React from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from './i18n/LanguageContext';
import { AppRoutes } from './routes/AppRoutes';
import { SeoProvider, type CollectedSeoData } from './components/common/SeoContext';

export type { CollectedSeoData };

export interface SsrRenderResult {
  html: string;
  seo: CollectedSeoData | null;
}

async function webStreamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      result += decoder.decode(value, { stream: true });
    }
  }

  result += decoder.decode();
  return result;
}

export async function renderRoute(location: string): Promise<SsrRenderResult> {
  let collectedSeo: CollectedSeoData | null = null;

  const { prelude } = await prerender(
    <React.StrictMode>
      <StaticRouter location={location}>
        <MotionConfig reducedMotion="always">
          <LanguageProvider>
            <SeoProvider
              onCollect={(data) => {
                collectedSeo = data;
              }}
            >
              <AppRoutes />
            </SeoProvider>
          </LanguageProvider>
        </MotionConfig>
      </StaticRouter>
    </React.StrictMode>
  );

  const html = await webStreamToString(prelude);
  return { html, seo: collectedSeo };
}
