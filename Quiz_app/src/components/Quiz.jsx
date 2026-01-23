import React, { useState, useEffect } from 'react';
import '../styles/Quiz.css';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import { quizData } from '../data/quizData';

/**
 * Quiz Component
 * Main component that manages the quiz flow and state
 */
function Quiz() {
  const [quizState, setQuizState] = useState('start'); // 'start', 'question', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // Store user answers and feedback

  /**
   * Handle quiz start
   */
  const handleStartQuiz = () => {
    setQuizState('question');
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
  };

  /**
   * Handle answer selection
   */
  const handleAnswerSelect = (selectedIndex) => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    // Store the answer result
    const newAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer: currentQuestion.options[selectedIndex],
      correctAnswer: currentQuestion.options[currentQuestion.correctAnswer],
      isCorrect,
      explanation: currentQuestion.explanation
    };

    setAnswers([...answers, newAnswer]);

    // Increment score if correct
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizState('results');
      }
    }, 2000); // 2 second delay to show feedback
  };

  /**
   * Handle question timeout (1 minute timer)
   */
  const handleTimeoutQuestion = () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];

    // Store timeout as incorrect answer
    const newAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer: 'No answer (Timeout)',
      correctAnswer: currentQuestion.options[currentQuestion.correctAnswer],
      isCorrect: false,
      explanation: currentQuestion.explanation,
      timedOut: true
    };

    setAnswers([...answers, newAnswer]);

    // Move to next question
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizState('results');
    }
  };

  /**
   * Handle restart quiz
   */
  const handleRestartQuiz = () => {
    handleStartQuiz();
  };

  return (
    <div className="quiz-container">
      {quizState === 'start' && (
        <QuizStart
          quizData={quizData}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {quizState === 'question' && (
        <QuizQuestion
          question={quizData.questions[currentQuestionIndex]}
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={quizData.questions.length}
          onAnswerSelect={handleAnswerSelect}
          onTimeout={handleTimeoutQuestion}
          timePerQuestion={quizData.timePerQuestion}
        />
      )}

      {quizState === 'results' && (
        <QuizResults
          score={score}
          totalQuestions={quizData.questions.length}
          passingScore={quizData.passingScore}
          answers={answers}
          onRestartQuiz={handleRestartQuiz}
        />
      )}
    </div>
  );
}

export default Quiz;
