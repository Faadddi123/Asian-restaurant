
// Create a URLSearchParams object from the current URL
const urlParams = new URLSearchParams(window.location.search);

// Get the 'id' parameter value
const idValue = urlParams.get('id');





window.addEventListener("load", async () => {
    const product = await findOne(idValue)

    console.log(product)

    const img = document.getElementById("img-product")
    const title = document.getElementById("title-product")
    const price = document.getElementById("price-product")



    img.src = product.url
    title.textContent = product.name
    price.textContent = `$${product.price}`
});


/// get one product by id
const findOne = async (id) => {

    const response = await fetch("../dummydata.json")
    const products = await response.json();
    const found = await products.find((element) => element.id === +id);

    return found
}

