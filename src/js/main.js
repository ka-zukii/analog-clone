import { games } from "./data/games.js";
import { banners } from "./data/banners.js";
import { testimonials } from "./data/testimonials.js";
import { createHeroCarousel } from "./components/hero-carousel.js";
import { createTestimonialCarousel } from "./components/testimonial-carousel.js";
import { createProductGrid } from "./components/product-grid.js";
import { initNavbar } from "./components/navbar.js";

const grid = createProductGrid({
  container: document.getElementById("productGrid"),
  emptyState: document.getElementById("productEmpty"),
  products: games,
});

const navbar = initNavbar({ onQuery: grid.filter });

// Dari halaman lain: /?q=genshin → buka pencarian dan filter langsung
const initialQuery = new URLSearchParams(window.location.search).get("q");
if (initialQuery) {
  navbar.setValue(initialQuery);
  grid.filter(initialQuery);
  document.getElementById("trending")?.scrollIntoView();
}

createHeroCarousel(document.querySelector("[data-carousel]"), banners);
createTestimonialCarousel(document.querySelector("[data-testimonials]"), testimonials);
