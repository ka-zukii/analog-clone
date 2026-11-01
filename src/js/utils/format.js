const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const formatRupiah = (value) => rupiah.format(value);
export const formatNumber = (value) => value.toLocaleString("id-ID");
