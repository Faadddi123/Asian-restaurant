const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});



const links = document.querySelectorAll("#link-navbar");
const url = window.location.href;

console.log("fadi")




window.addEventListener("load", () => {
  links.forEach((link) => {

    if (url === link.href) {
      link.classList.add("activeLink");
      console.log(url)
      console.log(link)
      console.log("hero")
    } else {
      link.classList.remove("activeLink");
    }
  });
})
