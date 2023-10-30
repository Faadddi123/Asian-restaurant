
const invoiceTable = document.getElementById("invoice-table")

listCards.forEach(element => {
    const item = document.createElement("div")
    item.classList = "bg-white mt-7 lg:mx-14  md:mx-2 rounded-2xl text-black flex p-4 justify-between font-bold mb-4 "

    item.innerHTML = `<div class="">
    <div>
        ${element.name}
    </div>
    <div class="text-gray-400">
    ${element.category}
    </div>
    </div>
    <div class="flex justify-between lg:w-96 lg:mr-10 md:w-80 md:mr-5 sm:w-80 sm:mr-5 w-60 mr-5">
    <div>$${element.price}</div>
    <div>${element.quantity}</div>
    <div>50%</div>
    <div>$${element.price * element.quantity}</div>
    
    </div>`
    invoiceTable.appendChild(item)

});





