/*
 * Kategori tab pricelist.
 * type:
 *  - "table"   : tabel harga dari `items` (data resmi)
 *  - "catalog" : tabel harga dari paket di katalog games.js (gameId).
 *                harga mengikuti PRICE_CATALOG (referensi provider).
 *  - "picker"  : tab Game Lainnya. User memilih game lewat modal; tabel & ikon mengikuti pilihan.
 *  - "empty"   : pesan "segera hadir"
 */
export const pricelistCategories = [
  {
    id: "genshin",
    type: "catalog",
    gameId: "genshin",
    name: "Genshin Impact",
    title: "Genshin Impact – Login (Global)",
  },
  {
    id: "zepeto",
    type: "catalog",
    gameId: "zepeto",
    name: "Zepeto",
    title: "Zepeto",
  },
  {
    id: "honkai-star-rail",
    type: "empty",
    name: "Honkai Star Rail",
    title: "Honkai Star Rail – Login (Global)",
    logo: "assets/product/honkai_star_rail.jpg",
  },
  {
    id: "lainnya",
    type: "picker",
    name: "Game Lainnya",
    title: "Game Lainnya",
    logo: null,
  },
];
