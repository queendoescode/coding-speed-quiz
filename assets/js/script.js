// The question text will be placed in a heading on the page.

var questionHeading = document.querySelector("#question-heading");

// The answers will be buttons inside the div with id "answers".

var answersDiv = document.querySelector("#answers");

// The quiz involves showing a series of questions.



questionHeading.textContent = "This is the question!";

var newAnswer = document.createElement("button");
answersDiv.appendChild(newAnswer); 
newAnswer.textContent = "New answer";



