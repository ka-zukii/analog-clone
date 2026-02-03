const testimonialData = [
  {
    text: "Udah paling juara dah. Paling cepet, harga murah, admin ramah fast resp, via UID. Gaada saingan sih, Analog selalu di hati 💖.",
    name: "Sky si Pawang Jean",
    role: "Genshin Impact Influencer",
    avatar: "assets/testi/sky_pawang_jean.png",
  },
  {
    text: "Pelayanan super cepat, aman, dan terpercaya.",
    name: "Aether Main",
    role: "Content Creator",
    avatar: "assets/testi/sky_pawang_jean.png",
  },
  {
    text: "Harga bersahabat, proses kilat. Udah langganan 🔥",
    name: "Lumine",
    role: "Casual Player",
    avatar: "assets/testi/sky_pawang_jean.png",
  },
  {
    text: "Admin ramah, respon cepet. Recommended!",
    name: "Diluc Enjoyer",
    role: "Streamer",
    avatar: "assets/testi/sky_pawang_jean.png",
  },
];

const container = document.querySelector("[data-carousel-items]");
const prevBtn = document.querySelector('[data-carousel-btn="prev"]');
const nextBtn = document.querySelector('[data-carousel-btn="next"]');

let index = 0;
let autoSlide;

// Render item
testimonialData.forEach((item) => {
  const card = document.createElement("div");
  card.className = `
    snap-center flex-shrink-0
    w-full md:w-1/2 lg:w-1/3 h-80
  `;

  card.innerHTML = `
    <div class="relative w-full h-full p-2">
      <img
        src="assets/images/quote.svg"
        class="absolute top-2 right-2 w-6"
        alt="quote"
      />

      <div class="w-full h-full bg-white rounded-md shadow-md flex flex-col justify-between overflow-hidden">
        <div class="p-6">
          <p class="text-sm font-semibold text-black">
            "${item.text}"
          </p>
        </div>

        <div class="bg-blue-600 pl-20 relative">
          <img
            src="${item.avatar}"
            class="w-14 h-14 rounded-md border-2 border-white absolute -top-7 left-4"
            alt="${item.name}"
          />
          <p class="text-white text-sm font-semibold px-4 pt-4">
            ${item.name}
          </p>
          <p class="text-white text-xs px-4 pb-4">
            ${item.role}
          </p>
        </div>
      </div>
    </div>
  `;

  container.appendChild(card);
});

const items = container.children;

// Scroll helper
const scrollToIndex = (i) => {
  const item = items[i];
  if (!item) return;

  container.scrollTo({
    left: item.offsetLeft - container.offsetLeft,
    behavior: "smooth",
  });

  index = i;
};

// Prev / Next
const next = () => {
  index = (index + 1) % items.length;
  scrollToIndex(index);
};

const prev = () => {
  index = (index - 1 + items.length) % items.length;
  scrollToIndex(index);
};

nextBtn.addEventListener("click", () => {
  next();
  resetAuto();
});

prevBtn.addEventListener("click", () => {
  prev();
  resetAuto();
});

// Auto slide
const startAuto = () => {
  autoSlide = setInterval(next, 4000);
};

const resetAuto = () => {
  clearInterval(autoSlide);
  startAuto();
};

// Pause on interaction
container.addEventListener("mouseenter", () => clearInterval(autoSlide));
container.addEventListener("mouseleave", resetAuto);
container.addEventListener("touchstart", () => clearInterval(autoSlide));
container.addEventListener("touchend", resetAuto);

// Init
scrollToIndex(0);
startAuto();
