import React from 'react';
import '../styles/FlashCard.css';

/**
 * FlashCard Component
 * Displays a single flashcard that can be flipped to reveal the answer
 */
const FlashCard = ({ card, isFlipped, onFlip }) => {
  return (
    <div
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={onFlip}
      role="button"
      tabIndex="0"
      aria-pressed={isFlipped}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onFlip();
        }
      }}
    >
      <div className="flashcard-inner">
        {/* Front of card - Question */}
        <div className="flashcard-front">
          <div className="flashcard-label">Question</div>
          <div className="flashcard-content">
            <h2>{card.question}</h2>
          </div>
          <div className="flashcard-hint">Click to reveal answer</div>
        </div>

        {/* Back of card - Answer */}
        <div className="flashcard-back">
          <div className="flashcard-label">Answer</div>
          <div className="flashcard-content">
            <p>{card.answer}</p>
          </div>
          <div className="flashcard-hint">Click to show question</div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
