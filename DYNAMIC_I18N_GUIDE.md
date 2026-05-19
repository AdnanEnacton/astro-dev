# Dynamic i18n Routing Guide

## Overview
Using Astro's dynamic routing with `[locale]` parameter for clean, maintainable internationalization.

## File Structure

```
src/pages/
├── test/
│   └── index.astro              # English (default): /test/
├── blog/
│   └── index.astro              # English (default): /blog/
└── [locale]/
    ├── test/
    │   └── index.astro          # Dynamic: /es/test/, /pt-br/test/
    └── blog/
        └── index.astro          # Dynamic: /es/blog/, /pt-br/blog/
```

## URL Structure

### English (Default)
- `/test/` - Test page
- `/blog/` - Blog page
- `/about/` - About page

### Spanish
- `/es/test/` - Test page
- `/es/blog/` - Blog page
- `/es/about/` - About page

### Portuguese
- `/pt-br/test/` - Test page
- `/pt-br/blog/` - Blog page
- `/pt-br/about/` - About page

## How It Works

### 1. Dynamic Route File

**One file handles all locales:**

```astro
---
// src/pages/[locale]/test/index.astro
import { useTranslations, type Locale, locales } from '@/i18n/translations';

// Generate static paths for all locales
export async function getStaticPaths() {
  return locales.map((locale) => ({
    params: { locale },
  }));
}

// Get locale from URL
const { locale } = Astro.params;
const currentLocale = locale as Locale;

// Get translations
const t = useTranslations(currentLocale);
---

<h1>{t('test.title')}</h1>
```

### 2. Translations File

**All translations in one place:**

```typescript
// src/i18n/translations.ts
export const translations = {
  en: {
    "test.title": "Test",
  },
  es: {
    "test.title": "Pruebas",
  },
  "pt-br": {
    "test.title": "Testes",
  },
};

export const locales = ["en", "es", "pt-br"];
```

### 3. Browser Detection

**Middleware redirects based on browser language:**

```typescript
// src/middleware.ts
if (browserLocale === "es") {
  redirect("/es/test/");
}
```

## Adding a New Page

### Step 1: Create English Version

```astro
// src/pages/about.astro
---
import { useTranslations } from '@/i18n/translations';
const t = useTranslations('en');
---

<h1>{t('about.title')}</h1>
```

### Step 2: Create Dynamic Locale Version

```astro
// src/pages/[locale]/about.astro
---
import { useTranslations, type Locale, locales } from '@/i18n/translations';

export async function getStaticPaths() {
  return locales.map((locale) => ({
    params: { locale },
  }));
}

const { locale } = Astro.params;
const currentLocale = locale as Locale;
const t = useTranslations(currentLocale);
---

<h1>{t('about.title')}</h1>
```

### Step 3: Add Translations

```typescript
// src/i18n/translations.ts
export const translations = {
  en: {
    "about.title": "About Us",
  },
  es: {
    "about.title": "Acerca de",
  },
  "pt-br": {
    "about.title": "Sobre",
  },
};
```

## Benefits

✅ **One file per page** - Not 3 files per language  
✅ **DRY principle** - Don't repeat yourself  
✅ **Easy maintenance** - Update logic in one place  
✅ **Type-safe** - TypeScript support  
✅ **Scalable** - Add languages easily  
✅ **Clean URLs** - `/es/test/` instead of `/test/?lang=es`  

## Language Switcher

```astro
---
import { LanguageSwitcher } from '@/components/language-switcher';

const currentLocale = Astro.params.locale || 'en';
---

<LanguageSwitcher 
  currentLocale={currentLocale} 
  currentPath={Astro.url.pathname}
  client:load 
/>
```

## Adding a New Language

### 1. Add to translations

```typescript
// src/i18n/translations.ts
export const translations = {
  en: { /* ... */ },
  es: { /* ... */ },
  "pt-br": { /* ... */ },
  fr: {  // Add French
    "test.title": "Test",
    // ... all translations
  },
};

export const locales = ["en", "es", "pt-br", "fr"];
```

### 2. Add to Astro config

```javascript
// astro.config.mjs
i18n: {
  locales: ["en", "es", "pt-br", "fr"],
  defaultLocale: "en",
}
```

### 3. Add to language switcher

```typescript
const languages = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
  "pt-br": { name: "Português", flag: "🇧🇷" },
  fr: { name: "Français", flag: "🇫🇷" },
};
```

### 4. Update middleware

```typescript
const supportedLocales = ["es", "pt-br", "fr"];
```

That's it! The dynamic route automatically handles the new language.

## Comparison

### Old Approach (Separate Folders)
```
src/pages/
├── test/index.astro
├── es/test/index.astro
├── pt-br/test/index.astro
└── fr/test/index.astro
```
❌ 4 files to maintain  
❌ Duplicate logic  
❌ Hard to keep in sync  

### New Approach (Dynamic Routing)
```
src/pages/
├── test/index.astro
└── [locale]/test/index.astro
```
✅ 2 files total  
✅ Single source of truth  
✅ Easy to maintain  

## Testing

1. **Visit English version:**
   - Go to `/test/`
   - Should show English content

2. **Visit Spanish version:**
   - Go to `/es/test/`
   - Should show Spanish content

3. **Test language switcher:**
   - Click language dropdown
   - Select Spanish
   - URL changes to `/es/test/`

4. **Test browser detection:**
   - Change browser language to Spanish
   - Visit `/test/`
   - Should redirect to `/es/test/`

## Summary

Dynamic routing with `[locale]` gives you:
- **Cleaner code** - One file instead of many
- **Better URLs** - `/es/test/` instead of query params
- **Easier maintenance** - Update once, works everywhere
- **Full i18n support** - All Astro i18n features available

This is the recommended approach for Astro i18n! 🚀
