const openBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");
const closeBtn = modal.querySelector(".close-btn");

openBtn.addEventListener("click", () => {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  closeBtn.focus();
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  openBtn.focus();
});

// Закрытие модального окна по клику вне модального контента
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeBtn.click();
  }
});

// Закрытие по клавише Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeBtn.click();
  }
});

const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const dots = document.querySelectorAll(".slider-dots .dot");
let currentIndex = 0;

function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Обновляем положение слайдов
    const slidesContainer = document.querySelector(".slides");
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
        dot.tabIndex = i === index ? 0 : -1;
    });

    currentIndex = index;
}

prevBtn.addEventListener("click", () => {
    showSlide(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
    showSlide(currentIndex + 1);
});

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        showSlide(i);
    });
    dot.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            showSlide((i + 1) % slides.length);
            dots[(i + 1) % slides.length].focus();
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            showSlide((i - 1 + slides.length) % slides.length);
            dots[(i - 1 + slides.length) % slides.length].focus();
        }
    });
});

// Показываем первый слайд по умолчанию
showSlide(0);

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.936232, 46.206742],
    zoom: 15,
    controls:['zoomControl', 'typeSelector', 'trafficControl','fullscreenControl','geolocationControl']
  });
  // navigator.geolocation.getCurrentPosition(
  //   function (position) {
  //     var userLocation = [position.coords.latitude, position.coords.longitude];
  //     myMap.setCenter(userLocation);
  //     myMap.geoObjects.add(
  //       new ymaps.Placemark(userLocation, {
  //         balloonContent: "Вы здесь!",
  //       })
  //     );
  //   },
  //   function (error) {
  //     console.error("Ошибка получения геолокации: ", error);
  //   }
  // );
  var placemark1 = new ymaps.Placemark([55.93, 46.21], {
    balloonContent: "Маркер 1: Москва",
  });

  var placemark2 = new ymaps.Placemark([55.7, 37.5], {
    balloonContent: "Маркер 2",
  });

  myMap.geoObjects.add(placemark1);
  myMap.geoObjects.add(placemark2);
}
