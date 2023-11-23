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
    
    question: 'Without using a calculator, Multiply: 5 X 82 X 2',  
    
    choice1: '820',  
    
    choice2: '365',  
    
    choice3: '7248',  
    
    choice4: '28',  
    
    answer: 1,  
    
    },  
    
    {  
    
    question:  
    
    "Without using a calculator, Multiply: 4 X 54 X 8",  
    
    choice1: "1532",  
    
    choice2: "1728",  
    
    choice3: "1863",  
    
    choice4: "1892", 
    
    answer: 2,  
    
    },  
    
    {  
    
    question: "Using the multiplying by 5s tactic: Multiply 5*67 ",  
    
    choice1: "390",  
    
    choice2: "335",  
    
    choice3: "320", 
    
    choice4: "325",  
    
    answer: 2,  
    
    },  
    {  
    
      question: "Without using a calculator, Multiply: 11 x 35", 
      
      choice1: "335",  
      
      choice2: "987",  
      
      choice3: "385", 
      
      choice4: "100",  
      
      answer: 3,  
      
      },  
      {  
    
        question: "Without using a calculator, Divide: 730/5",  
        
        choice1: "146",  
        
        choice2: "87",  
        
        choice3: "123", 
        
        choice4: "116",  
        
        answer: 1,  
        
        },  
        {  
    
          question: "Without using a calculator, Add: 986+567",  
          
          choice1: "1565",  
          
          choice2: "1553",  
          
          choice3: "1554", 
          
          choice4: "1494",  
          
          answer: 2,  
          
          },  
          {  
    
            question: "Without using a calculator, Subtract: 543 - 332",  
            
            choice1: "211",  
            
            choice2: "213",  
            
            choice3: "217", 
            
            choice4: "214",  
            
            answer: 1,  
            
            },  
            {  
    
              question: "Without using a calculator, Multiply: 123 * 64",  
              
              choice1: "7652",  
              
              choice2: "7872",  
              
              choice3: "7983", 
              
              choice4: "7746",  
              
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
    return window.location.assign("/patternEnd.html");
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