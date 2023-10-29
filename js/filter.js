// ...

// Add event listener to filter buttons
const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.textContent;
        // filterMenu(category);
        paginationFetch(category)
        console.log("filterbutton")
    });
});

// ...

// Modify the filterMenu function
// async function filterMenu(category) {
//     // You can keep the code that fetches the filtered data from the server

//     const menuItems = document.querySelectorAll(".cardMenu");

//     menuItems.forEach((item) => {
//         const itemCategory = item.dataset.category;
//         if (category === "all" || itemCategory.toLowerCase() === category.toLowerCase()) {
//             item.style.display = "block"; // Show matching items
//         } else {
//             item.style.display = "none"; // Hide non-matching items
//         }
//     });
// }
