import React, { useState } from 'react';
import '../styles/QuizResults.css';

/**
 * QuizResults Component
 * Displays the final score and detailed results
 */
function QuizResults({
  score,
  totalQuestions,
  passingScore,
  answers,
  onRestartQuiz
}) {
  const [showDetails, setShowDetails] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = score >= passingScore;

  /**
   * Get result message based on score
   */
  const getResultMessage = () => {
    if (percentage === 100) return "Perfect Score! 🌟";
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Not Bad! 💪";
    return "Keep Practicing! 📚";
  };

  return (
    <div className="quiz-results">
      <div className="results-container">
        {/* Score Summary */}
        <div className="results-header">
          <div className="results-icon">
            {passed ? '🎊' : '📊'}
          </div>
          <h1 className="results-title">Quiz Complete!</h1>
        </div>

        {/* Score Card */}
        <div className={`score-card ${passed ? 'passed' : 'failed'}`}>
          <div className="score-message">{getResultMessage()}</div>
          <div className="score-display">
            <div className="score-value">{score}</div>
            <div className="score-divider">/</div>
            <div className="score-total">{totalQuestions}</div>
          </div>
          <div className="score-percentage">{percentage}%</div>
          <div className="score-status">
            {passed
              ? `✓ Passed! (Required: ${passingScore})`
              : `✗ Not Passed (Required: ${passingScore})`}
          </div>
        </div>

        {/* Stats */}
        <div className="results-stats">
          <div className="stat-item">
            <span className="stat-icon">✓</span>
            <span className="stat-label">Correct</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">✗</span>
            <span className="stat-label">Incorrect</span>
            <span className="stat-value">{totalQuestions - score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{percentage}%</span>
          </div>
        </div>

        {/* Toggle Details */}
        <button
          className="toggle-details-button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '▼ Hide Details' : '▶ Show Details'}
        </button>

        {/* Detailed Results */}
        {showDetails && (
          <div className="results-details">
            <h3>📋 Question-by-Question Review</h3>
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`result-item ${answer.isCorrect ? 'correct-item' : 'incorrect-item'}`}
              >
                <div className="result-header">
                  <span className="result-number">Q{index + 1}</span>
                  <span className={`result-badge ${answer.isCorrect ? 'badge-correct' : 'badge-incorrect'}`}>
                    {answer.isCorrect ? '✓ Correct' : answer.timedOut ? '⏱️ Timeout' : '✗ Incorrect'}
                  </span>
                </div>

                <div className="result-question">
                  <strong>Question:</strong> {answer.question}
                </div>

                <div className="result-answers">
                  <div className="answer-row">
                    <span className="answer-label">Your Answer:</span>
                    <span className={`answer-value ${answer.isCorrect ? 'correct-answer' : 'incorrect-answer'}`}>
                      {answer.userAnswer}
                    </span>
                  </div>

                  {!answer.isCorrect && (
                    <div className="answer-row">
                      <span className="answer-label">Correct Answer:</span>
                      <span className="answer-value correct-answer">
                        {answer.correctAnswer}
                      </span>
                    </div>
                  )}
                </div>

                <div className="result-explanation">
                  <strong>📖 Explanation:</strong> {answer.explanation}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="results-actions">
          <button className="restart-button" onClick={onRestartQuiz}>
            🔄 Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizResults;
