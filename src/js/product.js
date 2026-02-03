const products = [
  {
    name: "Genshin Impact",
    image: "assets/product/genshin.png",
    link: "#",
  },
  {
    name: "Love and Deep Space",
    image: "assets/product/love_and_deepspace.jpg",
    link: "#",
  },
  {
    name: "Honkai Star Rail",
    image: "assets/product/honkai_star_rail.jpg",
    link: "#",
  },
  {
    name: "Mobile Legends",
    image: "assets/product/mobile_legends.webp",
    link: "#",
  },
  {
    name: "Wuthering Waves",
    image: "assets/product/wuthering_waves.png",
    link: "#",
  },
  {
    name: "Roblox",
    image: "assets/product/roblox.png",
    link: "#",
  },
  {
    name: "Free Fire",
    image: "assets/product/ff.jpg",
    link: "#",
  },
  {
    name: "Zenless Zone Zero",
    image: "assets/product/zenless_u3niNp7.webp",
    link: "#",
  },
  {
    name: "Where Winds Meet",
    image: "assets/product/wherewindsmeet.jpg",
    link: "#",
  },
  {
    name: "Honor of Kings",
    image: "assets/product/honorofking.webp",
    link: "#",
  },
  {
    name: "Zepeto",
    image: "assets/product/zepeto.png",
    link: "#",
  },
  {
    name: "Valorant",
    image: "assets/product/valorant.png",
    link: "#",
  },
  {
    name: "Honkai Impact 3",
    image: "assets/product/hi3.png",
    link: "#",
  },
  {
    name: "Blood Strike",
    image: "assets/product/bloodstrike.png",
    link: "#",
  },
  {
    name: "Infinity Nikki",
    image: "assets/product/infinity_nikki.jpg",
    link: "#",
  },
  {
    name: "Pusnishing Gray Raven",
    image: "assets/product/punishing.jpg",
    link: "#",
  },
  {
    name: "Arena Breakout",
    image: "assets/product/arena.png",
    link: "#",
  },
  {
    name: "Umamusume Pretty Derby",
    image: "assets/product/umamusume_ovENITz.png",
    link: "#",
  },
  {
    name: "Identity V",
    image: "assets/product/idv.png",
    link: "#",
  },
];

const productGrid = document.getElementById("productGrid");

productGrid.innerHTML = products
  .map(
    (product) => `
      <div
        class="w-full h-auto flex flex-col border bg-white border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out hover:cursor-pointer sm:w-20 md:w-45 lg:w-48"
      >
        <img
          src="${product.image}"
          alt="product-${product.name}"
          class="w-full h-auto object-cover"
        />
        <div class="w-full h-full flex flex-col justify-between px-2 py-3">
          <p class="font-poppins font-semibold text-xs lg:text-base">${product.name}</p>
          <a
            href="${product.link}"
            class="text-center bg-blue-500 text-white text-sm p-1 w-full rounded-sm mt-3"
          >
            TOP UP
          </a>
        </div>
      </div>
    `,
  )
  .join("");
