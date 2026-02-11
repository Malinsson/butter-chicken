import data from '../data/data.js';
import { FatalError } from '../exceptions/Fatalerror.js'

const dataByCurrency = Object.fromEntries(
    data.map(item => [item.currency, item])
);

// Fetches exchange rates for a given currency and filters them based on the available data in our dataset. Currency by user input, defaults to sek if none provided
const exchangeRate = async (currencyChoice = 'sek') => {

    const currency = currencyChoice.toLowerCase();
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;

    let response;
    try {
        response = await fetch(url);
    } catch (error) {
        throw new FatalError('Could not connect to Currency API.');
    }

    if (!response.ok) {
        throw new FatalError(`Currency API error: ${response.status}`);
    }

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
};

export default exchangeRate;