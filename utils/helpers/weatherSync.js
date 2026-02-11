import { getCapitalCities } from '../api/capitalCities.js';
import { getWeather } from '../api/weather.js';
import { FatalError } from '../exceptions/Fatalerror.js';
import { categorizeWeather, calculateAverageTemperature } from './helpers.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getWeatherData(region) {
  const cities = await getCapitalCities(region);
  const weatherData = [];

  let errors = 0;

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];

    try {
      const temperatures = await getWeather(city.lat, city.lon);
      const averageTemperature = calculateAverageTemperature(temperatures);
      const heatCategory = categorizeWeather(averageTemperature);

      weatherData.push({
        city: city.city,
        country: city.country,
        averageTemperature,
        heatCategory
      });
    } catch (error) {
        errors++;    
    }
    
        await delay(20);
    }

    if (weatherData.length === 0) {
        throw new FatalError('Could not fetch weather data for any cities in the selected region.');
    } 

    if(errors > 0) {
        console.log('Could not fetch ', errors, 'cities');
    }

  return weatherData;
}
