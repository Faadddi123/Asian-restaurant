
// let listCards = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

console.log(listCards.length)



const invoiceTable = document.getElementById("invoice-table")
const totalInvoice = document.getElementById("totalInvoice")
const SubtotalInvoice = document.getElementById("Subtotal-invoice")

let SubtotalInvoiceValue = 0
if (listCards.length != 0) {


    listCards.forEach(element => {
        const item = document.createElement("div")
        item.classList = "bg-white mt-7 lg:mx-14  md:mx-2 rounded-2xl text-black flex p-4 justify-between font-bold mb-4 "

        item.innerHTML = `<div class="">
        <div>
        <a href="${window.location.origin}/customOrder.html?id=${element.id}">${element.name}</a>
        
        </div>
        <div class="text-gray-400">
        ${element.category}
    </div>
    </div>
    <div class="flex justify-between lg:w-96 lg:mr-10 md:w-80 md:mr-5 sm:w-80 sm:mr-5 w-60 mr-5">
    <div>$${element.price}</div>
    <div>${element.quantity}</div>
    <div>$${element.price * element.quantity}</div>
    
    </div>`
        invoiceTable.appendChild(item)
        SubtotalInvoiceValue = SubtotalInvoiceValue + (element.price * element.quantity)
    });

    SubtotalInvoice.textContent = `${SubtotalInvoiceValue.toFixed(2)}$`


    const percntage = (5 / 100) * (SubtotalInvoiceValue);
    const grandTotal = SubtotalInvoiceValue + 32 + percntage
    totalInvoice.textContent = `${grandTotal.toFixed(2)}$`

} else {
    //Ret container wher i put all toast
    const toastContainerInvoice = document.getElementById("toast-invoice");
    toastContainerInvoice.classList.remove("hidden")
    // Remove the 'hidden' class to make the container visible


    toastContainerInvoice.innerHTML = ''

    toastContainerInvoice.innerHTML = `
    <div id="toast-danger" class=" z-30 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">Cart Empty.</div>
    <a href='menu.html' type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </a>
</div> 
    
`;


}




const print = document.getElementById("print-btn")
const header = document.getElementById("header")
const footer = document.getElementById("footer")

print.addEventListener("click", () => {

    //hide banner and footer to avoid print theme
    header.classList.add("hidden")
    footer.classList.add("hidden")


    window.print();

    //display theme after print
    header.classList.remove("hidden")
    footer.classList.remove("hidden")

})


