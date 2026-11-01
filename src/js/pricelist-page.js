import { pricelistCategories } from "./data/pricelist.js";
import { games } from "./data/games.js";
import { WA_NUMBER } from "./config.js";
import { escapeHtml } from "./utils/dom.js";
import { formatRupiah } from "./utils/format.js";
import { initNavbar } from "./components/navbar.js";

initNavbar();

const tabsEl = document.getElementById("pl-tabs");
const panelEl = document.getElementById("pl-panel");
const dialog = document.getElementById("pl-dialog");
const dialogList = document.getElementById("pl-dialog-list");
const PROMO = /\(Promo\)$/;

// Game yang sudah punya tab sendiri tidak muncul di pilihan Game Lainnya
const CATEGORY_IDS = new Set(pricelistCategories.map((c) => c.id));
const pickerGames = games.filter((g) => !CATEGORY_IDS.has(g.id));

const gridIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/></svg>`;

let activeIndex = 0;
let pickedGameId = pickerGames[0]?.id ?? null;

/* ---------- Data per tab ---------- */

// Ubah paket katalog jadi item tabel (nama + harga)
const itemsFromGame = (game) =>
  game.packages.map((pkg) => ({
    name: pkg.bonus ? `${pkg.label} ${pkg.bonus}` : pkg.label,
    price: pkg.price,
  }));

// Mengembalikan tampilan untuk satu tab (judul, logo, item tabel)
const viewFor = (cat) => {
  if (cat.type === "table") {
    return { title: cat.title, logo: cat.logo, items: cat.items };
  }
  if (cat.type === "catalog") {
    const game = games.find((g) => g.id === cat.gameId);
    return { title: game?.name ?? cat.title, logo: game?.image, items: game ? itemsFromGame(game) : [] };
  }
  if (cat.type === "picker") {
    const game = games.find((g) => g.id === pickedGameId);
    return { title: game?.name ?? cat.title, logo: game?.image, items: game ? itemsFromGame(game) : [] };
  }
  return { title: cat.title ?? cat.name, logo: cat.logo, items: [] };
};

const logoHtml = (logo) => (logo ? `<img src="${escapeHtml(logo)}" alt="" />` : gridIcon);

/* ---------- Tabs ---------- */

const renderTabs = () => {
  tabsEl.innerHTML = pricelistCategories
    .map((cat, i) => {
      const view = viewFor(cat);
      return `
      <button type="button" role="tab" class="pl-tab" id="pl-tab-${cat.id}"
        aria-controls="pl-panel" aria-selected="${i === activeIndex}" tabindex="${i === activeIndex ? 0 : -1}" data-index="${i}">
        <span class="pl-tab__logo">${logoHtml(view.logo)}</span>
        <span class="pl-tab__name">${escapeHtml(cat.name)}</span>
      </button>`;
    })
    .join("");
};

// Perbarui ikon tab Game Lainnya tanpa merender ulang semua tab
const updateTabLogo = (index) => {
  const cat = pricelistCategories[index];
  const tab = tabsEl.querySelector(`[data-index="${index}"] .pl-tab__logo`);
  if (tab) tab.innerHTML = logoHtml(viewFor(cat).logo);
};

/* ---------- Panel ---------- */

const tableTemplate = (view) => `
  <div class="pl-card__table-wrap">
    <table class="pl-table">
      <caption class="sr-only">Daftar harga ${escapeHtml(view.title)}</caption>
      <thead>
        <tr><th scope="col">Produk</th><th scope="col" class="pl-col-price">Harga</th></tr>
      </thead>
      <tbody>
        ${view.items
          .map((item) => {
            const promo = PROMO.test(item.name);
            const label = item.name.replace(PROMO, "").trim();
            return `
            <tr>
              <td>
                <span class="pl-item-name">${escapeHtml(label)}</span>
                ${promo ? '<span class="pl-badge">Promo</span>' : ""}
              </td>
              <td class="pl-col-price">${formatRupiah(item.price)}</td>
            </tr>`;
          })
          .join("")}
      </tbody>
    </table>
  </div>`;

const emptyTemplate = (cat) => `
  <div class="pl-empty">
    <h3>Pricelist ${escapeHtml(cat.name)} segera hadir</h3>
    <p>Untuk saat ini, tanyakan harga langsung ke admin kami.</p>
    <a class="pl-empty__btn" href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">Chat admin di WhatsApp</a>
  </div>`;

const renderPanel = (index) => {
  const cat = pricelistCategories[index];
  panelEl.setAttribute("aria-labelledby", `pl-tab-${cat.id}`);

  if (cat.type === "empty") {
    panelEl.innerHTML = `<div class="pl-card">${emptyTemplate(cat)}</div>`;
    return;
  }

  const view = viewFor(cat);
  const picker = cat.type === "picker"
    ? `<button type="button" class="pl-picker-btn" id="pl-picker-open" aria-haspopup="dialog">
         Pilih game
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
       </button>`
    : "";

  panelEl.innerHTML = `
    <div class="pl-card">
      <div class="pl-card__head">
        <div>
          <p class="pl-card__eyebrow">Pricelist</p>
          <h3 class="pl-card__title">${escapeHtml(view.title)}</h3>
        </div>
        <div class="pl-card__actions">
          <p class="pl-card__note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            Harga dapat berubah sewaktu-waktu
          </p>
          ${picker}
        </div>
      </div>
      ${view.items.length ? tableTemplate(view) : `<div class="pl-empty"><p>Belum ada harga untuk game ini.</p></div>`}
    </div>`;
};

/* ---------- Modal pilih game ---------- */

const renderDialogList = () => {
  dialogList.innerHTML = pickerGames
    .map(
      (game) => `
      <button type="button" class="pl-pick" data-game="${escapeHtml(game.id)}" aria-pressed="${game.id === pickedGameId}">
        <img src="${escapeHtml(game.image)}" alt="" loading="lazy" />
        <span>${escapeHtml(game.name)}</span>
      </button>`,
    )
    .join("");
};

let dialogOpener = null;

const openDialog = (opener) => {
  dialogOpener = opener;
  renderDialogList();
  dialog.showModal();
  dialogList.querySelector('[aria-pressed="true"]')?.focus();
};

const closeDialog = () => dialog.close();

dialog.addEventListener("click", (event) => {
  if (event.target.closest("[data-close]")) return closeDialog();
  // Klik di area backdrop (luar kotak) menutup modal
  if (event.target === dialog) return closeDialog();

  const pick = event.target.closest("[data-game]");
  if (!pick) return;
  pickedGameId = pick.dataset.game;
  closeDialog();
  updateTabLogo(activeIndex);
  renderPanel(activeIndex);
});

dialog.addEventListener("close", () => {
  dialogOpener?.focus();
  dialogOpener = null;
});

panelEl.addEventListener("click", (event) => {
  const open = event.target.closest("#pl-picker-open");
  if (open) openDialog(open);
});

/* ---------- Interaksi tab ---------- */

const selectTab = (index, focus = false) => {
  activeIndex = index;
  [...tabsEl.querySelectorAll('[role="tab"]')].forEach((tab, i) => {
    const active = i === index;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  renderPanel(index);
};

tabsEl.addEventListener("click", (event) => {
  const tab = event.target.closest('[role="tab"]');
  if (tab) selectTab(Number(tab.dataset.index));
});

tabsEl.addEventListener("keydown", (event) => {
  const current = Number(document.activeElement?.dataset.index ?? 0);
  const last = pricelistCategories.length - 1;
  const moves = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: last };
  if (!(event.key in moves)) return;
  event.preventDefault();
  selectTab(Math.min(last, Math.max(0, moves[event.key])), true);
});

renderTabs();
renderPanel(0);
