import data from '../data/data.js';

const dataByCurrency = Object.fromEntries(
    data.map(item => [item.currency, item])
);

// Fetches exchange rates for a given currency and filters them based on the available data in our dataset. Currency by user input, defaults to sek if none provided
const exchangeRate = async (currencyChoice = 'sek') => {
    try {
        const currency = currencyChoice.toLowerCase();
        const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
        const response = await fetch(url);
        const result = await response.json();
        const exchangeRates = Object.entries(result[currency])
            //Filter out currencies that we don't have data for in our dataset
            .filter(([currency]) => dataByCurrency[currency])
            .map(([currency, value]) => ({
                currency,
                value,
                ...dataByCurrency[currency]
            }));
        return exchangeRates;
    } catch(error){
        console.log(error);
        return [];
    }
};

export default exchangeRate;