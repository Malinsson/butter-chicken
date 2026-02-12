import { userPrompts, askToContinue } from './cli/prompts.js';
import { GoodbyeMessage, WelcomeMessage } from './utils/helpers/helpers.js';
import displayResults from './utils/helpers/output.js';
import { FatalError } from './utils/exceptions/FatalError.js'
import ora from 'ora';
import chalk from 'chalk';

let continueApp;

let spinner;

console.log(WelcomeMessage());

do {

    continueApp = false;

    try {
    
    //Display CLI prompts and get user-input
    const userInput = await userPrompts();

    spinner = ora('Fetching top results...').start();
    
    //Process the user input and display results
    const result = await displayResults(userInput);

    spinner.stop();

    continueApp = await askToContinue();

    } catch (error) {
        if (error instanceof FatalError){
            console.error(chalk.red('Fatal error:'), error.message);
            console.error(chalk.red('The application will now exit.'));
            process.exit(1);
        } else {

            console.log(chalk.yellow('Error: '), error.message);
        }

    } finally {
        if (spinner) {
            spinner.stop();
        }
    }

} while (continueApp);

console.log(GoodbyeMessage());