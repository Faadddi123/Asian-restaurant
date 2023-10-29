

// Add event listener to filter buttons
const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // After every click on btn loop throudth all btns and remove active class
        filterButtons.forEach((btn) => {
            btn.classList.remove("activeButton");
        });

        // Add activeButton class to the clicked button
        button.classList.add("activeButton");
        const category = button.textContent;

        paginationFetch(category)


    });
});



