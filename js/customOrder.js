// Extra Information

const inputUser = document.getElementById("input-user")
const checkerBtn = document.getElementById("checker")
const loader = document.getElementById("loader")
const msgResponse = document.getElementById("msgResponse")

const GrandTotal = document.getElementById("GrandTotal")
const productPrice = document.getElementById("productPrice")
const OptionsTotalPrice = document.getElementById("OptionsTotalPrice")


let grandTotalValue = 0;
let OptionsTotalPriceValue = 0
let NewProduct = {}
let extraPrice = 0
console.log("costumerOrder")

const extraDoneDiv = document.getElementById("extra-done")
const inputDiv = document.getElementById("input-div")

// checking extra  input user
const checkInput = async () => {

    // validate input 
    if (inputUser.value.trim() === '') {

        msgResponse.textContent = "Input is required"
        msgResponse.classList.add("text-red-500")
        return;
    }

    else {


        // controlle inputs and btns
        msgResponse.textContent = ""
        loader.classList.remove("hidden")
        checkerBtn.disabled = true;
        checkerBtn.classList.add("opacity-25")

        const result = await getRespoFromChatGPt()
        // controlle inputs and btns
        loader.classList.add("hidden")
        checkerBtn.disabled = false;
        checkerBtn.classList.remove("opacity-25")

        //check if there is a error 
        if (result === false) {
            msgResponse.textContent = "there is a error in server"
            msgResponse.classList.add("text-red-500")
            setInterval(() => {
                msgResponse.textContent = ""
            }, 3000)
        }

        else {



            if (result.data.includes("True")) {
                extraPrice = Math.floor(Math.random() * 10) + 1;
                grandTotalValue = parseFloat(grandTotalValue) + extraPrice;
                OptionsTotalPriceValue = OptionsTotalPriceValue + extraPrice;
                OptionsTotalPrice.textContent = `$${OptionsTotalPriceValue.toFixed(2)}`;

                GrandTotal.textContent = `$${grandTotalValue.toFixed(2)}`;
                console.log(grandTotalValue)

                await displayMsgExtraCorrect({ name: inputUser.value, price: extraPrice.toFixed(2) })
            } else {
                inputDiv.classList.remove("hidden")
                msgResponse.textContent = `baghi t9olbni kayn chi ${inputUser.value} m3a lmakla`
            }


        }

    }
}


const HideElement = (element) => {
    element.classList.add("hidden")

}
checkerBtn.addEventListener("click", checkInput)


// check input useing chatgpt
const getRespoFromChatGPt = async () => {
    try {
        const response = await fetch("http://chat-rest-api-nodej-hoqi.vercel.app/checker", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: inputUser.value }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        // Handle the error, e.g., by logging it or displaying a message to the user
        console.error("An error occurred:", error);
        return false
        // You can also set a default result or return an error object here if needed.
    }
}




const displayMsgExtraCorrect = (extraValue) => {
    inputDiv.classList.add("hidden")
    msgResponse.textContent = "7asan jidan"
    msgResponse.classList.add("text-green-500")

    extraDoneDiv.innerHTML = ` <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">Name:${extraValue.name} | Price:${extraValue.price}</div>
    <button onclick='onClickCloseExtraInfo(${extraValue.price})' type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>`
    setInterval(() => {
        msgResponse.textContent = ""
    }, 3000)
}


const onClickCloseExtraInfo = () => {
    extraDoneDiv.innerHTML = ''
    inputDiv.classList.remove("hidden")
    OptionsTotalPriceValue -= extraPrice;
    grandTotalValue -= extraPrice;
    OptionsTotalPrice.textContent = `$${OptionsTotalPriceValue.toFixed(2)}`;
    GrandTotal.textContent = `$${grandTotalValue.toFixed(2)}`;

}

//this for bring data product and display it
window.addEventListener("load", async () => {
    // Create a URLSearchParams object from the current URL
    const urlParams = new URLSearchParams(window.location.search);

    // Get the 'id' parameter value
    const idValue = urlParams.get('id');

    const product = await findOneCustomOrder(idValue)

    console.log(product)

    const img = document.getElementById("img-product")
    const title = document.getElementById("title-product")
    const price = document.getElementById("price-product")
    NewProduct = {
        id: Math.floor(Math.random() * 80) + 20,
        name: `Extra ${product.name}`,
        category: product.category,
        // mainPrice: product.price,
        url: product.url,



    }


    img.src = product.url
    title.textContent = product.name
    price.textContent = `$${product.price}`
    productPrice.textContent = `$${product.price}`
    grandTotalValue = product.price
    GrandTotal.textContent = `$${product.price}`
});


/// get one product by id
const findOneCustomOrder = async (id) => {

    const response = await fetch("js/dummydata.json")
    const products = await response.json();
    const found = await products.find((element) => element.id === +id);

    return found
}





// get all inputs <chekcbox>
const inputOptions = document.querySelectorAll("#input-options input")

// this add function on all inputs
inputOptions.forEach((input) => {
    input.addEventListener("change", () => {
        if (input.checked) {
            const optionPrice = parseFloat(input.value);
            OptionsTotalPriceValue += optionPrice;
            grandTotalValue += optionPrice;
        } else {
            const optionPrice = parseFloat(input.value);
            OptionsTotalPriceValue -= optionPrice;
            grandTotalValue -= optionPrice;
        }
        OptionsTotalPrice.textContent = `$${OptionsTotalPriceValue.toFixed(2)}`;
        GrandTotal.textContent = `$${grandTotalValue.toFixed(2)}`;
    });
});


const reBuildExtra = (name) => {
    extraOption.forEach(() => {

    })
}

const addExtraToCart = document.getElementById("addExtraToCart")

addExtraToCart.addEventListener("click", addToCardCostomOrder)
async function addToCardCostomOrder() {
    NewProduct.price = +grandTotalValue.toFixed(2)
    NewProduct.mainPrice = +grandTotalValue.toFixed(2)

    console.log(NewProduct.price)

    //find index item that user want add it in cart 
    const index = await listCards.findIndex((cartItem) => cartItem?.id === NewProduct.id)

    // if return -1 thats mean this product not exist in cart <add it >
    if (index === -1) {

        listCards.push({ ...NewProduct, quantity: 1 })
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