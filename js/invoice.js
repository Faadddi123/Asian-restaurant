
let listCards = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const invoiceTable = document.getElementById("invoice-table")

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

});





const print = document.getElementById("print-btn")

print.addEventListener("click", () => {
    console.log("print")
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles.css"></head><body>');
    newWin.document.write(invoiceTable.innerHTML);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.print();
    // newWin.close();
})


