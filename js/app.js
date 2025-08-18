
 const words = [
  {
    word: "variable",
    hint: "A placeholder for a value.",
  },
  {
    word: "function",
    hint: "A block of code that performs a specific task.",
  },
  {
    word: "loop",
    hint: "A programming structure that repeats a sequence of instructions until a specific condition is met.",
  },
  {
    word: "array",
    hint: "A data structure that stores a collection of elements.",
  },
  {
    word: "boolean",
    hint: "A data type that can have one of two values, true or false.",
  },
  {
    word: "parameter",
    hint: "A variable in a method definition.",
  },
  {
    word: "algorithm",
    hint: "A step-by-step procedure or formula for solving a problem.",
  },
  {
    word: "debugging",
    hint: "The process of finding and fixing errors in code.",
  },
  {
    word: "syntax",
    hint: "The rules that govern the structure of statements in a programming language.",
  },
];
 
let currentWord;
let guesssedletters=[];
let wrongGuesses=0; 

const maxGuesses = 6;



const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  // hangman-0.svg.src=Assets///picture here
  guesssedletters.innerText=`$`

}

function getRandomWord(){
  let random=Math.floor(Math.random()*words.length)

  return words[random];
}


function displayWord() {
  let display = "";
  for (let letter of word) {
    if (guessedLetters.includes(letter)) {
      display += letter + " ";} else {
        display += "_ "; 
      }
    }
    document.querySelector(".word-display").innerText = display;
  }


  //use split




  function checkGameOver(){
    let message=document.querySelector(".game-message")
  if (wrongGuesses >= maxGuesses) {
    message.innerText = "Game Over! 😢 The word was: " + word;
  } else if (!document.querySelector(".word-display").innerText.includes("_"))
     {
    message.innerText = "You Win! 🎉"
    }
  }