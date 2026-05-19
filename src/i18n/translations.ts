export const translations = {
  en: {
    // Test Page
    "test.title": "Test",
    "test.description": "This is the data of the testing site yooooo yaahuuuuu",
    "test.allButton": "All",
    "test.minRead": "Min Read",
    
    // Blog Page
    "blog.title": "Blog",
    "blog.description": "Explore our blog for insightful articles, personal reflections and more.",
    "blog.minRead": "Min Read",
    "blog.readMore": "Read More",
    "blog.allPosts": "All Posts",
    
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.blog": "Blog",
    "nav.test": "Test",
    "nav.contact": "Contact",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
  },
  es: {
    // Test Page
    "test.title": "Pruebas",
    "test.description": "Estos son los datos del sitio de pruebas",
    "test.allButton": "Todos",
    "test.minRead": "Min de lectura",
    
    // Blog Page
    "blog.title": "Blog",
    "blog.description": "Explora nuestro blog para artículos perspicaces, reflexiones personales y más.",
    "blog.minRead": "Min de lectura",
    "blog.readMore": "Leer más",
    "blog.allPosts": "Todas las publicaciones",
    
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.blog": "Blog",
    "nav.test": "Pruebas",
    "nav.contact": "Contacto",
    "nav.pricing": "Precios",
    "nav.faq": "Preguntas frecuentes",
    "nav.login": "Iniciar sesión",
    "nav.signup": "Registrarse",
  },
  "pt-br": {
    // Test Page
    "test.title": "Testes",
    "test.description": "Estes são os dados do site de testes",
    "test.allButton": "Todos",
    "test.minRead": "Min de leitura",
    
    // Blog Page
    "blog.title": "Blog",
    "blog.description": "Explore nosso blog para artigos perspicazes, reflexões pessoais e muito mais.",
    "blog.minRead": "Min de leitura",
    "blog.readMore": "Leia mais",
    "blog.allPosts": "Todas as postagens",
    
    // Navigation
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.blog": "Blog",
    "nav.test": "Testes",
    "nav.contact": "Contato",
    "nav.pricing": "Preços",
    "nav.faq": "Perguntas frequentes",
    "nav.login": "Entrar",
    "nav.signup": "Cadastrar",
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function useTranslations(locale: Locale = "en") {
  return (key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key];
  };
}

export const defaultLocale: Locale = "en";
export const locales = Object.keys(translations) as Locale[];
