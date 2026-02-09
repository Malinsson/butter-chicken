import { userPrompts } from './cli/prompts.js';
import { WelcomeMessage } from './utils/helpers/helpers.js';
import displayResults from './utils/helpers/output.js';

try {
    console.log(WelcomeMessage());
    
    //Display CLI prompts and get user-input
    const userInput = await userPrompts();
    
    //Get weather data with user region answer
    //const weatherData = await getWeatherData(userInput.region);
    
    //Display array for testing
    //console.log(weatherData);
   // console.log(weatherData.length);
   // console.log(userInput);
    const result = await displayResults(userInput);


} catch (error) {
    console.error('Error:', error.message);
}
