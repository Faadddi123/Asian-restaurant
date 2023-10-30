
let listCards = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

// bring btns cart and cart
let openShopping = document.getElementById('shopping');
let closeShopping = document.getElementById('closeShopping');
let listCard = document.getElementById('listCart');
let cartIcon = document.getElementById("cartIcon")
// when clcik 
closeShopping.addEventListener('click', () => {
    openShopping.classList.add('hidden');
})
cartIcon.addEventListener('click', () => {
    if (openShopping.classList.contains('hidden')) {
        return openShopping.classList.remove('hidden');
    }
    else {
        return openShopping.classList.add('hidden');
    }
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

    openShopping.classList.remove('hidden');

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
        const item = await findOne(listCards[index].id)
        listCards[index].quantity = quantity;
        listCards[index].price = quantity * item.price;
    }
    //after that update html cart 
    reloadCard();
}




/// get one product by id
const findOne = async (id) => {
    const response = await fetch("../dummydata.json")
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


    if (listCards.length === 0) {
        console.log("holad")
        let msgEmptyCart = document.createElement('p');
        msgEmptyCart.textContent = 'Cart Empty Put Some Food Asian';
        total.textContent = `$0`
        listCard.appendChild(msgEmptyCart);
        return;
    }

    // if there is a products in cart create html for it

    else {
        let count = 0;
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
            <a href="#">Throwback Hip Bag</a>
            </h3>
            <p class="ml-4">$${item.price}</p>
            </div>
            <p class="mt-1 text-sm text-gray-500">${item.category}</p>
            </div>
            <div class="flex flex-1 items-end justify-between text-sm">
            <button onclick="changeQuantity(${item.id}, ${item.quantity - 1},${false})">-</button>
            <p class="text-gray-500">Qty ${item.quantity}</p>
            <button onclick="changeQuantity(${item.id}, ${item.quantity + 1},${false})">+</button>
            <div class="flex">
            <button onclick="changeQuantity(${item.id}, ${item.quantity - 1},${true})"
             type="button"
            class="font-medium text-red-600 hover:text-red-500">Remove</button>
            </div>
            </div>
            </div>`;


                listCard.appendChild(newDiv);
            }
        })
        total.textContent = `$ ${totalPrice}`
    }
    // quantity.innerText = count;


}





// build art with items from local storage everytime  page load
window.addEventListener("load", (event) => {
    reloadCard()
});