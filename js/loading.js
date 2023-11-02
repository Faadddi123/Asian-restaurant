

document.addEventListener("DOMContentLoaded", async ()=> {
    const bodyHome = document.getElementById("body-home");
    const loadingOverlay = document.getElementById("loading-overlay");
    const isFirstVisit =  localStorage.getItem("isFirstVisit");

    //Check ifl This Is First Visit or not
    if (!isFirstVisit) {

        // loadingOverlay.style.display = "flex";

        localStorage.setItem("isFirstVisit", "true");
    } else {


        loadingOverlay.classList.add("hidden");

    }

    setTimeout(() => {
        loadingOverlay.classList.add("hidden");
    }, 2000);


    bodyHome.classList.remove("opacity-0");
});
