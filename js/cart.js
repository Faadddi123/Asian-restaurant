
let listCards = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

// bring btns cart and cart
let openShopping = document.getElementById('shopping');
let closeShopping = document.getElementById('closeShopping');
let listCard = document.getElementById('listCart');
let cartIcon = document.getElementById("cartIcon")
let btnCheckout = document.getElementById("btn-Checkout")


// when clcik close btn on cart 
closeShopping.addEventListener('click', () => {
    // Hide cart
    openShopping.classList.add('hidden');
})

// when clcik on cart icon <remove hide class or add it>
cartIcon.addEventListener('click', () => {

    if (openShopping.classList.contains('hidden')) {
        return openShopping.classList.remove('hidden');
    }
    else {
        return openShopping.classList.add('hidden');
    }
})

//when user click on btn checkout in cart
btnCheckout.addEventListener("click", () => {
    onCheckoutBtn()
})



// this function add product to cart
async function addToCard(id) {

    //find index item that user want add it in cart 
    const index = await listCards.findIndex((cartItem) => cartItem?.id === id)
    console.log(index)
    // if return -1 thats mean this product not exist in cart <add it >
    if (index === -1) {
        const item = await findOne(id)
        listCards.push({ ...item, quantity: 1 })

    }
    else {
        // if product already in cart incress it with 1
        listCards[index].quantity = listCards[index].quantity + 1

    }
    //after that update html cart
    reloadCard();
    //display toast 
    displayMsgProductAdded()
    // openShopping.classList.remove('hidden');
    displayCartNotification()
}
console.log("cart")

//this for display and change value length items in cart
const displayCartNotification = () => {
    const notificationCart = document.getElementById("cart-Notification")
    if (listCards.length > 0) {

        notificationCart.classList.remove("hidden")
        notificationCart.textContent = listCards.length
    } else {

        notificationCart.classList.add("hidden")
        notificationCart.textContent = listCards.length
    }
}





//this function for change quantity  by pasisng 2 parametrs
// id &  new quantity
async function changeQuantity(id, quantity, isRemove) {

    //loop throuth cart to find index product
    const index = await listCards.findIndex((cartItem) => cartItem?.id === id)


    if (isRemove) {
        listCards.splice(index, 1)

    }


    else if (quantity == 0) {
        listCards.splice(index, 1)

    } else {
        const item = listCards[index]

        if (item.mainPrice) {
            console.log("main")
            console.log(item)
            listCards[index].quantity = quantity;
            listCards[index].price = item.mainPrice * quantity

        } else {
            const itemMA = await findOne(id)
            listCards[index].quantity = quantity;
            listCards[index].price = itemMA.price * quantity
            console.log(listCards[index])
        }



    }
    //after that update html cart 
    reloadCard();
}




/// get one product by id
const findOne = async (id) => {
    const response = await fetch("js/dummydata.json")
    const products = await response.json();
    const found = await products.find((element) => element.id === id);
    return found
}




// mapping throught listCards and build html everytime we edit data 
//"incress decressmnt and remove .."
const reloadCard = () => {


    // update localstorage
    const updater = listCards;
    localStorage.setItem("cart", JSON.stringify(updater))
    const total = document.getElementById("totalPrice")

    //clear container cart
    listCard.innerHTML = '';
    console.log(listCards)

    displayCartNotification()
    if (listCards.length === 0) {
        console.log("holad")
        let msgEmptyCart = document.createElement('p');
        msgEmptyCart.textContent = 'Cart Empty Put Some Food Asian';
        total.textContent = `$0`
        listCard.appendChild(msgEmptyCart);
        openShopping.classList.add('hidden');
        return;
    }

    // if there is a products in cart create html for it

    else {

        let totalPrice = 0;
        listCards.forEach((item) => {
            totalPrice = totalPrice + item.price;
            // count = count + item.quantity;
            if (item != null) {
                let newDiv = document.createElement('li');
                newDiv.classList = "flex py-6"
                newDiv.innerHTML = ` <div
            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img src="${item.url}"
            alt="${item.name}"
            class="h-full w-full object-cover object-center">
            </div>
            
            <div class="ml-4 flex flex-1 flex-col">
            <div>
            <div class="flex justify-between text-base font-medium text-gray-900">
            <h3>
            <a">${item.name}</a>
            </h3>
            <p class="ml-4">$ ${item.price}</p>
            </div>
            <p class="mt-1 text-sm text-gray-500">${item.category}</p>
            </div>
            <div class="flex flex-1 items-end justify-between text-sm">
            <button onclick="changeQuantity(${item.id}, ${item.quantity - 1},${false})">-</button>
            <p class="text-gray-500">Qty ${item.quantity}</p>
            <button onclick="changeQuantity(${item.id}, ${item.quantity + 1},${false})">+</button>
            <div class="flex">
            <button onclick="changeQuantity(${item.id}, ${item.quantity},${true})"
             type="button"
            class="font-medium text-red-600 hover:text-red-500">Remove</button>
            </div>
            </div>
            </div>`;


                listCard.appendChild(newDiv);
            }
        })
        total.textContent = `$ ${totalPrice.toFixed(2)}`
    }
    // quantity.innerText = count;


}






// build art with items from local storage everytime  page load
window.addEventListener("load", (event) => {
    reloadCard()
});




// This Fun To Display Toast When user add item to cart
const displayMsgProductAdded = () => {

    //Ret container wher i put all toast
    const toastContainer = document.getElementById("toast-NewProduct");

    // Remove the 'hidden' class to make the container visible
    toastContainer.classList.remove('hidden');


    // Add Html To Toast Card
    const cardToast = document.createElement("div");
    cardToast.classList = "transform scale-0 transition-transform duration-500 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow "
    cardToast.innerHTML = ` 
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    
    <div class="ml-3 text-sm font-normal">Added!.</div>
    
`;
    // Add the toast to the container
    toastContainer.appendChild(cardToast);

    // Trigger a reflow to apply the initial scale
    cardToast.offsetWidth;

    // wdd the scale-100 class to animate scrolling
    cardToast.classList.add('scale-100');

    // Remove the toast message after a certain time
    setTimeout(() => {
        cardToast.classList.remove('scale-100');

        // Remove the toast message after the animation completes
        cardToast.addEventListener('transitionend', () => {
            cardToast.remove();

            // If there are no more toasts, Hide it
            if (toastContainer.children.length === 0) {
                toastContainer.classList.add('hidden');
            }
        });
    }, 1500);
}



//this function display msg when user clcik on checkout btn
const modle = document.getElementById("modle-Checkout")
const modleBody = document.createElement("div")

// this function work when user click on chechout btn in cart
const onCheckoutBtn = () => {
    modleBody.classList = "z-[998] fixed top-10 left-0 right-0 flex  bg-black/10 pt-10 px-8 w-full  items-start justify-center h-screen"
    console.log(listCards.length)

    //if cart not empty display msg thank you
    if (listCards.length > 0) {

        modleBody.innerHTML = `
        <div id="toast-success" class="z-[998] flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow " role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">Thank You!.</div>
    <button onclick='remove(modleBody)' type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8  " data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>`
        modle.appendChild(modleBody)
        listCards = []
        openShopping.classList.add('hidden');
        reloadCard()
    }

    //if cart  empty display msg error

    else {
        modleBody.innerHTML = `
        <div id="toast-danger" class=" z-[998] flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow " role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
            <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Cart Empty.</div>
        <button onclick='remove(modleBody)' type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#toast-danger" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>`
        modle.appendChild(modleBody)
        openShopping.classList.add('hidden');
    }
}

//this function remove element from html by passing elemnt want remove
const remove = (element) => {
    element.remove()

}