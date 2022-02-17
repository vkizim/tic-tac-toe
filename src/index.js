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
    return (
      <Square key={i.toString()} value={square[i]} onClick={() => onClick(i)} />
    );
  }

  const rawArray = [];
  for (let i = 0; i < dimension * dimension; i++) {
    rawArray.push(renderSquare(i));
  }
  const boardArray = [];
  for (let i = 0; i < dimension; i++) {
    boardArray.push(
      <div className="board-row" key={i}>
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
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([
    {
      squares: Array(dimension * dimension).fill(null),
    },
  ]);
  const current = history[stepNumber];

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "ПОБЕДИТЕЛЬ: " + winner;
  } else {
    status = "Следующий игрок: " + (xIsNext ? "X" : "O");
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  }

  function handleClick(i) {
    const h = history.slice(0, stepNumber + 1);
    const c = h[h.length - 1];

    const s = c.squares.slice();
    if (calculateWinner(s) || s[i]) {
      return;
    }
    s[i] = xIsNext ? "X" : "O";
    setSquare(s);

    setHistory(
      h.concat([
        {
          squares: s,
        },
      ])
    );
    setStepNumber(h.length);
    setXisNext(!xIsNext);
  }

  const moves = history.map((step, move) => {
    const desc = move ? "Перейти на шаг #" + move : "Перейти на начало игры";
    return (
      <li key={move}>
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
