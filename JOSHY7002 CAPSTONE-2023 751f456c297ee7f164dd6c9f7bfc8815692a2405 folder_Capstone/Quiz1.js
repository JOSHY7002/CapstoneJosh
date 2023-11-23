const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressbarFull = document.getElementById("progressbarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [  

 
 

  {  
  
  question: 'Solve for m: 2m+3=3m−34',  
  
  choice1: '3',  
  
  choice2: '6',  
  
  choice3: '2',  
  
  choice4: '2/3',  
  
  answer: 2,  
  
  },  
  
  {  
  
  question:  
  
  "Solve for x: x+5= 18",  
  
  choice1: "1",  
  
  choice2: "4/5",  
  
  choice3: "13",  
  
  choice4: "-5", 
  
  answer: 3,  
  
  },  
  
  {  
  
  question: "Solve for x: 3x+4=10",  
  
  choice1: "10",  
  
  choice2: "2",  
  
  choice3: "3/4", 
  
  choice4: "4/30",  
  
  answer: 3,  
  
  },  
  {  
  
    question: "Solve the linear equation: 12 = -2(-9 -3z)",  
    
    choice1: "-36",  
    
    choice2: "-1",  
    
    choice3: "1", 
    
    choice4: "10",  
    
    answer: 2,  
    
    },  
    {  
  
      question: "Solve this equation: -a + 7 = 2a - 8",  
      
      choice1: "7",  
      
      choice2: "67",  
      
      choice3: "5", 
      
      choice4: "-9",  
      
      answer: 3,  
      
      },  
      {  
  
        question: " Solve -x + 5 = 2x - 7",  
        
        choice1: "13",  
        
        choice2: "4",  
        
        choice3: "x", 
        
        choice4: "5",  
        
        answer: 2,  
        
        },  
        {  
  
          question: "Solve -x + 5 = 2x - 7. ",  
          
          choice1: "-6",  
          
          choice2: "4",  
          
          choice3: "8", 
          
          choice4: "3",  
          
          answer: 2,  
          
          },  
          {  
  
            question: "Solve for a: -(a - 9) = 3a + 17",  
            
            choice1: "34",  
            
            choice2: "-2",  
            
            choice3: "7", 
            
            choice4: "5.25",  
            
            answer: 2,  
            
            },  
  
  ]; 
//CONSTANTS
const CORRECT_BONUS = 100;
const MAX_QUESTIONS = 8;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/equation-end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Updating progress bar//
  progressbarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if(classToApply === "correct"){
        imcrementScore(CORRECT_BONUS);
      }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

imcrementScore = num => {
score += num;
scoreText.innerText = score;
}
startGame();