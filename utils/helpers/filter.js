import exchangeRate from "../api/exchangeRates.js";
import { getWeatherData } from "../api/weather.js";

export const filterResults = async (userInput) => {
    try {
        const exchangeRates = await exchangeRate(userInput.currency);
        const weather = await getWeatherData(userInput.region);
        const countriesInRegion = new Set(weather.map(item => item.country));

        const filteredRates = exchangeRates.filter(item =>
            countriesInRegion.has(item.country)
        );

        return filteredRates;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default filterResults;
