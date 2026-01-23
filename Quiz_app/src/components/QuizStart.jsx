import React from 'react';
import '../styles/QuizStart.css';

/**
 * QuizStart Component
 * Displays the welcome screen with quiz information
 */
function QuizStart({ quizData, onStartQuiz }) {
  return (
    <div className="quiz-start">
      <div className="quiz-start-content">
        {/* Header */}
        <div className="quiz-start-header">
          <div className="quiz-icon">🎯</div>
          <h1 className="quiz-title">{quizData.title}</h1>
        </div>

        {/* Description */}
        <p className="quiz-description">{quizData.description}</p>

        {/* Quiz Details */}
        <div className="quiz-details">
          <div className="detail-item">
            <span className="detail-label">Questions:</span>
            <span className="detail-value">{quizData.totalQuestions}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Time Per Question:</span>
            <span className="detail-value">{quizData.timePerQuestion} seconds</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Passing Score:</span>
            <span className="detail-value">{quizData.passingScore}/{quizData.totalQuestions}</span>
          </div>
        </div>

        {/* Rules */}
        <div className="quiz-rules">
          <h3>📋 Quiz Rules:</h3>
          <ul>
            <li>✓ Answer each question by selecting one of the four options</li>
            <li>✓ You have {quizData.timePerQuestion} seconds per question</li>
            <li>✓ If time runs out, the question is marked incorrect</li>
            <li>✓ Immediate feedback after each answer</li>
            <li>✓ View detailed results at the end</li>
          </ul>
        </div>

        {/* Start Button */}
        <button className="quiz-start-button" onClick={onStartQuiz}>
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizStart;
