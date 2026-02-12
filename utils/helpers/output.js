import scoreResults from "./scoring.js";
import chalk from 'chalk';
import figlet from 'figlet';

const log = console.log;

const getHeatColor = (category) => {
    switch (category) {
        case 'hot':
            return chalk.red;
        case 'warm':
            return chalk.yellow;
        case 'mild':
            return chalk.yellowBright;
        case 'cool':
            return chalk.cyan;
        case 'cold':
            return chalk.blue;
        default:
            return chalk.white;
    }
};


export const displayResults = async (userInput) => {
    const scoredResults = await scoreResults(userInput);

    log(chalk.green(figlet.textSync('Top Results:')));
    if(scoredResults.length < userInput.top) {
        log(chalk.blue(`Based on your input, only ${scoredResults.length} matching countries were found that offer the best value for money considering both exchange rates and weather conditions:\n`));
    } else {
        log(chalk.blue(`Based on your input, here are the top ${scoredResults.length} countries that offer the best value for money considering both exchange rates and weather conditions:\n`));
    }

    scoredResults.forEach((result, index) => {
        const heatColor = getHeatColor(result.heatCategory);
        log(chalk.bold(`${index + 1}. ${result.country} - Capital: ${result.city}`));
        log(`   Currency: ${result.currencyName}`);
        log(`   Exchange Rate: 1 ${userInput.currency.toUpperCase()} = ${result.value} ${result.currency.toUpperCase()}`);
        log(`   Weather: ${result.heatCategory}, ${heatColor(`Average Temperature: ${result.averageTemperature}°C`)}`);
        log(chalk.green(`   Total Score: ${(result.totalScore * 10).toFixed(2)} /10`));
        log('\n');
    });
};

export default displayResults;