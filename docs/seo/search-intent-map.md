# FestiveWala — Search Intent Classification & Mapping Framework

**Brand:** FestiveWala  
**Domain:** `festivewala.in`  
**Framework:** Intent-Driven Trilingual Search Architecture  
**Date:** November 2026  
**Auditor:** Senior Search Strategist & Information Architect  

---

## 1. The Four Pillars of Festival Search Intent

Search intent represents the fundamental objective a user seeks to accomplish when submitting a query to Google. In festival celebration contexts, search intent is deeply emotional, time-sensitive, and actionable.

FestiveWala categorizes all target keywords into four primary search intent profiles:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FESTIVAL SEARCH INTENTS                         │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 1. INFORMATIONAL  │ 2. INSPIRATIONAL  │ 3. COMMERCIAL / ACTION         │
│ (Learn & Prepare) │ (Discover & Feel) │ (Create, Customize & Gift)     │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ Auspicious dates, │ Ready wishes,     │ Photo greeting cards,          │
│ puja timings,     │ rangoli patterns, │ budget gifts, customized       │
│ rituals, recipes  │ home decor ideas  │ name messages                  │
├───────────────────┴───────────────────┴────────────────────────────────┤
│ 4. NAVIGATIONAL (Brand Discovery: "FestiveWala", "FestiveWala Wishes") │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Intent Deep-Dive & User Expectation Analysis

### 2.1 Informational Intent (Learn, Understand, Prepare)
- **User Mindset:** "I need to know *when* the festival is, *how* to perform the puja correctly, what ingredients are needed for traditional recipes, or how to clean my home."
- **Query Patterns:**
  - English: *"Diwali 2026 date and Lakshmi Puja muhurat"*, *"How to make herbal holi colors at home"*
  - Hindi: *"दिवाली २०२६ कब है और लक्ष्मी पूजन का शुभ मुहूर्त"*, *"होलिका दहन का महत्व और कथा"*
  - Hinglish: *"Diwali 2026 kab hai aur puja muhurat kya hai"*, *"Natural herbal gulal ghar par kaise banaye"*
- **User Expectations:**
  - Accurate, verified calendar dates and tithis.
  - Step-by-step ceremonial guidance (Puja vidhi).
  - Clear checklists (materials needed, safety precautions).
  - Direct answers without fluff or misleading astrological claims.
- **FestiveWala Mapping:**
  - Dedicated festival pages: [`/festivals/:festivalId`](file:///d:/FestiveWala/src/pages/FestivalDetailPage.tsx)
  - Detailed guides: [`/festival-guides/:guideId`](file:///d:/FestiveWala/src/pages/FestivalGuidesPage.tsx)

### 2.2 Inspirational Intent (Discover, Browse, Feel)
- **User Mindset:** "I want ideas, aesthetic inspiration, or heartfelt words to express my feelings to family and friends."
- **Query Patterns:**
  - English: *"Diwali wishes and messages for family"*, *"Diwali rangoli designs simple and easy"*
  - Hindi: *"दिवाली की शुभकामनाएं और बधाई संदेश"*, *"दिवाली रंगोली डिजाइन सरल और सुंदर"*
  - Hinglish: *"Diwali ki hardik shubhkamnaye messages"*, *"Diwali rangoli design simple aur sundar"*
- **User Expectations:**
  - Emotionally resonant, high-quality, non-cliché messages.
  - Visual examples (vector Rangoli previews, decor photos).
  - Categorization by relationship (parents, partner, friends, colleagues).
  - One-click actions (copy to clipboard, share directly to WhatsApp).
- **FestiveWala Mapping:**
  - Wishes Hub: [`/wishes`](file:///d:/FestiveWala/src/pages/WishesPreviewPage.tsx)
  - Rangoli Gallery: [`/rangoli`](file:///d:/FestiveWala/src/pages/RangoliPage.tsx)
  - Decoration Ideas: [`/decoration-ideas`](file:///d:/FestiveWala/src/pages/DecorationsPage.tsx)

### 2.3 Commercial Investigation & Action Intent (Create, Personalize, Buy)
- **User Mindset:** "I want to create a personalized card with my family photo, buy a thoughtful festive gift within my budget, or generate a customized message with my name."
- **Query Patterns:**
  - English: *"Online photo greeting card maker with name for WhatsApp"*, *"Diwali gift ideas for family under 1000"*
  - Hindi: *"अपनी फोटो वाला त्योहार ग्रीटिंग कार्ड बनाएं"*, *"राखी पर बहन को क्या गिफ्ट दें बजट में"*
  - Hinglish: *"Photo wala Diwali greeting card kaise banaye"*, *"Rakhi par sister ke liye best gift ideas"*
- **User Expectations:**
  - Instant client-side tool access (no mandatory login, no paywalls).
  - High aesthetic quality (luxury gold frames, elegant typography).
  - Thoughtful gift recommendations with clear budget filtering (Under ₹250 to ₹2,500+).
  - Instant high-resolution export for social sharing.
- **FestiveWala Mapping:**
  - Greeting Card Studio: [`/greeting-cards`](file:///d:/FestiveWala/src/pages/GreetingCardsPreviewPage.tsx) (`?mode=simple` & `?mode=photo`)
  - Gift Ideas Hub: [`/gift-ideas`](file:///d:/FestiveWala/src/pages/GiftIdeasPage.tsx)

### 2.4 Navigational Intent (Brand Discovery)
- **User Mindset:** "Take me directly to FestiveWala or a specific FestiveWala tool."
- **Query Patterns:** *"FestiveWala"*, *"FestiveWala festival greetings"*, *"FestiveWala photo wishes studio"*
- **User Expectations:** Instant homepage or direct tool landing with clear brand identity and quick navigation.
- **FestiveWala Mapping:** [`/`](file:///d:/FestiveWala/src/pages/HomePage.tsx)

---

## 3. Principles for Preventing Thin & Duplicate Pages

A frequent search engine penalty in the festival greeting niche arises from creating hundreds of near-identical pages for subtle transliteration variations (e.g., creating separate pages for *"Diwali wishes"*, *"Diwali greetings"*, *"Deepavali wishes"*, and *"Diwali shubhkamnaye"*).

FestiveWala strictly enforces the **Consolidated Authority Rule**:

1. **One Authoritative Destination per Intent Cluster:**
   - All variations of Diwali wishes in English, Hindi, and Hinglish map to [`/wishes`](file:///d:/FestiveWala/src/pages/WishesPreviewPage.tsx) (or the dedicated `/wishes/diwali/` sub-page in Phase 7.2 architecture).
   - In-page language switchers and trilingual filters allow users to consume content in their preferred script without fragmenting link equity.
2. **Natural In-Page Linguistic Synthesis:**
   - Content clusters naturally include Hindi Devanagari headings, English explanatory copy, and Roman Hindi search tags where contextually relevant.
3. **Dedicated Language URLs Only When Supported by Complete Native Content:**
   - Separate language URLs (e.g. `/hi/festivals/diwali`) are only deployed when the entire document, interface, and navigation are 100% translated into fluent native Devanagari, supported by bidirectional `hreflang` tags.

