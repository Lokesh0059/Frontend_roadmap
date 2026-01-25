import React from 'react';
import { motion } from 'framer-motion';
import '../styles/LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <motion.div
      className="loading-spinner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <p>Loading weather data...</p>
    </motion.div>
  );
}

export default LoadingSpinner;
