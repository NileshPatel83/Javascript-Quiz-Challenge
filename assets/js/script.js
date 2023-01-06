//Constants
const timeAllowed = 75;                         //Time allowed for the quiz.
const timeDeduction = 15;                       //Time deduction if user chooses wrong answer.
const totalQuestions = 5;                       //Questions to be asked.
const hiddenElement = "hidden";                 //Hides the element.
const visibleElement = "visible"                //Makes the element visible.
const displayNone = "none";                     //Sets the display of element to none.
const scoreKey ="quizscore";                    //Text used to get all keys from local storage.
const correctMessage = "Correct!";              //Dispplay message for correct answer.
const incorrectMessage = "Incorrect!";          //Display message for incorrect answer.

//Total number of quiz from which 5 questions will be chosen randomly.
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
let timeLeft = -1;
let timeInterval;

//Gets elements from index file.
const viewScores = document.getElementById("view-scores");
const timeElement = document.getElementById("time");
const timeRemaining = document.getElementById("time-remaining");
const initialParagraph = document.getElementById("initial-paragraph");
const startButton = document.getElementById("start-button");
const content = document.getElementById("content");
const heading = document.getElementById("heading");

init();

// The init() function fires when the page is loaded.
function init(){

    timeElement.style.visibility = hiddenElement;
   
}

//Event listener for start button.
startButton.addEventListener("click", function(){

    //Hides header, paragrapg and start quiz buttton.
    heading.style.display = displayNone;
    initialParagraph.style.display = displayNone;
    startButton.style.display = displayNone;

    //Makes the remaining time text visible and sets the initial time to time allowed.
    timeElement.style.visibility = visibleElement;
    timeRemaining.textContent = timeAllowed;

    // Starts the timer.
    // startTimer();

    //Gets list of 5 questions randomly from all questions list.
    let quizList = getQuizList();

});

//Gets list of 5 questions randomly from all questions list.
function getQuizList(){
    let quizList = [];

    for (let i = 0; i < totalQuestions; i++) {

        //Randomly gets the question from all questions array.
        let randomQuiz = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        
        //Checks whether current question is already added to the list or not.
        //If true then repeats the step.
        if(quizList.includes(randomQuiz)){
            i--;
        }

        //Otherwise adds the question to quiz list.
        else{
            quizList.push(randomQuiz);
        }
    }

    return quizList;
}

//Starts the timer function.
function startTimer(){
    timeLeft = timeAllowed;
    
    timeInterval = setInterval(function () {
        timeLeft--;

        //Sets the new time value.
        timeRemaining.textContent = timeLeft;

        //Stops the timer and displays score as 0.
        if(timeLeft === 0){
            clearInterval(timeInterval);

            //Hides remaining time text.
            timeElement.style.display = displayNone;
        }
    }, 1000);    
}