

let hours = 3, minutes = 0, seconds = 0;
function updateCountdown() {
    if (seconds === 0) {
        if (minutes === 0) {
            if (hours === 0) {
                clearInterval(timer);
                return;
            }
            hours--;
            minutes = 59;
        } else {
            minutes--;
        }
        seconds = 59;
    } else {
        seconds--;
    }

    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
let timer = setInterval(updateCountdown, 1000);

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slider = document.querySelector(".slider");

if (prevBtn && nextBtn && slider) {
    let position = 0;
    const slideWidth = 220;

    prevBtn.addEventListener("click", () => {
        if (position < 0) {
            position += slideWidth;
            slider.style.transform = `translateX(${position}px)`;
        }
    });

    nextBtn.addEventListener("click", () => {
        if (Math.abs(position) < (slider.scrollWidth - slider.clientWidth)) {
            position -= slideWidth;
            slider.style.transform = `translateX(${position}px)`;
        }
    });
}



function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalCount;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        setTimeout(updateCartCount, 100); 
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");
            const product = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                img: card.dataset.img,
                quantity: 1
            };

            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            
        });
    });

    if (document.getElementById("cart-items")) {
        renderCart();
    }
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    cartItems.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${product.img}" width="50"> ${product.name}</td>
            <td>$${product.price}</td>
            <td>
                <input type="number" value="${product.quantity}" min="1" class="quantity" data-id="${product.id}">
            </td>
            <td>$${product.price * product.quantity}</td>
            <td><button class="remove" data-id="${product.id}">X</button></td>
        `;

        cartItems.appendChild(row);
        totalPrice += product.price * product.quantity;
    });

    totalPriceElement.textContent = totalPrice;

    document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("change", updateQuantity);
    });

    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", removeFromCart);
    });
}

function updateQuantity(event) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === event.target.dataset.id);

    if (product) {
        product.quantity = parseInt(event.target.value);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

function removeFromCart(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== event.target.dataset.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}



console.log(localStorage.getItem("cart"));
