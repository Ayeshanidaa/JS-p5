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
let askedRiddles = []; // Track asked riddles
let previousRiddles = []; // Store previously asked riddles

function scrambleWord(word) {
    const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    // console.log(`Original Word: ${word} | Scrambled Word: ${scrambled}`);
    // return scrambled;
}


function startGame() {
    score = 0;
    questionCount = 0;
    askedRiddles = [];
    previousRiddles = [];
    document.getElementById('score').textContent = score;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    nextRiddle();
}

function goToStartScreen() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

function nextRiddle() {
    if (questionCount < totalQuestions) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * riddles.length);
        } while (askedRiddles.includes(randomIndex));

        if (selectedRiddle) {
            previousRiddles.push(selectedRiddle.question);
        }

        askedRiddles.push(randomIndex);
        selectedRiddle = riddles[randomIndex];
        scrambledAnswer = scrambleWord(selectedRiddle.answer);
        
        document.getElementById('riddle').textContent = selectedRiddle.question;
        document.getElementById('scrambled-word').textContent = scrambledAnswer;
        document.getElementById('user-input').value = '';
        document.getElementById('message').textContent = '';
        questionCount++;
        
        console.log("Previous Riddles:", previousRiddles);
    } else {
        endGame();
    }
}

function checkGuess() {
    const userInput = document.getElementById('user-input').value;
    const messageElement = document.getElementById('message');

    if (userInput.toLowerCase() === selectedRiddle.answer) {
        score++;
        document.getElementById('score').textContent = score;
        messageElement.textContent = "Correct! Well done!";
        console.log(`User answered correctly: ${userInput}`);
        alert("Correct! Well done! 🎉");
        nextRiddle();
    } else {
        messageElement.textContent = "Oops! Try again!";
        console.log(`User answered incorrectly: ${userInput} (Correct Answer: ${selectedRiddle.answer})`);
        alert(`Wrong answer! The correct answer was: ${selectedRiddle.answer}`);
    }
}

function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('final-message').textContent = `You scored ${score} out of ${totalQuestions}. Well done!🥳`;
}

function restartGame() {
    document.getElementById('end-screen').style.display = 'none';
    startGame();
}

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('submit-btn').addEventListener('click', checkGuess);
document.getElementById('restart-game-btn').addEventListener('click', restartGame);


document.addEventListener("DOMContentLoaded", () => {
    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) restartBtn.style.display = "none";
});
