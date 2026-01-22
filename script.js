const LANGUAGE_KEY = "maison_andresi_lang";
const REPERTOIRE_KEY = "maison_andresi_repertoire";

const translations = {
  fr: {
    "index.title": "Maison Andresi",
    "index.tagline": "La distinction ne s’énonce pas. Elle se dispose.",
    "index.cta": "Entrer",
    "silence.title": "Silence",
    "silence.text":
      "Quelques pièces suffisent à instaurer le rythme.\nLe reste relève du regard.",
    "silence.link": "Collection",
    "collection.title": "Cercle Premier",
    "collection.subtitle": "Set de 18 pièces",
    "collection.specsTitle": "Spécifications",
    "collection.spec1": "Porcelaine ivoire dense",
    "collection.spec2": "Champ bleu profond uniforme",
    "collection.spec3": "Motif central discret",
    "collection.spec4": "Liseré doré fin périphérique",
    "collection.compositionTitle": "Composition du set (18 pièces)",
    "collection.comp1": "6 assiettes plates — 27 cm",
    "collection.comp2": "6 assiettes creuses",
    "collection.comp3": "6 assiettes d’entrée — 21 cm",
    "collection.price": "Valeur d’acquisition : 5 400 €",
    "collection.add": "Ajouter au répertoire",
    "collection.added": "Ajouté au répertoire",
    "collection.request": "Demander l’accès",
    "repertoire.title": "Répertoire",
    "repertoire.empty": "Aucun élément n’est encore enregistré.",
    "repertoire.itemTitle": "Cercle Premier — Set de 18 pièces",
    "repertoire.itemDescription":
      "Ensemble complet destiné à six convives. Trois formes. Un langage.",
    "repertoire.remove": "Retirer",
    "repertoire.request": "Demander l’accès",
    "access.title": "Demander l’accès",
    "access.intro":
      "Une demande permet d’ouvrir un échange sobre et personnalisé.",
    "access.name": "Nom",
    "access.firstname": "Prénom",
    "access.email": "Email",
    "access.phone": "Téléphone",
    "access.message": "Motif de la demande",
    "access.submit": "Envoyer la demande",
    "footer.collection": "Collection",
    "footer.repertoire": "Répertoire",
    "footer.access": "Accès",
  },
  en: {
    "index.title": "Maison Andresi",
    "index.tagline": "Distinction is not spoken. It is set.",
    "index.cta": "Enter",
    "silence.title": "Silence",
    "silence.text": "A few pieces are enough to set the rhythm.\nThe rest belongs to the gaze.",
    "silence.link": "Collection",
    "collection.title": "Cercle Premier",
    "collection.subtitle": "Set of 18 pieces",
    "collection.specsTitle": "Specifications",
    "collection.spec1": "Dense ivory porcelain",
    "collection.spec2": "Deep uniform blue field",
    "collection.spec3": "Discreet central motif",
    "collection.spec4": "Fine peripheral gold line",
    "collection.compositionTitle": "Set composition (18 pieces)",
    "collection.comp1": "6 dinner plates — 27 cm",
    "collection.comp2": "6 soup plates",
    "collection.comp3": "6 starter plates — 21 cm",
    "collection.price": "Acquisition value: €5,400",
    "collection.add": "Add to repertoire",
    "collection.added": "Added to repertoire",
    "collection.request": "Request access",
    "repertoire.title": "Repertoire",
    "repertoire.empty": "No items are recorded yet.",
    "repertoire.itemTitle": "Cercle Premier — Set of 18 pieces",
    "repertoire.itemDescription":
      "Complete ensemble for six guests. Three forms. A language.",
    "repertoire.remove": "Remove",
    "repertoire.request": "Request access",
    "access.title": "Request access",
    "access.intro": "A request opens a discreet, personal exchange.",
    "access.name": "Last name",
    "access.firstname": "First name",
    "access.email": "Email",
    "access.phone": "Phone",
    "access.message": "Reason for request",
    "access.submit": "Send request",
    "footer.collection": "Collection",
    "footer.repertoire": "Repertoire",
    "footer.access": "Access",
  },
};

const getStoredLanguage = () => localStorage.getItem(LANGUAGE_KEY) || "fr";

const setStoredLanguage = (lang) => {
  localStorage.setItem(LANGUAGE_KEY, lang);
};

const applyTranslations = (lang) => {
  const dictionary = translations[lang] || translations.fr;
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

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    if (dictionary[key]) {
      el.setAttribute("aria-label", dictionary[key]);
    }
  });
};

const updateLanguageSwitcher = (lang) => {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
};

const initLanguage = () => {
  const initialLang = getStoredLanguage();
  applyTranslations(initialLang);
  updateLanguageSwitcher(initialLang);

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.lang;
      setStoredLanguage(lang);
      applyTranslations(lang);
      updateLanguageSwitcher(lang);
      updateButtonState();
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

  const lang = getStoredLanguage();
  const dictionary = translations[lang] || translations.fr;
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

const initRepertoirePage = () => {
  const itemEl = document.querySelector("[data-repertoire-item]");
  const emptyEl = document.querySelector("[data-repertoire-empty]");
  const removeButton = document.querySelector("[data-action='remove-repertoire']");

  if (!itemEl || !emptyEl) return;

  const items = getRepertoire();
  const hasItem = items.includes("cercle-premier");

  itemEl.hidden = !hasItem;
  emptyEl.hidden = hasItem;

  if (removeButton) {
    removeButton.addEventListener("click", () => {
      saveRepertoire([]);
      itemEl.hidden = true;
      emptyEl.hidden = false;
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initCollectionPage();
  initRepertoirePage();
});
