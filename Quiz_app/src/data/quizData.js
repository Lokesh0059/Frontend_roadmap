/**
 * Quiz Data - Multiple Choice Questions
 * JavaScript Fundamentals Quiz
 */

export const quizData = {
  title: "JavaScript Fundamentals Quiz",
  description: "Test your knowledge of JavaScript fundamentals with 10 multiple-choice questions. You have 1 minute per question.",
  totalQuestions: 10,
  passingScore: 7,
  timePerQuestion: 60, // seconds
  questions: [
    {
      id: 1,
      question: "What is the difference between 'let' and 'var' in JavaScript?",
      options: [
        "'let' is block-scoped, 'var' is function-scoped",
        "'var' is block-scoped, 'let' is function-scoped",
        "They are identical",
        "'let' is only used in loops"
      ],
      correctAnswer: 0,
      explanation: "The key difference is scope: 'let' is block-scoped (limited to the block it's in), while 'var' is function-scoped (limited to the function)."
    },
    {
      id: 2,
      question: "What does 'const' mean in JavaScript?",
      options: [
        "A constant variable that cannot be reassigned",
        "A variable that cannot be redeclared",
        "Both A and B",
        "A global variable"
      ],
      correctAnswer: 2,
      explanation: "'const' prevents both reassignment and redeclaration. The variable reference itself cannot be changed, though object properties can still be modified."
    },
    {
      id: 3,
      question: "What is a closure in JavaScript?",
      options: [
        "A function that is closed or finished executing",
        "A function that has access to variables from its outer scope",
        "The process of ending a function",
        "A way to prevent memory leaks"
      ],
      correctAnswer: 1,
      explanation: "A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned."
    },
    {
      id: 4,
      question: "What will `console.log(typeof null)` output?",
      options: [
        "'null'",
        "'object'",
        "'undefined'",
        "'empty'"
      ],
      correctAnswer: 1,
      explanation: "This is a famous JavaScript quirk: 'typeof null' returns 'object' even though null is a primitive value, not an object."
    },
    {
      id: 5,
      question: "What is the difference between '==' and '===' in JavaScript?",
      options: [
        "'==' is faster",
        "'===' checks type, '==' does type coercion",
        "'==' checks type, '===' does type coercion",
        "They are the same"
      ],
      correctAnswer: 1,
      explanation: "'===' (strict equality) checks both value and type without coercion, while '==' (loose equality) performs type coercion before comparison."
    },
    {
      id: 6,
      question: "What is hoisting in JavaScript?",
      options: [
        "Lifting variables to the top of your code file",
        "Moving declarations to the top of their scope before execution",
        "A performance optimization technique",
        "The process of loading scripts"
      ],
      correctAnswer: 1,
      explanation: "Hoisting is JavaScript's behavior of moving declarations (but not initializations) to the top of their scope before code execution."
    },
    {
      id: 7,
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: [
        "The current object",
        "The global window object",
        "It depends on how the function is called",
        "The previous variable"
      ],
      correctAnswer: 2,
      explanation: "'this' refers to the object that is executing the current function. Its value depends on how the function is called (method call, function call, constructor, etc.)."
    },
    {
      id: 8,
      question: "What is an arrow function?",
      options: [
        "A function that uses the => symbol",
        "A more concise syntax for regular functions with lexical 'this' binding",
        "A function that returns an arrow",
        "Both A and B"
      ],
      correctAnswer: 3,
      explanation: "Arrow functions provide a concise syntax and have lexical 'this' binding, meaning they inherit 'this' from their surrounding scope."
    },
    {
      id: 9,
      question: "What is a Promise in JavaScript?",
      options: [
        "A guarantee that something will happen",
        "An object representing the eventual completion of an async operation",
        "A way to handle multiple callbacks",
        "A function that returns a value"
      ],
      correctAnswer: 1,
      explanation: "A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value."
    },
    {
      id: 10,
      question: "What is the difference between 'async/await' and Promises?",
      options: [
        "'async/await' is faster than Promises",
        "'async/await' is syntactic sugar over Promises that makes async code easier to read",
        "'Promises' are deprecated",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "'async/await' is built on top of Promises and provides a cleaner, more readable way to write asynchronous code with better error handling."
    }
  ]
};
