# Blog Translation Guide

## Overview
Your blog now supports multiple languages with automatic filtering based on the selected language.

## How It Works

### URL Structure
- English: `/blog/` (default)
- Spanish: `/blog/?lang=es`
- Portuguese: `/blog/?lang=pt-br`

### Content Filtering
When you visit `/blog/?lang=es`, you'll only see:
- Blog posts with `lang: "es"` in frontmatter
- Blog posts without a `lang` field (shown in all languages)

## Creating Multilingual Blog Posts

### Method 1: Separate Files (Recommended)

Create separate files for each language:

```
src/content/blog/
├── my-post.md          # English version
├── my-post-es.md       # Spanish version
└── my-post-pt-br.md    # Portuguese version
```

**English version** (`my-post.md`):
```markdown
---
title: "My Amazing Post"
description: "This is an amazing post about..."
pubDate: "Jun 19 2024"
image: "https://..."
authorImage: "/avatar/avatar1.png"
authorName: "John Doe"
lang: "en"
---

Content in English...
```

**Spanish version** (`my-post-es.md`):
```markdown
---
title: "Mi Publicación Increíble"
description: "Esta es una publicación increíble sobre..."
pubDate: "Jun 19 2024"
image: "https://..."
authorImage: "/avatar/avatar1.png"
authorName: "John Doe"
lang: "es"
---

Contenido en español...
```

**Portuguese version** (`my-post-pt-br.md`):
```markdown
---
title: "Minha Postagem Incrível"
description: "Esta é uma postagem incrível sobre..."
pubDate: "Jun 19 2024"
image: "https://..."
authorImage: "/avatar/avatar1.png"
authorName: "John Doe"
lang: "pt-br"
---

Conteúdo em português...
```

### Method 2: Universal Posts

For posts that should appear in ALL languages (like announcements), omit the `lang` field:

```markdown
---
title: "Important Announcement"
description: "This appears in all languages"
pubDate: "Jun 19 2024"
# No lang field = shows in all languages
---

This post will appear regardless of selected language.
```

## Blog Page UI Translations

UI elements are translated automatically from `src/i18n/translations.ts`:

```typescript
export const translations = {
  en: {
    "blog.title": "Blog",
    "blog.description": "Explore our blog...",
    "blog.minRead": "Min Read",
  },
  es: {
    "blog.title": "Blog",
    "blog.description": "Explora nuestro blog...",
    "blog.minRead": "Min de lectura",
  },
  // ...
};
```

## Examples

### Example 1: Tech Tutorial (All Languages)

Create 3 files:

**post-tutorial.md** (English):
```markdown
---
title: "Getting Started with React"
description: "Learn React basics in this tutorial"
pubDate: "Jun 19 2024"
lang: "en"
---
```

**post-tutorial-es.md** (Spanish):
```markdown
---
title: "Comenzando con React"
description: "Aprende los conceptos básicos de React"
pubDate: "Jun 19 2024"
lang: "es"
---
```

**post-tutorial-pt-br.md** (Portuguese):
```markdown
---
title: "Começando com React"
description: "Aprenda os conceitos básicos do React"
pubDate: "Jun 19 2024"
lang: "pt-br"
---
```

### Example 2: Company Announcement (Universal)

**announcement.md**:
```markdown
---
title: "We're Hiring!"
description: "Join our team"
pubDate: "Jun 19 2024"
# No lang field - appears in all languages
---
```

## File Naming Convention

Recommended naming pattern:
- English: `post-name.md`
- Spanish: `post-name-es.md`
- Portuguese: `post-name-pt-br.md`

This makes it easy to identify related posts.

## Testing

### Test Language Filtering

1. **Create test posts:**
   - `test-en.md` with `lang: "en"`
   - `test-es.md` with `lang: "es"`
   - `test-universal.md` without `lang` field

2. **Visit different URLs:**
   - `/blog/` → Should show English + Universal posts
   - `/blog/?lang=es` → Should show Spanish + Universal posts
   - `/blog/?lang=pt-br` → Should show Portuguese + Universal posts

3. **Use language switcher:**
   - Click language dropdown
   - Select Spanish
   - Verify only Spanish posts appear

## Adding New UI Translations

To add new translatable UI elements:

1. **Add to translations file** (`src/i18n/translations.ts`):
```typescript
"blog.newElement": "New Element",  // English
"blog.newElement": "Nuevo Elemento",  // Spanish
"blog.newElement": "Novo Elemento",  // Portuguese
```

2. **Use in component:**
```typescript
const t = useTranslations(currentLocale);
<span>{t('blog.newElement')}</span>
```

## Best Practices

### ✅ DO:
- Create separate files for each language version
- Use consistent naming (post-name-es.md, post-name-pt-br.md)
- Add `lang` field to all language-specific posts
- Keep same `pubDate` across translations
- Use same images across translations

### ❌ DON'T:
- Mix languages in the same file
- Forget to add `lang` field to translated posts
- Use different `pubDate` for same post in different languages
- Leave posts partially translated

## Migration Guide

### Migrating Existing Posts

If you have existing posts without `lang` field:

1. **Decide the strategy:**
   - Option A: Add `lang: "en"` to make them English-only
   - Option B: Leave without `lang` to show in all languages

2. **For English-only posts:**
```bash
# Add lang: "en" to all existing posts
```

3. **Create translations:**
```bash
# Copy post.md to post-es.md
# Translate content
# Change lang to "es"
```

## Workflow for New Posts

1. **Write in primary language** (usually English)
2. **Add `lang: "en"` to frontmatter**
3. **Publish and test**
4. **Create translations:**
   - Copy file to `post-name-es.md`
   - Translate title, description, and content
   - Change `lang: "es"`
5. **Repeat for other languages**

## SEO Considerations

For better SEO, consider:
- Using same slug structure across languages
- Adding hreflang tags (future enhancement)
- Translating meta descriptions
- Using localized images when relevant

## Future Enhancements

Possible improvements:
- Automatic translation suggestions
- Translation status tracking
- Missing translation warnings
- Language-specific categories
- Bilingual posts (side-by-side)

## Summary

✅ **Simple**: Just add `lang` field to frontmatter  
✅ **Flexible**: Universal posts or language-specific  
✅ **Clean**: Separate files per language  
✅ **Automatic**: Filtering happens automatically  
✅ **Scalable**: Easy to add more languages  

Your blog is now fully multilingual! 🌍
