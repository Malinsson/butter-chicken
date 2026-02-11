import { userPrompts, askToContinue } from './cli/prompts.js';
import { GoodbyeMessage, WelcomeMessage } from './utils/helpers/helpers.js';
import displayResults from './utils/helpers/output.js';
import { FatalError } from './utils/exceptions/Fatalerror.js'

let continueApp;

console.log(WelcomeMessage());

do {

    continueApp = false;

try {
    
    //Display CLI prompts and get user-input
    const userInput = await userPrompts();
    
    //Process the user input and display results
    const result = await displayResults(userInput);
    
    continueApp = await askToContinue();

} catch (error) {
    if (error instanceof FatalError){
        console.error('Fatal error:', error.message);
        process.exit(1);
    } else {

        console.log('Error: ', error.message)
    }
}

} while (continueApp);

console.log(GoodbyeMessage());