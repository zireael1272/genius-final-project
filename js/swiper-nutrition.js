window.initNutritionSwiper = () => {
  if (window.nutritionSwiper instanceof Swiper) {
    window.nutritionSwiper.destroy(true, true);
  }

  window.nutritionSwiper = new Swiper(".product__slider", {
    slidesPerView: 2,
    spaceBetween: 16,
    grid: {
      rows: 3,
      fill: "row",
    },
    slidesPerGroup: 2,

    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 32,
        slidesPerGroup: 4,
        grid: {
          rows: 2,
          fill: "row",
        },
      },
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    observer: true,
    observeParents: true,
  });
};

// Запускаем при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  window.initNutritionSwiper();
});
