import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

/**
 * Fetches current weather and 5-day forecast data for given coordinates.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @returns {Promise<{current: object, forecast: object}>}
 */
export const fetchWeatherByCoords = async (lat, lon) => {
    const currentWeatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
        // Fetch both endpoints in parallel for efficiency
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            axios.get(currentWeatherUrl),
            axios.get(forecastUrl)
        ]);

        return {
            current: currentWeatherResponse.data,
            forecast: forecastResponse.data
        };
    } catch (error) {
        console.error("Error fetching weather data by coordinates:", error);
        throw error; // Re-throw to be handled by the calling component
    }
};

/**
 * Fetches geographic coordinates for a given city name.
 * @param {string} city - The name of the city.
 * @returns {Promise<Array>} A list of matching locations.
 */
export const fetchCoordsByCity = async (city) => {
    const url = `${GEO_URL}/direct?q=${city}&limit=5&appid=${API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching coordinates by city:", error);
        throw error;
    }
};
