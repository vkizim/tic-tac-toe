import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function Board({ square, xIsNext, dimension, onClick }) {
  function renderSquare(i) {
    return <Square value={square[i]} onClick={() => onClick(i)} />;
  }

  const rawArray = [];
  for (let i = 0; i < dimension * dimension; i++) {
    rawArray.push(renderSquare(i));
  }
  const boardArray = [];
  for (let i = 0; i < dimension; i++) {
    boardArray.push(
      <div className="board-row">
        {rawArray.slice(i * dimension, i * dimension + dimension)}
      </div>
    );
  }

  return (
    <div>
      <div className="board-row">{boardArray}</div>
    </div>
  );
}

function Game() {
  let dimension = 3;
  const [square, setSquare] = useState(Array(dimension * dimension).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(1);
  const [history, setHistory] = useState([
    {
      squares: Array(dimension * dimension).fill(null),
    },
  ]);
  const current = history[history.length - 1];

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function jumpTo(step) {
    console.log(stepNumber, step, history.length);
    setStepNumber(step);
    setXisNext(step % 2 === 0);
    setHistory(history.slice(0, step + 1));
    setStepNumber(history.length - 1);
    console.log(stepNumber, step, history.length);
  }

  function handleClick(i) {
    console.log("Сработал Клик");
    console.log("Step number befor " + stepNumber);

    const square = current.squares.slice();
    if (calculateWinner(square) || square[i]) {
      return;
    }
    square[i] = xIsNext ? "X" : "O";
    setSquare(square);

    setHistory(
      history.concat([
        {
          squares: square,
        },
      ])
    );
    setStepNumber(history.length - 1);
    console.log("Step number after " + stepNumber, history);
    setXisNext(!xIsNext);
  }

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          square={current.squares}
          xIsNext={xIsNext}
          dimension={dimension}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
