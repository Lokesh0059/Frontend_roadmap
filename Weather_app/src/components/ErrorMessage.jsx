import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <motion.div
      className="error-message"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <span className="error-icon">⚠️</span>
      <p>{message}</p>
    </motion.div>
  );
}

export default ErrorMessage;
