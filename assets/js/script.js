// The question text will be placed in a heading on the page.
var questionHeading = document.querySelector("#question-heading");

// The answers will be buttons inside the div with id "answers".
var answersDiv = document.querySelector("#answers");

// When user clicks answer button, show their result for the question
var resultDiv = document.querySelector("#result");

var countdownText = document.querySelector("#countdown");

var scoresElement = document.querySelector("#scores");

var clearButton = document.querySelector("#clear-button");

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

// This variable controls whether we will accept clicks
// on the answer buttons. We want to ignore clicks
// after the user has made their first click ... until the
// next question is shown.
var buttonsEnabled;

function makeAnswer(text, isCorrect) {
  var newAnswerButton = document.createElement("button");
  newAnswerButton.setAttribute("class", "enabled"); // enables hover style
  answersDiv.appendChild(newAnswerButton); 
  newAnswerButton.textContent = text;

  // add "click" event listener to each answer
  //    - listener for correct answer
  //    - different listener for incorrect answers

  //newAnswerButton.setAttribute("disabled", "disabled");

  if (isCorrect) {
    newAnswerButton.addEventListener("click", () => {
      if (buttonsEnabled) {
        showResultAndContinue("Correct!");
        buttonsEnabled = false;
        newAnswerButton.setAttribute("class", "disabled");
      }
    });
  } else {
    newAnswerButton.addEventListener("click", () => {
      if (buttonsEnabled) {
        countdownTimer = countdownTimer - 15;
        showResultAndContinue("Wrong!");
        buttonsEnabled = false;
        newAnswerButton.setAttribute("class", "disabled");
      }
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

function question3() {
  questionHeading.textContent = "To count how many items are in an array named `animals`, which is correct:";
  makeAnswer("1. length(animals)", false);
  makeAnswer("2. count(animals)", false);
  makeAnswer("3. animals.length", true);
}

function question4() {
  questionHeading.textContent = "To check if a variable `a` is equal in type and value to variable `b`, which is correct:";
  makeAnswer("1. a !== b", false);
  makeAnswer("2. a === b", true);
  makeAnswer("3. a.equals(b)", false);
  makeAnswer("4. a == b", false);
}

function showNextQuestion() {
  questionNumber++;

  resultDiv.textContent = "";
  answersDiv.innerHTML = "";

  buttonsEnabled = true;

  if (questionNumber === 1) {
    question1();
    return true;
  } else if (questionNumber === 2) {
    question2();
    return true;
  } else if (questionNumber === 3) {
    question3();
    return true;
  } else if (questionNumber === 4) {
    question4();
    return true;
  } else {
    return false;
  }
}

// 1) start the timer


var myTimer;
var countdownTimer = 75;

function everySecond() {
  countdownTimer--;
  countdownText.textContent = Math.max(countdownTimer, 0);
  
  // Check if time has run out

  if (countdownTimer <= 0) {
    // When the user runs out of time, go to the Done page
    endQuiz();
  } 
}

if (countdownText) {
  countdownText.textContent = countdownTimer;
  myTimer = setInterval(everySecond, 1000);
}

// Show form for entering initials for high score table

function initialsForm(quizScore) {
  var form = document.createElement("form");
  form.setAttribute("action", "highscore.html");

  var label = document.createElement("label");
  label.textContent = "Your Initials:";

  var input = document.createElement("input");

  var submit = document.createElement("button");
  submit.className = "submit-button";
  submit.textContent = "Submit";

  submit.addEventListener("click", () => {
    // Update local storage with the Coder's initials and score

    var currentScore = {
      coder: input.value,
      score: quizScore
    };

    previousHighScoresJson = localStorage.getItem("highScoreBreakdown");

    if (previousHighScoresJson === null) {
      highScores = [];
    } else {
      // Local Storage only stores strings, so we have to convert it to an object value
      // using JSON.parse() on the string
      highScores = JSON.parse(previousHighScoresJson);
    } 

    // Add the current score to the array
    highScores.push(currentScore);

    localStorage.setItem("highScoreBreakdown", JSON.stringify(highScores));
  });

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

  initialsForm(score);
}

function listHighScores() {
  highScoresJson = localStorage.getItem("highScoreBreakdown");
  highScores = JSON.parse(highScoresJson);

  scoresString = "";
  for (var i = 0; i < highScores.length; i++) {
    scoresString = scoresString + `${i + 1}.  ${highScores[i].coder}  ${highScores[i].score}\n`;
  }

  scoresElement.textContent = scoresString;
}


// if the question heading element exists, we are on the quiz page
if (questionHeading) {
  showNextQuestion();
}

// if the scores element exists, we are on the high scores page
if (scoresElement) {
  listHighScores();

  clearButton.addEventListener("click", () => {
    localStorage.setItem("highScoreBreakdown", JSON.stringify([]));
    listHighScores();
  });
}




