import { pricelistCategories } from "./data/pricelist.js";
import { games } from "./data/games.js";
import { WA_NUMBER } from "./config.js";
import { escapeHtml } from "./utils/dom.js";
import { formatRupiah } from "./utils/format.js";
import { initNavbar } from "./components/navbar.js";

initNavbar();

const tabsEl = document.getElementById("pl-tabs");
const panelEl = document.getElementById("pl-panel");
const PROMO = /\(Promo\)$/;
const CATEGORY_IDS = new Set(pricelistCategories.map((c) => c.id));

const gridIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/></svg>`;

const tabLogo = (cat) =>
  cat.logo ? `<img src="${escapeHtml(cat.logo)}" alt="" />` : gridIcon;

/* ---------- Tabs ---------- */

const renderTabs = () => {
  tabsEl.innerHTML = pricelistCategories
    .map(
      (cat, i) => `
      <button type="button" role="tab" class="pl-tab" id="pl-tab-${cat.id}"
        aria-controls="pl-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-index="${i}">
        <span class="pl-tab__logo">${tabLogo(cat)}</span>
        <span class="pl-tab__name">${escapeHtml(cat.name)}</span>
      </button>`,
    )
    .join("");
};

/* ---------- Konten panel ---------- */

const tableTemplate = (cat) => `
  <div class="pl-card__table-wrap">
    <table class="pl-table">
      <caption class="sr-only">Daftar harga ${escapeHtml(cat.title)}</caption>
      <thead>
        <tr><th scope="col">Produk</th><th scope="col" class="pl-col-price">Harga</th></tr>
      </thead>
      <tbody>
        ${cat.items
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

const gameCardTemplate = (game) => `
  <a class="pl-game" href="game?id=${encodeURIComponent(game.id)}">
    <span class="pl-game__cover"><img src="${escapeHtml(game.image)}" alt="" loading="lazy" /></span>
    <span class="pl-game__info">
      <span class="pl-game__name">${escapeHtml(game.name)}</span>
      <span class="pl-game__cat">${escapeHtml(game.category)}</span>
    </span>
    <span class="pl-game__cta">Top Up</span>
  </a>`;

const gameTemplate = (cat) => {
  const game = games.find((g) => g.id === cat.id);
  if (!game) return emptyTemplate(cat);
  return `<div class="pl-games pl-games--single">${gameCardTemplate(game)}</div>`;
};

const gridTemplate = () => {
  const others = games.filter((g) => !CATEGORY_IDS.has(g.id));
  return `<div class="pl-games">${others.map(gameCardTemplate).join("")}</div>`;
};

const emptyTemplate = (cat) => `
  <div class="pl-empty">
    <h3>Pricelist ${escapeHtml(cat.name)} segera hadir</h3>
    <p>Untuk saat ini, tanyakan harga langsung ke admin kami.</p>
    <a class="pl-empty__btn" href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">Chat admin di WhatsApp</a>
  </div>`;

const bodyTemplate = (cat) => {
  switch (cat.type) {
    case "table": return tableTemplate(cat);
    case "game": return gameTemplate(cat);
    case "grid": return gridTemplate();
    default: return emptyTemplate(cat);
  }
};

const renderPanel = (index) => {
  const cat = pricelistCategories[index];
  const showHead = cat.type !== "empty";

  panelEl.setAttribute("aria-labelledby", `pl-tab-${cat.id}`);
  panelEl.innerHTML = `
    <div class="pl-card">
      ${showHead ? `
      <div class="pl-card__head">
        <div>
          <p class="pl-card__eyebrow">Pricelist</p>
          <h3 class="pl-card__title">${escapeHtml(cat.title ?? cat.name)}</h3>
        </div>
        ${cat.type === "table" ? `
        <p class="pl-card__note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          Harga dapat berubah sewaktu-waktu
        </p>` : ""}
      </div>` : ""}
      ${bodyTemplate(cat)}
    </div>`;
};

/* ---------- Interaksi tab ---------- */

const selectTab = (index, focus = false) => {
  const tabs = [...tabsEl.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab, i) => {
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
