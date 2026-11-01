import { createAutoplay } from "../utils/autoplay.js";
import { escapeHtml, prefersReducedMotion } from "../utils/dom.js";

const INTERVAL = 4000;

export function createHeroCarousel(root, banners) {
  if (!root || !banners.length) return;

  const slidesEl = root.querySelector("[data-slides]");
  const dotsEl = root.querySelector("[data-dots]");
  const prevBtn = root.querySelector('[data-action="prev"]');
  const nextBtn = root.querySelector('[data-action="next"]');

  slidesEl.innerHTML = banners
    .map(
      (banner, i) => `
      <img
        src="${banner.src}"
        alt="${escapeHtml(banner.alt)}"
        class="slide absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        loading="${i === 0 ? "eager" : "lazy"}"
        style="opacity: ${i === 0 ? 1 : 0}"
      />`,
    )
    .join("");
  const slides = [...slidesEl.querySelectorAll("img")];

  const dots = banners.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot h-3 w-3 rounded-full bg-gray-300 cursor-pointer transition-all duration-300";
    dot.setAttribute("aria-label", `Tampilkan banner ${i + 1}`);
    dot.addEventListener("click", () => goTo(i, true));
    dotsEl.appendChild(dot);
    return dot;
  });

  let current = 0;

  const show = (index) => {
    current = (index + banners.length) % banners.length;

    slides.forEach((slide, i) => {
      slide.style.opacity = i === current ? "1" : "0";
      slide.setAttribute("aria-hidden", String(i !== current));
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle("w-8", active);
      dot.classList.toggle("w-3", !active);
      dot.classList.toggle("bg-blue-400", active);
      dot.classList.toggle("bg-gray-300", !active);
      dot.setAttribute("aria-current", String(active));
    });
  };

  const autoplay = createAutoplay(() => show(current + 1), INTERVAL, {
    enabled: !prefersReducedMotion(),
  });

  const goTo = (index) => {
    show(index);
    autoplay.restart();
  };

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));

  // Jeda saat pengguna hover / fokus ke carousel
  root.addEventListener("mouseenter", autoplay.stop);
  root.addEventListener("mouseleave", autoplay.restart);
  root.addEventListener("focusin", autoplay.stop);
  root.addEventListener("focusout", autoplay.restart);

  show(0);
  autoplay.start();
}
