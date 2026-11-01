/*
 * Data pricelist per kategori.
 * Harga Genshin Impact sesuai data resmi. Kategori lain belum punya data:
 * isi `items` setelah data harga tersedia.
 */
export const pricelistCategories = [
  {
    id: "genshin",
    name: "Genshin Impact",
    title: "Genshin Impact – Login (Global)",
    logo: "assets/product/genshin.png",
    items: [
      { name: "300 + Bonus", price: 77000 },
      { name: "Blessing of The Welkin Moon x1", price: 77000 },
      { name: "Blessing of The Welkin Moon x2", price: 155000 },
      { name: "Gnostic Hymn", price: 155000 },
      { name: "Blessing of The Welkin Moon x3", price: 235000 },
      { name: "980 + Bonus", price: 235000 },
      { name: "Gnostic Chorus", price: 310000 },
      { name: "Blessing of The Welkin Moon x4", price: 310000 },
      { name: "Blessing of The Welkin Moon x5", price: 385000 },
      { name: "1980 + Bonus (Promo)", price: 415000 },
      { name: "1980 + Bonus", price: 460000 },
      { name: "Blessing of The Welkin Moon x6", price: 460000 },
      { name: "3280 + Bonus (Promo)", price: 690000 },
      { name: "3280 + Bonus", price: 750000 },
      { name: "6480 + Bonus (Promo)", price: 1380000 },
      { name: "6480 + Bonus", price: 1510000 },
      { name: "6480 + Bonus x2 (Promo)", price: 2760000 },
      { name: "Claim All Double Bonus (60–6480)", price: 2800000 },
      { name: "6480 + Bonus x2", price: 3020000 },
      { name: "6480 + Bonus x3 (Promo)", price: 4140000 },
      { name: "6480 + Bonus x3", price: 4530000 },
      { name: "6480 + Bonus x4 (Promo)", price: 5520000 },
      { name: "6480 + Bonus x4", price: 6040000 },
      { name: "6480 + Bonus x5 (Promo)", price: 6900000 },
      { name: "6480 + Bonus x5", price: 7550000 },
    ],
  },
  {
    id: "vampir",
    name: "Vampir",
    title: "Vampir",
    // SEMENTARA: logo Vampir belum ada di assets. Ganti dengan assets/product/vampir.png jika sudah tersedia.
    logo: "assets/product/zepeto.png",
    items: [],
  },
  {
    id: "honkai-star-rail",
    name: "Honkai Star Rail",
    title: "Honkai Star Rail – Login (Global)",
    logo: "assets/product/honkai_star_rail.jpg",
    items: [],
  },
  {
    id: "lainnya",
    name: "Game Lainnya",
    title: "Game Lainnya",
    logo: null,
    icon: true,
    items: [],
  },
];
