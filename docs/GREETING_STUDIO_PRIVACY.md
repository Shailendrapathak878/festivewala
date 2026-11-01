# FestiveWala — Greeting Studio Privacy & Client-Side Security
**Phase 3: Premium Greeting Studio & Personalized Card Editor**  
**Document Version:** 3.0.0  
**Status:** Approved & Verified

---

## 1. Executive Privacy Statement

FestiveWala operates on a strict **Zero-Data-Ingress** architecture for personal creations. When users customize a greeting card or attach personal/family photographs, **no text, personal names, or image files ever leave the user's device**.

Every greeting card is composed, rendered, and exported entirely within the local sandbox of the client browser.

---

## 2. Technical Privacy Guarantees

### A. Local-Only Photo Processing
1. **No Server Upload Endpoints:** FestiveWala contains zero backend APIs, zero S3/cloud storage buckets, and zero cloud photo processing pipelines.
2. **Local FileReader API:** Images selected by the user are read strictly via the browser's native `FileReader.readAsDataURL` into ephemeral in-memory state.
3. **No Unsolicited Persistence:** User photographs are never silently written to `localStorage`, `sessionStorage`, or `IndexedDB`. If the user refreshes or closes the page, the image memory is automatically reclaimed by the browser.
4. **Immediate Object URL Revocation:** Blob URLs created during PNG export are automatically revoked via `URL.revokeObjectURL(url)` after download completion.

### B. Personalization Text Privacy
1. **Recipient & Sender Names:** Names entered into the editor (e.g. "Dear Rohan", "The Sharma Family") are stored only in volatile React component state.
2. **Zero Analytics Scraping:** Input fields are never scraped, monitored, or transmitted to any third-party telemetry or ad network.
3. **No Account Requirement:** Greeting creation is 100% accessible without registration, email verification, or social login.

---

## 3. Storage & Network Audit Matrix

| Category | Storage Medium | Transmitted to Network? | Retention Policy |
|---|---|---|---|
| **User Photographs** | Browser RAM (Data URL) | ❌ **NO (0 bytes sent)** | Destroyed on tab close or manual removal |
| **Recipient / Sender Names** | React State (`useState`) | ❌ **NO (0 bytes sent)** | Ephemeral / session-only |
| **Custom Greeting Text** | React State (`useState`) | ❌ **NO (0 bytes sent)** | Ephemeral / session-only |
| **Language Preference** | `localStorage` (`festivewala_lang`) | ❌ **NO** | Persisted across visits (`'en'` or `'hi'`) |
| **Exported PNG Blob** | Browser Memory / Downloads folder | ❌ **NO** | Handed directly to OS download manager |

---

## 4. UI Transparency & User Trust Badges

To communicate this commitment to users, the Greeting Studio prominently features:
- **Client-Side Privacy Badge:** Displayed at the top of the Photo customization tab with a shield icon:
  > *"100% Client-Side Privacy: Your photo is processed locally inside your browser. No images are transmitted or stored on any server."*
- **Header Trust Indicator:** *"100% Free • No Login Required • Client-Side Privacy • High-Resolution PNG Export"*.
- **Immediate Photo Deletion:** A prominent red trash button allows users to purge their attached photograph from browser memory with a single tap.

