/*
 * Katalog game.
 * ⚠️ Nominal, harga, bonus, promo, dan nama mata uang di file ini adalah CONTOH (mock).
 *    Ganti dengan data asli (atau dari API) sebelum deploy.
 */

const TOP_UP = [
  [100, 0, 15000],
  [300, 30, 45000],
  [500, 60, 75000],
  [1000, 150, 145000],
  [2000, 400, 280000],
];

const buildPackages = (unit) => [
  {
    id: "mem-bulanan",
    category: "Membership",
    label: "Membership Bulanan",
    detail: `Bonus ${unit} harian selama 30 hari`,
    price: 79000,
  },
  {
    id: "mem-mingguan",
    category: "Membership",
    label: "Membership Mingguan",
    detail: "Bonus harian selama 7 hari",
    price: 25000,
  },
  {
    id: "offer-double",
    category: "Limited Offer",
    label: "Double Bonus",
    detail: "Hanya sekali per akun",
    price: 15000,
  },
  {
    id: "promo-1",
    category: "Limited Promo",
    label: `1000 ${unit}`,
    bonus: "+200 Bonus",
    price: 120000,
  },
  {
    id: "promo-2",
    category: "Limited Promo",
    label: `2000 ${unit}`,
    bonus: "+500 Bonus",
    price: 240000,
  },
  ...TOP_UP.map(([amount, bonus, price]) => ({
    id: `top-${amount}`,
    category: "Top Up",
    label: `${amount} ${unit}`,
    bonus: bonus ? `+${bonus} Bonus` : undefined,
    price,
  })),
];

const game = (base) => ({ ...base, packages: buildPackages(base.unit) });

const numericId = (label, min, max, placeholder) => ({
  name: "uid",
  label,
  placeholder,
  inputmode: "numeric",
  pattern: `[0-9]{${min},${max}}`,
  title: `${label} hanya angka (${min}–${max} digit)`,
});

const zoneId = () => ({
  name: "zone",
  label: "Zone ID",
  placeholder: "Contoh: 1234",
  inputmode: "numeric",
  pattern: "[0-9]{4,6}",
  title: "Zone ID hanya angka (4–6 digit)",
});

const server = (options) => ({ name: "server", label: "Server", options });

const genericId = (label = "User ID") => ({
  name: "uid",
  label,
  placeholder: "Masukkan User ID",
  pattern: "[A-Za-z0-9_\\-]{4,30}",
  title: "ID hanya huruf, angka, _ atau - (4–30 karakter)",
});

const GLOBAL_SERVERS = ["Asia", "America", "Europe", "TW/HK/MO"];

export const games = [
  game({
    id: "mobile-legends",
    name: "Mobile Legends",
    category: "Mobile Game",
    image: "assets/product/mobile_legends.webp",
    unit: "Diamond",
    help: "Buka game → klik ikon profil. User ID ada di bawah nama, Zone ID ada di sebelahnya dalam tanda kurung.",
    fields: [numericId("User ID", 6, 12, "Contoh: 123456789"), zoneId()],
  }),
  game({
    id: "genshin",
    name: "Genshin Impact",
    category: "Mobile Game",
    image: "assets/product/genshin.png",
    unit: "Genesis Crystal",
    help: "Buka game → menu Paimon → Profil. UID tertulis di pojok profil, pilih server sesuai akun kamu.",
    fields: [numericId("UID", 9, 10, "Contoh: 812345678"), server(GLOBAL_SERVERS)],
  }),
  game({
    id: "honkai-star-rail",
    name: "Honkai: Star Rail",
    category: "Mobile Game",
    image: "assets/product/honkai_star_rail.jpg",
    unit: "Oneiric Shard",
    fields: [numericId("UID", 9, 10, "Contoh: 812345678"), server(GLOBAL_SERVERS)],
  }),
  game({
    id: "free-fire",
    name: "Free Fire",
    category: "Mobile Game",
    image: "assets/product/ff.jpg",
    unit: "Diamond",
    fields: [numericId("Player ID", 6, 12, "Contoh: 123456789")],
  }),
  game({
    id: "valorant",
    name: "Valorant",
    category: "PC Game",
    image: "assets/product/valorant.png",
    unit: "VP",
    fields: [
      {
        name: "uid",
        label: "Riot ID",
        placeholder: "NamaKamu#TAG",
        pattern: ".+#.+",
        title: "Format Riot ID: Nama#TAG",
      },
    ],
  }),
  game({
    id: "roblox",
    name: "Roblox",
    category: "PC Game",
    image: "assets/product/roblox.png",
    unit: "Robux",
    fields: [
      {
        name: "uid",
        label: "Username Roblox",
        placeholder: "Contoh: NamaKamu",
        pattern: "[A-Za-z0-9_]{3,20}",
        title: "Username 3–20 karakter (huruf, angka, underscore)",
      },
    ],
  }),
  game({
    id: "zepeto",
    name: "Zepeto",
    category: "Mobile Game",
    image: "assets/product/zepeto.png",
    unit: "Koin",
    fields: [
      {
        name: "uid",
        label: "Username Zepeto",
        placeholder: "Username kamu",
        pattern: ".{3,30}",
        title: "Username 3–30 karakter",
      },
    ],
  }),
  game({
    id: "love-and-deepspace",
    name: "Love and Deepspace",
    category: "Mobile Game",
    image: "assets/product/love_and_deepspace.jpg",
    unit: "Crystal",
    fields: [genericId()],
  }),
  game({
    id: "wuthering-waves",
    name: "Wuthering Waves",
    category: "Mobile Game",
    image: "assets/product/wuthering_waves.png",
    unit: "Astrite",
    fields: [genericId(), server(GLOBAL_SERVERS)],
  }),
  game({
    id: "zenless-zone-zero",
    name: "Zenless Zone Zero",
    category: "Mobile Game",
    image: "assets/product/zenless_u3niNp7.webp",
    unit: "Polychrome",
    fields: [genericId(), server(GLOBAL_SERVERS)],
  }),
  game({
    id: "where-winds-meet",
    name: "Where Winds Meet",
    category: "Mobile Game",
    image: "assets/product/wherewindsmeet.jpg",
    unit: "Koin",
    fields: [genericId()],
  }),
  game({
    id: "honor-of-kings",
    name: "Honor of Kings",
    category: "Mobile Game",
    image: "assets/product/honorofking.webp",
    unit: "Token",
    fields: [numericId("User ID", 6, 12, "Contoh: 123456789")],
  }),
  game({
    id: "honkai-impact-3",
    name: "Honkai Impact 3",
    category: "Mobile Game",
    image: "assets/product/hi3.png",
    unit: "Crystal",
    fields: [genericId()],
  }),
  game({
    id: "blood-strike",
    name: "Blood Strike",
    category: "Mobile Game",
    image: "assets/product/bloodstrike.png",
    unit: "Gold",
    fields: [genericId("Player ID")],
  }),
  game({
    id: "infinity-nikki",
    name: "Infinity Nikki",
    category: "Mobile Game",
    image: "assets/product/infinity_nikki.jpg",
    unit: "Gem",
    fields: [genericId()],
  }),
  game({
    id: "punishing-gray-raven",
    name: "Punishing: Gray Raven",
    category: "Mobile Game",
    image: "assets/product/punishing.jpg",
    unit: "Crystal",
    fields: [genericId(), server(GLOBAL_SERVERS)],
  }),
  game({
    id: "arena-breakout",
    name: "Arena Breakout",
    category: "Mobile Game",
    image: "assets/product/arena.png",
    unit: "Gold",
    fields: [genericId("Player ID")],
  }),
  game({
    id: "umamusume",
    name: "Umamusume: Pretty Derby",
    category: "Mobile Game",
    image: "assets/product/umamusume_ovENITz.png",
    unit: "Jewel",
    fields: [genericId()],
  }),
  game({
    id: "identity-v",
    name: "Identity V",
    category: "Mobile Game",
    image: "assets/product/idv.png",
    unit: "Diamond",
    fields: [genericId()],
  }),
];
