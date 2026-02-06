// API: https://open-meteo.com/

import { getCapitalCities } from './capitalCities.js'
import { categorizeWeather } from '../helpers/helpers.js';
import { calculateAverageTemperature } from '../helpers/helpers.js'

//Get array with 7 days max temperature for specific city with koordinates
async function getWeather(latitude, longitude) {
  
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&forecast_days=7`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch weather for ${latitude} and ${longitude}`);
    }
    const data = await response.json();

    return data.daily.temperature_2m_max;
}


/// Help-function for delaying api requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to build finnished weather array
export async function getWeatherData(region) {

  const cities = await getCapitalCities(region);
  const weatherData = [];

  console.log(`Antal städer: ${cities.length}`);

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];

    try {
      const temperatures = await getWeather(city.lat, city.lon);
      const averageTemperature = calculateAverageTemperature(temperatures);
      const heatCategory = categorizeWeather(averageTemperature);

      weatherData.push({
        city: city.city,
        country: city.country,
        averageTemperature: averageTemperature,
        heatCategory: heatCategory
      });
    } catch (error) {
      console.log(`Skipping ${city.city}: ${error.message}`);
    }

    await delay(20);
  }

  return weatherData;
}