import { pricelistCategories } from "./data/pricelist.js";
import { WA_NUMBER } from "./config.js";
import { escapeHtml } from "./utils/dom.js";
import { formatRupiah } from "./utils/format.js";
import { initNavbar } from "./components/navbar.js";

initNavbar();

const tabsEl = document.getElementById("pl-tabs");
const panelEl = document.getElementById("pl-panel");
const PROMO = /\(Promo\)$/;

const tabLogo = (cat) => {
  if (cat.logo) return `<img src="${escapeHtml(cat.logo)}" alt="" />`;
  if (cat.initials) return `<span class="pl-tab__initials">${escapeHtml(cat.initials)}</span>`;
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/></svg>`;
};

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

const emptyTemplate = (cat) => `
  <div class="pl-empty">
    <h3>Pricelist ${escapeHtml(cat.name)} segera hadir</h3>
    <p>Untuk saat ini, tanyakan harga langsung ke admin kami.</p>
    <a class="pl-empty__btn" href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">Chat admin di WhatsApp</a>
  </div>`;

const renderPanel = (index) => {
  const cat = pricelistCategories[index];
  const hasItems = cat.items.length > 0;

  panelEl.setAttribute("aria-labelledby", `pl-tab-${cat.id}`);
  panelEl.innerHTML = `
    <div class="pl-card">
      <div class="pl-card__head">
        <div>
          <p class="pl-card__eyebrow">Pricelist</p>
          <h3 class="pl-card__title">${escapeHtml(cat.title)}</h3>
        </div>
        <p class="pl-card__note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          Harga dapat berubah sewaktu-waktu
        </p>
      </div>
      ${hasItems ? tableTemplate(cat) : emptyTemplate(cat)}
    </div>`;
};

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
  const next = Math.min(last, Math.max(0, moves[event.key]));
  selectTab(next, true);
});

renderTabs();
renderPanel(0);
