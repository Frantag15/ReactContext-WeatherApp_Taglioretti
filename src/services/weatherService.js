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
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b12367f5915129711bcc1fd0e3df2e54&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b12367f5915129711bcc1fd0e3df2e54&units=metric`;

    try {
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
        throw error;
    }
};


/**
 * Fetches geographic coordinates for a given city name.
 * @param {string} city - The name of the city.
 * @returns {Promise<Array>} A list of matching locations.
 */
export const fetchCoordsByCity = async (city) => {
    if (!city) {
      throw new Error("City name cannot be empty");
    }
  
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=b12367f5915129711bcc1fd0e3df2e54`;

  
    try {
      const response = await axios.get(url);
  
      if (response.data.length === 0) {
        throw new Error("No locations found for this city");
      }
  
      return response.data; // devuelve un array de objetos con name, lat, lon, country
    } catch (error) {
      console.error("Error fetching coordinates by city:", error.message || error);
      throw new Error("Failed to fetch locations. Please try again.");
    }
  };