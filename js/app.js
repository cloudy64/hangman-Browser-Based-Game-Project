
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

const winSound = new Audio("Assets/win.wav");
const loseSound = new Audio("Assets/lose.mp3");

let thisword;
let currentWord, currentHint;
let wrongGuessCount=0;
const maxGuesses=6;
let correctLetters=[];
let gameEnded = false;


const hangManImage=document.querySelector(".Hangman img");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guesses-text ");
const keyboardDiv=document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");


document.addEventListener("DOMContentLoaded", () => {

  const resetGame = () => {
    wrongGuessCount = 0;
    correctLetters = [];
    gameEnded = false;

    hangManImage.src = "Assets/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);

    getRandomWord();
    gameModal.classList.remove("show");
  };

  playAgainBtn.addEventListener("click", resetGame);


});
 
const getRandomWord = () => {
  const randomObj = words[Math.floor(Math.random() * words.length)];
  currentWord = randomObj.word;
  currentHint = randomObj.hint;
  thisword = currentWord;
  document.querySelector(".Hint-text p").innerText=currentHint;
  wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("")
}

getRandomWord();

const gameOver = (isWin) => {
  gameEnded = true;
  setTimeout(() => {
    const modalText = isWin ? `You found the word:` : `The correct word was:`;

    document.querySelector(".content > img").src = `Assets/${isWin ? "win" : "loss"}.jpg`;
    
    document.querySelector("p").innerHTML = `${modalText} <p>${currentWord}</p>`;
    gameModal.classList.add("show");

    if (isWin) {
      winSound.play();
    } else {
      loseSound.play();
    }
  }, 300);
};


const initialGame = (button, clickedLetter) => {
  if(gameEnded)return
  if (thisword.toUpperCase().includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter.toUpperCase() === clickedLetter) {
        correctLetters.push(letter);
        const li = wordDisplay.querySelectorAll("li")[index];
        li.innerText = letter;
        li.classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    if (wrongGuessCount <= maxGuesses) {
      hangManImage.src = `Assets/hangman-${wrongGuessCount}.svg`;
    }
  }
  button.disabled=true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if(wrongGuessCount===maxGuesses) return gameOver(false);
  if(correctLetters.length===currentWord.length) return gameOver(true);
};


const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < alphabet.length; i++) {
  const button=document.createElement("button");
  button.innerText=alphabet[i];
  keyboardDiv.appendChild(button);

  button.addEventListener("click", e => {
    const clickedLetter = e.target.innerText; 
    initialGame(e.target, clickedLetter);
  });
};

