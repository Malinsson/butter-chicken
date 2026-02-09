import { userPrompts } from './cli/prompts.js';
import { WelcomeMessage } from './utils/helpers/helpers.js';
import displayResults from './utils/helpers/output.js';

try {
    console.log(WelcomeMessage());
    
    //Display CLI prompts and get user-input
    const userInput = await userPrompts();
    
    //Process the user input and display results
    const result = await displayResults(userInput);

} catch (error) {
    console.error('Error:', error.message);
}
