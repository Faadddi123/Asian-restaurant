// Extra Information

const inputUser = document.getElementById("input-user")
const checkerBtn = document.getElementById("checker")
const loader = document.getElementById("loader")
const msgResponse = document.getElementById("msgResponse")










// checking input user
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
        } else {

            msgResponse.textContent = `baghi t9olbni kayn chi ${inputUser.value} m3a lmakla`
        }


    }

}
checkerBtn.addEventListener("click", checkInput)