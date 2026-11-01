import { games } from "./data/games.js";
import { banners } from "./data/banners.js";
import { testimonials } from "./data/testimonials.js";
import { createHeroCarousel } from "./components/hero-carousel.js";
import { createTestimonialCarousel } from "./components/testimonial-carousel.js";
import { createProductGrid } from "./components/product-grid.js";
import { initSearch } from "./components/search.js";

const grid = createProductGrid({
  container: document.getElementById("productGrid"),
  emptyState: document.getElementById("productEmpty"),
  products: games,
});

initSearch({ onQuery: grid.filter });
createHeroCarousel(document.querySelector("[data-carousel]"), banners);
createTestimonialCarousel(document.querySelector("[data-testimonials]"), testimonials);
