import { userPrompts, askToContinue } from './cli/prompts.js';
import { GoodbyeMessage, WelcomeMessage } from './utils/helpers/helpers.js';
import displayResults from './utils/helpers/output.js';

let continueApp = false;

do {

try {
    console.log(WelcomeMessage());
    
    //Display CLI prompts and get user-input
    const userInput = await userPrompts();
    
    //Process the user input and display results
    const result = await displayResults(userInput);
    
    continueApp = await askToContinue();

} catch (error) {
    console.error('Error:', error.message);
}

} while (continueApp);

console.log(GoodbyeMessage());