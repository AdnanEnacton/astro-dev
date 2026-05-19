// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],
  output: "static",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "pt-br"],
    routing: {
      prefixDefaultLocale: false, // English won't have /en/ prefix
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
