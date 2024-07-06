console.log("Main.js working");

const populate = async (value, currency) => {
    let myStr = "";
    const apiKey = "cur_live_Oes4X7lnFaukusJjj1aIZ4uq0Y9fSXUNqbMkNdbQ";
    const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${currency}`;

    try {
        let response = await fetch(url);
        let rJson = await response.json();
        console.log(rJson); // Log the full response to inspect its structure

        document.querySelector(".output").style.display = "block";

        if (rJson.data) { // Check if rJson.data exists
            for (let key of Object.keys(rJson.data)) {
                myStr += ` <tr>
                            <td>${key}</td>
                            <td>${rJson.data[key].code}</td>
                            <td>${Math.round(rJson.data[key].value * value)}</td>
                        </tr>`;
            }
        } else {
            console.error("Error: Data field is missing in the API response.");
            myStr = "<tr><td colspan='3'>Error fetching data.</td></tr>";
        }

        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = myStr;

    } catch (error) {
        console.error('Error:', error);
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = "<tr><td colspan='3'>Error fetching data.</td></tr>";
    }
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;
    populate(value, currency);
});
