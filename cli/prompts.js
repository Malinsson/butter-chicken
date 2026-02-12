import inquirer from 'inquirer'; //using inquirer@^8.2.5

//CLI prompts for user
export async function userPrompts() {
    const answers = await inquirer.prompt([
    {
        type: 'list',
        name: 'region',
        message: 'Which region are you interested in?',
        choices: ['Africa', 'Asia', 'America', 'Europe', 'Oceania']
    },
    {
        type: 'list',
        name: 'currency',
        message: 'What is your home currency?',
        choices: ['USD', 'EUR', 'GBP', 'SEK']
    },
    {
        type: 'list',
        name: 'weather',
        message: 'What weather do you prefer?',
        choices: [
        { name: 'Hot', value: 'hot' },
        { name: 'Warm', value: 'warm' },
        { name: 'Mild', value: 'mild' },
        { name: 'Cool', value: 'cool' },
        { name: 'Cold', value: 'cold' }
        ]
    },
    {
        type: 'number',
        name: 'top',
        message: 'How many recommendations do you want?',
        default: 5,
        filter: (input) => {
        if (input > 20) return 20;
        if (input < 1) return 1;
        return input;
        },
        validate: (input) => input > 0 && input <= 20 || 'Please enter a number between 1 and 20'
    }
    ]);

    return answers;
}

export async function askToContinue() {
    const answer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to search for another destination?',
            default: false
        }
    ]);

    return answer.continue;
}