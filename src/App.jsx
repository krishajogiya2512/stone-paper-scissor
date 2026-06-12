import { useState } from "react";
import "./index.css";

function App() {

  const [msg, setMsg] = useState("Choose your move");
  const [history, setHistory] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function getComputerMove() {
    let randomNumber = Math.random();

    if (randomNumber <= 0.33) return "Rock";
    else if (randomNumber <= 0.67) return "Paper";
    else return "Scissor";
  }

  function playGame(playerMove) {

    if (gameOver) return;

    let computerMove = getComputerMove();

    let result = "";
    let newPlayerScore = playerScore;
    let newComputerScore = computerScore;

    if (playerMove === computerMove) {
      result = "Tie";
    }
    else if (
      (playerMove === "Rock" && computerMove === "Scissor") ||
      (playerMove === "Paper" && computerMove === "Rock") ||
      (playerMove === "Scissor" && computerMove === "Paper")
    ) {
      result = "Player";
      newPlayerScore++;
      setPlayerScore(newPlayerScore);
    }
    else {
      result = "Computer";
      newComputerScore++;
      setComputerScore(newComputerScore);
    }

    let newHistory = [
      ...history,
      `You: ${playerMove} | Computer: ${computerMove} → ${result}`
    ];

    setHistory(newHistory);

    let newRound = roundCount + 1;
    setRoundCount(newRound);

    setMsg(`Player: ${newPlayerScore}  Computer: ${newComputerScore}`);

    checkWinner(newPlayerScore, newComputerScore, newRound);
  }

  function checkWinner(pScore, cScore, rounds) {

    if (pScore === 2) {
      setMsg("Player Wins the Game!");
      setGameOver(true);
    }
    else if (cScore === 2) {
      setMsg("Computer Wins the Game!");
      setGameOver(true);
    }
    else if (rounds === 3) {

      if (pScore > cScore) {
        setMsg("Player Wins the Game!");
      }
      else if (cScore > pScore) {
        setMsg("Computer Wins the Game!");
      }
      else {
        setMsg("It's a Tie Game!");
      }

      setGameOver(true);
    }
  }

  function resetGame() {
    setMsg("Choose your move");
    setHistory([]);
    setPlayerScore(0);
    setComputerScore(0);
    setRoundCount(0);
    setGameOver(false);
  }

  return (
    <div className="container">

      <h1>Stone Paper Scissor</h1>

      <div className="buttons">
        <button id="rock" onClick={() => playGame("Rock")}>🪨 Rock</button>
        <button id="paper" onClick={() => playGame("Paper")}>📄 Paper</button>
        <button id="scissor" onClick={() => playGame("Scissor")}>✂️ Scissor</button>
      </div>

      <div className="result">
        <p>{msg}</p>

        <p style={{ whiteSpace: "pre-line" }}>
          {history.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </p>

        {gameOver && (
          <button onClick={resetGame} style={{ marginTop: "20px" }}>
            Reset Game
          </button>
        )}
      </div>

    </div>
  );
}

export default App;