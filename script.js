const REPERTOIRE_KEY = "porcelaineRepertoire";

const saveRepertoire = (itemId) => {
  localStorage.setItem(REPERTOIRE_KEY, JSON.stringify({ id: itemId }));
};

const getRepertoire = () => {
  const stored = localStorage.getItem(REPERTOIRE_KEY);
  if (!stored) {
    return null;
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    return null;
  }
};

const updateButtonState = (button, isAdded) => {
  if (!button) return;
  const labelAdd = button.dataset.labelAdd || "Ajouter au répertoire";
  const labelAdded = button.dataset.labelAdded || "Ajouté au répertoire";
  button.textContent = isAdded ? labelAdded : labelAdd;
  button.disabled = isAdded;
};

const initSetPage = () => {
  const addButton = document.querySelector("[data-action='add-repertoire']");
  if (!addButton) return;

  const stored = getRepertoire();
  updateButtonState(addButton, Boolean(stored));

  addButton.addEventListener("click", () => {
    const itemId = addButton.dataset.itemId;
    if (!itemId) return;
    saveRepertoire(itemId);
    updateButtonState(addButton, true);
  });
};

const initRepertoirePage = () => {
  const titleEl = document.querySelector("[data-repertoire-title]");
  const descriptionEl = document.querySelector("[data-repertoire-description]");
  const emptyEl = document.querySelector("[data-repertoire-empty]");
  const itemEl = document.querySelector("[data-repertoire-item]");

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

  if (itemEl) {
    itemEl.hidden = false;
  }

  if (titleEl && titleEl.dataset.defaultText) {
    titleEl.textContent = titleEl.dataset.defaultText;
  }
  if (descriptionEl && descriptionEl.dataset.defaultText) {
    descriptionEl.textContent = descriptionEl.dataset.defaultText;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initSetPage();
  initRepertoirePage();
});
