import filterResults from "./filter.js";
import { getWeatherScore, getMinMax } from "./helpers.js";

export const scoreResults = async (userInput) => {
    const combinedData = await filterResults(userInput);

    if (combinedData.length === 0) {
        return [];
    }

    // Weights for cost and weather in the final score
    const WEIGHTS = { cost: 0.65, weather: 0.35 };

    // Normalize index and exchange rate values for scoring
    const { min: indexMin, max: indexMax } = getMinMax(combinedData.map(item => item.index));
    const { min: exchangeMin, max: exchangeMax } = getMinMax(combinedData.map(item => item.value));

    const scores = combinedData.map(item => {
        const normalizedIndex = indexMax === indexMin
            ? 0.5 // If all index values are the same, assign a neutral score
            : 1 - (item.index - indexMin) / (indexMax - indexMin);

        const normalizedExchange = exchangeMax === exchangeMin
            ? 0.5 // If all exchange rates are the same, assign a neutral score
            // Inverted normalization so higher == better
            : 1 - (item.value - exchangeMin) / (exchangeMax - exchangeMin);

        const costScore = normalizedIndex * normalizedExchange;
        
        const weatherScore = getWeatherScore(userInput.weather, item.heatCategory);
        const totalScore = costScore * WEIGHTS.cost + weatherScore * WEIGHTS.weather;

        return {
            ...item,
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

