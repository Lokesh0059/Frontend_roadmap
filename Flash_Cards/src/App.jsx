import React, { useState } from 'react';
import FlashCard from './components/FlashCard';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import { flashcards } from './data/flashcards';
import './styles/App.css';

/**
 * App Component
 * Main component that manages the state and logic for the application
 * Supports both Flashcard and Quiz modes
 */
function App() {
  // State Management
  const [appMode, setAppMode] = useState('flashcards'); // 'flashcards' or 'quiz'
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Get current card
  const currentCard = flashcards[currentCardIndex];
  const totalCards = flashcards.length;
  const currentCardNumber = currentCardIndex + 1;

  /**
   * Handle card flip
   * Toggles between question and answer view
   */
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  /**
   * Handle next card
   * Moves to the next flashcard and resets flip state
   */
  const handleNext = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  /**
   * Handle previous card
   * Moves to the previous flashcard and resets flip state
   */
  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  /**
   * Handle reset
   * Resets to the first card and closes the flip
   */
  const handleReset = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  /**
   * Handle keyboard navigation
   * Arrow keys for navigation, Space for flipping
   */
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === ' ') {
        e.preventDefault();
        handleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, isFlipped]);

  if (appMode === 'quiz') {
    return (
      <div className="app app-quiz">
        {/* Quiz Mode with back button */}
        <button className="mode-switch-button" onClick={() => setAppMode('flashcards')}>
          ← Back to Flash Cards
        </button>
        <Quiz />
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">📚 JavaScript Flash Cards</h1>
        <p className="app-subtitle">
          Test your JavaScript knowledge with 20 essential questions
        </p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Progress Bar */}
        <ProgressBar
          currentCard={currentCardNumber}
          totalCards={totalCards}
        />

        {/* Flash Card */}
        <div className="flashcard-container">
          <FlashCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </div>

        {/* Navigation */}
        <Navigation
          currentCard={currentCardNumber}
          totalCards={totalCards}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onReset={handleReset}
        />

        {/* Keyboard Hints */}
        <div className="keyboard-hints">
          <p>
            <kbd>←</kbd> <kbd>→</kbd> Navigate | <kbd>Space</kbd> Flip Card
          </p>
        </div>

        {/* Mode Switch Button */}
        <button className="mode-switch-button" onClick={() => setAppMode('quiz')}>
          🎯 Try Quiz Mode →
        </button>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Keep learning! You're on card <strong>{currentCardNumber}</strong> of{' '}
          <strong>{totalCards}</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
