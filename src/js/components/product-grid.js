import { escapeHtml } from "../utils/dom.js";

const cardTemplate = (product) => `
  <div class="w-full h-auto flex flex-col border bg-white border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out sm:w-20 md:w-45 lg:w-48">
    <img
      src="${escapeHtml(product.image)}"
      alt="${escapeHtml(product.name)}"
      class="w-full h-auto object-cover"
      loading="lazy"
    />
    <div class="w-full h-full flex flex-col justify-between px-2 py-3">
      <p class="font-poppins font-semibold text-xs lg:text-base">${escapeHtml(product.name)}</p>
      <a
        href="game?id=${encodeURIComponent(product.id)}"
        aria-label="Top up ${escapeHtml(product.name)}"
        class="text-center bg-blue-500 hover:bg-blue-600 text-white text-sm p-1 w-full rounded-sm mt-3 transition-colors"
      >
        TOP UP
      </a>
    </div>
  </div>`;

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
