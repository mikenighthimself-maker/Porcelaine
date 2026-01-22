const REPERTOIRE_KEY = "porcelaineRepertoire";

const repertoireItem = {
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
    return JSON.parse(stored);
  } catch (error) {
    return null;
  }
};

const updateButtonState = (button, isAdded) => {
  if (!button) return;
  button.textContent = isAdded ? "Ajouté au répertoire" : "Ajouter au répertoire";
  button.disabled = isAdded;
};

const initSetPage = () => {
  const addButton = document.querySelector("[data-action='add-repertoire']");
  if (!addButton) return;

  const stored = getRepertoire();
  updateButtonState(addButton, Boolean(stored));

  addButton.addEventListener("click", () => {
    saveRepertoire(repertoireItem);
    updateButtonState(addButton, true);
  });
};

const initRepertoirePage = () => {
  const titleEl = document.querySelector("[data-repertoire-title]");
  const descriptionEl = document.querySelector("[data-repertoire-description]");
  const emptyEl = document.querySelector("[data-repertoire-empty]");

  const stored = getRepertoire();
  if (!stored) {
    if (emptyEl) {
      emptyEl.hidden = false;
    }
    return;
  }

  if (titleEl) titleEl.textContent = stored.title;
  if (descriptionEl) descriptionEl.textContent = stored.description;
};

document.addEventListener("DOMContentLoaded", () => {
  initSetPage();
  initRepertoirePage();
});
