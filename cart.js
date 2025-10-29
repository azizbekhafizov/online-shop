// cart.js — korzinka sahifasi uchun

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  attachBuyNow(); // agar kerak bo'lsa keyingi funksiyalar uchun joy
});

// Oqish va render qilish
function getCart() {
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // eski mahsulotlarda quantity bo'lmasa 1 qilib qo'yamiz
    return parsed.map(item => {
      return {
        id: String(item.id ?? Date.now().toString()),
        name: item.name ?? "No name",
        price: Number(item.price ?? item.price?.replace?.(/\$/g, "") ?? 0),
        img: item.img ?? "",
        quantity: Number(item.quantity ?? 1)
      };
    });
  } catch (e) {
    console.error("cartni o'qishda xato:", e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Jadvalga chiqarish
function renderCart() {
  const cart = getCart();
  const tbody = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");

  if (!tbody || !totalPriceEl) {
    console.warn("korzinka sahifasida kerakli elementlar topilmadi (cart-items yoki total-price).");
    return;
  }

  tbody.innerHTML = "";

  if (cart.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="5">Savat bo'sh. <a href="./index.html">Mahsulot qo'shish</a></td>`;
    tbody.appendChild(tr);
    totalPriceEl.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const row = document.createElement("tr");

    // hisoblangan umumiy narx satri uchun
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    row.innerHTML = `
      <td style="display:flex; align-items:center; gap:12px;">
        <img src="${item.img}" alt="${escapeHtml(item.name)}" width="60" height="60"/>
        <span>${escapeHtml(item.name)}</span>
      </td>
      <td>$${Number(item.price).toFixed(2)}</td>
      <td>
        <input class="quantity" data-id="${escapeHtml(item.id)}" type="number" min="1" value="${escapeHtml(item.quantity)}" />
      </td>
      <td>$${Number(itemTotal).toFixed(2)}</td>
      <td>
        <button class="remove" data-id="${escapeHtml(item.id)}">Remove</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  totalPriceEl.textContent = Number(total).toFixed(2);

  // eventlarni bog'lash
  document.querySelectorAll(".quantity").forEach(inp => {
    inp.addEventListener("change", onQuantityChange);
  });

  document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", onRemoveClick);
  });
}

// Miqdor o'zgarganda
function onQuantityChange(e) {
  const id = e.target.dataset.id;
  let val = parseInt(e.target.value || "1", 10);
  if (isNaN(val) || val < 1) val = 1;
  e.target.value = val;

  const cart = getCart();
  const idx = cart.findIndex(it => String(it.id) === String(id));
  if (idx === -1) return;

  cart[idx].quantity = val;
  saveCart(cart);
  renderCart();
  updateCartBadge(); // agar headerdagi badge bo'lsa yangilash uchun
}

// O'chirish tugmasi
function onRemoveClick(e) {
  const id = e.target.dataset.id;
  let cart = getCart();
  cart = cart.filter(it => String(it.id) !== String(id));
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

// Headerdagi cart-count yangilash (agar mavjud bo'lsa)
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const cart = getCart();
  const totalQuantity = cart.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
  badge.textContent = totalQuantity;
}

// Xavfsiz HTML escape (oddiy)
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// (Ixtiyoriy) Buy Now uchun tugma bilan ishlash (agar qo'shmoqchi bo'lsangiz)
function attachBuyNow() {
  // agar buy now tugmasi bo'lsa u yerga event qo'shish mumkin
  // masalan: document.getElementById('buy-now')?.addEventListener(...)
}
