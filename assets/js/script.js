//Constants
const timeAllowed = 75;
const timeDeduction = 15;
const totalQuestions = 5;
const scoreKey ="quizscore";
const correctMessage = "Correct!";
const incorrectMessage = "Incorrect!";
const allQuestions = [
    {
        question: "Which built-in method calls a function for each element in the array?",
        options: ["while()", "loop()", "forEach()", "None of the above"],
        answer: "forEach()"
    },

    {
        question: "Which of the following function of array object creates a new array with the results of calling a provided function on every element in this array?",
        options: ["push()", "join()", "pop()", "map()"],
        answer: "map()"
    },

    {
        question: "Which of the following function of array object adds one or more elements to the front of an array and returns the new length of the array?",
        options: ["unshift()", "sort()", "splice()",  "toString()"],
        answer: "unshift()"
    },

    {
        question: "What is JavaScript?",
        options: ["JavaScript is a scripting language used to make the website interactive",  "JavaScript is an assembly language used to make the website interactive", "JavaScript is a compiled language used to make the website interactive", "None of the mentioned"],
        answer: "JavaScript is a scripting language used to make the website interactive"
    },

    {
        question: "Which of the following is not JavaScript data types?",
        options: ["Null type", "Undefined type", "Number type", "All of the mentioned"],
        answer: "All of the mentioned"
    },

    {
        question: "Why event handlers are needed in JavaScript",
        options: ["Allows JavaScript code to alter the behaviour of windows", "Adds innerHTML page to the code", "Change the server location", "Performs handling of exceptions and occurrences"],
        answer: "Allows JavaScript code to alter the behaviour of windows"
    },

    {
        question: "The “var” and “function” are __________",
        options: ["Keywords", "Declaration statements", "Data types", "Prototypes"],
        answer: "Declaration statements"
    },

    {
        question: "The statement a===b refers to _________",
        options: ["Both a and b are equal in value", "type and reference address", "Both a and b are equal in value", "Both a and b are equal in value and type", "There is no such statement"],
        answer: "Both a and b are equal in value and type"
    },

    {
        question: "When does the function name become optional in JavaScript?",
        options: ["When the function is defined as a looping statement", "When the function is defined as expressions", "When the function is predefined", "when the function is called"],
        answer: "When the function is defined as expressions"
    },

    {
        question: "What is the purpose of a return statement in a function?",
        options: ["Returns the value and continues executing rest of the statements if any", "Returns the value and stops the program", "Stops executing the function", "Stops executing the function and returns the value"],
        answer: "Stops executing the function and returns the value"
    },

    {
        question: "Which keyword is used to define the function in JavaScript?",
        options: ["void", "int", "function", "main"],
        answer: "function"
    },

    {
        question: "Which window object method is used to display a message in a dialog box?",
        options: ["alert()", "prompt()", "message()", "console.log"],
        answer: "alert()"
    },

    {
        question: "Which is the property that represents the content displayed in the window?",
        options: ["document", "content", "window", "frame"],
        answer: "document"
    },

    {
        question: "How to pick a document element based on the value of its id attribute?",
        options: ["getElementsbyId()", "getElementbyId()", "getElementsbyId() and getElementbyId()", "getElement"],
        answer: "getElementbyId()"
    },

    {
        question: "The URL property belongs to which of the following object?",
        options: ["Document", "Element", "Location", "Event"],
        answer: "Document"
    },
];

//Global variables.
var timeRemaining = -1;
var timeInterval;