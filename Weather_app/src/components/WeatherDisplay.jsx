import React from 'react';
import { motion } from 'framer-motion';
import '../styles/WeatherDisplay.css';

function WeatherDisplay({ data, location }) {
  // Null safety check
  if (!data || !data.days || data.days.length === 0) {
    return <div className="weather-display"><p>No weather data available</p></div>;
  }

  const currentDay = data.days[0];
  // Use the current day's summary data, not hourly data
  const current = {
    datetime: currentDay.datetime || new Date().toISOString().split('T')[0],
    temp: currentDay.temp || 0,
    feelslike: currentDay.feelslike || 0,
    tempmin: currentDay.tempmin || 0,
    tempmax: currentDay.tempmax || 0,
    windspeed: currentDay.windspeed || 0,
    humidity: currentDay.humidity || 0,
    precipprob: currentDay.precipprob || 0,
    precipitation: currentDay.precipitation || null,
    conditions: currentDay.conditions || 'Unknown'
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'clear': '☀️',
      'sunny': '☀️',
      'partly cloudy': '⛅',
      'cloudy': '☁️',
      'overcast': '☁️',
      'rain': '🌧️',
      'rainy': '🌧️',
      'snow': '❄️',
      'snowy': '❄️',
      'sleet': '🌨️',
      'wind': '💨',
      'windy': '💨',
      'fog': '🌫️',
      'foggy': '🌫️',
      'hail': '🧊',
      'thunderstorm': '⛈️'
    };

    const lowerCondition = condition.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerCondition.includes(key)) {
        return icon;
      }
    }
    return '🌤️';
  };

  return (
    <motion.div
      className="weather-display"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="location-header">
        <h2>{location}</h2>
        <p className="date">{new Date(current.datetime).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="main-weather">
        <div className="temperature-section">
          <span className="weather-icon">{getWeatherIcon(current.conditions)}</span>
          <div className="temp-info">
            <p className="current-temp">{Math.round(current.temp)}°C</p>
            <p className="feels-like">Feels like {Math.round(current.feelslike)}°C</p>
          </div>
        </div>
        <p className="conditions">{current.conditions}</p>
      </div>

      <div className="weather-details">
        <motion.div
          className="detail-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="detail-icon">🌡️</div>
          <div className="detail-info">
            <p className="detail-label">Temperature Range</p>
            <p className="detail-value">{Math.round(current.tempmin)}°C - {Math.round(current.tempmax)}°C</p>
          </div>
        </motion.div>

        <motion.div
          className="detail-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="detail-icon">💨</div>
          <div className="detail-info">
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{Math.round(current.windspeed)} km/h</p>
          </div>
        </motion.div>

        <motion.div
          className="detail-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="detail-icon">💧</div>
          <div className="detail-info">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{Math.round(current.humidity)}%</p>
          </div>
        </motion.div>

        <motion.div
          className="detail-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="detail-icon">🌧️</div>
          <div className="detail-info">
            <p className="detail-label">Chance of Rain</p>
            <p className="detail-value">{Math.round(current.precipprob)}%</p>
          </div>
        </motion.div>

        {current.precipitation && (
          <motion.div
            className="detail-card"
            whileHover={{ scale: 1.05 }}
          >
            <div className="detail-icon">📏</div>
            <div className="detail-info">
              <p className="detail-label">Precipitation</p>
              <p className="detail-value">{current.precipitation} mm</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default WeatherDisplay;
