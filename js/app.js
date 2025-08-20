
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

let thisword;
let currentWord, currentHint;
let wrongGuessCount=0;
const maxGuesses=6;
let correctLetters=[];

const hangManImage=document.querySelector(".Hangman img");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guesses-text ");
const keyboardDiv=document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");



const getRandomWord = () => {
  const randomObj = words[Math.floor(Math.random() * words.length)];
  currentWord = randomObj.word;
  currentHint = randomObj.hint;
  thisword = currentWord;
  document.querySelector(".Hint-text p").innerText=currentHint;
  wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("")
}

getRandomWord();
console.log(currentWord, currentHint);

const gameOver = (isWin) => {
  setTimeout(() => {
    const modalText=isWin?`you find the word:` : `the correct word was :`;

    gameModal.querySelector(".img").src = `../Assets/${isWin ? "win" : "loss"}.jpg`;
      gameModal.querySelector("h4").innerText = `${isWinn? "congrats !" : "game over !"}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <p>${currentWord} </p>`;
        gameModal.classList.add("show");
  },300);
}

const initialGame = (button, clickedLetter) => {
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

    hangManImage.src = `Assets/hangman-${wrongGuessCount}.svg`;
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
}

