import chalk from 'chalk';
import figlet from 'figlet';

export function categorizeWeather(temp) {
  if (temp >= 25) return 'hot';
  if (temp >= 20) return 'warm';
  if (temp >= 15) return 'mild';
  if (temp >= 10) return 'cool';
  return 'cold';
}

export function calculateAverageTemperature(temperatures) {
  if (temperatures.length === 0) {
    return null;
  }
  const sum = temperatures.reduce((total, temp) => total + temp, 0);
  const average = sum / temperatures.length;

  return Math.round(average * 10) / 10;
}

const weatherScale = ['cold', 'cool', 'mild', 'warm', 'hot'];

export function getWeatherScore(userPreference, heatCategory) {
  const preferredIndex = weatherScale.indexOf(userPreference);
  const heatIndex = weatherScale.indexOf(heatCategory);

  if (preferredIndex === -1 || heatIndex === -1) {
    return 0.5; // Return a neutral score if either category is invalid
  }

  const distance = Math.abs(preferredIndex - heatIndex);
  return 1 - distance / (weatherScale.length - 1);
}

export function formatCurrency(selectedCurrency, countryValue, countryCurrency) {
  return '1 ' + selectedCurrency + ' = ' + countryValue + ' ' + countryCurrency;
}

export function WelcomeMessage() {
  const title = figlet.textSync('Welcome to Butter-Chicken!');
  const subtitle = 'Find the best value for money travel destinations based on exchange rates and weather conditions.';
  return chalk.blue(`${title}\n${subtitle}`);
}
