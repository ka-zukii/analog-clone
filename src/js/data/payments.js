/*
 * Metode pembayaran. Biaya admin (fee) dalam Rupiah, CONTOH saja.
 * Ganti dengan data asli dari payment gateway / admin.
 */
export const paymentGroups = [
  "QRIS",
  "E-Wallet",
  "Virtual Account / Bank Transfer",
  "Retail Outlet",
];

export const payments = [
  { id: "qris", group: "QRIS", label: "QRIS", logo: "assets/images/qris.png", fee: 0 },

  { id: "gopay", group: "E-Wallet", label: "GoPay", logo: "assets/images/gopay.png", fee: 0 },
  { id: "shopeepay", group: "E-Wallet", label: "ShopeePay", logo: "assets/images/shopeepay.png", fee: 0 },
  { id: "dana", group: "E-Wallet", label: "DANA", logo: null, fee: 0 },
  { id: "ovo", group: "E-Wallet", label: "OVO", logo: null, fee: 0 },

  { id: "bca", group: "Virtual Account / Bank Transfer", label: "BCA", logo: "assets/images/bca.png", fee: 2500 },
  { id: "bni", group: "Virtual Account / Bank Transfer", label: "BNI", logo: "assets/images/bni.png", fee: 2500 },
  { id: "bri", group: "Virtual Account / Bank Transfer", label: "BRI", logo: "assets/images/bri.png", fee: 2500 },
  { id: "mandiri", group: "Virtual Account / Bank Transfer", label: "Mandiri", logo: "assets/images/mandiri.png", fee: 2500 },
  { id: "permata", group: "Virtual Account / Bank Transfer", label: "Permata", logo: "assets/images/permata.png", fee: 2500 },

  { id: "alfamart", group: "Retail Outlet", label: "Alfamart", logo: "assets/images/alfamart.png", fee: 3000 },
  { id: "indomaret", group: "Retail Outlet", label: "Indomaret", logo: null, fee: 3000 },
];
