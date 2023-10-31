






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
    const productPrice = document.getElementById("productPrice")


    img.src = product.url
    title.textContent = product.name
    price.textContent = `$${product.price}`
    productPrice.textContent = `$${product.price}`
    GrandTotal.textContent = `$${product.price + OptionsTotalPrice}`
});


/// get one product by id
const findOneCustomOrder = async (id) => {

    const response = await fetch("js/dummydata.json")
    const products = await response.json();
    const found = await products.find((element) => element.id === +id);

    return found
}

