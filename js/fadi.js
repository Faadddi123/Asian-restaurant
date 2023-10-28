const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const cartIcon = document.querySelector(".fa-shopping-cart");
const orderDropdown = document.getElementById("order-dropdown");

// Toggle the dropdown menu when the cart icon is clicked
cartIcon.addEventListener("click", () => {
  orderDropdown.classList.toggle("hidden");
});
