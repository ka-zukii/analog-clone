import { games } from "../data/games.js";
import { payments, paymentGroups } from "../data/payments.js";
import { vouchers } from "../data/vouchers.js";
import { WA_NUMBER } from "../config.js";
import { escapeHtml } from "../utils/dom.js";
import { formatNumber, formatRupiah } from "../utils/format.js";

const DEFAULT_HELP =
  "Buka game, lalu masuk ke menu profil. User ID biasanya tertulis di bawah nama akun.";
const CATEGORY_ORDER = ["Membership", "Limited Offer", "Limited Promo", "Top Up", "Battle Pass"];

/* ---------- Template helpers ---------- */

const groupTemplate = (title, count, body, open = true) => `
  <details class="gd-group"${open ? " open" : ""}>
    <summary class="gd-group__title">
      <span>${escapeHtml(title)}</span>
      <span class="gd-group__count">${count}</span>
    </summary>
    <div class="gd-group__body">${body}</div>
  </details>`;

const fieldTemplate = (field) => {
  const id = `field-${field.name}`;
  const control = field.options
    ? `<select id="${id}" name="${field.name}" class="gd-input" required>
         <option value="">Pilih ${escapeHtml(field.label.toLowerCase())}</option>
         ${field.options.map((o) => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join("")}
       </select>`
    : `<input id="${id}" name="${field.name}" type="text" class="gd-input" required autocomplete="off"
         inputmode="${field.inputmode ?? "text"}"
         placeholder="${escapeHtml(field.placeholder ?? "")}"
         ${field.pattern ? `pattern="${escapeHtml(field.pattern)}" title="${escapeHtml(field.title ?? "")}"` : ""} />`;

  return `
    <div class="gd-field">
      <label for="${id}" class="gd-label">${escapeHtml(field.label)}</label>
      ${control}
    </div>`;
};

const packageTemplate = (pkg) => `
  <label class="gd-pkg">
    <input type="radio" name="package" value="${pkg.id}" class="sr-only" required />
    <span class="gd-pkg__box">
      <span class="gd-pkg__label">${escapeHtml(pkg.label)}</span>
      ${pkg.bonus ? `<span class="gd-pkg__bonus">${escapeHtml(pkg.bonus)}</span>` : ""}
      ${pkg.detail ? `<span class="gd-pkg__detail">${escapeHtml(pkg.detail)}</span>` : ""}
      <span class="gd-pkg__price">${formatRupiah(pkg.price)}</span>
    </span>
  </label>`;

const paymentTemplate = (method) => `
  <label class="gd-pay">
    <input type="radio" name="payment" value="${method.id}" class="sr-only" required />
    <span class="gd-pay__box">
      <span class="gd-pay__logo${method.logo ? "" : " gd-pay__logo--text"}">
        ${method.logo ? `<img src="${method.logo}" alt="" loading="lazy" />` : escapeHtml(method.label)}
      </span>
      <span class="gd-pay__name">${escapeHtml(method.label)}</span>
      <span class="gd-pay__fee">${method.fee ? `Admin ${formatRupiah(method.fee)}` : "Gratis admin"}</span>
      <span class="gd-radio" aria-hidden="true"></span>
    </span>
  </label>`;

const notifyOption = (value, label, checked = false) => `
  <label class="gd-pay">
    <input type="radio" name="notify" value="${value}" class="sr-only"${checked ? " checked" : ""} />
    <span class="gd-pay__box">
      <span class="gd-pay__name">${label}</span>
      <span class="gd-radio" aria-hidden="true"></span>
    </span>
  </label>`;

const sectionHead = (num, title, extra = "") => `
  <header class="gd-card__head">
    <span class="gd-step">${num}</span>
    <h2 class="gd-card__title">${title}${extra}</h2>
  </header>`;

/* ---------- Page ---------- */

const pageTemplate = (game) => {
  const packageGroups = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: game.packages.filter((p) => p.category === cat),
  })).filter((g) => g.items.length);

  const packagesHtml = packageGroups
    .map((g) =>
      groupTemplate(
        g.cat,
        g.items.length,
        `<div class="gd-pkgs">${g.items.map(packageTemplate).join("")}</div>`,
      ),
    )
    .join("");

  const paymentsHtml = paymentGroups
    .map((name, i) => {
      const items = payments.filter((p) => p.group === name);
      return groupTemplate(
        name,
        items.length,
        `<div class="gd-pays">${items.map(paymentTemplate).join("")}</div>`,
        i === 0,
      );
    })
    .join("");

  return `
    <form id="order-form" class="gd-layout" novalidate>
      <aside class="gd-product" aria-label="Informasi game">
        <div class="gd-product__card">
          <div class="gd-product__cover">
            <img src="${escapeHtml(game.image)}" alt="${escapeHtml(game.name)}" />
          </div>
          <div class="gd-product__info">
            <span class="gd-badge">${escapeHtml(game.category)}</span>
            <h1 class="gd-product__name">${escapeHtml(game.name)}</h1>
            <p class="gd-product__desc">Top up ${escapeHtml(game.unit)} resmi dengan proses cepat dan aman.</p>
          </div>
        </div>
      </aside>

      <div class="gd-checkout">
        <section class="gd-card" aria-labelledby="step-account">
          ${sectionHead(
            1,
            `<span id="step-account">Masukkan User ID</span>`,
            `<span class="gd-tip">
               <button type="button" class="gd-tip__btn" aria-label="Bantuan cara menemukan User ID">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg>
               </button>
               <span class="gd-tip__bubble" role="tooltip">${escapeHtml(game.help ?? DEFAULT_HELP)}</span>
             </span>`,
          )}
          <div class="gd-fields">${game.fields.map(fieldTemplate).join("")}</div>
        </section>

        <section class="gd-card" aria-labelledby="step-package">
          ${sectionHead(2, "Pilih Nominal Top Up")}
          ${packagesHtml}
        </section>

        <section class="gd-card" aria-labelledby="step-payment">
          ${sectionHead(3, "Metode Pembayaran")}
          ${paymentsHtml}
        </section>

        <section class="gd-card" aria-labelledby="step-notify">
          ${sectionHead(4, "Konfirmasi Pesanan", ` <span class="gd-optional">(Opsional)</span>`)}
          <div class="gd-pays">
            ${notifyOption("whatsapp", "Kirim info via WhatsApp")}
            ${notifyOption("email", "Kirim info via email")}
            ${notifyOption("none", "Lewati", true)}
          </div>
          <div class="gd-field" data-notify="whatsapp" hidden>
            <label for="notify-wa" class="gd-label">Nomor WhatsApp</label>
            <input id="notify-wa" name="notifyWa" type="tel" class="gd-input" placeholder="08xxxxxxxxxx"
              pattern="08[0-9]{8,12}" title="Nomor WhatsApp diawali 08, 10–14 digit" disabled />
          </div>
          <div class="gd-field" data-notify="email" hidden>
            <label for="notify-email" class="gd-label">Alamat email</label>
            <input id="notify-email" name="notifyEmail" type="email" class="gd-input" placeholder="nama@email.com" disabled />
          </div>
        </section>

        <section class="gd-card" aria-labelledby="step-voucher">
          <h2 id="step-voucher" class="gd-card__title gd-card__title--plain">Kode Voucher</h2>
          <div class="gd-voucher">
            <input id="voucher-input" type="text" class="gd-input" placeholder="Masukkan kode voucher" autocomplete="off" />
            <button type="button" id="voucher-apply" class="gd-btn gd-btn--outline">Pakai</button>
          </div>
          <p id="voucher-msg" class="gd-msg" role="status" aria-live="polite"></p>
          <p class="gd-help-line">
            Butuh bantuan atau ingin order banyak sekaligus?
            <a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">Chat kami di WhatsApp</a>
          </p>
        </section>
      </div>

      <aside class="gd-summary" aria-label="Ringkasan pesanan">
        <div class="gd-summary__card">
          <h2 class="gd-summary__title">Ringkasan Pesanan</h2>

          <dl id="gd-summary-details" class="gd-summary__details">
            <div class="gd-summary__row"><dt>Game</dt><dd>${escapeHtml(game.name)}</dd></div>
            <div class="gd-summary__row"><dt>Produk</dt><dd data-summary="product">-</dd></div>
            <div class="gd-summary__row"><dt>User ID</dt><dd data-summary="user">-</dd></div>
            <div class="gd-summary__row"><dt>Pembayaran</dt><dd data-summary="payment">-</dd></div>
            <div class="gd-summary__row"><dt>Harga</dt><dd data-summary="price">-</dd></div>
            <div class="gd-summary__row"><dt>Biaya admin</dt><dd data-summary="fee">-</dd></div>
            <div class="gd-summary__row gd-summary__row--discount"><dt>Diskon voucher</dt><dd data-summary="discount">-</dd></div>
          </dl>

          <div class="gd-summary__total">
            <span class="gd-summary__total-label">Total</span>
            <strong data-summary="total">-</strong>
            <button type="button" class="gd-summary__toggle" aria-expanded="false" aria-controls="gd-summary-details">Rincian</button>
          </div>

          <button type="submit" class="gd-btn gd-btn--block gd-buy" disabled>Beli Sekarang</button>
          <p class="gd-summary__note">Pastikan data akun sudah benar. Kesalahan input User ID atau Zone ID menjadi tanggung jawab pembeli.</p>
        </div>
      </aside>
    </form>`;
};

const notFoundTemplate = () => `
  <main id="konten" class="gd-empty">
    <h1>Game tidak ditemukan</h1>
    <p>Mungkin tautannya sudah berubah atau game sedang tidak tersedia.</p>
    <a href="/" class="gd-btn">Kembali ke beranda</a>
  </main>`;

/* ---------- Behaviour ---------- */

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
  const buyBtn = form.querySelector(".gd-buy");
  const summaryEl = form.querySelector(".gd-summary");
  const toggleBtn = form.querySelector(".gd-summary__toggle");
  const voucherInput = form.querySelector("#voucher-input");
  const voucherMsg = form.querySelector("#voucher-msg");
  const setValue = (key, text) => {
    form.querySelector(`[data-summary="${key}"]`).textContent = text;
  };

  let appliedVoucher = null; // { code, label, percent }

  /* Notifikasi: tampilkan input sesuai pilihan */
  const updateNotify = () => {
    const choice = new FormData(form).get("notify");
    form.querySelectorAll("[data-notify]").forEach((wrap) => {
      const show = wrap.dataset.notify === choice;
      wrap.hidden = !show;
      wrap.querySelector("input").disabled = !show;
    });
  };

  /* Hitung total dan perbarui ringkasan */
  const update = () => {
    const data = new FormData(form);
    const pkg = game.packages.find((p) => p.id === data.get("package"));
    const payment = payments.find((p) => p.id === data.get("payment"));

    const subtotal = pkg ? pkg.price : 0;
    const fee = payment ? payment.fee : 0;
    const discount = appliedVoucher && pkg
      ? Math.round((subtotal * appliedVoucher.percent) / 100)
      : 0;
    const total = pkg ? subtotal + fee - discount : 0;

    const userParts = [data.get("uid"), data.get("zone") && `Zone ${data.get("zone")}`, data.get("server")]
      .filter(Boolean);

    setValue("product", pkg ? pkg.label + (pkg.bonus ? ` (${pkg.bonus})` : "") : "-");
    setValue("user", userParts.length ? userParts.join(" · ") : "-");
    setValue("payment", payment ? payment.label : "-");
    setValue("price", pkg ? formatRupiah(subtotal) : "-");
    setValue("fee", pkg ? (fee ? formatRupiah(fee) : "Gratis") : "-");
    setValue("discount", discount ? `- ${formatRupiah(discount)}` : "-");
    setValue("total", pkg ? formatRupiah(total) : "-");

    buyBtn.disabled = !(pkg && payment && form.checkValidity());
  };

  const setVoucherMsg = (text, type) => {
    voucherMsg.textContent = text;
    voucherMsg.className = `gd-msg gd-msg--${type}`;
  };

  form.querySelector("#voucher-apply").addEventListener("click", () => {
    const code = voucherInput.value.trim().toUpperCase();
    if (!code) {
      appliedVoucher = null;
      setVoucherMsg("Masukkan kode voucher terlebih dahulu.", "err");
    } else if (Object.hasOwn(vouchers, code)) {
      appliedVoucher = { code, ...vouchers[code] };
      setVoucherMsg(`Voucher ${code} berhasil dipakai: ${vouchers[code].label}.`, "ok");
    } else {
      appliedVoucher = null;
      setVoucherMsg("Kode voucher tidak valid atau sudah kedaluwarsa.", "err");
    }
    update();
  });

  form.addEventListener("input", update);
  form.addEventListener("change", () => {
    updateNotify();
    update();
  });

  /* Ringkasan mobile: buka/tutup rincian */
  toggleBtn.addEventListener("click", () => {
    const open = summaryEl.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(open));
    toggleBtn.textContent = open ? "Tutup" : "Rincian";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const pkg = game.packages.find((p) => p.id === data.get("package"));
    const payment = payments.find((p) => p.id === data.get("payment"));
    if (!pkg || !payment) return;

    const subtotal = pkg.price;
    const discount = appliedVoucher ? Math.round((subtotal * appliedVoucher.percent) / 100) : 0;
    const total = subtotal + payment.fee - discount;

    const notify = data.get("notify");
    const notifyLine =
      notify === "whatsapp" ? `Konfirmasi WhatsApp: ${data.get("notifyWa")}`
      : notify === "email" ? `Konfirmasi email: ${data.get("notifyEmail")}`
      : null;

    const lines = [
      `Halo Analog Store, saya mau top up ${game.name}.`,
      "",
      ...game.fields.map((f) => `${f.label}: ${data.get(f.name)}`),
      `Produk: ${pkg.label}${pkg.bonus ? ` (${pkg.bonus})` : ""}`,
      `Pembayaran: ${payment.label}`,
      `Harga: ${formatRupiah(subtotal)}`,
      `Biaya admin: ${payment.fee ? formatRupiah(payment.fee) : "Gratis"}`,
      ...(appliedVoucher ? [`Voucher: ${appliedVoucher.code} (-${formatRupiah(discount)})`] : []),
      `Total: ${formatRupiah(total)}`,
      ...(notifyLine ? ["", notifyLine] : []),
    ];

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });

  updateNotify();
  update();
}
