// The question text will be placed in a heading on the page.
var questionHeading = document.querySelector("#question-heading");

// The answers will be buttons inside the div with id "answers".
var answersDiv = document.querySelector("#answers");

// When user clicks answer button, show their result for the question
var resultDiv = document.querySelector("#result");

var countdownText = document.querySelector("#countdown");


// The quiz involves showing a series of questions.

function showResultAndContinue(text) {
  resultDiv.textContent = text;

  setTimeout(() => {
    var noMoreQuestions = ! showNextQuestion();
    if (noMoreQuestions || countdownTimer <= 0) {
      endQuiz();
    }
  }, 2000);
}

function makeAnswer(text, isCorrect) {
  var newAnswer = document.createElement("button");
  answersDiv.appendChild(newAnswer); 
  newAnswer.textContent = text;

  // add "click" event listener to each answer
  //    - listener for correct answer
  //    - different listener for incorrect answers

  if (isCorrect) {
    newAnswer.addEventListener("click", () => {
      showResultAndContinue("Correct!");
    });
  } else {
    newAnswer.addEventListener("click", () => {
      countdownTimer = countdownTimer - 15;
      showResultAndContinue("Wrong!");
    });
  }
}

var questionNumber = 0;

function question1() {
  questionHeading.textContent = "To check if variable `x` is an even number, which expression would you use:";
  makeAnswer("1. x === 2", false);
  makeAnswer("2. x / 2", false);
  makeAnswer("3. (x % 2) === 1", false);
  makeAnswer("4. (x % 2) === 0", true);
}

function question2() {
  questionHeading.textContent = "To join two strings together into a longer string, which would you use:";
  makeAnswer("1. 'peanut ' . 'butter'", false);
  makeAnswer("2. 'peanut ' + 'butter'", true);
  makeAnswer("3. 'peanut ' & 'butter'", false);
  makeAnswer("4. 'peanut '.join('butter')", false);
}

function showNextQuestion() {
  questionNumber++;

  resultDiv.textContent = "";
  answersDiv.innerHTML = "";

  if (questionNumber === 1) {
    question1();
    return true;
  } else if (questionNumber === 2) {
    question2();
    return true;
  } else {
    return false;
  }
}

// 1) start the timer


var myTimer;
var countdownTimer = 5;
countdownText.textContent = countdownTimer;

function everySecond() {
  countdownTimer--;
  countdownText.textContent = Math.max(countdownTimer, 0);
  
  // Check if time has run out

  if (countdownTimer <= 0) {
    // When the user runs out of time, go to the Done page
    endQuiz();
  } 
}

myTimer = setInterval(everySecond, 1000);

// Show form for entering initials for high score table

function initialsForm() {
  var form = document.createElement("form");
  var label = document.createElement("label");
  label.textContent = "Your Initials:";
  var input = document.createElement("input");
  var submit = document.createElement("button");
  submit.className = "submit-button";
  submit.textContent = "Submit";

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(submit);
  answersDiv.appendChild(form);
}


// This function will render the points awarded
// and show the form for entering initials for high score.

function endQuiz() {
  var score;
  clearInterval(myTimer);

  if (countdownTimer <= 0) {
    questionHeading.textContent = "You're out of time!";
    score = 0;
  } else {
    questionHeading.textContent = "Congratulations! You answered all questions";
    score = countdownTimer;
  }

  answersDiv.innerHTML = `<p>Your score: ${score}</p>`;

  initialsForm();
}

showNextQuestion();
