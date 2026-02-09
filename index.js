import express from 'express';
import { getWeatherData } from './utils/api/weather.js';
import { userPrompts } from './cli/prompts.js';
import scoreResults from './utils/helpers/scoring.js';

const app = express();
const port = 3000;


try {
    //Display CLI prompts and get user-input
    const userInput = await userPrompts();
    
    //Get weather data with user region answer
    //const weatherData = await getWeatherData(userInput.region);
    
    //Display array for testing
    //console.log(weatherData);
   // console.log(weatherData.length);
   // console.log(userInput);
    const result = await scoreResults(userInput);
    console.log(result);


} catch (error) {
    console.error('Error:', error.message);
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
