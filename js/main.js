const CART_KEY = "porcelaineCart";
const LANG_KEY = "porcelaineLang";

const getLocale = () => {
  const lang = document.documentElement.lang || "fr";
  return lang.startsWith("fr") ? "fr-FR" : "en-GB";
};

const formatPrice = (value) =>
  new Intl.NumberFormat(getLocale(), {
    style: "currency",
    currency: "EUR",
  }).format(value);

const getCart = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const updateCartBadge = () => {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = count;
    badge.hidden = count === 0;
  });
};

const addToCart = (item) => {
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
  updateCartBadge();
};

const removeFromCart = (id) => {
  const updated = getCart().filter((item) => item.id !== id);
  saveCart(updated);
  updateCartBadge();
  renderCart();
};

const renderCart = () => {
  const list = document.querySelector("[data-cart-list]");
  const totalEl = document.querySelector("[data-cart-total]");
  const emptyState = document.querySelector("[data-cart-empty]");
  if (!list || !totalEl || !emptyState) return;

  const cart = getCart();
  list.innerHTML = "";

  if (cart.length === 0) {
    emptyState.hidden = false;
    totalEl.textContent = formatPrice(0);
    return;
  }

  emptyState.hidden = true;

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const fallbackLang = document.documentElement.lang || "fr";
    const defaultQuantity = fallbackLang.startsWith("fr") ? "Quantité :" : "Quantity:";
    const defaultUnit = fallbackLang.startsWith("fr") ? "l'unité" : "per item";
    const defaultRemove = fallbackLang.startsWith("fr") ? "Retirer" : "Remove";
    const quantityLabel = item.quantityLabel || defaultQuantity;
    const unitLabel = item.unitLabel || defaultUnit;
    const removeLabel = item.removeLabel || defaultRemove;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p class="cart-meta">${quantityLabel} ${item.quantity}</p>
        <p class="cart-meta">${formatPrice(item.price)} ${unitLabel}</p>
      </div>
      <div>
        <p class="price">${formatPrice(item.price * item.quantity)}</p>
        <button class="button secondary" type="button" data-remove="${item.id}">${removeLabel}</button>
      </div>
    `;
    list.appendChild(row);
  });

  totalEl.textContent = formatPrice(total);

  list.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => removeFromCart(button.dataset.remove));
  });
};

const setupAddToCart = () => {
  const button = document.querySelector("[data-add-to-cart]");
  if (!button) return;

  button.addEventListener("click", () => {
    const item = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      quantityLabel: button.dataset.quantityLabel,
      unitLabel: button.dataset.unitLabel,
      removeLabel: button.dataset.removeLabel,
    };
    addToCart(item);
    const addedLabel = button.dataset.addedLabel || button.textContent;
    const defaultLabel = button.dataset.defaultLabel || button.textContent;
    button.textContent = addedLabel;
    button.disabled = true;
    setTimeout(() => {
      button.textContent = defaultLabel;
      button.disabled = false;
    }, 1800);
  });
};

const setupModal = () => {
  const openButton = document.querySelector("[data-open-modal]");
  const modal = document.querySelector("[data-modal]");
  const closeButton = document.querySelector("[data-close-modal]");
  if (!openButton || !modal || !closeButton) return;

  const closeModal = () => {
    modal.setAttribute("aria-hidden", "true");
  };

  openButton.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "false");
  });

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
};

const getNavigatorLang = () =>
  navigator.language && navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";

const getStoredLang = () => localStorage.getItem(LANG_KEY);

const setStoredLang = (lang) => {
  localStorage.setItem(LANG_KEY, lang);
};

const setupLangPersistence = () => {
  document.querySelectorAll("[data-lang]").forEach((link) => {
    link.addEventListener("click", () => {
      setStoredLang(link.dataset.lang);
    });
  });
};

const persistCurrentLang = () => {
  const path = window.location.pathname;
  if (path.startsWith("/fr/")) {
    setStoredLang("fr");
  } else if (path.startsWith("/en/")) {
    setStoredLang("en");
  }
};

const handleRootRedirect = () => {
  const path = window.location.pathname;
  const isRoot = path === "/" || path.endsWith("/index.html");
  const isLocalized = path.startsWith("/fr/") || path.startsWith("/en/");
  if (!isRoot || isLocalized) return;
  if (!document.body.dataset.langRedirect) return;

  const stored = getStoredLang();
  if (!stored) return;
  const target = stored === "fr" ? "/fr/index.html" : "/en/index.html";
  window.location.replace(target);
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  setupAddToCart();
  renderCart();
  setupModal();
  setupLangPersistence();
  persistCurrentLang();
  handleRootRedirect();
});
