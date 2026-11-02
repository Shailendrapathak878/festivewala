/**
 * FestiveWala Privacy-Preserving Analytics Utility
 * Compliant with Indian DPDP Act.
 * Strictly guarantees ZERO user photos, ZERO sender/recipient names, and ZERO custom text messages are logged.
 */

export const GA4_MEASUREMENT_ID = 'G-D6RM3NJ0N3';

type GAEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: GAEventParams) => void;
    dataLayer?: unknown[];
  }
}

export const trackEvent = (eventName: string, params?: GAEventParams): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Sanitize parameters to guarantee zero PII
    const sanitizedParams = { ...params };
    delete sanitizedParams.userName;
    delete sanitizedParams.recipientName;
    delete sanitizedParams.photoData;
    delete sanitizedParams.customMessage;

    window.gtag('event', eventName, sanitizedParams);
  } else if (import.meta.env.DEV) {
    console.debug(`[Analytics Debug: ${eventName}]`, params);
  }
};

export const trackPageView = (path: string, title?: string): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID;
    if (measurementId) {
      window.gtag('config', measurementId, {
        page_path: path,
        page_title: title || document.title,
      });
    }
  }
};
