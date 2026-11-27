
// COUNTRIES AND FLAGS

const countries = [
    { code: "br", name: "Brazil" },
    { code: "ca", name: "Canada" },
    { code: "fr", name: "France" },
    { code: "de", name: "Germany" },
    { code: "jp", name: "Japan" },
    { code: "it", name: "Italy" },
    { code: "au", name: "Australia" },
    { code: "ar", name: "Argentina" },
    { code: "mx", name: "Mexico" },
    { code: "pt", name: "Portugal" }
];


// GAME VARIABLES

let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


// HTML ELEMENTS

const welcomeSection = document.getElementById("welcome");
const quizSection = document.getElementById("quiz");
const finalSection = document.getElementById("final");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const flag = document.getElementById("flag");
const progress = document.getElementById("progress");
const letterCount = document.getElementById("letterCount");

const scoreElement = document.getElementById("score");

const answerInput = document.getElementById("answer");
const answerForm = document.getElementById("answerForm");

const submitButton = document.getElementById("submitButton");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");


// SHUFFLE COUNTRIES RANDOMLY

function shuffle(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
        [shuffled[j], shuffled[i]];

    }

    return shuffled;

}


// SHOW CURRENT QUESTION

function showQuestion() {

    const country = questions[currentQuestion];

    // Display country flag

    flag.innerHTML = `
        <img
            src="https://flagcdn.com/w320/${country.code}.png"
            alt="Country flag"
        >
    `;

    // Update question number

    progress.textContent =
        `QUESTION ${currentQuestion + 1} / ${questions.length}`;

    // Display number of letters

    letterCount.textContent =
        `${country.name.length} LETTERS`;

    // Reset input

    answerInput.value = "";
    answerInput.disabled = false;

    submitButton.disabled = false;

    // Reset feedback

    feedback.textContent = "";
    feedback.className = "feedback";

    nextButton.classList.add("hidden");

    answered = false;

    answerInput.focus();

}


// CHECK PLAYER'S ANSWER

answerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (answered) return;

    const guess = answerInput.value.trim().toLowerCase();

    const correctAnswer =
        questions[currentQuestion].name.toLowerCase();

    if (!guess) return;

    answered = true;

    answerInput.disabled = true;
    submitButton.disabled = true;

    // Correct answer

    if (guess === correctAnswer) {

        score++;

        scoreElement.textContent = score;

        feedback.textContent = "✓ Correct! Well done!";

        feedback.classList.add("correct");

    }

    // Incorrect answer

    else {

        feedback.textContent =
            `✗ Incorrect! The answer is ${questions[currentQuestion].name}.`;

        feedback.classList.add("incorrect");

    }

    nextButton.classList.remove("hidden");

});


// GO TO NEXT QUESTION

nextButton.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    }

    else {

        finishGame();

    }

});


// FINISH GAME

function finishGame() {

    quizSection.classList.add("hidden");

    finalSection.classList.remove("hidden");

    document.getElementById("finalScore").textContent =
        `You got ${score} out of ${questions.length} correct answers!`;

}


// START GAME

function startGame() {

    questions = shuffle(countries);

    currentQuestion = 0;

    score = 0;

    scoreElement.textContent = "0";

    welcomeSection.classList.add("hidden");

    finalSection.classList.add("hidden");

    quizSection.classList.remove("hidden");

    showQuestion();

}


// START BUTTON

startButton.addEventListener("click", startGame);


// PLAY AGAIN BUTTON

restartButton.addEventListener("click", function() {

    finalSection.classList.add("hidden");

    welcomeSection.classList.remove("hidden");

});
