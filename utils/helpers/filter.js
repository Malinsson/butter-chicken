import exchangeRate from "../api/exchangeRates.js";
import { getWeatherData } from "./weatherAll.js";

// Filters and combines exchange rate and weather data based on user input
export const filterResults = async (userInput) => {

    const exchangeRates = await exchangeRate(userInput.currency.toLowerCase());
    const weather = await getWeatherData(userInput.region);

    const combined = weather.map(weatherItem => {
        const rateItem = exchangeRates.find(rate => rate.country === weatherItem.country);
        
        return {
            ...weatherItem,
            ...(rateItem ??{ currency: null })
        };
        
        // Removes countries from weather data that don't have a matching currency in the exchange rates data
    }).filter(item => item.currency);
    
    return combined;
};

export default filterResults;
