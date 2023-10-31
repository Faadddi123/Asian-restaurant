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

console.log("costumerOrder")



// checking extra  input user
const checkInput = async () => {
    console.log(inputUser.value)
    if (inputUser.value === '') return;
    else {
        msgResponse.textContent = ``
        loader.classList.remove("hidden")
        const response = await fetch("https://chat-asian-hlet.onrender.com/checker", {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin

            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({ prompt: inputUser.value })
        })
        const result = await response.json()

        console.log(result)

        loader.classList.add("hidden")

        if (result.data.includes("True")) {
            msgResponse.textContent = "7asan jidan"
            grandTotalValue = grandTotalValue + 20
        } else {

            msgResponse.textContent = `baghi t9olbni kayn chi ${inputUser.value} m3a lmakla`
        }


    }

}



checkerBtn.addEventListener("click", checkInput)








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



    img.src = product.url
    title.textContent = product.name
    price.textContent = `$${product.price}`
    productPrice.textContent = `$${product.price}`
    grandTotalValue = product.price
    GrandTotal.textContent = `$${product.price}`
});


/// get one product by id
const findOneCustomOrder = async (id) => {

    const response = await fetch("../dummydata.json")
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
