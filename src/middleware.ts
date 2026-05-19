import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, preferredLocale, redirect } = context;

  // Redirect root to appropriate locale
  if (url.pathname === "/") {
    const browserLocale = preferredLocale;
    const supportedLocales = ["es", "pt-br"];
    
    // Only redirect if browser locale is not English
    if (browserLocale && supportedLocales.includes(browserLocale)) {
      return redirect(`/${browserLocale}/`);
    }
    // English users stay at root
  }

  return next();
});
