import { createAutoplay } from "../utils/autoplay.js";
import { escapeHtml, prefersReducedMotion } from "../utils/dom.js";

const INTERVAL = 4000;

const cardTemplate = (item) => `
  <div class="snap-center flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-80">
    <div class="relative w-full h-full p-2">
      <img src="assets/images/quote.svg" class="absolute top-2 right-2 w-6" alt="" />

      <div class="w-full h-full bg-white rounded-md shadow-md flex flex-col justify-between overflow-hidden">
        <div class="p-6">
          <p class="text-sm font-semibold text-black">&ldquo;${escapeHtml(item.text)}&rdquo;</p>
        </div>

        <div class="bg-blue-600 pl-20 relative">
          <img
            src="${escapeHtml(item.avatar)}"
            class="w-14 h-14 rounded-md border-2 border-white absolute -top-7 left-4"
            alt="Foto ${escapeHtml(item.name)}"
            loading="lazy"
          />
          <p class="text-white text-sm font-semibold px-4 pt-4">${escapeHtml(item.name)}</p>
          <p class="text-white text-xs px-4 pb-4">${escapeHtml(item.role)}</p>
        </div>
      </div>
    </div>
  </div>`;

export function createTestimonialCarousel(root, items) {
  if (!root || !items.length) return;

  const track = root.querySelector("[data-track]");
  const prevBtn = root.querySelector('[data-action="prev"]');
  const nextBtn = root.querySelector('[data-action="next"]');

  track.innerHTML = items.map(cardTemplate).join("");
  const cards = [...track.children];
  const reduceMotion = prefersReducedMotion();

  let current = 0;
  let syncTimer;

  const cardLeft = (card) => card.offsetLeft - track.offsetLeft;

  const goTo = (index) => {
    current = (index + cards.length) % cards.length;
    track.scrollTo({
      left: cardLeft(cards[current]),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  // Sinkronkan index saat pengguna geser manual (swipe / scroll)
  track.addEventListener(
    "scroll",
    () => {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(() => {
        current = cards.reduce((best, card, i) => {
          const dist = Math.abs(cardLeft(card) - track.scrollLeft);
          const bestDist = Math.abs(cardLeft(cards[best]) - track.scrollLeft);
          return dist < bestDist ? i : best;
        }, 0);
      }, 120);
    },
    { passive: true },
  );

  const autoplay = createAutoplay(() => goTo(current + 1), INTERVAL, {
    enabled: !reduceMotion,
  });

  prevBtn?.addEventListener("click", () => {
    goTo(current - 1);
    autoplay.restart();
  });
  nextBtn?.addEventListener("click", () => {
    goTo(current + 1);
    autoplay.restart();
  });

  root.addEventListener("mouseenter", autoplay.stop);
  root.addEventListener("mouseleave", autoplay.restart);
  root.addEventListener("touchstart", autoplay.stop, { passive: true });
  root.addEventListener("touchend", autoplay.restart);

  autoplay.start();
}
