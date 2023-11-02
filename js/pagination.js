const containerMenu = document.getElementById("containerMenu")


// Define variables
const itemsPerPage = 6; // Number of items per page
let currentPage = 1;
let data = []; // Array to store the fetched data


// when page load display all menu
window.addEventListener("load", () => {
    console.log("on load")
    paginationFetch()
})
// sisko
const paginationFetch = (category = "all") => {
    fetch("js/dummydata.json")
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
    const pagination = document.getElementById("pagination");


    const styleBtn = "flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"


    // // Clear the existing sisko pagination buttons
    pagination.innerHTML = ''



    // Create "Previous" button
    const prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.classList = styleBtn
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();//create menus for current page
        }
    });
    pagination.appendChild(prevButton);

    // Create number links for pages
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.classList = styleBtn
        pageLink.textContent = i;

        //add color on current number link
        if (pageLink.textContent == currentPage) pageLink.classList.add("text-red-500")
        pageLink.addEventListener('click', () => {
            currentPage = i;

            updatePage(); //create menus for current page
        });
        pagination.appendChild(pageLink);
    }



    // Create "Next" button
    const nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.classList = styleBtn
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();//create menus  sisko for current page
        }
    });
    pagination.appendChild(nextButton);


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
    src="${item.url}" alt="${item.name}">
<div class="flex flex-col items-center my-3 space-y-2">
    <h1  class="text-gray-900 poppins text-lg">${item.name}</h1>

    <h2 class="text-gray-900 poppins text-2xl font-bold">$${item.price}</h2>
   <div >
   <button onclick="addToCard(${item.id})"
   class="bg-red-500 text-white px-6 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105">Order
   Now</button>
   <a 
   class="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent text-black  px-6 py-2  outline-red-500 poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
   href="customOrder.html?id=${item.id}"
   >Customize
   </a>
   </div>
</div>
    `
    // Append the entire structure to the document body
    containerMenu.appendChild(outerDiv);

}
