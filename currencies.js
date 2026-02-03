const currencyChoice = 'sek'
const limit = 5
const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyChoice}.json`


const currencyByChoice = async () => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        const sorted = Object.entries(result[currencyChoice])
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit);
        console.log(sorted);
    } catch(error){
        console.log(error);
    }
};

currencyByChoice();