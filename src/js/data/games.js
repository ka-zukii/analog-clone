/*
 * Katalog game.
 * ⚠️ HARGA, NOMINAL, dan NAMA MATA UANG di file ini hanya CONTOH (dummy).
 *    Ganti dengan data asli sebelum deploy.
 * Format field (fields) divalidasi dengan `pattern` (regex HTML) dan `title` (pesan error).
 */

const DEFAULT_TIERS = [
  [100, 15000],
  [300, 45000],
  [500, 75000],
  [1000, 145000],
  [2000, 280000],
];

const tiers = () =>
  DEFAULT_TIERS.map(([amount, price], i) => ({ id: `p${i}`, amount, price }));

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

const server = (options) => ({
  name: "server",
  label: "Server",
  options,
});

const genericId = (label = "User ID") => ({
  name: "uid",
  label,
  placeholder: "Cek di menu profil game kamu",
  pattern: "[A-Za-z0-9_\\-]{4,30}",
  title: "ID hanya huruf, angka, _ atau - (4–30 karakter)",
});

const GENSHIN_SERVERS = ["Asia", "America", "Europe", "TW/HK/MO"];

export const games = [
  {
    id: "mobile-legends",
    name: "Mobile Legends",
    image: "assets/product/mobile_legends.webp",
    unit: "Diamond",
    fields: [numericId("User ID", 6, 12, "Contoh: 123456789"), zoneId()],
    packages: tiers(),
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    image: "assets/product/genshin.png",
    unit: "Genesis Crystal",
    fields: [numericId("UID", 9, 10, "Contoh: 812345678"), server(GENSHIN_SERVERS)],
    packages: tiers(),
  },
  {
    id: "honkai-star-rail",
    name: "Honkai Star Rail",
    image: "assets/product/honkai_star_rail.jpg",
    unit: "Oneiric Shard",
    fields: [numericId("UID", 9, 10, "Contoh: 812345678"), server(GENSHIN_SERVERS)],
    packages: tiers(),
  },
  {
    id: "free-fire",
    name: "Free Fire",
    image: "assets/product/ff.jpg",
    unit: "Diamond",
    fields: [numericId("Player ID", 6, 12, "Contoh: 123456789")],
    packages: tiers(),
  },
  {
    id: "valorant",
    name: "Valorant",
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
    packages: tiers(),
  },
  {
    id: "roblox",
    name: "Roblox",
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
    packages: tiers(),
  },
  {
    id: "zepeto",
    name: "Zepeto",
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
    packages: tiers(),
  },
  {
    id: "love-and-deepspace",
    name: "Love and Deep Space",
    image: "assets/product/love_and_deepspace.jpg",
    unit: "Crystal",
    fields: [genericId()],
    packages: tiers(),
  },
  {
    id: "wuthering-waves",
    name: "Wuthering Waves",
    image: "assets/product/wuthering_waves.png",
    unit: "Astrite",
    fields: [genericId(), server(["Asia", "America", "Europe", "TW/HK/MO"])],
    packages: tiers(),
  },
  {
    id: "zenless-zone-zero",
    name: "Zenless Zone Zero",
    image: "assets/product/zenless_u3niNp7.webp",
    unit: "Polychrome",
    fields: [genericId(), server(["Asia", "America", "Europe", "TW/HK/MO"])],
    packages: tiers(),
  },
  {
    id: "where-winds-meet",
    name: "Where Winds Meet",
    image: "assets/product/wherewindsmeet.jpg",
    unit: "Koin",
    fields: [genericId()],
    packages: tiers(),
  },
  {
    id: "honor-of-kings",
    name: "Honor of Kings",
    image: "assets/product/honorofking.webp",
    unit: "Token",
    fields: [numericId("User ID", 6, 12, "Contoh: 123456789")],
    packages: tiers(),
  },
  {
    id: "honkai-impact-3",
    name: "Honkai Impact 3",
    image: "assets/product/hi3.png",
    unit: "Crystal",
    fields: [genericId()],
    packages: tiers(),
  },
  {
    id: "blood-strike",
    name: "Blood Strike",
    image: "assets/product/bloodstrike.png",
    unit: "Gold",
    fields: [genericId("Player ID")],
    packages: tiers(),
  },
  {
    id: "infinity-nikki",
    name: "Infinity Nikki",
    image: "assets/product/infinity_nikki.jpg",
    unit: "Gem",
    fields: [genericId()],
    packages: tiers(),
  },
  {
    id: "punishing-gray-raven",
    name: "Punishing: Gray Raven",
    image: "assets/product/punishing.jpg",
    unit: "Crystal",
    fields: [genericId(), server(["Asia", "America", "Europe", "TW/HK/MO"])],
    packages: tiers(),
  },
  {
    id: "arena-breakout",
    name: "Arena Breakout",
    image: "assets/product/arena.png",
    unit: "Gold",
    fields: [genericId("Player ID")],
    packages: tiers(),
  },
  {
    id: "umamusume",
    name: "Umamusume Pretty Derby",
    image: "assets/product/umamusume_ovENITz.png",
    unit: "Jewel",
    fields: [genericId()],
    packages: tiers(),
  },
  {
    id: "identity-v",
    name: "Identity V",
    image: "assets/product/idv.png",
    unit: "Diamond",
    fields: [genericId()],
    packages: tiers(),
  },
];
