
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