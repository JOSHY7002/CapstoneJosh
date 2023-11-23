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
  
  question: 'What is the simplified version of this exponent? 7^4',  
  
  choice1: '2,401',  
  
  choice2: '6,523',  
  
  choice3: '7',  
  
  choice4: '28',  
  
  answer: 1,  
  
  },  
  
  {  
  
  question:  
  
  "What is the simplified version of this exponent? 8^-4",  
  
  choice1: "4096",  
  
  choice2: "0.00024414062",  
  
  choice3: "0.859375",  
  
  choice4: "-4096", 
  
  answer: 2,  
  
  },  
  
  {  
  
  question: "Simplify this exponent:(3^3)^5",  
  
  choice1: "27^5",  
  
  choice2: "335",  
  
  choice3: "3^15", 
  
  choice4: "3",  
  
  answer: 3,  
  
  },  
  {  
  
    question: "Evaluate the exponential form. 5^0",  
    
    choice1: "0",  
    
    choice2: "5",  
    
    choice3: "1", 
    
    choice4: "10",  
    
    answer: 3,  
    
    },  
    {  
  
      question: "Simplify this espression: (x^4)(x^3)",  
      
      choice1: "x^7",  
      
      choice2: "x(4*3)",  
      
      choice3: "x^1", 
      
      choice4: "x12",  
      
      answer: 1,  
      
      },  
      {  
  
        question: "Simplify this expression: y^9 / y^5",  
        
        choice1: "y^13",  
        
        choice2: "y^4",  
        
        choice3: "y", 
        
        choice4: "y^45",  
        
        answer: 2,  
        
        },  
        {  
  
          question: "Write the product using an exponent: 8 x 8 x 8 x 8 x 8 x 8",  
          
          choice1: "8^6",  
          
          choice2: "6^8",  
          
          choice3: "8^8", 
          
          choice4: "8",  
          
          answer: 1,  
          
          },  
          {  
  
            question: "Simplify this expression using an exponent:(5^7)^5",  
            
            choice1: "225223",  
            
            choice2: "5^35",  
            
            choice3: "7^5", 
            
            choice4: "5^7 x 5",  
            
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
    return window.location.assign("/exponents-end.html");
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