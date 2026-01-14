document.addEventListener("DOMContentLoaded", () => {
  const desktopSortBtns = document.querySelectorAll(".sort-btn");
  const mobileSortBtn = document.getElementById("mobileSortBtn");
  const mobileSortItems = document.querySelectorAll(".mobile-sort-item");
  const mobileSortModal = document.getElementById("mobileSortModal");
  const mobileCurrentSortText = document.querySelector(".current-sort-value");
  const productsContainer = document.getElementById("product-container");

  let initialProducts = [];

  const saveInitialProducts = () => {
    if (initialProducts.length === 0 && window.nutritionSwiper) {
      initialProducts = [...window.nutritionSwiper.slides];
    }
  };
  setTimeout(saveInitialProducts, 500);

  const performSorting = (category) => {
    if (initialProducts.length === 0 && window.nutritionSwiper) {
      initialProducts = [...window.nutritionSwiper.slides];
    }

    if (!window.nutritionSwiper) return;

    let products = [...window.nutritionSwiper.slides];

    switch (category) {
      case "Popularity":
        products.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
        break;
      case "Cheaper first":
        products.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
        break;
      case "More expensive first":
        products.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
        break;
      case "By name":
        products.sort((a, b) => {
          const nameA = a.querySelector(".product__description").textContent.trim();
          const nameB = b.querySelector(".product__description").textContent.trim();
          return nameA.localeCompare(nameB);
        });
        break;
      case "New ones first":
        if (initialProducts.length > 0) {
          products = [...initialProducts];
        }
        break;
    }

    window.nutritionSwiper.destroy(true, true);

    productsContainer.innerHTML = "";
    products.forEach((el) => {
      el.style.marginRight = "";
      el.style.marginTop = "";
      productsContainer.appendChild(el);
    });

    window.initNutritionSwiper();
  };

  const updateActiveState = (selectedCategory) => {
    desktopSortBtns.forEach((btn) => {
      if (btn.textContent.trim() === selectedCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    mobileSortItems.forEach((item) => {
      const itemText = item.innerText.trim();
      if (itemText.includes(selectedCategory)) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    if (mobileCurrentSortText) {
      mobileCurrentSortText.textContent = selectedCategory;
    }
  };

  if (mobileSortBtn && mobileSortModal) {
    mobileSortBtn.addEventListener("click", () => {
      mobileSortModal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });

    mobileSortModal.addEventListener("click", (e) => {
      if (e.target === mobileSortModal) {
        mobileSortModal.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

  desktopSortBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.textContent.trim();
      performSorting(category);
      updateActiveState(category);
    });
  });

  mobileSortItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const fullText = e.currentTarget.innerText;
      let category = "";

      desktopSortBtns.forEach((btn) => {
        if (fullText.includes(btn.textContent.trim())) {
          category = btn.textContent.trim();
        }
      });

      if (!category) category = "New ones first";

      performSorting(category);
      updateActiveState(category);

      if (mobileSortModal) {
        mobileSortModal.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  });
});
