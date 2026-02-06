import { getWeatherData } from './utils/api/weather.js';

//Test code for getting average weather data 
//for each city choosen by region
const region = 'asia';
const results = await getWeatherData(region);

console.log(results);
console.log(results.length);