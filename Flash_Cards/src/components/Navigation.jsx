import React from 'react';
import '../styles/Navigation.css';

/**
 * Navigation Component
 * Provides buttons to navigate between flashcards
 */
const Navigation = ({
  currentCard,
  totalCards,
  onPrevious,
  onNext,
  onReset
}) => {
  const isFirstCard = currentCard === 1;
  const isLastCard = currentCard === totalCards;

  return (
    <div className="navigation">
      <button
        className="nav-button prev-button"
        onClick={onPrevious}
        disabled={isFirstCard}
        aria-label="Previous flashcard"
      >
        ← Previous
      </button>

      <button
        className="nav-button reset-button"
        onClick={onReset}
        aria-label="Reset flashcards"
      >
        ↻ Restart
      </button>

      <button
        className="nav-button next-button"
        onClick={onNext}
        disabled={isLastCard}
        aria-label="Next flashcard"
      >
        Next →
      </button>
    </div>
  );
};

export default Navigation;
