const REPERTOIRE_KEY = "porcelaineRepertoire";
const DEFAULT_ITEM = {
  id: "set-reception-18",
  title: "Set de réception, 18 pièces",
  description: "Ensemble clos destiné à six convives. Trois formes. Un langage.",
};

const saveRepertoire = (item) => {
  localStorage.setItem(REPERTOIRE_KEY, JSON.stringify(item));
};

const getRepertoire = () => {
  const stored = localStorage.getItem(REPERTOIRE_KEY);
  if (!stored) {
    return null;
  }
  try {
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return {
      id: parsed.id || DEFAULT_ITEM.id,
      title: parsed.title || DEFAULT_ITEM.title,
      description: parsed.description || DEFAULT_ITEM.description,
    };
  } catch (error) {
    return null;
  }
};

const getButtonLabels = (button) => {
  return {
    add: button?.dataset.labelAdd || "Ajouter au répertoire",
    added: button?.dataset.labelAdded || "Ajouté au répertoire",
  };
};

const getItemFromButton = (button) => {
  if (!button) {
    return DEFAULT_ITEM;
  }
  return {
    id: button.dataset.itemId || DEFAULT_ITEM.id,
    title: button.dataset.itemTitle || DEFAULT_ITEM.title,
    description: button.dataset.itemDescription || DEFAULT_ITEM.description,
  };
};

const updateButtonState = (button, storedItem) => {
  if (!button) return;
  const labels = getButtonLabels(button);
  const isAdded = Boolean(storedItem);
  button.textContent = isAdded ? labels.added : labels.add;
  button.disabled = isAdded;
};

const initSetPage = () => {
  const addButton = document.querySelector("[data-action='add-repertoire']");
  if (!addButton) return;

  const stored = getRepertoire();
  updateButtonState(addButton, stored);

  addButton.addEventListener("click", () => {
    const item = getItemFromButton(addButton);
    saveRepertoire(item);
    updateButtonState(addButton, item);
  });
};

const initRepertoirePage = () => {
  const itemEl = document.querySelector("[data-repertoire-item]");
  const titleEl = document.querySelector("[data-repertoire-title]");
  const descriptionEl = document.querySelector("[data-repertoire-description]");
  const emptyEl = document.querySelector("[data-repertoire-empty]");

  const stored = getRepertoire();
  if (!stored) {
    if (emptyEl) {
      emptyEl.hidden = false;
    }
    if (itemEl) {
      itemEl.hidden = true;
    }
    return;
  }

  if (emptyEl) {
    emptyEl.hidden = true;
  }
  if (itemEl) {
    itemEl.hidden = false;
  }
  if (titleEl) titleEl.textContent = stored.title;
  if (descriptionEl) descriptionEl.textContent = stored.description;
};

document.addEventListener("DOMContentLoaded", () => {
  initSetPage();
  initRepertoirePage();
});
