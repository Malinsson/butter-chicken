import data from '../data/data.js';

const currencyChoice = 'sek'
const limit = 5
const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyChoice}.json`

const excludedCountries = new Set([
  'Venezuela',
  'Syria',
  'Yemen'
]);

const dataByCurrency = Object.fromEntries(
    data.map(item => [item.currency, item])
);

const exchangeRate = async () => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        const exchangeRates = Object.entries(result[currencyChoice])
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