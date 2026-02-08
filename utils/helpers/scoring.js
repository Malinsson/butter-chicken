import filterResults from "./filter.js";
import { getWeatherScore, formatCurrency } from "./helpers.js";

export const scoreResults = async (userInput) => {
    const combinedData = await filterResults(userInput);

    if (combinedData.length === 0) {
        return [];
    }

    const WEIGHTS = { cost: 0.7, weather: 0.3 };

    // Normalize index and exchange rate values for scoring
    const indexValues = combinedData.map(item => item.index);
    const indexMin = Math.min(...indexValues);
    const indexMax = Math.max(...indexValues);

    const exchangeValues = combinedData.map(item => item.value);
    const exchangeMin = Math.min(...exchangeValues);
    const exchangeMax = Math.max(...exchangeValues);

    const scores = combinedData.map(item => {
        const normalizedIndex = indexMax === indexMin
            ? 0.5
            : (item.index - indexMin) / (indexMax - indexMin);

        const normalizedExchange = exchangeMax === exchangeMin
            ? 0.5
            : 1 - (item.value - exchangeMin) / (exchangeMax - exchangeMin);

        // Combine normalized scores with weights (70% cost, 30% weather)
        const costScore = normalizedIndex * normalizedExchange;
        const weatherScore = getWeatherScore(userInput.weather, item.heatCategory);
        const totalScore = costScore * WEIGHTS.cost + weatherScore * WEIGHTS.weather;

        return {
            ...item,
            value,
            normalizedExchange,
            normalizedIndex,
            costScore,
            weatherScore,
            totalScore
        };
    });

    return scores
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, userInput.top ?? 5);
};

export default scoreResults;

