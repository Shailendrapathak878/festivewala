# FESTIVEWALA — SMART WISHES GENERATOR ARCHITECTURE
## Phase 5 Technical Architecture & Content Model

## 1. Executive Summary & Design Principles

The **Smart Wishes Generator** is FestiveWala's premier bilingual festival messaging platform. It allows users to generate, personalize, discover, save, and share meaningful festival wishes for family, friends, romantic partners, colleagues, customers, and teachers.

### Core Architectural Pillars
- **Zero Paid AI / Zero Cloud Dependencies**: Operates 100% in-browser using local, deterministic multi-factor relevance ranking. No paid API keys, no monthly LLM bills, no rate limits, and zero server latency.
- **Privacy-First**: No login required. Personalization data (sender name, recipient name, custom notes) remains strictly in local browser memory and is never transmitted over the network or saved to remote databases.
- **Exact 500 Unique Bilingual Wishes**: Comprehensive content library spanning 10 distinct festive categories with authentic English and poetic Hindi (Devanagari) translations.
- **Local Persistence**: User favorites are persisted in `localStorage` under `festivewala_saved_wishes` with resilient fallback error handling.

---

## 2. Content Architecture (500 Unique Wishes)

The repository holds exactly **500 unique bilingual wishes** organized across 10 categories:

| # | Category ID | English Category Label | Hindi Category Label | Existing Preserved | Phase 5 Added | Final Count |
|---|-------------|------------------------|----------------------|--------------------|---------------|-------------|
| 1 | `family` | Family & Elders | परिवार व अग्रज | 36 | 24 | **60** |
| 2 | `friends` | Friends Forever | मित्र व साथी | 36 | 24 | **60** |
| 3 | `short` | Short & Sweet | संक्षिप्त व मधुर | 36 | 24 | **60** |
| 4 | `traditional` | Traditional Blessing | पारंपरिक वंदना | 30 | 20 | **50** |
| 5 | `love` | Love & Romance | प्रेम व आत्मीयता | 30 | 20 | **50** |
| 6 | `emotional` | Heartfelt & Emotional | भावुक व आत्मीय | 30 | 20 | **50** |
| 7 | `professional` | Corporate & Executive | कॉरपोरेट व व्यावसायिक | 30 | 20 | **50** |
| 8 | `funny` | Funny & Relatable | हास्य व मस्ती | 24 | 16 | **40** |
| 9 | `captions` | Social Media Captions | सोशल मीडिया कैप्शन | 24 | 16 | **40** |
| 10 | `business` | Business & Clients | व्यापार व ग्राहक | 24 | 16 | **40** |
| **Total** | — | — | — | **300** | **200** | **500** |

### JSON Data Storage Architecture (`src/data/wishes/`)
Per Section 13 guidelines, the content is dual-exported as TypeScript modules (for immediate type-safe compilation) and clean JSON documents:
- `src/data/wishes/wishes.json`: Full 500-record array containing `id`, `category`, `festivalIds`, `recipientTypes`, `tone`, `length`, `englishText`, `hindiText`, `headlineEn`, `headlineHi`, `tags`, and `dateAdded`.
- `src/data/wishes/wish-categories.json`: Category metadata with icons, counts, and bilingual labels.
- `src/data/wishes/wish-metadata.json`: Global schema metadata detailing distribution, supported recipients, tones, lengths, and festivals.

---

## 3. Local Deterministic Generation Engine

Located in `src/features/wishes/services/wishGeneratorService.ts`.

### Multi-Factor Relevance Scoring Function
When a user configures their criteria (Festival, Recipient, Tone, Length), every wish in the 500-record repository is evaluated and scored:

$$\text{Total Score} = S_{\text{festival}} + S_{\text{recipient}} + S_{\text{tone}} + S_{\text{length}} + S_{\text{correlation}}$$

1. **Festival Match ($S_{\text{festival}} = 0 \text{ to } 40$)**: Exact match with `festivalIds` or general festive designation.
2. **Recipient Match ($S_{\text{recipient}} = 0 \text{ to } 45$)**: Target match in `recipientTypes` (e.g. `mother`, `father`, `partner`, `friends`, `colleagues`).
3. **Tone Match ($S_{\text{tone}} = 0 \text{ to } 35$)**: Exact tone alignment (`heartwarming`, `emotional`, `romantic`, `funny`, `traditional`, `professional`, `respectful`, `inspirational`, `cute`, `simple`), with partial credit for compatible tones.
4. **Length Match ($S_{\text{length}} = 0 \text{ to } 20$)**: Matching word count tier (`short`, `medium`, `long`).
5. **Category Correlation ($S_{\text{correlation}} = 0 \text{ to } 25$)**: Inherent semantic affinity between recipient type and content category.

Candidates are ranked in descending order. Users can cycle through top matches using the "Next Match (Shuffle 🎲)" control.

---

## 4. Personalization Engine (Safe Text Interpolation)

The generator weaves user-provided names, relationships, personal notes, and sign-offs into the chosen wish without awkward syntax or empty placeholders:

### Interpolation Rules
- **Recipient Salutation**:
  - If recipient name and relationship are provided:
    - *English*: `To my dearest [Relationship], [RecipientName],`
    - *Hindi*: `[Relationship] [RecipientName],`
  - If only name is provided:
    - *Formal / Respectful recipients* (Elders, Teachers, Father, Mother, Clients):
      `Dear [RecipientName],` / `आदरणीय [RecipientName] जी,`
    - *Warm recipients* (Partner, Friends, Sibling):
      `Dearest [RecipientName],` / `प्रिय [RecipientName],`
  - If neither is provided:
    - Injects sensible warm default from `SALUTATIONS` dictionary (`Dearest Maa,`, `Respected Papa,`, etc.) or begins cleanly with festival opening. Never generates dangling commas or empty brackets!
- **Custom Personal Note**:
  - Injects naturally as a dedicated indented section:
    `A personal note: "[Note]"` (EN) / `एक विशेष संदेश: "[Note]"` (HI).
- **Sender Sign-Off**:
  - If provided: `— With warm festive love, [SenderName]` (EN) / `— सस्नेह, [SenderName]` (HI).
  - If omitted: `— FestiveWala (उत्सव • सृजन • आनंद)`.
- **Inline Editing**:
  - The final output is rendered in an editable `<textarea>` so the user can tweak words, add private jokes, or adjust phrasing prior to sending.

---

## 5. Sharing Architecture

### WhatsApp Deep-Linking
WhatsApp sharing uses URL encoding preserving UTF-8 Devanagari characters, Sanskrit mantras, and emojis:
```typescript
export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
```

### Native Web Share API with Fallback
```typescript
if (navigator.share) {
  await navigator.share({ title, text, url: window.location.href });
} else {
  // Graceful fallback to WhatsApp share URL
  window.open(getWhatsAppShareUrl(text), '_blank');
}
```

### Greeting Studio Bridge
Users can click "Design Card in Studio 🎨" on any generated or library wish to immediately route to `/greeting-cards?title=...&message=...`, pre-populating the Card Customization state with the chosen wish.

---

## 6. Local Storage Favorites Model

- **Key**: `festivewala_saved_wishes`
- **Data**: JSON array of string IDs (`["wish-family-37", "wish-love-31", ...]`).
- **Resilience**: Handled via `useSavedWishes.ts` with try/catch wrapping. Corrupted JSON or disabled browser cookies safely fall back to an empty array without crashing the app.

