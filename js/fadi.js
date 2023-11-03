const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});




console.log("yassine")




const url = window.location.href;

window.addEventListener("load", () => {
  const links = document.querySelectorAll("#link-navbar");
  const mainLink = document.querySelectorAll(".mainLink")
  let found = false; // Add a flag to track if a matching link was found
  links.forEach((link) => {
    if (url === link.href) {
      link.classList.add("activeLink");
      found = true; // Set the flag to true if a matching link is found
    } else {
      link.classList.remove("activeLink");
    }
  });


  if (!found && links.length > 0) {
    console.log(mainLink)
    mainLink[0].classList.add("activeLink");
    mainLink[1].classList.add("activeLink");

  }
});

