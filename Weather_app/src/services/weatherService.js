import axios from 'axios';

// Visual Crossing Weather API key
const API_KEY = 'JXFYVP7U57BCFXQX7ESQ6LQPK';

/**
 * Fetch weather data from Visual Crossing Weather API
 * @param {string} location - City name or address
 * @returns {Promise} Weather data object
 */
export const fetchWeather = async (location) => {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&contentType=json&key=${API_KEY}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error('Location not found. Please try another search.');
    }
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};

/**
 * Get coordinates for a location (optional helper)
 * @param {string} location - City name or address
 * @returns {Promise} Coordinates object
 */
export const getLocationCoordinates = async (location) => {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          q: location,
          format: 'json'
        }
      }
    );

    if (response.data.length === 0) {
      throw new Error('Location not found');
    }

    return {
      latitude: response.data[0].lat,
      longitude: response.data[0].lon
    };
  } catch (error) {
    throw new Error('Unable to get location coordinates');
  }
};
