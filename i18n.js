const LANGUAGE_KEY = "lang";
const REPERTOIRE_KEY = "maison_andresi_repertoire";

const translations = {
  fr: {
    "brand.name": "Maison Andresi",
    "nav.brand": "Maison Andresi",
    "nav.collection": "Collection",
    "nav.repertoire": "Répertoire",
    "nav.access": "Accès",
    "nav.info": "Information",
    "index.tagline": "La distinction ne s’énonce pas. Elle se dispose.",
    "index.cta": "Entrer",
    "manifesto.title": "Silence",
    "manifesto.text":
      "Quelques pièces suffisent à instaurer le rythme.\nLe reste relève du regard.",
    "manifesto.link": "Collection",
    "set.title": "Cercle Premier — Set 18 pièces",
    "set.subtitle": "Porcelaine ivoire, champ bleu profond, liseré doré fin.",
    "set.specsTitle": "Spécifications",
    "set.spec1": "Porcelaine ivoire dense",
    "set.spec2": "Champ bleu profond uniforme",
    "set.spec3": "Motif central discret",
    "set.spec4": "Liseré doré fin périphérique",
    "set.compositionTitle": "Composition du set (18 pièces)",
    "set.comp1": "6 assiettes plates — 27 cm",
    "set.comp2": "6 assiettes creuses",
    "set.comp3": "6 assiettes d’entrée — 21 cm",
    "set.priceLabel": "Valeur d’acquisition",
    "set.priceValue": "5 400 €",
    "set.add": "Ajouter au répertoire",
    "set.added": "Ajouté au répertoire",
    "set.request": "Demander l’accès",
    "repertoire.title": "Répertoire",
    "repertoire.empty": "Aucun élément n’est encore enregistré.",
    "repertoire.back": "Retour à la collection",
    "repertoire.itemTitle": "Cercle Premier — Set 18 pièces",
    "repertoire.itemDescription":
      "Ensemble complet destiné à six convives. Trois formes. Un langage.",
    "repertoire.priceLabel": "Valeur d’acquisition",
    "repertoire.priceValue": "5 400 €",
    "repertoire.request": "Demander l’accès",
    "repertoire.remove": "Retirer",
    "access.title": "Demander l’accès",
    "access.note": "Accès accordé au cas par cas.",
    "access.name": "Nom",
    "access.email": "Email",
    "access.address": "Adresse postale complète",
    "access.letter": "Je souhaite recevoir une lettre physique",
    "access.context": "Contexte d’achat",
    "access.referral": "Code de parrainage (recommandé)",
    "access.submit": "Envoyer la demande",
    "info.title": "Information",
    "info.delivery": "Livraison",
    "info.deliveryText": "Livraison sur rendez-vous, en main propre.",
    "info.lead": "Délais",
    "info.leadText": "Délais indicatifs de 6 à 8 semaines.",
    "info.contact": "Contact",
    "info.contactText": "contact@andresi.house",
    "info.legal": "Mentions légales",
    "info.legalText":
      "Maison Andresi — Maison de porcelaine contemporaine. Paris, France.",
  },
  en: {
    "brand.name": "Maison Andresi",
    "nav.brand": "Maison Andresi",
    "nav.collection": "Collection",
    "nav.repertoire": "Repertoire",
    "nav.access": "Access",
    "nav.info": "Information",
    "index.tagline": "Distinction is not spoken. It is set.",
    "index.cta": "Enter",
    "manifesto.title": "Silence",
    "manifesto.text":
      "A few pieces are enough to set the rhythm.\nThe rest belongs to the gaze.",
    "manifesto.link": "Collection",
    "set.title": "Cercle Premier — Set 18 pieces",
    "set.subtitle": "Ivory porcelain, deep blue field, fine gold line.",
    "set.specsTitle": "Specifications",
    "set.spec1": "Dense ivory porcelain",
    "set.spec2": "Deep uniform blue field",
    "set.spec3": "Discreet central motif",
    "set.spec4": "Fine peripheral gold line",
    "set.compositionTitle": "Set composition (18 pieces)",
    "set.comp1": "6 dinner plates — 27 cm",
    "set.comp2": "6 soup plates",
    "set.comp3": "6 starter plates — 21 cm",
    "set.priceLabel": "Acquisition value",
    "set.priceValue": "€5,400",
    "set.add": "Add to repertoire",
    "set.added": "Added to repertoire",
    "set.request": "Request access",
    "repertoire.title": "Repertoire",
    "repertoire.empty": "No items are recorded yet.",
    "repertoire.back": "Back to collection",
    "repertoire.itemTitle": "Cercle Premier — Set 18 pieces",
    "repertoire.itemDescription":
      "Complete ensemble for six guests. Three forms. A language.",
    "repertoire.priceLabel": "Acquisition value",
    "repertoire.priceValue": "€5,400",
    "repertoire.request": "Request access",
    "repertoire.remove": "Remove",
    "access.title": "Request access",
    "access.note": "Access granted case by case.",
    "access.name": "Name",
    "access.email": "Email",
    "access.address": "Full postal address",
    "access.letter": "I wish to receive a physical letter",
    "access.context": "Purchase context",
    "access.referral": "Referral code (recommended)",
    "access.submit": "Send request",
    "info.title": "Information",
    "info.delivery": "Delivery",
    "info.deliveryText": "Delivery by appointment, by hand.",
    "info.lead": "Lead times",
    "info.leadText": "Indicative lead time of 6 to 8 weeks.",
    "info.contact": "Contact",
    "info.contactText": "contact@andresi.house",
    "info.legal": "Legal mentions",
    "info.legalText":
      "Maison Andresi — Contemporary porcelain house. Paris, France.",
  },
};

const getQueryLang = () => {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return lang && translations[lang] ? lang : null;
};

const getNavigatorLang = () =>
  navigator.language && navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";

const resolveLanguage = () =>
  localStorage.getItem(LANGUAGE_KEY) || getQueryLang() || getNavigatorLang() || "en";

const setStoredLanguage = (lang) => {
  localStorage.setItem(LANGUAGE_KEY, lang);
};

const updateUrlLanguage = (lang) => {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url.toString());
};

const applyTranslations = (lang) => {
  const dictionary = translations[lang] || translations.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      el.setAttribute("placeholder", dictionary[key]);
    }
  });
};

const updateLanguageSwitcher = (lang) => {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
};

const updateLinks = (lang) => {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }
    if (href.startsWith("http://") || href.startsWith("https://")) {
      return;
    }
    const url = new URL(href, window.location.origin);
    url.searchParams.set("lang", lang);
    link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
  });
};

const initLanguage = () => {
  const initialLang = resolveLanguage();
  setStoredLanguage(initialLang);
  applyTranslations(initialLang);
  updateLanguageSwitcher(initialLang);
  updateLinks(initialLang);
  updateUrlLanguage(initialLang);

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.lang;
      setStoredLanguage(lang);
      applyTranslations(lang);
      updateLanguageSwitcher(lang);
      updateLinks(lang);
      updateUrlLanguage(lang);
      updateButtonState();
      updateRepertoireView();
    });
  });
};

const getRepertoire = () => {
  const stored = localStorage.getItem(REPERTOIRE_KEY);
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch (error) {
    return [];
  }
};

const saveRepertoire = (items) => {
  localStorage.setItem(REPERTOIRE_KEY, JSON.stringify({ items }));
};

const updateButtonState = () => {
  const addButton = document.querySelector("[data-action='add-repertoire']");
  if (!addButton) return;

  const lang = resolveLanguage();
  const dictionary = translations[lang] || translations.en;
  const itemId = addButton.dataset.itemId;
  const items = getRepertoire();
  const isAdded = items.includes(itemId);
  const labelKey = isAdded ? addButton.dataset.i18nAdded : addButton.dataset.i18n;

  if (labelKey && dictionary[labelKey]) {
    addButton.textContent = dictionary[labelKey];
  }
  addButton.disabled = isAdded;
};

const initCollectionPage = () => {
  const addButton = document.querySelector("[data-action='add-repertoire']");
  if (!addButton) return;

  updateButtonState();

  addButton.addEventListener("click", () => {
    const itemId = addButton.dataset.itemId;
    if (!itemId) return;
    const items = getRepertoire();
    if (!items.includes(itemId)) {
      items.push(itemId);
      saveRepertoire(items);
      updateButtonState();
    }
  });
};

const updateRepertoireView = () => {
  const itemEl = document.querySelector("[data-repertoire-item]");
  const emptyEl = document.querySelector("[data-repertoire-empty]");
  const priceEl = document.querySelector("[data-repertoire-price]");
  const actionsEl = document.querySelector("[data-repertoire-actions]");

  if (!itemEl || !emptyEl) return;

  const items = getRepertoire();
  const hasItem = items.includes("cercle-premier");

  itemEl.hidden = !hasItem;
  emptyEl.hidden = hasItem;

  if (priceEl) {
    priceEl.hidden = !hasItem;
  }
  if (actionsEl) {
    actionsEl.hidden = !hasItem;
  }
};

const initRepertoirePage = () => {
  const removeButton = document.querySelector("[data-action='remove-repertoire']");

  updateRepertoireView();

  if (removeButton) {
    removeButton.addEventListener("click", () => {
      saveRepertoire([]);
      updateRepertoireView();
    });
  }
};

const handleReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!prefersReducedMotion.matches) return;

  document.documentElement.classList.add("reduced-motion");
  const landingVideo = document.querySelector("[data-landing-video]");
  if (landingVideo) {
    landingVideo.pause();
    landingVideo.removeAttribute("autoplay");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initCollectionPage();
  initRepertoirePage();
  handleReducedMotion();
});
