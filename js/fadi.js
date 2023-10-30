const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});





console.log(url)


window.addEventListener("load", () => {
  const links = document.querySelectorAll("#link-navbar");
  const url = window.location.href;
  links.forEach((link) => {
    console.log(link.href)
    if (url === link.href) {
      link.classList.add("activeLink");
    } else {
      link.classList.remove("activeLink");
    }
  });
})
