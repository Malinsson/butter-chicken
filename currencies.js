import data from './data.js';

const currencyChoice = 'sek'
const limit = 5
const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyChoice}.json`

const dataByCurrency = Object.fromEntries(
  data.map(item => [item.currency, item])
);


const currencyByChoice = async () => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        const sorted = Object.entries(result[currencyChoice])
            .filter(([currency]) => dataByCurrency[currency])
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([currency, value]) => ({
                currency,
                value,
                ...dataByCurrency[currency]
            }));
        console.log(sorted);
    } catch(error){
        console.log(error);
    }
};

currencyByChoice();