const LANG_KEY = "porcelaineLang";
const REQUEST_QUANTITY_KEY = "porcelaineRequestQuantity";

const setupAddToCart = () => {
  const button = document.querySelector("[data-add-to-cart]");
  if (!button) return;

  button.addEventListener("click", () => {
    announce(button.dataset.announce);
    const addedLabel = button.dataset.addedLabel || button.textContent;
    button.textContent = addedLabel;
    button.disabled = true;
  });
};

const setupModal = () => {
  const modal = document.querySelector("[data-modal]");
  const closeButton = document.querySelector("[data-close-modal]");
  if (!modal || !closeButton) return;

  const closeModal = () => {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("is-open");
  };

  const openModal = () => {
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
  };

  modal._openModal = openModal;

  closeButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
};

const announce = (message) => {
  const region = document.querySelector("[data-live-region]");
  if (!region || !message) return;
  region.textContent = "";
  setTimeout(() => {
    region.textContent = message;
  }, 50);
};

const setupRequestForm = () => {
  const form = document.querySelector("[data-request-form]");
  if (!form) return;
  const quantityInput = form.querySelector("[data-request-quantity]");
  const storedQuantity = localStorage.getItem(REQUEST_QUANTITY_KEY);
  if (quantityInput) {
    quantityInput.value = storedQuantity || quantityInput.value || "1";
    if (!storedQuantity) {
      localStorage.setItem(REQUEST_QUANTITY_KEY, quantityInput.value);
    }
    quantityInput.addEventListener("change", () => {
      localStorage.setItem(REQUEST_QUANTITY_KEY, quantityInput.value);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (quantityInput) {
      localStorage.setItem(REQUEST_QUANTITY_KEY, quantityInput.value);
    }
    const modal = document.querySelector("[data-modal]");
    const openModal = modal?._openModal;
    if (typeof openModal === "function") {
      openModal();
    } else if (modal) {
      modal.setAttribute("aria-hidden", "false");
      modal.classList.add("is-open");
    }
    announce(form.dataset.confirmation);
    form.reset();
    if (quantityInput) {
      quantityInput.value = localStorage.getItem(REQUEST_QUANTITY_KEY) || "1";
    }
  });
};

const setupMobileNav = () => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav-links]");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
};

const getBasePath = () => {
  const path = window.location.pathname;
  const localeMatch = path.match(/^(.*?)(\/fr\/|\/en\/)/);
  if (localeMatch) {
    return localeMatch[1] || "";
  }
  if (path.endsWith("/index.html")) {
    return path.replace(/\/index\.html$/, "");
  }
  if (path.endsWith("/")) {
    return path.replace(/\/$/, "");
  }
  return "";
};

const hasLocalePrefix = (lang) => window.location.pathname.includes(`/${lang}/`);

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
  if (hasLocalePrefix("fr")) {
    setStoredLang("fr");
  } else if (hasLocalePrefix("en")) {
    setStoredLang("en");
  }
};

const handleRootRedirect = () => {
  const path = window.location.pathname;
  const isLocalized = hasLocalePrefix("fr") || hasLocalePrefix("en");
  const isRoot = !isLocalized && (path.endsWith("/") || path.endsWith("/index.html"));
  if (!isRoot || isLocalized) return;
  if (!document.body.dataset.langRedirect) return;

  const stored = getStoredLang();
  if (!stored) return;
  const basePath = getBasePath();
  const target = `${basePath}/${stored}/index.html`;
  window.location.replace(target);
};

document.addEventListener("DOMContentLoaded", () => {
  setupAddToCart();
  setupModal();
  setupRequestForm();
  setupMobileNav();
  setupLangPersistence();
  persistCurrentLang();
  handleRootRedirect();
});
