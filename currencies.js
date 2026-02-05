import data from './data.js';

const currencyChoice = 'sek'
const limit = 5
const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyChoice}.json`

let indexMin = Math.min(...data.map(item => item.index));
let indexMax = Math.max(...data.map(item => item.index));

const excludedCountries = new Set([
  'Venezuela',
  'Syria',
  'Yemen'
]);


const dataByCurrency = Object.fromEntries(
    data.map(item => [item.currency, item])
);

const rawCostScores = Object.values(dataByCurrency)
.map(d => 100 / d.index);

const maxCostScore = Math.max(...rawCostScores);


const currencyByChoice = async () => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        const exchangeRates = Object.entries(result[currencyChoice])
        .filter(([currency]) => dataByCurrency[currency])
        .map(([, value]) => value);
        const maxExchangeRate = Math.max(...exchangeRates);
        const sorted = Object.entries(result[currencyChoice])
        .filter(([currency]) => dataByCurrency[currency])
        .filter(([currency]) => {
          const country = dataByCurrency[currency].country;
          return !excludedCountries.has(country);
        })
        .map(([currency, value]) => {
            const costIndex = dataByCurrency[currency].index;
            const costScore = (100 / costIndex) / maxCostScore;
            const exchangeScore = Math.sqrt(value / maxExchangeRate);
            
            return {
                contry: dataByCurrency[currency].country,
                currency: dataByCurrency[currency].currencyName,
                exchangeRate: '1 ' + currencyChoice + ' = ' + value + ' ' + currency,
                bangForBuck:
                exchangeScore * 0.5 +
                costScore * 0.5
            };
        })
            .sort((a, b) => b.bangForBuck - a.bangForBuck)
            .slice(0, limit);
        console.log(sorted);
    } catch(error){
        console.log(error);
    }
};

currencyByChoice();