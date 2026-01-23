// Pre-defined JavaScript flashcards with questions and answers
export const flashcards = [
  {
    id: 1,
    question: "What is the difference between var, let, and const?",
    answer: "In JavaScript, var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified."
  },
  {
    id: 2,
    question: "What is hoisting in JavaScript?",
    answer: "Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution. var declarations are hoisted and initialized with 'undefined', while let and const are hoisted but not initialized (temporal dead zone)."
  },
  {
    id: 3,
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that has access to variables from its outer scope, even after the outer function has returned. Closures are created every time a function is created."
  },
  {
    id: 4,
    question: "What is the difference between == and ===?",
    answer: "== performs type coercion before comparison, while === checks both value and type without coercion. For example, '5' == 5 is true, but '5' === 5 is false."
  },
  {
    id: 5,
    question: "What is the 'this' keyword in JavaScript?",
    answer: "'this' refers to the object that is executing the current function. Its value depends on how the function is called: in methods, it refers to the object; in functions, it refers to the global object (or undefined in strict mode)."
  },
  {
    id: 6,
    question: "What are arrow functions and how are they different from regular functions?",
    answer: "Arrow functions use the => syntax and have a shorter syntax. Key differences: they don't have their own 'this' (use parent's), no 'arguments' object, can't be used as constructors, and can't be used as generators."
  },
  {
    id: 7,
    question: "What is async/await in JavaScript?",
    answer: "async/await is syntactic sugar for promises that makes asynchronous code look synchronous. The 'async' keyword creates an async function that always returns a promise; 'await' pauses execution until the promise resolves."
  },
  {
    id: 8,
    question: "What is the difference between map, filter, and reduce?",
    answer: "map transforms each element and returns a new array; filter creates a new array with elements that pass a test; reduce reduces the array to a single value by accumulating results."
  },
  {
    id: 9,
    question: "What are promises in JavaScript?",
    answer: "Promises represent the eventual completion or failure of an asynchronous operation and its resulting value. They have three states: pending, fulfilled (resolved), and rejected. Promises help manage asynchronous code flow."
  },
  {
    id: 10,
    question: "What is event delegation in JavaScript?",
    answer: "Event delegation is a technique where you attach an event listener to a parent element instead of individual child elements. Events bubble up from the target element, allowing a single handler to manage multiple elements."
  },
  {
    id: 11,
    question: "What is the DOM and how do you interact with it?",
    answer: "The DOM (Document Object Model) is a programming interface for HTML and XML documents. You interact with it using methods like getElementById, querySelector, addEventListener, and properties to manipulate the document structure."
  },
  {
    id: 12,
    question: "What is destructuring in JavaScript?",
    answer: "Destructuring is a convenient way to extract values from objects or arrays into distinct variables. For example: const {name, age} = person; or const [a, b] = array;"
  },
  {
    id: 13,
    question: "What is the spread operator (...) used for?",
    answer: "The spread operator expands an iterable (array or object) into individual elements. It's used for: copying arrays/objects, merging arrays/objects, function arguments, and rest parameters in function definitions."
  },
  {
    id: 14,
    question: "What is a callback function?",
    answer: "A callback function is a function passed as an argument to another function, which is then invoked inside the outer function. Callbacks are commonly used for asynchronous operations, event handling, and array methods."
  },
  {
    id: 15,
    question: "What is the event loop in JavaScript?",
    answer: "The event loop is a mechanism that processes async operations. It checks the call stack and task queue, executing functions from the queue when the call stack is empty. It handles callbacks, promises, and ensures non-blocking execution."
  },
  {
    id: 16,
    question: "What is template literals in JavaScript?",
    answer: "Template literals are strings enclosed in backticks (`) that allow embedded expressions using ${expression} syntax and multi-line strings without escape characters. They provide a cleaner way to create dynamic strings."
  },
  {
    id: 17,
    question: "What are classes in JavaScript?",
    answer: "Classes are syntactic sugar for constructor functions and prototypal inheritance. They provide a cleaner syntax for object creation and inheritance, with features like constructors, methods, static methods, and extends for inheritance."
  },
  {
    id: 18,
    question: "What is the difference between null and undefined?",
    answer: "undefined means a variable has been declared but has no value assigned, or a function returns nothing. null is an intentional assignment representing 'no value' or 'empty'. Both are falsy values."
  },
  {
    id: 19,
    question: "What is JSON and how do you work with it in JavaScript?",
    answer: "JSON (JavaScript Object Notation) is a lightweight data format. You work with it using JSON.parse() to convert JSON strings to objects and JSON.stringify() to convert objects to JSON strings."
  },
  {
    id: 20,
    question: "What is the difference between slice and splice?",
    answer: "slice creates a shallow copy of a portion of an array without modifying the original; splice modifies the original array by removing, replacing, or adding elements, and returns the removed elements."
  }
];
