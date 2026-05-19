import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  currentLocale: string;
  currentPath?: string;
}

const languages = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
  "pt-br": { name: "Português", flag: "🇧🇷" },
};

export function LanguageSwitcher({ currentLocale, currentPath = "" }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (locale: string) => {
    // Get current path without locale
    let path = currentPath || window.location.pathname;

    // Remove any existing locale from path
    Object.keys(languages).forEach((loc) => {
      if (path.startsWith(`/${loc}/`)) {
        path = path.replace(`/${loc}`, "");
      }
    });

    // Build new URL
    let newUrl;
    if (locale === "en") {
      // English uses root path (no locale prefix)
      newUrl = path || "/";
    } else {
      // Other languages use /{locale}/path
      newUrl = `/${locale}${path}`;
    }

    window.location.href = newUrl;
  };

  const currentLang = languages[currentLocale as keyof typeof languages] || languages.en;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <span>{currentLang.flag}</span>
          <span className="hidden sm:inline">{currentLang.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([locale, lang]) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`flex items-center gap-2 cursor-pointer ${locale === currentLocale ? "font-semibold" : ""
              }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
