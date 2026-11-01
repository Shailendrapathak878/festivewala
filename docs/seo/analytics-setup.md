# Privacy-Preserving Analytics & Event Measurement Setup Guide
**Brand:** FestiveWala  
**Domain:** `https://festivewala.in`  
**Measurement Framework:** Google Analytics 4 (GA4) / Privacy-First Event Architecture  
**Phase:** 7.2 Complete Technical SEO Implementation  
**Status:** Implementation Ready (Pre-launch)

---

## 1. Privacy-First Analytics Principles

FestiveWala adheres strictly to user privacy and India's Digital Personal Data Protection (DPDP) Act:
1. **Zero Photo Tracking:** User photos uploaded into the Photo Wishes Studio are processed 100% locally via the browser's HTML5 Canvas and `FileReader`. No photo data, filenames, or facial metadata are EVER transmitted to analytics or servers.
2. **Zero PII (Personally Identifiable Information):** Recipient names, sender names, and custom wish drafts are never logged in event parameters.
3. **IP Anonymization:** Defaulted via GA4 backend protocol.
4. **Transparent Local Storage:** Used exclusively for client preferences (Favorites, language toggle `en`/`hi`).

---

## 2. Measurement ID Configuration

The application uses an environment variable for runtime tracking configuration.

### Environment Variable Configuration
Add the GA4 measurement ID into your deployment environment variables or `.env.production`:
```env
# Google Analytics 4 Measurement ID
VITE_GA4_MEASUREMENT_ID=G-[INSERT_GA4_MEASUREMENT_ID_HERE]
```

### Production Script Injection (`index.html`)
When ready for production deployment, include the conditional GA4 tag in `index.html`:
```html
<!-- Google tag (gtag.js) - Privacy-Preserving GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-[INSERT_GA4_MEASUREMENT_ID_HERE]"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-[INSERT_GA4_MEASUREMENT_ID_HERE]', {
    anonymize_ip: true,
    send_page_view: false // Managed via React Router SPA listener
  });
</script>
```

---

## 3. Custom Event Measurement Schema

To track engagement without compromising privacy, FestiveWala defines 10 core event taxonomies:

| Event Name | Trigger Condition | Parameters | Privacy Notes |
|---|---|---|---|
| `wish_copied` | User clicks "Copy Wish" on any card | `festival_id`, `language`, `wish_category` | No message text logged |
| `wish_shared_whatsapp` | User clicks "Share on WhatsApp" | `festival_id`, `language`, `channel` | No recipient phone number logged |
| `greeting_template_viewed` | User views template detail in modal | `template_id`, `festival`, `orientation` | Anonymous template ID only |
| `greeting_card_created` | User renders customized card on Canvas | `festival`, `template_id`, `type: simple/photo` | No user photo or name logged |
| `greeting_card_downloaded` | User clicks "Download Greeting Card" | `festival`, `template_id`, `format: png/jpg` | File generation event |
| `rangoli_viewed` | User clicks into Rangoli design card | `design_id`, `category`, `difficulty` | Visual engagement metrics |
| `rangoli_downloaded` | User downloads Rangoli SVG or HD PNG | `design_id`, `file_format` | Resource utility metrics |
| `guide_read` | User scrolls through a cultural guide | `guide_id`, `depth_percentage` (25/50/75/100) | Content depth metrics |
| `language_switched` | User toggles header language | `from_lang`, `to_lang` (`en` <-> `hi`) | Localization preference |
| `smart_wishes_generated` | User runs custom smart generator | `festival`, `relationship`, `tone` | No personal names logged |

---

## 4. Reusable Analytics Utility Implementation

FestiveWala provides a lightweight wrapper (`src/utils/analytics.ts`) to safely fire events in production without breaking local development:

```typescript
// src/utils/analytics.ts

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
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
    if (measurementId) {
      window.gtag('config', measurementId, {
        page_path: path,
        page_title: title || document.title,
      });
    }
  }
};
```

---

## 5. Verification Checklist

1. [ ] Confirm `.env` has `VITE_GA4_MEASUREMENT_ID` with real Google Analytics property.
2. [ ] Verify Google Analytics DebugView receives events when testing locally or on staging.
3. [ ] Confirm no user photo, sender name, or phone number appears anywhere in GSC or GA4 debug streams.
4. [ ] Ensure Google Signals and Enhanced Measurement for outbound link clicks are enabled inside the GA4 Admin property settings.

