// The question text will be placed in a heading on the page.

var questionHeading = document.querySelector("#question-heading");

// The answers will be buttons inside the div with id "answers".

var answersDiv = document.querySelector("#answers");

// The quiz involves showing a series of questions.

// 1) start the timer

var countdownText = document.querySelector("#countdown");


var countdownTimer = 75;
countdownText.textContent = countdownTimer;

setInterval(
  () => {
    countdownTimer--;
    countdownText.textContent = countdownTimer;
  }
  , 1000
);


// 2) show next question and answers

// 3) add "click" event listener to each answer
//    - listener for correct answer
//    - different listener for incorrect answers



questionHeading.textContent = "This is the question!";

var newAnswer = document.createElement("button");
answersDiv.appendChild(newAnswer); 
newAnswer.textContent = "New answer";



