import React, { useState, useEffect } from 'react';
import '../styles/QuizQuestion.css';

/**
 * QuizQuestion Component
 * Displays a single multiple-choice question with timer
 */
function QuizQuestion({
  question,
  currentQuestionNumber,
  totalQuestions,
  onAnswerSelect,
  onTimeout,
  timePerQuestion
}) {
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Timer effect
  useEffect(() => {
    if (answered) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setAnswered(true);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answered, onTimeout]);

  /**
   * Handle answer selection
   */
  const handleSelectAnswer = (index) => {
    if (answered) return;

    setSelectedAnswer(index);
    const correct = index === question.correctAnswer;
    setIsCorrect(correct);
    setAnswered(true);

    // Call parent handler after a short delay
    setTimeout(() => {
      onAnswerSelect(index);
    }, 1500);
  };

  /**
   * Get timer color based on time remaining
   */
  const getTimerColor = () => {
    if (timeLeft <= 10) return 'timer-critical';
    if (timeLeft <= 30) return 'timer-warning';
    return 'timer-normal';
  };

  return (
    <div className="quiz-question">
      {/* Header with progress and timer */}
      <div className="quiz-question-header">
        <div className="question-progress">
          Question {currentQuestionNumber} of {totalQuestions}
        </div>
        <div className={`question-timer ${getTimerColor()}`}>
          ⏱️ {timeLeft}s
        </div>
      </div>

      {/* Progress bar */}
      <div className="question-progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((currentQuestionNumber - 1) / totalQuestions) * 100}%`
          }}
        ></div>
      </div>

      {/* Question */}
      <div className="question-content">
        <h2 className="question-text">{question.question}</h2>
      </div>

      {/* Answer Options */}
      <div className="question-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              selectedAnswer === index
                ? isCorrect
                  ? 'correct'
                  : 'incorrect'
                : ''
            } ${
              answered && index === question.correctAnswer
                ? 'show-correct'
                : ''
            } ${answered ? 'disabled' : ''}`}
            onClick={() => handleSelectAnswer(index)}
            disabled={answered}
            aria-label={`Answer option ${index + 1}: ${option}`}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
            {selectedAnswer === index && (
              <span className="option-icon">
                {isCorrect ? '✓' : '✗'}
              </span>
            )}
            {answered && index === question.correctAnswer && selectedAnswer !== index && (
              <span className="option-icon">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {answered && (
        <div className={`answer-feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
          <div className="feedback-header">
            {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
          </div>
          <div className="feedback-explanation">
            <strong>Explanation:</strong> {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizQuestion;
