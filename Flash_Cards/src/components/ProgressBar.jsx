import React from 'react';
import '../styles/ProgressBar.css';

/**
 * ProgressBar Component
 * Displays the progress of the user through the flashcards
 */
const ProgressBar = ({ currentCard, totalCards }) => {
  const progress = (currentCard / totalCards) * 100;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-label">
          Card {currentCard} of {totalCards}
        </span>
        <span className="progress-percentage-value">{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
