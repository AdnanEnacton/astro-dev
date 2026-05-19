# Simple i18n Implementation Guide

## Overview
A clean, single-file approach to internationalization using query parameters.

## How It Works

### URL Structure (Simple!)
- English: `/test/` (default, no parameter)
- Spanish: `/test/?lang=es`
- Portuguese: `/test/?lang=pt-br`

**No separate folders needed!** All translations are in one file.

## File Structure

```
src/
├── i18n/
│   └── translations.ts          # ALL translations in one place
├── middleware.ts                # Auto-detects browser language
├── components/
│   └── language-switcher.tsx   # Language dropdown
└── pages/
    └── test/
        └── index.astro          # Single file for all languages
```

## Adding Translations

### 1. Add to translations file (`src/i18n/translations.ts`)

```typescript
export const translations = {
  en: {
    "test.title": "Test",
    "test.description": "This is the data...",
    "test.allButton": "All",
  },
  es: {
    "test.title": "Pruebas",
    "test.description": "Estos son los datos...",
    "test.allButton": "Todos",
  },
  "pt-br": {
    "test.title": "Testes",
    "test.description": "Estes são os dados...",
    "test.allButton": "Todos",
  },
};
```

### 2. Use in your page

```astro
---
import { useTranslations, type Locale } from '@/i18n/translations';

// Get language from URL or browser
const urlLocale = Astro.url.searchParams.get('lang') as Locale;
const currentLocale: Locale = urlLocale || Astro.preferredLocale || 'en';

// Get translations
const t = useTranslations(currentLocale);
---

<h1>{t('test.title')}</h1>
<p>{t('test.description')}</p>
```

## Adding Language Switcher

Add to your navbar or any component:

```astro
---
import { LanguageSwitcher } from '@/components/language-switcher';

const urlLocale = Astro.url.searchParams.get('lang');
const currentLocale = urlLocale || 'en';
---

<LanguageSwitcher currentLocale={currentLocale} client:load />
```

## Browser Detection

The middleware automatically detects the user's browser language on first visit:
- Spanish browser → Redirects to `?lang=es`
- Portuguese browser → Redirects to `?lang=pt-br`
- English browser → Stays at default URL

## Adding a New Language

1. **Add to translations.ts:**
```typescript
export const translations = {
  en: { /* ... */ },
  es: { /* ... */ },
  "pt-br": { /* ... */ },
  fr: {  // Add French
    "test.title": "Test",
    // ... add all translations
  },
};
```

2. **Add to language switcher:**
```typescript
const languages = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
  "pt-br": { name: "Português", flag: "🇧🇷" },
  fr: { name: "Français", flag: "🇫🇷" },  // Add this
};
```

3. **Update middleware:**
```typescript
const supportedLocales = ["es", "pt-br", "fr"];  // Add "fr"
```

Done! No new folders or files needed.

## Benefits of This Approach

✅ **Simple** - All translations in one file  
✅ **Clean URLs** - No `/es/` or `/pt-br/` prefixes  
✅ **Single page file** - No duplicate pages per language  
✅ **Easy to maintain** - Change one file, not multiple  
✅ **Browser detection** - Automatic language detection  
✅ **SEO friendly** - Can add hreflang tags easily  

## Testing

1. **Test language switcher:**
   - Click the language dropdown
   - Select a language
   - URL updates with `?lang=es`
   - Content changes

2. **Test browser detection:**
   - Change browser language settings
   - Visit `/test/` (without lang parameter)
   - Should redirect to your browser's language

3. **Test direct URLs:**
   - `/test/` → English
   - `/test/?lang=es` → Spanish
   - `/test/?lang=pt-br` → Portuguese

## Example: Adding to Another Page

```astro
---
// src/pages/about.astro
import { useTranslations, type Locale } from '@/i18n/translations';

const urlLocale = Astro.url.searchParams.get('lang') as Locale;
const currentLocale: Locale = urlLocale || 'en';
const t = useTranslations(currentLocale);
---

<h1>{t('about.title')}</h1>
<p>{t('about.description')}</p>
```

Then add to `translations.ts`:
```typescript
"about.title": "About Us",
"about.description": "Learn more about us",
```

That's it! Much simpler than separate folders. 🎉
