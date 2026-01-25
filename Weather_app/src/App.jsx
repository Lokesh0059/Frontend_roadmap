import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchWeather, getLocationCoordinates } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import HourlyForecast from './components/HourlyForecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './styles/App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  // Fetch weather data
  const handleWeatherFetch = async (searchLocation) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeather(searchLocation);
      setWeatherData(data);
      setLocation(searchLocation);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location on mount
  useEffect(() => {
    const getUserLocation = () => {
      const attemptGeolocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await response.json();
                const city = data.address.city || data.address.town || data.address.county || 'Current Location';
                setCurrentLocation(city);
                handleWeatherFetch(city);
              } catch (err) {
                console.error('Error getting location name:', err);
                handleWeatherFetch('Bhaktapur,NP'); // Fallback
              }
            },
            (error) => {
              console.error('Geolocation error:', error);
              // Fallback to a default location
              handleWeatherFetch('Bhaktapur,NP');
            }
          );
        } else {
          // Geolocation not supported
          handleWeatherFetch('Bhaktapur,NP');
        }
      };

      // Start geolocation immediately
      attemptGeolocation();
    };

    getUserLocation();
  }, []);

  return (
    <div className="app">
      <motion.header
        className="app-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Weather App</h1>
        <p className="subtitle">Check the weather anywhere</p>
      </motion.header>

      <motion.div
        className="app-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SearchBar onSearch={handleWeatherFetch} />

        {error && <ErrorMessage message={error} />}
        
        {loading ? (
          <LoadingSpinner />
        ) : !weatherData ? (
          <div style={{ textAlign: 'center', color: 'white', padding: '40px', fontSize: '1.1rem' }}>
            <p>Loading weather data...</p>
          </div>
        ) : (
          <>
            <WeatherDisplay data={weatherData} location={location} />
            {weatherData.days && weatherData.days[0] && weatherData.days[0].hours && (
              <HourlyForecast forecast={weatherData.days[0].hours} />
            )}
            
            <motion.button
              className="refresh-btn"
              onClick={() => handleWeatherFetch(location)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Refresh
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default App;
