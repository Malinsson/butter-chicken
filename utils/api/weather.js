// API: https://open-meteo.com/

// Get array with 7 days max temperature for specific city with coordinates
export async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&forecast_days=7`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();
  return data.daily.temperature_2m_max;
}