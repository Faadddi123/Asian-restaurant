

document.addEventListener("DOMContentLoaded", async function () {
    const loadingOverlay = document.getElementById("loading-overlay");

    // After 2s hide Loader
    setInterval(() => {
        loadingOverlay.style.display = "none";
    }, 2000)
});
