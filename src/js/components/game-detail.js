import { games } from "../data/games.js";
import { payments } from "../data/payments.js";
import { WA_NUMBER } from "../config.js";
import { escapeHtml } from "../utils/dom.js";
import { formatNumber, formatRupiah } from "../utils/format.js";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const cardClass = "rounded-xl bg-white p-6 shadow-sm";
const sectionTitle = "text-lg font-bold mb-4";

const fieldTemplate = (field) => {
  const id = `field-${field.name}`;
  const control = field.options
    ? `<select id="${id}" name="${field.name}" required class="${inputClass}">
         <option value="">Pilih ${escapeHtml(field.label.toLowerCase())}</option>
         ${field.options.map((o) => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join("")}
       </select>`
    : `<input
         id="${id}" name="${field.name}" type="text" required autocomplete="off"
         inputmode="${field.inputmode ?? "text"}"
         placeholder="${escapeHtml(field.placeholder ?? "")}"
         ${field.pattern ? `pattern="${escapeHtml(field.pattern)}" title="${escapeHtml(field.title ?? "")}"` : ""}
         class="${inputClass}"
       />`;

  return `
    <div class="flex flex-col gap-1.5">
      <label for="${id}" class="text-sm font-semibold">${escapeHtml(field.label)}</label>
      ${control}
    </div>`;
};

const packageTemplate = (game, pkg) => `
  <label class="cursor-pointer">
    <input type="radio" name="package" value="${pkg.id}" class="peer sr-only" required />
    <span class="flex h-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 bg-white p-3 text-center transition hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-500">
      <span class="text-sm font-semibold">${formatNumber(pkg.amount)} ${escapeHtml(game.unit)}</span>
      <span class="text-xs font-medium text-blue-600">${formatRupiah(pkg.price)}</span>
    </span>
  </label>`;

const paymentTemplate = (method) => `
  <label class="cursor-pointer">
    <input type="radio" name="payment" value="${method.id}" class="peer sr-only" required />
    <span class="flex items-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-500">
      <img src="${method.logo}" alt="" class="h-6 w-14 object-contain" loading="lazy" />
      <span class="text-sm font-medium">${escapeHtml(method.label)}</span>
    </span>
  </label>`;

const pageTemplate = (game) => `
  <article class="mx-auto max-w-6xl px-4 py-8 lg:py-12">
    <header class="flex flex-col gap-6 md:flex-row md:items-center">
      <img
        src="${escapeHtml(game.image)}"
        alt="${escapeHtml(game.name)}"
        class="h-28 w-28 rounded-2xl object-cover shadow-md md:h-36 md:w-36"
      />
      <div>
        <h1 class="text-2xl font-bold lg:text-3xl">${escapeHtml(game.name)}</h1>
        <p class="mt-1 text-sm text-gray-600">Top up ${escapeHtml(game.unit)} · proses cepat, aman, dan terpercaya</p>
      </div>
    </header>

    <form id="order-form" novalidate class="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
      <div class="flex flex-col gap-8">
        <section aria-labelledby="step-account" class="${cardClass}">
          <h2 id="step-account" class="${sectionTitle}">1. Data Akun</h2>
          <div class="grid gap-4 md:grid-cols-2">
            ${game.fields.map(fieldTemplate).join("")}
          </div>
        </section>

        <section aria-labelledby="step-package" class="${cardClass}">
          <h2 id="step-package" class="${sectionTitle}">2. Pilih Nominal</h2>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            ${game.packages.map((pkg) => packageTemplate(game, pkg)).join("")}
          </div>
        </section>

        <section aria-labelledby="step-payment" class="${cardClass}">
          <h2 id="step-payment" class="${sectionTitle}">3. Metode Pembayaran</h2>
          <div class="grid gap-3 sm:grid-cols-2">
            ${payments.map(paymentTemplate).join("")}
          </div>
        </section>
      </div>

      <aside class="h-fit lg:sticky lg:top-6">
        <div class="${cardClass}">
          <h2 class="${sectionTitle}">Ringkasan</h2>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between gap-4">
              <dt class="text-gray-600">Nominal</dt>
              <dd data-summary="package" class="text-right font-medium">-</dd>
            </div>
            <div class="flex justify-between gap-4">
              <dt class="text-gray-600">Pembayaran</dt>
              <dd data-summary="payment" class="text-right font-medium">-</dd>
            </div>
            <div class="flex justify-between gap-4 border-t border-gray-200 pt-3">
              <dt class="font-semibold">Total</dt>
              <dd data-summary="total" class="text-right text-lg font-bold text-blue-600">-</dd>
            </div>
          </dl>

          <button
            type="submit"
            disabled
            class="mt-6 w-full rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Pesan via WhatsApp
          </button>
          <p class="mt-3 text-xs text-gray-500">
            Pastikan data akun sudah benar. Kesalahan input UID/Zone ID menjadi tanggung jawab pembeli.
          </p>
        </div>
      </aside>
    </form>
  </article>`;

const notFoundTemplate = () => `
  <div class="mx-auto max-w-md px-4 py-20 text-center">
    <h1 class="text-2xl font-bold">Game tidak ditemukan</h1>
    <p class="mt-2 text-gray-600">Mungkin tautannya sudah berubah atau game sedang tidak tersedia.</p>
    <a href="/" class="mt-6 inline-block rounded-md bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600">
      Kembali ke beranda
    </a>
  </div>`;

export function renderGameDetail(root, id) {
  const game = games.find((g) => g.id === id);

  if (!game) {
    document.title = "Game tidak ditemukan | Analog Store";
    root.innerHTML = notFoundTemplate();
    return;
  }

  document.title = `Top Up ${game.name} | Analog Store`;
  root.innerHTML = pageTemplate(game);
  bindOrderForm(root, game);
}

function bindOrderForm(root, game) {
  const form = root.querySelector("#order-form");
  const submitBtn = form.querySelector('button[type="submit"]');
  const summary = (key) => form.querySelector(`[data-summary="${key}"]`);

  const selected = () => {
    const data = new FormData(form);
    return {
      data,
      pkg: game.packages.find((p) => p.id === data.get("package")),
      payment: payments.find((p) => p.id === data.get("payment")),
    };
  };

  const updateSummary = () => {
    const { pkg, payment } = selected();

    summary("package").textContent = pkg
      ? `${formatNumber(pkg.amount)} ${game.unit}`
      : "-";
    summary("payment").textContent = payment ? payment.label : "-";
    summary("total").textContent = pkg ? formatRupiah(pkg.price) : "-";

    submitBtn.disabled = !(pkg && payment && form.checkValidity());
  };

  form.addEventListener("input", updateSummary);
  form.addEventListener("change", updateSummary);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const { data, pkg, payment } = selected();
    if (!pkg || !payment) return;

    const lines = [
      `Halo Analog Store, saya mau top up ${game.name}.`,
      "",
      ...game.fields.map((f) => `${f.label}: ${data.get(f.name)}`),
      `Nominal: ${formatNumber(pkg.amount)} ${game.unit}`,
      `Pembayaran: ${payment.label}`,
      `Total: ${formatRupiah(pkg.price)}`,
    ];

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });

  updateSummary();
}
