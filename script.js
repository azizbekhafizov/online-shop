// Modal ochish
function modalFn() {
  const modal = document.querySelector(".modal");
  if (modal) modal.style.display = "flex";
}

// Modal yopish
function closeModal(event) {
  const modal = document.querySelector(".modal");
  if (!modal) return;

  if (
    event?.target?.classList?.contains("modal") ||
    event?.target?.classList?.contains("close")
  ) {
    modal.style.display = "none";
  }
}

// Savatdagi mahsulotlar
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Savat soni elementini olish
const cartCount = document.getElementById("cart-count");

// Cart sonini yangilash
function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
updateCartCount();

// Har bir "Add to Cart" tugmasiga event biriktirish
document.querySelectorAll(".button-64").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    if (!card) {
      console.warn("❗ .card topilmadi");
      return;
    }

    // Agar kartada data atributlar bo'lmasa, ularni DOMdan o'qish
    const product = {
      id: card.dataset.id || Date.now().toString(),
      name:
        card.dataset.name ||
        card.querySelector("h3")?.textContent?.trim() ||
        "No name",
      price:
        card.dataset.price ||
        card.querySelector("p")?.textContent?.replace("$", "")?.trim() ||
        "0",
      img:
        card.dataset.img ||
        card.querySelector("img")?.getAttribute("src") ||
        "",
    };

    // Agar mahsulot allaqachon savatda bo‘lmasa, qo‘shish
    const exists = cart.find((item) => item.id === product.id);

    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${product.name} savatga qo‘shildi 🛒`);
    } else {
      alert(`${product.name} allaqachon savatda mavjud ✅`);
    }
  });
});

// Flash Sales uchun vaqt hisoblagich
let hours = 3;
let minutes = 0;
let seconds = 0;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateTimer() {
  if (!hoursEl || !minutesEl || !secondsEl) return;

  if (seconds > 0) seconds--;
  else if (minutes > 0) {
    minutes--;
    seconds = 59;
  } else if (hours > 0) {
    hours--;
    minutes = 59;
    seconds = 59;
  } else {
    clearInterval(timer);
  }

  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

const timer = setInterval(updateTimer, 1000);

// Sahifani yuklanganda Home, Sales, Products ko‘rsatish
window.addEventListener("load", () => {
  const home = document.querySelector(".home");
  const sales = document.querySelector(".flash-sales");
  const product = document.querySelector("#product");

  if (home) home.style.display = "flex";
  if (sales) sales.style.display = "block";
  if (product) product.style.display = "block";
});
