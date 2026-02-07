import { getWeatherData } from './utils/api/weather.js';
import { userPrompts } from './cli/prompts.js';


try {
    //Display CLI prompts and get user-input
    const userInput = await userPrompts();

    //Get weather data with user region answer
    const weatherData = await getWeatherData(userInput.region);

    //Display array for testing
    console.log(weatherData);
    console.log(weatherData.length);
    console.log(userInput);

} catch (error) {
    console.error('Error:', error.message);
}