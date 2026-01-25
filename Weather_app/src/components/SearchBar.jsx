import React from 'react';
import { motion } from 'framer-motion';
import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [input, setInput] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <motion.form
      className="search-bar"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        placeholder="Enter a city name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      <motion.button
        type="submit"
        className="search-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Search
      </motion.button>
    </motion.form>
  );
}

export default SearchBar;
