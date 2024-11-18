// Array of riddles and their answers (words)
const riddles = [
    { question: "I am red or green, and I keep doctors away. What am I?", answer: "apple" },
    { question: "I am long, yellow, and I grow in bunches. What am I?", answer: "banana" },
    { question: "I have four wheels and take you places. What am I?", answer: "car" },
    { question: "I bark and wag my tail. What am I?", answer: "dog" },
    { question: "I have a roof and walls, and you live in me. What am I?", answer: "house" },
    { question: "I'm your closest companion and can be human or animal. What am I?", answer: "friend" },
    { question: "I am full of pages and you read me. What am I?", answer: "book" },
    { question: "I am a place for learning, filled with desks and students. What am I?", answer: "school" },
    { question: "I have flowers and trees, and people plant me. What am I?", answer: "garden" },
    { question: "I am round and cheesy, sometimes with toppings. What am I?", answer: "pizza" }
];

let selectedRiddle;
let scrambledAnswer;
let score = 0;
let questionCount = 0;
const totalQuestions = 10;
let askedRiddles = []; // Array to track asked riddles

// Function to scramble a word
function scrambleWord(word) {
    const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    return scrambled;
}

// Function to start the game
function startGame() {
    score = 0; // Reset score
    questionCount = 0; // Reset question count
    askedRiddles = []; // Clear asked riddles
    document.getElementById('score').textContent = score;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    nextRiddle(); // Load the first riddle
}

// Function to load the next riddle
function nextRiddle() {
    if (questionCount < totalQuestions) {
        let randomIndex;

        // Get a new riddle that hasn't been asked yet
        do {
            randomIndex = Math.floor(Math.random() * riddles.length);
        } while (askedRiddles.includes(randomIndex));

        // Store the chosen riddle index
        askedRiddles.push(randomIndex);
        selectedRiddle = riddles[randomIndex];
        scrambledAnswer = scrambleWord(selectedRiddle.answer);
        
        document.getElementById('riddle').textContent = selectedRiddle.question;
        document.getElementById('scrambled-word').textContent = scrambledAnswer;
        document.getElementById('user-input').value = ''; // Clear input
        document.getElementById('message').textContent = ''; // Clear message
        questionCount++;
    } else {
        endGame();
    }
}

// Function to check user input
function checkGuess() {
    const userInput = document.getElementById('user-input').value;
    const messageElement = document.getElementById('message');

    if (userInput.toLowerCase() === selectedRiddle.answer) {
        score++; // Increment score
        document.getElementById('score').textContent = score;
        messageElement.textContent = "Correct! Well done!";
        nextRiddle(); // Load a new riddle
    } else {
        messageElement.textContent = "Oops! Try again!";
    }
}

function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('final-message').textContent = `You scored ${score} out of ${totalQuestions}. Well done!🥳`;
}

// Function to restart the game
function restartGame() {
    document.getElementById('end-screen').style.display = 'none';
    startGame();
}

// Event listeners
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('submit-btn').addEventListener('click', checkGuess);
document.getElementById('restart-game-btn').addEventListener('click', restartGame);

// Start game on page load
window.onload = () => {
    document.getElementById('restart-btn').style.display = 'none'; // Hide restart button initially
};
