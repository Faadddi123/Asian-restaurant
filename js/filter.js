
async function filterMenu(category) {

    const response = await fetch("http://localhost:5000/checker", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ "prompt": "oil" }),
    })
    const movies = await response.json();
    console.log(movies);
    const menuItems = document.querySelectorAll(".cardMenu");
    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach((button) => {
        button.classList.remove("activeButton");
    });

    filterButtons.forEach((button) => {
        if (button.textContent.toLowerCase() === category.toLowerCase()) {
            button.classList.add("activeButton");
        }
    });

    menuItems.forEach((item) => {
        const itemCategory = item.dataset.category;
        if (category === "all" || itemCategory.toLowerCase() === category.toLowerCase()) {
            item.style.display = "block"; // Show matching items
        } else {
            item.style.display = "none"; // Hide non-matching items
        }
    });
}