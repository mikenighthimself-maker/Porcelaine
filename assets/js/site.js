const LANG_KEY = "lang";
const LANGUAGE_PATHS = {
  en: {
    "index.html": "index.html",
    "manifesto.html": "manifesto.html",
    "collections.html": "collections.html",
    "information.html": "information.html",
  },
  fr: {
    "index.html": "index.html",
    "manifesto.html": "manifeste.html",
    "manifeste.html": "manifeste.html",
    "collections.html": "collections.html",
    "information.html": "informations.html",
    "informations.html": "informations.html",
  },
};

const getNavigatorLang = () =>
  navigator.language && navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";

const getStoredLang = () => localStorage.getItem(LANG_KEY);

const getCurrentLang = () => {
  const path = window.location.pathname;
  if (path.startsWith("/fr/")) return "fr";
  if (path.startsWith("/en/")) return "en";
  return null;
};

const getCurrentFile = () => {
  const segments = window.location.pathname.split("/");
  return segments[segments.length - 1] || "index.html";
};

const buildPath = (lang, file) => `/${lang}/${file}`;

const resolveTargetPath = (lang) => {
  const file = getCurrentFile();
  const mapping = LANGUAGE_PATHS[lang] || {};
  const targetFile = mapping[file] || LANGUAGE_PATHS[lang]["index.html"];
  return buildPath(lang, targetFile);
};

const applyLangState = (lang) => {
  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
};

const handleLanguageRedirect = () => {
  const stored = getStoredLang();
  const preferred = stored || getNavigatorLang();
  const current = getCurrentLang();

  if (current && preferred !== current) {
    window.location.replace(resolveTargetPath(preferred));
    return;
  }

  if (!stored) {
    localStorage.setItem(LANG_KEY, preferred);
  }

  applyLangState(current || preferred);
};

const handleLanguageToggle = () => {
  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetLang = button.dataset.lang;
      localStorage.setItem(LANG_KEY, targetLang);
      window.location.href = resolveTargetPath(targetLang);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  handleLanguageRedirect();
  handleLanguageToggle();
});
