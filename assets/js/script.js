// The question text will be placed in a heading on the page.

var questionHeading = document.querySelector("#question-heading");

// The answers will be buttons inside the div with id "answers".

var answersDiv = document.querySelector("#answers");

// The quiz involves showing a series of questions.

// 1) start the timer

var countdownText = document.querySelector("#countdown");

var myTimer;
var countdownTimer = 5;
countdownText.textContent = countdownTimer;

function everySecond() {
  countdownTimer--;
  countdownText.textContent = countdownTimer;
  
  // Check if time has run out

  if (countdownTimer == 0) {
    // When the user runs out of time, go to the Done page
    allDone();
    clearInterval(myTimer);
  } else {
    // do nothing 
  }

}

myTimer = setInterval(everySecond, 1000);

// This function will render the points awarded
// and show the form for entering initials for high score.

function allDone() {
  questionHeading.textContent = "You're out of time!";

  answersDiv.innerHTML = `<p>Your score: ${countdownTimer}</p>`;
}



// 2) show next question and answers

// 3) add "click" event listener to each answer
//    - listener for correct answer
//    - different listener for incorrect answers



questionHeading.textContent = "This is the question!";

var newAnswer = document.createElement("button");
answersDiv.appendChild(newAnswer); 
newAnswer.textContent = "New answer";



