// Selecting Elements using jQuery
const scoreE1 = $(".score");
const highscoreE1 = $(".highscore");
const secretwordE1 = $(".secretword");
const guessedcharE1 = $(".guessedchar");
const inputcharE1 = $(".inputchar");
const messageE1 = $(".message");
const btn = $(".btn");
const body = $("body");

// Initialize variables
var Score = 10;
var HighScore = 0;
var guessedchars = "";
var secretword;
var inputchar;
var winstatus = false;
var resultword;

// Function to update game result
const updateResult = function() {
    // Check if the player has already won
    if (winstatus === true) {
        messageE1.text("You already won, please click again to start a new game");
        body.css("background-color", "green");
        return 1;
    }
    
    // Check if the player has lost
    if (Score === 0) {
        body.css("background-color", "red");
        messageE1.text("You already lost, click again to start a new game");
        return -1;
    }
    
    // Check if the guessed character has already been tried
    if (guessedchars.includes(inputchar)) {
        messageE1.text("You already tried this letter, try another one");
    } else {
        // Update guessed characters
        guessedchars = guessedchars + inputchar;
        guessedcharE1.text(guessedchars.split(""));
        
        // Check if the guessed character is in the secret word
        if (secretword.includes(inputchar)) {
            for (var i = 0; i < secretword.length; i++) {
                if (inputchar === secretword[i]) {
                    resultword[i] = secretword[i];
                    secretwordE1.text(resultword.join(" "));
                }
            }
            
            // Check if the player has won
            if (resultword.join("") === secretword) {
                body.css("background-color", "green");
                messageE1.text("You WON!");
                
                // Update high score if applicable
                if (HighScore < Score) {
                    HighScore = Score;
                    highscoreE1.text(HighScore);
                    winstatus = true;
                }
            }
        } else {
            // Decrement score if the guessed character is not in the secret word
            Score--;
            scoreE1.text(Score);
        }
    }
};

// Function to fetch a random word
const getWord = async function() {
    const res = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await res.json();
    secretword = data[0];
    console.log(secretword);
    resultword = "_".repeat(secretword.length).split("");
    secretwordE1.text(resultword.join(" "));
};

// Event listener for keyup on the input field
inputcharE1.on('keyup', function(e) {
    inputcharE1.val(e.key.toLowerCase());
    
    // Validate input and update result
    if (inputcharE1.val().length > 1 || !/^[a-zA-Z]/.test(inputcharE1.val())) {
        inputcharE1.val("");
    } else {
        inputchar = inputcharE1.val();
        updateResult();
    }
});

// Event listener for click on the button
btn.on('click', function() {
    // Reset game variables and styles
    Score = 10;
    scoreE1.text(Score);
    body.css("background-color", "black");
    guessedchars = "";
    guessedcharE1.text("");
    messageE1.text("Guess a letter");
    winstatus = false;
    getWord();
});

// Start the game by fetching a random word
getWord();

