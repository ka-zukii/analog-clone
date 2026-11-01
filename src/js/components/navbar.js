/**
 * Navbar: ikon cari yang membuka kolom pencarian dengan animasi.
 * - Jika onQuery diberikan (beranda), hasil difilter langsung saat mengetik.
 * - Jika tidak (halaman lain), Enter akan membuka beranda dengan ?q=...
 */
export function initNavbar({ onQuery } = {}) {
  const root = document.querySelector("[data-nav-search]");
  if (!root) return { setValue() {} };

  const btn = root.querySelector("[data-nav-search-btn]");
  const form = root.querySelector("[data-nav-search-form]");
  const input = form.querySelector("input");

  const isOpen = () => root.classList.contains("is-open");

  const setOpen = (open) => {
    root.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Tutup pencarian" : "Buka pencarian");

    if (open) {
      input.focus();
    } else {
      onQuery?.("");
      // Kosongkan setelah animasi selesai agar teks tidak "lompat"
      setTimeout(() => {
        if (!isOpen()) input.value = "";
      }, 320);
    }
  };

  btn.addEventListener("click", () => setOpen(!isOpen()));

  input.addEventListener("input", () => onQuery?.(input.value));

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      btn.focus();
    }
  });

  form.addEventListener("submit", (event) => {
    if (onQuery) event.preventDefault();
  });

  // Tutup saat klik di luar, selama kolom kosong
  document.addEventListener("click", (event) => {
    if (isOpen() && !root.contains(event.target) && !input.value.trim()) {
      setOpen(false);
    }
  });

  return {
    setValue(value) {
      if (!value) return;
      root.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Tutup pencarian");
      input.value = value;
    },
  };
}
