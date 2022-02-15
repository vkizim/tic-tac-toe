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

function Board({ dimension }) {
  const status = "Следующий игрок: Х";
  dimension = 3;
  const [square, setSquare] = useState(Array(dimension * dimension).fill(null));
  function handleClick(i) {
    let c = [...square.slice()];
    c.splice(i, 1, "X");
    setSquare(c);
  }
  function renderSquare(i) {
    return <Square value={square[i]} onClick={() => handleClick(i)} />;
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
      <div className="status">{status}</div>

      <div className="board-row">{boardArray}</div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
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
