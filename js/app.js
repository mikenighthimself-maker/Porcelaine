const CART_KEY = "porcelaineCart";

const formatPrice = (value) =>
  new Intl.NumberFormat("fr-FR", {
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
  const badge = document.querySelector("[data-cart-count]");
  if (badge) {
    badge.textContent = count;
    badge.hidden = count === 0;
  }
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

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p class="cart-meta">Quantité : ${item.quantity}</p>
        <p class="cart-meta">${formatPrice(item.price)} l'unité</p>
      </div>
      <div>
        <p class="price">${formatPrice(item.price * item.quantity)}</p>
        <button class="button secondary" type="button" data-remove="${item.id}">Retirer</button>
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
    };
    addToCart(item);
    button.textContent = "Ajouté au répertoire";
    button.disabled = true;
    setTimeout(() => {
      button.textContent = "Ajouter au répertoire";
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

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  setupAddToCart();
  renderCart();
  setupModal();
});
