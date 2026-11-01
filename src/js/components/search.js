/**
 * Pencarian: input desktop selalu terlihat, input mobile dibuka lewat ikon.
 * Keduanya disinkronkan dan memanggil onQuery(value).
 */
export function initSearch({ onQuery }) {
  const desktopInput = document.getElementById("search-desktop");
  const mobileInput = document.getElementById("search-mobile");
  const toggle = document.getElementById("search-toggle");
  const brandTitle = document.getElementById("h-title");
  const iconOpen = document.getElementById("search-icon-open");
  const iconClose = document.getElementById("search-icon-close");
  if (!desktopInput || !mobileInput) return;

  let isOpen = false;

  const syncFrom = (source) => {
    const value = source.value;
    if (desktopInput !== source) desktopInput.value = value;
    if (mobileInput !== source) mobileInput.value = value;
    onQuery(value);
  };

  const setMobileOpen = (open) => {
    isOpen = open;
    mobileInput.classList.toggle("w-0", !open);
    mobileInput.classList.toggle("opacity-0", !open);
    mobileInput.classList.toggle("w-40", open);
    mobileInput.classList.toggle("opacity-100", open);

    brandTitle?.classList.toggle("opacity-0", open);
    brandTitle?.classList.toggle("-translate-x-4", open);

    iconOpen.hidden = open;
    iconClose.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup pencarian" : "Buka pencarian");

    if (open) {
      mobileInput.focus();
    } else {
      mobileInput.value = "";
      syncFrom(mobileInput);
    }
  };

  desktopInput.addEventListener("input", () => syncFrom(desktopInput));
  mobileInput.addEventListener("input", () => syncFrom(mobileInput));
  mobileInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMobileOpen(false);
  });
  toggle.addEventListener("click", () => setMobileOpen(!isOpen));
}
