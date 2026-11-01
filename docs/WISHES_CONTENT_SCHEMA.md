# FestiveWala — Wishes Content Schema & Architecture (Phase 4.2)

## 1. Data Model Definition (`WishMessage`)
Every message in the 300-wish library complies with the strict TypeScript schema defined in `src/data/types.ts`:

```typescript
export interface WishMessage {
  id: string;                    // Unique stable identifier (e.g. 'wish-family-12')
  festivalId: string;            // Festival identifier (e.g. 'diwali')
  category:                      // Functional category slug
    | 'family'
    | 'friends'
    | 'love'
    | 'professional'
    | 'funny'
    | 'emotional'
    | 'short'
    | 'traditional'
    | 'captions'
    | 'business'
    | 'sacred';
  categoryLabelEn: string;       // Display category in English
  categoryLabelHi: string;       // Display category in Hindi
  headlineEn?: string;           // Optional editorial headline in English
  headlineHi?: string;           // Optional editorial headline in Hindi
  shloka?: string;               // Optional Sanskrit shloka (Vedic/Traditional)
  meaningEn?: string;            // English translation/meaning of shloka
  meaningHi?: string;            // Hindi translation/meaning of shloka
  textEn: string;                // Primary message copy in English
  textHi: string;                // Primary message copy in Hindi
  authorOrSourceEn?: string;     // Source/scriptural attribution in English
  authorOrSourceHi?: string;     // Source/scriptural attribution in Hindi
  tags?: string[];               // Search and indexing keywords
}
```

---

## 2. Directory & Modular Organization
The wishes dataset is modularized under `src/data/wishes/` to ensure lightning-fast Vite compilation and clean tree-shaking:

```
src/data/
├── types.ts                    # Core interface definitions
├── wishes.ts                   # Master aggregator: WISHES_DATA (300 items)
└── wishes/
    ├── family.ts               # 36 Family messages
    ├── friends.ts              # 36 Friends messages
    ├── love.ts                 # 30 Love & Romantic messages
    ├── professional.ts         # 30 Professional messages
    ├── funny.ts                # 24 Funny messages
    ├── emotional.ts            # 30 Emotional messages
    ├── short.ts                # 36 Short & Sweet messages
    ├── traditional.ts          # 30 Traditional & Sacred messages
    ├── captions.ts             # 24 Social Media Captions
    └── business.ts             # 24 Business & Customer messages
```
