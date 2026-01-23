const LANG_KEY = "lang";
const LANGUAGE_PATHS = {
  en: {
    "home.html": "home.html",
    "index.html": "home.html",
    "manifesto.html": "manifesto.html",
    "collections.html": "collections.html",
    "information.html": "information.html",
    "repertoire.html": "repertoire.html",
  },
  fr: {
    "home.html": "home.html",
    "index.html": "home.html",
    "manifesto.html": "manifeste.html",
    "manifeste.html": "manifeste.html",
    "collections.html": "collections.html",
    "information.html": "informations.html",
    "informations.html": "informations.html",
    "repertoire.html": "repertoire.html",
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
  return segments[segments.length - 1] || "home.html";
};

const buildPath = (lang, file) => `/${lang}/${file}`;

const resolveTargetPath = (lang) => {
  const file = getCurrentFile();
  const mapping = LANGUAGE_PATHS[lang] || {};
  const targetFile = mapping[file] || LANGUAGE_PATHS[lang]["home.html"];
  return buildPath(lang, targetFile);
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
};

const applyActiveNavLink = () => {
  const currentFile = getCurrentFile();
  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkUrl = new URL(href, window.location.origin);
    const linkFile = linkUrl.pathname.split("/").pop() || "home.html";
    link.classList.toggle("active", linkFile === currentFile);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  handleLanguageRedirect();
  applyActiveNavLink();
});
