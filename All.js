// Include api for currency change
const api = "https://v6.exchangerate-api.com/v6/1ad142f0c5b8ed06e96e106e/latest/USD";

// For selecting different controls
let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrency = document.querySelector(".from");
let toCurrency = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;

// Event when currency is changed
fromCurrency.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});

// Event when currency is changed
toCurrency.addEventListener('change', (event) => {
    resultTo = event.target.value;
});

search.addEventListener('input', updateValue);

// Function for updating value
function updateValue(e) {
    searchValue = e.target.value;
}

// When user clicks, it calls function getresults 
convert.addEventListener("click", getResults);

// Function getresults
function getResults() {
    fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(displayResults)
        .catch(error => {
            console.error("Error fetching data:", error);
            // Handle the error, e.g., display an error message to the user
        });
}

// Display results after conversion
function displayResults(currency) {
    if (currency.result === 'success') {
        let fromRate = currency.conversion_rates[resultFrom];
        let toRate = currency.conversion_rates[resultTo];

        if (searchValue && resultFrom && resultTo) {
            finalValue.value = ((toRate / fromRate) * searchValue).toFixed(2);
            finalAmount.style.display = "block";
        } else {
            // Handle the case where one of the required values is missing
            console.error("Missing required values for conversion.");
        }
    } else {
        console.error("Error in API response:", currency.error);
        // Handle the error, e.g., display an error message to the user
    }
}

// When user clicks on reset button
function clearVal() {
    window.location.reload();
    finalValue.value = "";
}
