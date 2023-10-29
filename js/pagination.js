const containerMenu = document.getElementById("containerMenu")


// Define variables
const itemsPerPage = 4; // Number of items per page
let currentPage = 1;
let data = []; // Array to store the fetched data


// when page load display all menu
window.addEventListener("load", () => {
    console.log("on load")
    paginationFetch()
})

const paginationFetch = (category = "all") => {
    fetch("../dummydata.json")
        .then((response) => response.json())
        .then((fetchedData) => {
            if (category === "all") {
                data = fetchedData;
                currentPage = 1
                updatePage(); // Call the function to display the initial page
            }
            else {

                data = fetchedData.filter((item) => item.category === category);
                currentPage = 1
                updatePage(); // Call the function to display the initial page
            }

        })
        .catch((error) => {
            console.error("Error fetching Product:", error);
        });
}

// Function to update the page with the current data
function updatePage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const containerMenu = document.getElementById("containerMenu")

    // Clear the existing content on the page
    containerMenu.innerHTML = ''
    // Thought to Product Create menu elements for the current page's data
    for (const item of data.slice(startIndex, endIndex)) {
        createMenuElement(item);
    }

    // Create pagination buttons or links
    createPaginationButtons();
}





function createPaginationButtons() {
    const totalPages = Math.ceil(data.length / itemsPerPage);




    document.getElementById("prevBtn").addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();

        }
    });



    document.getElementById("currentPage").textContent = currentPage


    document.getElementById("nextBtn").addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();



        }

    });

}





// this function response for 
async function createMenuElement(item) {


    // Create the outer div element
    const outerDiv = document.createElement("div");
    outerDiv.className = "cardMenu bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative";
    outerDiv.dataset.category = item.category.toLowerCase(); // Ensure category is in lowercase for case-insensitive comparison
    outerDiv.innerHTML = `<span
    class="bg-red-100 border border-red-500 rounded-full text-red-500 text-sm poppins px-4 py-1 inline-block mb-4 ">${item.category}</span><img
    class="w-64 mx-auto transform transition duration-300 hover:scale-105"
    src="assets/menu/m2.png" alt="">
<div class="flex flex-col items-center my-3 space-y-2">
    <h1 class="text-gray-900 poppins text-lg">${item.name}</h1>

    <h2 class="text-gray-900 poppins text-2xl font-bold">$9.99</h2>
    <button onclick="addToCard(${item.id})"
        class="bg-red-500 text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105">Order
        Now</button>
</div>
    `
    // Append the entire structure to the document body
    containerMenu.appendChild(outerDiv);

}
