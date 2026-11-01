/*
|--------------------------------------------------------------------------
| GAME TOP UP PRICE CATALOG
|--------------------------------------------------------------------------
| Mata uang: IDR
| Format paket: [label, price, bonus, category]
|
| Harga merupakan referensi provider, bukan API live.
| Periksa kembali harga provider sebelum transaksi produksi.
*/

const createPackages = (items) =>
  items.map(([label, price, bonus, category = "Top Up"], index) => ({
    id: `${category.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
    category,
    label,
    ...(bonus ? { bonus } : {}),
    price,
  }));

export const PRICE_CATALOG = {

  // 1. MOBILE LEGENDS
  // Codashop Indonesia
  "mobile-legends": createPackages([
    ["5 Diamond", 1687],
    ["12 Diamond", 3823],
    ["19 Diamond", 6006],
    ["28 Diamond", 8736],
    ["44 Diamond", 13105],
    ["59 Diamond", 17472],
    ["85 Diamond", 25116],
    ["170 Diamond", 50232],
    ["240 Diamond", 70980],
    ["296 Diamond", 87360],
    ["408 Diamond", 120121],
    ["568 Diamond", 163800],
    ["875 Diamond", 251160],
    ["2010 Diamond", 546000],
    ["4830 Diamond", 1310400],
    ["Weekly Diamond Pass", 27550, null, "Membership"],
    ["Twilight Pass", 150000, null, "Membership"],
  ]),

  // 2. GENSHIN IMPACT
  // Lapakgaming, September 2026
  genshin: createPackages([
    ["60 Genesis Crystal", 16500],
    ["300 + 30 Genesis Crystal", 81000, "+30 Bonus"],
    ["980 + 110 Genesis Crystal", 255000, "+110 Bonus"],
    ["1980 + 260 Genesis Crystal", 489000, "+260 Bonus"],
    ["3280 + 600 Genesis Crystal", 815000, "+600 Bonus"],
    ["6480 + 1600 Genesis Crystal", 1629000, "+1600 Bonus"],
    ["Blessing of the Welkin Moon", 81000, null, "Membership"],
  ]),

  // 3. HONKAI STAR RAIL
  // Codashop
  "honkai-star-rail": createPackages([
    ["60 Oneiric Shard", 14414],
    ["330 Oneiric Shard", 71171, "+30 Bonus"],
    ["1090 Oneiric Shard", 224324, "+110 Bonus"],
    ["2240 Oneiric Shard", 431532, "+260 Bonus"],
    ["3880 Oneiric Shard", 719820, "+600 Bonus"],
    ["8080 Oneiric Shard", 1440541, "+1600 Bonus"],
    ["Express Supply Pass", 71171, null, "Membership"],
  ]),

  // 4. FREE FIRE
  // Codashop
  "free-fire": createPackages([
    ["5 Diamond", 901],
    ["12 Diamond", 1802],
    ["50 Diamond", 7207],
    ["70 Diamond", 9009],
    ["140 Diamond", 18018],
    ["355 Diamond", 45045],
    ["720 Diamond", 90090],
    ["1450 Diamond", 180180],
    ["2180 Diamond", 270270],
    ["3640 Diamond", 450450],
    ["7290 Diamond", 900901],
    ["36500 Diamond", 4504505],
    ["73100 Diamond", 9009009],
  ]),

  // 5. VALORANT
  // Codashop
  valorant: createPackages([
    ["475 VP", 56000],
    ["1000 VP", 112000],
    ["2050 VP", 224000],
    ["3650 VP", 389000],
    ["5350 VP", 559000],
    ["11000 VP", 1099000],
  ]),

  // 6. ROBLOX
  // Gift card denomination, bukan Robux langsung.
  // Harga nominal voucher, bukan harga penjual terverifikasi.
  roblox: createPackages([
    ["Gift Card Rp50.000", 50000, null, "Voucher"],
    ["Gift Card Rp65.000", 65000, null, "Voucher"],
    ["Gift Card Rp100.000", 100000, null, "Voucher"],
    ["Gift Card Rp200.000", 200000, null, "Voucher"],
    ["Gift Card Rp500.000", 500000, null, "Voucher"],
  ]),

  // 7. ZEPETO
  // Codashop
  zepeto: createPackages([
    ["7 ZEM", 7658],
    ["14 ZEM", 15315],
    ["28 ZEM", 29712],
    ["58 ZEM", 59423],
    ["128 ZEM", 129333],
    ["323 ZEM", 327703],
    ["1000 ZEM", 974820],
    ["4680 Coins", 15315],
    ["9700 Coins", 29712],
    ["25200 Coins", 74279],
    ["40700 Coins", 119721],
    ["110000 Coins", 314595],
    ["300000 Coins", 855000],
    ["Premium 1 Month", 54890, null, "Membership"],
  ]),

  // 8. LOVE AND DEEPSPACE
  // Codashop
  "love-and-deepspace": createPackages([
    ["60 Crystals", 17117],
    ["300 Crystals + 30 Diamonds", 80180, "+30 Diamonds"],
    ["450 Crystals + 90 Diamonds", 107207, "+90 Diamonds"],
    ["980 Crystals + 150 Diamonds", 224324, "+150 Diamonds"],
    ["1980 Crystals + 360 Diamonds", 449550, "+360 Diamonds"],
    ["3280 Crystals + 720 Diamonds", 719820, "+720 Diamonds"],
    ["6480 Crystals + 1600 Diamonds", 1530631, "+1600 Diamonds"],
    ["Companionship Pack", 269369, null, "Limited Offer"],
    ["Aurum Pass 30 Days", 80180, null, "Membership"],
  ]),

  // 9. WUTHERING WAVES
  // Provider alternatif, referensi harga Oktober 2026.
  "wuthering-waves": createPackages([
    ["60 Lunite", 15310],
    ["300 + 30 Lunite", 73240, "+30 Bonus"],
    ["980 + 110 Lunite", 221463, "+110 Bonus"],
    ["1980 + 260 Lunite", 442925, "+260 Bonus"],
    ["3280 + 600 Lunite", 734196, "+600 Bonus"],
    ["6480 + 1600 Lunite", 1444320, "+1600 Bonus"],
    ["Lunite Subscription", 74860, null, "Membership"],
  ]),

  // 10. ZENLESS ZONE ZERO
  // Lapakgaming, September 2026
  "zenless-zone-zero": createPackages([
    ["60 Monochrome", 16000],
    ["300 + 30 Monochrome", 79000, "+30 Bonus"],
    ["980 + 110 Monochrome", 249000, "+110 Bonus"],
    ["1980 + 260 Monochrome", 479000, "+260 Bonus"],
    ["3280 + 600 Monochrome", 799000, "+600 Bonus"],
    ["6480 + 1600 Monochrome", 1599000, "+1600 Bonus"],
    ["Inter-Knot Membership", 79000, null, "Membership"],
  ]),

  // 11. WHERE WINDS MEET
  // Lapakgaming, September 2026
  "where-winds-meet": createPackages([
    ["60 Echo Beads", 17666],
    ["180 Echo Beads", 51530],
    ["300 Echo Beads", 86380],
    ["600 Echo Beads", 172618],
    ["900 Echo Beads", 259930],
    ["1800 Echo Beads", 520475],
    ["3000 Echo Beads", 862019],
    ["6000 Echo Beads", 1741024],
    ["12000 Echo Beads", 3477848],
    ["Monthly Pass", 88287, null, "Membership"],
    ["Elite Battle Pass", 175608, null, "Membership"],
    ["Premium Battle Pass", 351216, null, "Membership"],
  ]),

  // 12. HONOR OF KINGS
  // Codashop
  "honor-of-kings": createPackages([
    ["16 Tokens", 3800],
    ["80 Tokens", 18400],
    ["240 Tokens", 56000],
    ["400 Tokens", 93000],
    ["560 Tokens", 130000],
    ["830 Tokens", 186000],
    ["1245 Tokens", 279000],
    ["2508 Tokens", 558000],
    ["4180 Tokens", 919000],
    ["8360 Tokens", 1838000],
  ]),

  // 13. HONKAI IMPACT 3
  // Codashop
  "honkai-impact-3": createPackages([
    ["30 B-Chips", 7297],
    ["65 B-Chips", 14865],
    ["330 B-Chips", 72973],
    ["990 B-Chips", 229730],
    ["1320 B-Chips", 301802],
    ["1980 B-Chips", 440541],
    ["3300 B-Chips", 734234],
    ["6600 B-Chips", 1467568],
    ["65 Crystals", 14865],
    ["330 Crystals", 72973],
    ["660 Crystals", 145946],
    ["1320 Crystals", 301802],
    ["3300 Crystals", 734234],
    ["6600 Crystals", 1467568],
  ]),

  // 14. BLOOD STRIKE
  // Provider alternatif, referensi harga Oktober 2026.
  "blood-strike": createPackages([
    ["105 Gold", 13154, "+5 Bonus"],
    ["200 Gold", 26298, "+10 Bonus"],
    ["320 Gold", 39457, "+20 Bonus"],
    ["540 Gold", 65744, "+40 Bonus"],
    ["600 Gold", 78888, "+45 Bonus"],
    ["1100 Gold", 135969, "+100 Bonus"],
    ["2260 Gold", 272088, "+260 Bonus"],
    ["3360 Gold", 407166, "+360 Bonus"],
    ["4520 Gold", 542880, "+520 Bonus"],
    ["5800 Gold", 678874, "+800 Bonus"],
    ["Level Up Pass", 30500, null, "Membership"],
    ["Strike Pass Elite", 60698, null, "Membership"],
    ["Strike Pass Premium", 136570, null, "Membership"],
  ]),

  // 15. INFINITY NIKKI
  // Provider alternatif, harga referensi.
  "infinity-nikki": createPackages([
    ["300 Stellarite", 79800],
    ["980 Stellarite", 239400],
    ["1980 Stellarite", 478800],
    ["3280 Stellarite", 798000],
    ["6480 Stellarite", 1596000],
    ["Distant Anthem", 159600, null, "Membership"],
    ["Miracle Epic", 319200, null, "Membership"],
    ["Package $5", 79800],
    ["Package $10", 159600],
    ["Package $15", 239400],
    ["Package $20", 319200],
    ["Package $30", 478800],
    ["Package $50", 798000],
  ]),

  // 16. PUNISHING: GRAY RAVEN
  // Codashop Indonesia
  "punishing-gray-raven": createPackages([
    ["5 Rainbow Cards", 13514],
    ["28 Rainbow Cards", 63964],
    ["34 Rainbow Cards", 79279],
    ["59 Rainbow Cards", 128829],
    ["71 Rainbow Cards", 154054],
    ["119 Rainbow Cards", 260360],
    ["299 Rainbow Cards", 639640],
    ["600 Rainbow Cards", 1297297],
  ]),

  // 17. ARENA BREAKOUT
  // Codashop Indonesia
  "arena-breakout": createPackages([
    ["60 Bonds", 18500],
    ["310 Bonds", 92500],
    ["630 Bonds", 185000],
    ["1580 Bonds", 460750],
    ["3200 Bonds", 921500],
    ["6500 Bonds", 1843000],
  ]),

  // 18. UMAMUSUME: PRETTY DERBY
  // Lapakgaming, September 2026
  "umamusume": createPackages([
    ["66 Carats", 16500],
    ["231 Carats", 49800],
    ["385 Carats", 99600],
    ["770 Carats", 166200],
    ["1650 Carats", 349000],
    ["2750 Carats", 565200],
    ["5500 Carats", 1163800],
    ["1500 Carats Limited", 182800, null, "Limited Offer"],
    ["1650 Carats Limited", 232700, null, "Limited Offer"],
    ["8250 Carats Limited", 1163800, null, "Limited Offer"],
  ]),

  // 19. IDENTITY V
  // Provider alternatif, harga referensi.
  "identity-v": createPackages([
    ["60 Echoes", 15732],
    ["185 Echoes", 47194],
    ["305 Echoes", 78657],
    ["690 Echoes", 161832],
    ["2025 Echoes", 505437],
    ["3330 Echoes", 781311],
    ["6590 Echoes", 1573108],
    ["Inspirations Package", 16596, null, "Limited Offer"],
    ["Clues Package", 71404, null, "Limited Offer"],
    ["Memory Sphere Package", 145122, null, "Limited Offer"],
  ]),
};
