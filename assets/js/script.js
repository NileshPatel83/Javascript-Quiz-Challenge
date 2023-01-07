//Constants
const timeAllowed = 75;                         //Time allowed for the quiz.
const timeDeduction = 15;                       //Time deduction if user chooses wrong answer.
const totalQuestions = 5;                       //Questions to be asked.
const hiddenElement = 'hidden';                 //Hides the element.
const visibleElement = 'visible';               //Makes the element visible.
const displayNone = 'none';                     //Sets the display of element to none.
const displayInline = 'inline'                  //Sets the dispaly of element to inline.
const oneRemSpace = '1rem'                      //One REM space for margin.
const scoreKey ='quizscore-';                    //Text used to get all keys from local storage.
const correctMessage = 'Correct!';              //Dispplay message for correct answer.
const incorrectMessage = 'Incorrect!';          //Display message for incorrect answer.
const resultHeading = 'All done!'               //Result heading.
const resultMessage = 'Your final score:'       //Resuly message.
const initialText = 'Enter initials: '           //Initials text.
const resultButtonText = 'Submit'               //Button text to submit result.
const userInitialID = 'user-initial'            //ID for user initial textbox.
const questionHeadingClass = 'question-heading' //Question heading class name.
const optionClass = 'option';                   //Class name for options displayed for question.
const handClass = 'hand';                       //Class name to set cursor to hand.
const optionsID = 'options';                    //ID name for un-ordered list element. This will be used to get its childrens.

//Total number of quiz from which 5 questions will be chosen randomly.
const allQuestions = [
    {
        question: 'Which built-in method calls a function for each element in the array?',
        options: ['while()', 'loop()', 'forEach()', 'None of the above'],
        answer: 'forEach()'
    },

    {
        question: 'Which of the following function of array object creates a new array with the results of calling a provided function on every element in this array?',
        options: ['push()', 'join()', 'pop()', 'map()'],
        answer: 'map()'
    },

    {
        question: 'Which of the following function of array object adds one or more elements to the front of an array and returns the new length of the array?',
        options: ['unshift()', 'sort()', 'splice()',  'toString()'],
        answer: 'unshift()'
    },

    {
        question: 'What is JavaScript?',
        options: ['JavaScript is a scripting language used to make the website interactive',  'JavaScript is an assembly language used to make the website interactive', 'JavaScript is a compiled language used to make the website interactive', 'None of the mentioned'],
        answer: 'JavaScript is a scripting language used to make the website interactive'
    },

    {
        question: 'Which of the following is not JavaScript data types?',
        options: ['Null type', 'Undefined type', 'Number type', 'All of the mentioned'],
        answer: 'All of the mentioned'
    },

    {
        question: 'Why event handlers are needed in JavaScript',
        options: ['Allows JavaScript code to alter the behaviour of windows', 'Adds innerHTML page to the code', 'Change the server location', 'Performs handling of exceptions and occurrences'],
        answer: 'Allows JavaScript code to alter the behaviour of windows'
    },

    {
        question: 'The “var” and “function” are __________',
        options: ['Keywords', 'Declaration statements', 'Data types', 'Prototypes'],
        answer: 'Declaration statements'
    },

    {
        question: 'The statement a===b refers to _________',
        options: ['Both a and b are equal in value', 'type and reference address', 'Both a and b are equal in value', 'Both a and b are equal in value and type', 'There is no such statement'],
        answer: 'Both a and b are equal in value and type'
    },

    {
        question: 'When does the function name become optional in JavaScript?',
        options: ['When the function is defined as a looping statement', 'When the function is defined as expressions', 'When the function is predefined', 'when the function is called'],
        answer: 'When the function is defined as expressions'
    },

    {
        question: 'What is the purpose of a return statement in a function?',
        options: ['Returns the value and continues executing rest of the statements if any', 'Returns the value and stops the program', 'Stops executing the function', 'Stops executing the function and returns the value'],
        answer: 'Stops executing the function and returns the value'
    },

    {
        question: 'Which keyword is used to define the function in JavaScript?',
        options: ['void', 'int', 'function', 'main'],
        answer: 'function'
    },

    {
        question: 'Which window object method is used to display a message in a dialog box?',
        options: ['alert()', 'prompt()', 'message()', 'console.log()'],
        answer: 'alert()'
    },

    {
        question: 'Which is the property that represents the content displayed in the window?',
        options: ['document', 'content', 'window', 'frame'],
        answer: 'document'
    },

    {
        question: 'How to pick a document element based on the value of its id attribute?',
        options: ['getElementsbyId()', 'getElementbyId()', 'getElementsbyId() and getElementbyId()', 'getElement()'],
        answer: 'getElementbyId()'
    },

    {
        question: 'The URL property belongs to which of the following object?',
        options: ['Document', 'Element', 'Location', 'Event'],
        answer: 'Document'
    },
];

//Global variables.
let timeLeft = 0;
let timeInterval;
let quizList;                                   //List of 5 question chosen randomly that are displayed in browser.
let correctAnswer;                              //Correct answer for the question displayed in browser.
let questionNumber;                             //Question number count.

//Gets elements from index file.
const viewScoresEl = document.getElementById('view-scores');
const timeEl = document.getElementById('time');
const timeRemainingEl = document.getElementById('time-remaining');
const initialParagraphEl = document.getElementById('initial-paragraph');
const startButtonEl = document.getElementById('start-button');
const contentEL = document.getElementById('content');
const headingEl = document.getElementById('heading');

//Event listener for container element.
contentEL.addEventListener('click', function(event){

    //Gets the clicked element.
    let selectedOptionEl = event.target;

    //If clicked element is a list (option of the question), displays a result and processes next question.
    if(selectedOptionEl.nodeName.toLowerCase() === 'li') {
        processQuestionOption(selectedOptionEl);
    }

    //If sumbit button is selected when result is displayed.
    //Ignores when start button is selected.
    else if (selectedOptionEl.nodeName.toLowerCase() === 'button' && selectedOptionEl.id !== 'start-button'){

        //Submits the result and updates the local storage. Also displays high scores from local storage.
        submitResult();
    }

    //When high score text is clicked.
    else if(selectedOptionEl.nodeName.toLowerCase() === 'li' && selectedOptionEl.id === 'view-scores'){

        //Displays high scores from local storage.
    }
});

//Submits the result and updates the local storage. Also displays high scores from local storage.
function submitResult(){

    //Gets the initial typed by the user. Exits the function if textbox is blank.
    let userInitialTBEl = document.getElementById(userInitialID);
    let userInitial = userInitialTBEl.value;
    if(userInitial === '') return null;

    //Gets all local storage for the quiz game.
    let quizStorage = getQuizStorage();
    
    //Gets the storage counter for current result.
    let storageCounter = getStorageCounter();

    //Stores current result to localstorage and returns it as an object.
    let currentResult = storeCurrentResultToLocalStorage(storageCounter, userInitial);

    //Adds current resutl to local storage array so that it can be displayed in browser.
    quizStorage.push(currentResult);


    //Displays high scores from local storage.
}

//Stores current result to localstorage and returns it as an object.
function storeCurrentResultToLocalStorage(storageCounter, userInitial){

    //Creates oject for current result.
    let currentResult = {
        initial: userInitial,
        score: timeLeft
    };

    //Creates key.
    let key = scoreKey + storageCounter;

    //Stores current result to local storage.
    localStorage.setItem(key, JSON.stringify(currentResult));

    return currentResult;
}

//Gets the storage counter for current result.
//This is done by getting all keys for the quiz game, finding the last counter and incrementing it.
function getStorageCounter(){

    let counter = 0;

    //Gets all keys from local storage.
    let keys = Object.keys(localStorage);

    //Loops through all keys and gets the key pair.
    for (let i = 0; i < keys.length; i++){
        //Only processes key if it includes the word 'quizscore-'.
        if(keys[i].includes(scoreKey)){
            let number = parseInt(keys[i].replace(scoreKey, '', 10));

            if(number > counter) counter = number;
        }
    }

    return counter + 1;
}

//Gets all local storage for the quiz game.
function getQuizStorage(){

    let quizStorage = [];

    //Gets all keys from local storage.
    let keys = Object.keys(localStorage);

    //Loops through all keys and gets the key pair.
    for (let i = 0; i < keys.length; i++) {

        //Only processes key if it includes the word 'quizscore-'.
        if(keys[i].includes(scoreKey)) {

            //Gets the key pair object and adds it to an array.
            let storage = JSON.parse(localStorage.getItem(keys[i]));
            if(storage !== null) quizStorage.push(storage);
        }
    }

    //Returns the storage in descending order by score.
    return quizStorage.sort(({score:lowScore}, {score:highScore}) => highScore-lowScore);
}

//When one of the option from question is clicked, displays the result and processes next question.
function processQuestionOption(selectedOptionEl){
    //Gets the user selected option.
    let userAnswer = selectedOptionEl.textContent;

    //Removes the option number and space.
    userAnswer = userAnswer.substring(userAnswer.indexOf(' ') + 1);

    //Creates a div element to display the result as correct or incorrect.
    let resultEl = document.createElement('div');

    //Checks whether user selected option is a correct answer or not.
    //If the option is correct, displays the result as correct in green color.
    if(correctAnswer === userAnswer){
        resultEl.textContent = correctMessage;
        resultEl.style.color ='green';
    }

    //If the option is incorrect, displays the result as incorrect with red color.
    else{

        //Deducts 15 seconds from time remaining time if the selected option is incorrect.
        timeLeft -= timeDeduction;  
        resultEl.textContent = incorrectMessage;
        resultEl.style.color ='red';
    }

    //Adds the div element to contect element to display it in browser.
    contentEL.appendChild(resultEl);

    //Pauses the process for half a second.
    //This will allow the user to see the result before the removed current question elements from the browser and
    //displaying the next question elements.
    setTimeout(() => {processQuestions()}, 500);
}

//Removes the current question elements from browser and displays next question elements in browser.
//Displays final score if all 5 questions are processed.
function processQuestions(){

    //Removes current question elements from browser.
    removeCurrentQuestionElements();

    //Displays result if all 5 questions are processed or timer reaches 0.
    if(questionNumber == totalQuestions || timeLeft <= 0){

        //Stops the timer.
        clearInterval(timeInterval);

        //Displays results.
        displayResult();
    }
    else{
        //Displays the next question in browser.
        displayQuestionInBrowser(questionNumber);

        //Increments the question counter.
        questionNumber++;
    }
}

//Displays results.
function displayResult(){

    //Hides remaining time text.
    timeEl.style.display = displayNone;

    //Creates h2 header.
    let resultHeadingEl = document.createElement('h2');
    resultHeadingEl.textContent = resultHeading;
    resultHeadingEl.className = questionHeadingClass;
    contentEL.appendChild(resultHeadingEl);

    //Creates div element and dispaly result score.
    //Set bottom marning to 1rem.
    let resultMessageEl = document.createElement('div');

    //Displays score as time remaining. If the time is less than 0 then shows the score as 0.
    resultMessageEl.textContent = `${resultMessage} ${timeLeft < 0 ? 0: timeLeft}.`
    resultMessageEl.style.marginBottom = oneRemSpace;
    contentEL.appendChild(resultMessageEl);

    //Creates a div element that contains initial text, textbox to enter initial and submit button.
    let initialContainerEl = document.createElement('div');

    //Creates div element to show initial text.
    //Sets display syle to inline.
    let initialEl = document.createElement('div');
    initialEl.textContent = initialText;
    initialEl.style.display = displayInline;
    initialContainerEl.appendChild(initialEl);

    //Creates textbox element to enter initial.
    let initialInputEl = document.createElement('INPUT');
    initialInputEl.setAttribute('type', 'text');
    initialInputEl.id = userInitialID;
    initialContainerEl.appendChild(initialInputEl);

    //Create buttom element for submision.
    //Sets left margin to 1rem, border to none.
    //Adds 'option' and 'hand' classes.
    let submitButtonEl = document.createElement('button');
    submitButtonEl.innerHTML = resultButtonText;
    submitButtonEl.style.border = displayNone;
    submitButtonEl.style.marginLeft= oneRemSpace;
    submitButtonEl.classList.add(optionClass, handClass);
    initialContainerEl.appendChild(submitButtonEl);

    //Appends the elements to parent div element.
    contentEL.appendChild(initialContainerEl);
}

//Removes current question elements from browser.
function removeCurrentQuestionElements(){

    //Gets all direct children elements of content element.
    let contentChilren = contentEL.children;

    //Loops through all children to remove question elements (h2, ul and div).
    for (let i = 0; i < contentChilren.length; i++) {
        if(contentChilren[i].nodeName.toLowerCase() === 'h2' || contentChilren[i].nodeName.toLowerCase() === 'ul' || contentChilren[i].nodeName.toLowerCase() === 'div'){
            contentChilren[i].remove();

            //Decrements 'i' to reset the index.
            i--;
        }
    }
}

//Event listener for start button.
startButtonEl.addEventListener('click', function(){

    //Hides header, paragrapg and start quiz buttton.
    headingEl.style.display = displayNone;
    initialParagraphEl.style.display = displayNone;
    startButtonEl.style.display = displayNone;

    //Makes the remaining time text visible and sets the initial time to time allowed.
    timeEl.style.visibility = visibleElement;
    timeRemainingEl.textContent = timeAllowed;

    //Sets the initial value to 0, which displays the first question.
    questionNumber = 0;

    // Starts the timer.
    startTimer();

    //Gets list of 5 questions randomly from all questions list.
    quizList = getQuizList();

    //Displays first question in browser.
    displayQuestionInBrowser(questionNumber);

    //Increments the question counter.
    questionNumber++;
});

//Displays question and options in browser for specified index.
function displayQuestionInBrowser(index){

    //Gets the object at specified index from all questions array.
    let quiz = quizList[index];

    //Gets the correct answer for the question.
    //This will be used to check whether user has clicked on correct option or not.
    correctAnswer = quiz.answer;

    //Creates the question as h2 element and set its text and class to 'question-heading' class.
    let questionEl = document.createElement('h2');
    questionEl.textContent = `${index + 1}. ${quiz.question}`;
    questionEl.className = questionHeadingClass;
    contentEL.appendChild(questionEl);

    //Creates un-ordered list element for options for the question.
    let optionsEl = document.createElement('ul');

    //Loops thorugh the options and creates list element for each option and set its text and class to 'option' class.
    //Adds these lis elements to un-ordered list element.
    for (let i = 0; i < quiz.options.length; i++) {

        let optionEl = document.createElement('li');
        optionEl.classList.add(optionClass, handClass);

        optionEl.textContent = `${i + 1}. ${quiz.options[i]}`;

        optionsEl.appendChild(optionEl);
    }

    //Appends un-ordered list element to content element.
    contentEL.appendChild(optionsEl);
}

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

        //Sets the new time value.
        timeRemainingEl.textContent = timeLeft;
        timeLeft--;
        
        //Stops the timer and displays score as 0.
        if(timeLeft <= 0){

            //Stops the timer.
            clearInterval(timeInterval);

            //Removes current question elements from browser.
            removeCurrentQuestionElements();

            //Displays results.
            displayResult();
        }
    }, 1000);    
}

// The init() function fires when the page is loaded.
function init(){

    //Hides the remaining time when page loads.
    timeEl.style.visibility = hiddenElement;
}

init();