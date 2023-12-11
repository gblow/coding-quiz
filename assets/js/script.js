const questions = [
{
    question: " What is the main function of Javascript?",
    answers:[
    {text: "To add styling to the web page.", correct: false},
    {text: "To build the structer of the webite.", correct: false},
    {text: "To allow users to interact with the website.", correct: true},
    {text: "All of the above.", correct: false},
]
},
{
    question: " What is flexbox used for?",
    answers:[
    {text: "To make images square.", correct: false},
    {text: "To structer your website in a box format.", correct: false},
    {text: "To lay a collection of items out in one direction or another.", correct: true},
    {text: "All of the above.", correct: false},
    ]
},
{
    question: " Why do we need CSS?",
    answers:[
    {text: "To add styling to the web page.", correct: true},
    {text: "To build the structer of the webite.", correct: false},
    {text: "To allow users to interact with the website.", correct: false},
    {text: "All of the above.", correct: false},
    ]
},
{
    question: " What syntax do you use after a funtion name in order to call it?",
    answers:[
    {text: "();", correct: true},
    {text: "('')", correct: false},
    {text: "()", correct: false},
    {text: "All of the above.", correct: false},
    ]
},
{
    question: " What is a pixel?",
    answers:[
    {text: "A mistake made in coding.", correct: false},
    {text: "How fast your program runs.", correct: false},
    {text: "The amount of space an element takes up.", correct: false},
    {text: "Unit of measurement.", correct: true},
    ]
},
{
    question: "Which is a programming language?",
    answers:[
    {text: "CSS.", correct: false},
    {text: "JavaScript.", correct: true},
    {text: "HTML.", correct: false},
    {text: "All of the above.", correct: false},
    ]
},
{
    question: " What is computer coding?",
    answers:[
    {text: "A list of functions.", correct: false},
    {text: "A TV show.", correct: false},
    {text: "Telling a computer what to do.", correct: true},
    {text: "All of the above.", correct: false},
    ]
},
{
    question: " What does HTML stand for?",
    answers:[
    {text: "Hyper Text Markup Language.", correct: true},
    {text: "Hyper Text Marketing Language.", correct: false},
    {text: "Hyper Text Market Language.", correct: false},
    {text: "None of the above.", correct: false},
    ]
},
{
    question: " What does the # represent?",
    answers:[
    {text: "A color.", correct: false},
    {text: "An id.", correct: true},
    {text: "A class.", correct: false},
    {text: "All of the above.", correct: false},
    ]
}
];


const startButton = document.getElementById("start-btn"); 
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
var timerEl = document.getElementById('timer');
let randomQuestion, currentQuestionIndex;
let score = 0;
let timeLeft = 60;
let timeInterval;
  
  
  // Event listeners
  startButton.addEventListener("click", startGame);
  nextButton.addEventListener("click", nextQuestion);
  
  // Functions
  
  function startGame() {
    console.log('Start Game');
    score = 0;
    startButton.classList.add('hide');
    randomQuestion = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
  
    // Clear any existing interval
    clearInterval(timeInterval);
  
    // Reset timer variables
    timeLeft = 60;
  
    // Start the countdown
    countdown();
    
    // Show the first question
    nextQuestion();
  }
  
  // Shows next question
  function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
      showQuestion(randomQuestion[currentQuestionIndex]);
      currentQuestionIndex++;
    } else {
      gameOver();
    }
  }
  
  
  function showQuestion(question) {
    reset();
  
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
  
      if (answer.correct) {
        button.dataset.correct = true;
      } else {
        button.dataset.correct = false;
      }
  
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  
    nextButton.classList.add("hide");
  }
  
  
  function countdown() {
    timeInterval = setInterval(function () {
      if (timeLeft > 0) {
        timerEl.textContent =
          timeLeft + (timeLeft === 1 ? " second remaining" : " seconds remaining");
        timeLeft--;
      } else {
        clearInterval(timeInterval);
        displayScore();
      }
    }, 1000);
  }
  
  function reset() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function displayScore() {
    reset();
    questionElement.innerHTML = `Score: ${score} out of ${questions.length}! To play again, click start below.`;
    nextButton.classList.add("hide");
    startButton.classList.remove("hide");
    saveScore();

    // Show the form
  showForm();
}
 
  
  function selectAnswer(e) {
    const selectBtn = e.target;
    const correct = selectBtn.dataset.correct;
    setStatus(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      clearStatus(button);
    });
    nextButton.classList.remove("hide");
  }
  
  function setStatus(element, correct) {
    clearStatus(element);
    if (correct === "true") {
      element.classList.add("correct");
      score++;
    } else {
      element.classList.add("incorrect");
      timeLeft = timeLeft - 5;
      timerEl.textContent = timeLeft + " seconds remaining";
    }
  }
  
  function clearStatus(element) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
  }
  
  function gameOver() {
    reset();
    questionElement.innerHTML = `Score: ${score} out of ${questions.length}! To play again, click start below.`;
    clearInterval(timeInterval);
    nextButton.classList.add("hide");
    startButton.classList.remove("hide");
    saveScore();
  }
  
  function saveScore() {
    // Check if local storage is supported
    if (typeof Storage !== "undefined") {
      // Get existing scores and initials from local storage or initialize an empty array
      const scoresData = JSON.parse(localStorage.getItem("scoresData")) || [];
  
      // Add the current score and initials to the array
      scoresData.push({ initials: document.getElementById("initials").value, score });
  
      // Save the updated scores and initials back to local storage
      localStorage.setItem("scoresData", JSON.stringify(scoresData));
    } else {
      // Local storage is not supported
      console.error("Local storage is not supported on this browser.");
    }
  }
  
  
  function getScores() {
    if (typeof Storage !== "undefined") {
      const scores = JSON.parse(localStorage.getItem("scores")) || [];
      console.log("Scores:", scores);
    } else {
      console.error("Local storage is not supported on this browser.");
    }
  }



function showForm() {
    const formContainer = document.getElementById('form-container');
    formContainer.style.display = 'block';
  }
  
  

  function showPreviousScores() {
    // Check if local storage is supported
    if (typeof Storage !== "undefined") {
      // Get scores and initials from local storage
      const scoresData = JSON.parse(localStorage.getItem("scoresData")) || [];
  
      // Display scores and initials on the webpage
      const scoresContainer = document.getElementById("previous-scores");
  
      // Clear previous scores
      scoresContainer.innerHTML = "";
  
      if (scoresData.length === 0) {
        // If there are no previous scores
        scoresContainer.innerHTML = "No previous scores available.";
      } else {
        // Display each score and initials
        scoresData.forEach((data, index) => {
          const scoreElement = document.createElement("p");
          scoreElement.textContent = `Score ${index + 1}: ${data.initials} - ${data.score} out of ${questions.length}`;
          scoresContainer.appendChild(scoreElement);
        });
      }
    } else {
      // Local storage is not supported
      console.error("Local storage is not supported on this browser.");
    }
  }
  
  // Call this function to display previous scores
  showPreviousScores();
  
  