

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

const slider = document.querySelector(".slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

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
