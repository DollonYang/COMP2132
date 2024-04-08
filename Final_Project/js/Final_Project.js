document.addEventListener('DOMContentLoaded', () => {
    const availableWords = [
        { word: 'apple',    hint: 'a fruit' },
        { word: 'canada',   hint: 'a country' },
        { word: 'elephant', hint: 'a large animal' }

    ];

    let selectedWord;
    let wrongGuesses       = 0;
    let correctGuesses     = 0;
    const maxWrongGuesses  = 7;
    let guessedLetters     = [];
    let guessing           = true;

    const wordDisplay      = document.getElementById('word-display');
    const hintText         = document.getElementById('hint-text');
    const incorrectGuesses = document.getElementById('incorrect-guesses');
    const letterButtons    = document.getElementById('letter-buttons');
    const playAgainBtn     = document.getElementById('play-again');
    const hangmanImage     = document.getElementById('hangman-image');

    function initializeGame() {
        wrongGuesses   = 0;
        correctGuesses = 0;
        guessedLetters = [];
        guessing       = true;
        incorrectGuesses.textContent = `${wrongGuesses}/${maxWrongGuesses}`;
        letterButtons.innerHTML      = '';
        hangmanImage.src             = '../Final_Project/image/0.jpg'; 


        const randomIndex    = Math.floor(Math.random() * availableWords.length);
        selectedWord         = availableWords[randomIndex].word.toUpperCase();
        hintText.textContent = availableWords[randomIndex].hint;


        wordDisplay.innerHTML = selectedWord.split('').map(letter => 
            `<span class="letter">_</span>`
        ).join('');


        for (let i = 65; i <= 90; i++) {
            const button       = document.createElement('button');
            button.textContent = String.fromCharCode(i);
            button.addEventListener('click', handleLetterClick);
            letterButtons.appendChild(button);
        }
    }

    function handleLetterClick(event) {
        if (!guessing) return;

        const letter = event.target.textContent;
        event.target.disabled = true;

        if (selectedWord.includes(letter)) {

            const letters = document.getElementsByClassName('letter');
            selectedWord.split('').forEach((char, index) => {
                if (char === letter) {
                    letters[index].textContent = letter;
                    correctGuesses++;
                }
            });


            if (correctGuesses === selectedWord.length) {
                endGame(true);
            }
        } else {
            wrongGuesses++;
            incorrectGuesses.textContent = `${wrongGuesses}/${maxWrongGuesses}`;
            
            updateHangmanImage(wrongGuesses);

            if (wrongGuesses === maxWrongGuesses) {
                endGame(false);
            }
        }
    }

    function updateHangmanImage(wrongGuesses) {
        hangmanImage.src = `../Final_Project/image/${wrongGuesses}.jpg`;
        hangmanImage.alt = `Hangman with ${wrongGuesses} wrong guesses`;
    }

    function showModalWithFadeIn() {
        const resultModal = document.getElementById('result-modal');
        resultModal.classList.add('fade-in'); 
        resultModal.style.display = "block";
    }

    function endGame(won) {
        const resultModal = document.getElementById('result-modal');
        const resultImage = document.getElementById('result-image');
        const resultText  = document.getElementById('result-text');
        const guessedWordText = document.getElementById('guessed-word'); 
    
        if (won) {
            resultImage.src         = '../Final_Project/image/8.jpg';
            resultText.textContent  = "You win! You defeated the mad rhino.";
        } else {
            resultImage.src = '../Final_Project/image/7.jpg';
            resultText.textContent  = "You lose. The mad rhino has defeated you.";
        }
    
        guessedWordText.textContent = "Word was: " + selectedWord; 
    
        resultModal.classList.add('fade-in');
        resultModal.style.display   = "block";
    }

    


    initializeGame();

    document.getElementById('play-again-btn').addEventListener('click', function() {
        document.getElementById('result-modal').style.display = "none"; 
        initializeGame(); 
    });
});
