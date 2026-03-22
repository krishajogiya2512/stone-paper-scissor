let msg = document.getElementById("msg");
let historyBox = document.getElementById("history");

let rockBtn = document.getElementById("rock");
let paperBtn = document.getElementById("paper");
let scissorBtn = document.getElementById("scissor");


let playerScore = 0;
let computerScore = 0;
let roundCount = 0;

let historyText = "";

function getComputerMove() {

    let randomNumber = Math.random();

    if (randomNumber <= 0.33) {
        return "Rock";
    }
    else if (randomNumber <= 0.67) {
        return "Paper";
    }
    else {
        return "Scissor";
    }

}

function playGame(playerMove) {

    let computerMove = getComputerMove();

    roundCount++;

    let result = "";

    if (playerMove === computerMove) {
        result = "Tie";
    }

    else if (playerMove === "Rock" && computerMove === "Scissor") {
        result = "Player";
        playerScore++;
    }

    else if (playerMove === "Paper" && computerMove === "Rock") {
        result = "Player";
        playerScore++;
    }

    else if (playerMove === "Scissor" && computerMove === "Paper") {
        result = "Player";
        playerScore++;
    }

    else {
        result = "Computer";
        computerScore++;
    }


    historyText +=
        "You: " + playerMove +
        " | Computer: " + computerMove +
        " → " + result + "\n";

    historyBox.innerText = historyText;


    msg.innerText =
        "Player: " + playerScore +
        "  Computer: " + computerScore;


    checkRound();

}

function checkRound() {

    if (playerScore === 2) {

        msg.innerText = "🎉 Player Wins Round";

        resetGame();
    }

    else if (computerScore === 2) {

        msg.innerText = "💻 Computer Wins Round";

        resetGame();
    }

    else if (roundCount === 3) {

        if (playerScore > computerScore) {
            msg.innerText = "🎉 Player Wins Round";
        }
        else if (computerScore > playerScore) {
            msg.innerText = "💻 Computer Wins Round";
        }
        else {
            msg.innerText = "Tie Round";
        }

        resetGame();
    }

}

function resetGame() {

    setTimeout(() => {

        playerScore = 0;
        computerScore = 0;
        roundCount = 0;

        historyText = "";
        historyBox.innerText = "";

        msg.innerText = "Choose your move";

    }, 2000);
}

rockBtn.addEventListener("click", function () {
    playGame("Rock");
});

paperBtn.addEventListener("click", function () {
    playGame("Paper");
});

scissorBtn.addEventListener("click", function () {
    playGame("Scissor");
});