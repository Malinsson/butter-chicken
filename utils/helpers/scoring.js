import exchangeRate from "../api/exchangeRates.js";
import data from '../data/data.js';

const indexValues = data.map(item => item.index);
const indexMin = Math.min(...indexValues);
const indexMax = Math.max(...indexValues);

const exchangeRates = await exchangeRate();

const costScores = exchangeRates.map(item => {
    const normalizedIndex = (item.index - indexMin) / (indexMax - indexMin);
    const score = item.value * normalizedIndex;

    return {
        ...item,
        normalizedIndex,
        score 
    };
});

console.log(costScores);

export default costScores;
