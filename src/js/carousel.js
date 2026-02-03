const carouselData = [
  {
    src: "assets/images/banner_1_desktop_with_text.png",
    alt: "Transaksi Mudah",
  },
  {
    src: "assets/images/banner_2_desktop_with_text.png",
    alt: "Mudah murah",
  },
  {
    src: "assets/images/Banner_Gnostic_Hymn_copy.jpg",
    alt: "Battle pass",
  },
  {
    src: "assets/images/MELUSENT_GIFT1.png",
    alt: "Melusent Gift",
  },
];

const carousel = document.querySelector("[data-carousel]");
const slidesContainer = carousel.querySelector("[data-slides]");
const dotsContainer = carousel.querySelector(".carousel-dots");
const buttons = carousel.querySelectorAll(".carousel-button");

let currentIndex = 0;
let interval;

// Render slides dari data
carouselData.forEach((item, index) => {
  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.alt;
  img.className =
    "absolute inset-0 w-full h-full object-fill slide transition-opacity duration-700";
  img.style.opacity = index === 0 ? "1" : "0";
  slidesContainer.appendChild(img);

  // generate dots
  const dot = document.createElement("span");
  dot.className =
    "carousel-dot h-3 rounded-full cursor-pointer transition-all duration-300";
  dot.classList.add(index === 0 ? "w-8" : "w-3");
  dot.classList.add(index === 0 ? "bg-blue-400" : "bg-gray-300");

  dot.addEventListener("click", () => {
    showSlide(index);
    resetAutoSlide();
  });

  dotsContainer.appendChild(dot);
});

const slides = slidesContainer.querySelectorAll(".slide");
const dots = dotsContainer.querySelectorAll(".carousel-dot");

// menamilkan slide berdasarkan index
const showSlide = (index) => {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? "1" : "0";
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("w-8", i === index);
    dot.classList.toggle("bg-blue-400", i === index);
    dot.classList.toggle("w-3", i !== index);
    dot.classList.toggle("bg-gray-300", i !== index);
  });

  currentIndex = index;
};

// Prev / Next
const moveSlide = (direction) => {
  let nextIndex = currentIndex + direction;
  if (nextIndex < 0) nextIndex = slides.length - 1;
  if (nextIndex >= slides.length) nextIndex = 0;
  showSlide(nextIndex);
  resetAutoSlide();
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const dir = btn.dataset.carouselButton === "next" ? 1 : -1;
    moveSlide(dir);
  });
});

// Auto slide
const startAutoSlide = () => {
  interval = setInterval(() => moveSlide(1), 4000);
};

const resetAutoSlide = () => {
  clearInterval(interval);
  startAutoSlide();
};

// Init
showSlide(0);
startAutoSlide();
