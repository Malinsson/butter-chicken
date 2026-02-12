# Butter Chicken
Do you dream of eating your favorite dish in its country of origin, dramatically taking the first bite while whispering “this is how it’s meant to taste”… only to realize you have no idea if you just paid three days’ salary for it? Or whether you’ll be enjoying it under perfect blue skies, monsoon chaos, or a heatwave that turns your naan into a survival tool? Culinary ambition is great — financial and meteorological surprises, less so.

Butter Chicken is a CLI app that recommends travel destinations by combining live exchange rates, cost index data, and current weather. It ranks countries that offer strong value for money and match your preferred climate.

## Features

- CLI prompts for region, home currency, and weather preference
- Live exchange rates and 7-day max temperature averages
- Weighted scoring for cost and weather fit
- Clear, ranked output with scores

## Requirements

- Node.js 18+ (for built-in `fetch`)

## Dependencies

- Runtime: `chalk`, `figlet`, `inquirer`, `ora`
- Dev: `nodemon`

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

## How it works

1. Fetches capital cities by region from RestCountries.
2. Pulls 7-day max temperatures from Open-Meteo and averages them per city.
3. Fetches live exchange rates and merges them with a cost index dataset.
4. Scores each country using weighted cost and weather fit.
5. Displays the top results.

## Data sources

- RestCountries: https://restcountries.com/
- Open-Meteo: https://open-meteo.com/
- Currency API: https://github.com/fawazahmed0/currency-api

## Notes

- If no countries match the chosen filters, the app will prompt you to try again.
- Some countries may be skipped if API data is unavailable.
