import { escapeHtml } from "../utils/dom.js";
import { formatRupiah } from "../utils/format.js";

// Harga paling murah dari katalog (untuk "Mulai dari")
const lowestPrice = (game) =>
  game.packages.length ? Math.min(...game.packages.map((p) => p.price)) : null;

const cardTemplate = (game) => {
  const from = lowestPrice(game);
  return `
    <a class="game-card" href="game?id=${encodeURIComponent(game.id)}" aria-label="Top up ${escapeHtml(game.name)}">
      <span class="game-card__media">
        <img src="${escapeHtml(game.image)}" alt="" loading="lazy" />
        <span class="game-card__chip">${escapeHtml(game.category)}</span>
      </span>
      <span class="game-card__body">
        <span class="game-card__name">${escapeHtml(game.name)}</span>
        ${from ? `<span class="game-card__from">Mulai dari <strong>${formatRupiah(from)}</strong></span>` : ""}
        <span class="game-card__btn">Top Up</span>
      </span>
    </a>`;
};

export function createProductGrid({ container, emptyState, products }) {
  const render = (list) => {
    container.innerHTML = list.map(cardTemplate).join("");
    if (emptyState) emptyState.hidden = list.length > 0;
  };

  const filter = (query = "") => {
    const q = query.trim().toLowerCase();
    render(q ? products.filter((p) => p.name.toLowerCase().includes(q)) : products);
  };

  render(products);
  return { filter };
}
