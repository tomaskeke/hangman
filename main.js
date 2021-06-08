
// elements
const error = document.getElementById("error")
const button = document.getElementById("button");
const guessbox = document.getElementById("guessBox");
const usedLetters = document.getElementById("usedLetters");
const ul = document.getElementById("list");
const lifecount = document.getElementById("lifeCount");
const gameOverDiv = document.getElementById("gameOver");

//global Variables
let randomWord
let wordArray = []
let guess
let li
let indexArray
let lives
let indexLives
let showLives
let usedLength = []
let resultsArray = []
let incorrectArray = []
gameOverDiv.setAttribute("class", "hidden");

function winner() {
    liList = [...ul.getElementsByTagName('li')]
    resultsArray = []
    liList.forEach(li => {
        resultsArray.push(li.textContent)
      
        wordArray.join("");
        
        if (resultsArray.length !== wordArray.length) return false;
        for (var i = 0; i < resultsArray.length; i++) {
            if (resultsArray[i] !== wordArray[i]) return false;
        }


        gameOverDiv.removeAttribute("class", "hidden")
        gameOverDiv.innerHTML = `<h2 style="color: green;">YOU WIN! :)</h2> <br /><br />
    <button id="tryAgain">Play again?</button>`
        const playAgain = document.getElementById("tryAgain")
        playAgain.addEventListener('click', (event) => {
            startGame();
        })
    })
}


function gameOver() {
    if (lives === 0) {
        gameOverDiv.removeAttribute("class", "hidden")
        gameOverDiv.innerHTML = `<h2 style="color: red;">GAME OVER! :(</h2> <br /><br />
        <h4>The correct word was</h4><h2>${randomWord}</h2><br /><br /> 
        <button id="tryAgain">Try again?</button>`
        const tryAgain = document.getElementById("tryAgain")
        tryAgain.addEventListener('click', (event) => {
            startGame();
        })
    }
}
// function winner(){

// }
function correct() {                                       // for every index in indexArray, get LI with same ID as index(li0,li1,li2)
    indexArray.forEach(index => {
        const liValue = document.getElementById(index)
        liValue.textContent = guess;                                       // Adding guess to li, printing correct guessed letter.
    })
    winner()
};
function addUsedLetters() {                                                   // adding the guess to usedLetters array
        usedLetters.textContent = usedLength;
};


function preventMultiple () {
    if (usedLength.includes(guess)) {
        error.textContent = "character already used"

    } else {
        usedLength.push(guess)
        error.textContent = ""
        lives -= 1;
        addUsedLetters();
    }
   
}

function filterusedLength (){
    if(usedLength !== wordArray){
        preventMultiple();
    }
}



function incorrect() {
    // if guess does not match, it returns index of -1, using that to print the guess to usedLetters                                
    if ((indexLives === -1) && (lives > 0)) {
        showLives.textContent = ("You have " + lives + " Lives left!");
        filterusedLength();
    }

};
//checks if word matches input, 
function compareGuess() {                                                             // Checking randomword for a match against user input (guess)
    indexArray = []
    indexLives = (wordArray.indexOf(guess));
    for (i = 0; i < wordArray.length; i++) {
        if (wordArray[i] === guess) {
            indexArray.push(i);                                                     // if guess match any letter in wordarray, pushing index of matching letter to index-array.
        }
    }
    winner();
    gameOver();
    incorrect();
    correct();
};
function getLives() {
    showCategory = document.createElement("div")                                                                 // Creating div to show how many lives you have left. Setting total of 10 lives.
    showLives = document.createElement("div");
    showCategory.setAttribute("class", "category")
    showLives.setAttribute("class", "lives")
    lifecount.innerHTML = "";
    lifecount.appendChild(showCategory);
    lifecount.appendChild(showLives);

    lives = 10;
    showCategory.textContent = (`The category is: Countries`)
    showLives.textContent = ("You have " + lives + " Lives left!");
};
function createList() {
    usedLength = []                                                                 // creating LI for every letter in random word, adding - and spacing if found in word.
    ul.innerHTML = "";
    for (i = 0; i < wordArray.length; i++) {
        li = document.createElement("li")
        li.setAttribute("id", i)                                                       // Setting ID +1 for every letter. (li0,li1,li2)
        ul.appendChild(li);
        if (wordArray[i] === "-") {
            li.textContent = "-";
        }else if(wordArray[i] === " "){
            li.textContent = " ";
        }else{
            li.textContent = "_";   
        }
    }

    getLives();
};

// take in letter, init compareGuess
guessbox.addEventListener("input", guessletter = (event) => {
    guess = event.target.value.toLowerCase();
    let letters = /^[A-Za-z]+$/
    if(guess.match(letters)){
        error.textContent = "";
    }else {
        event.target.value = "";
        error.textContent = "Invalid guess - Only letters"
        guessletter();
    } 
    compareGuess();
    guessbox.value = "";

});
// button event to get random word, send to createList
button.addEventListener('click', startGame = () => {
    const randomPick = countryArray[Math.floor(Math.random() * countryArray.length)];       // Making a random pick from array of objects
    gameOverDiv.innerHTML = "";
    error.textContent = "";
    gameOverDiv.setAttribute("class", "hidden")
    usedLetters.textContent = "";
    if (usedLetters.textContent = "") {
        usedLetters.setAttribute("class", "hidden");
    } else {
        usedLetters.removeAttribute("class", "hidden");
    };                                                                                     // Reset usedLetters on every new game
    randomWord = randomPick.word;                                                          // Selecting word property in arrayobject
    wordArray = randomWord.toLowerCase().split("");                                         // converting random word to array
    createList();
});

