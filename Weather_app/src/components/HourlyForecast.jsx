import React from 'react';
import { motion } from 'framer-motion';
import '../styles/HourlyForecast.css';

function HourlyForecast({ forecast }) {
  // Null safety check
  if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
    return <div className="hourly-forecast"><p>No hourly forecast data available</p></div>;
  }

  const now = new Date();
  const currentHour = now.getHours();

  // Find the starting index for past 12 hours
  const startIndex = Math.max(0, currentHour - 12);
  const endIndex = Math.min(forecast.length, currentHour + 12);
  
  // Get hours around current time
  const displayHours = forecast.slice(startIndex, endIndex);

  const getWeatherEmoji = (condition) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) return '☀️';
    if (lowerCondition.includes('partly')) return '⛅';
    if (lowerCondition.includes('cloud')) return '☁️';
    if (lowerCondition.includes('rain')) return '🌧️';
    if (lowerCondition.includes('snow')) return '❄️';
    if (lowerCondition.includes('thunder')) return '⛈️';
    if (lowerCondition.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="hourly-forecast"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="forecast-title">24-Hour Forecast (Past & Future)</h3>
      <motion.div className="hours-container" variants={containerVariants}>
        {displayHours.map((hour, index) => {
          const hourTime = new Date(`2000-01-01T${hour.datetime}`);
          const isCurrentHour = hourTime.getHours() === currentHour;

          return (
            <motion.div
              key={index}
              className={`hour-card ${isCurrentHour ? 'current' : ''}`}
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -10 }}
            >
              <div className={`hour-time ${isCurrentHour ? 'current-time' : ''}`}>
                {hourTime.getHours().toString().padStart(2, '0')}:00
                {isCurrentHour && <span className="current-badge">Now</span>}
              </div>
              <div className="hour-icon">{getWeatherEmoji(hour.conditions)}</div>
              <div className="hour-temp">{Math.round(hour.temp)}°C</div>
              <div className="hour-details">
                <div className="hour-wind">💨 {Math.round(hour.windspeed)} km/h</div>
                <div className="hour-rain">🌧️ {Math.round(hour.precipprob)}%</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default HourlyForecast;
