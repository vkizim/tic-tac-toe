import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

function Square(props) {
  return (
    <button
      className="square"
      key={props.value.toString()}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

function Board({ dimension }) {
  const status = "Следующий игрок: Х";
  let a = [];
  dimension = 3;
  const [square, setSquare] = useState(Array(dimension * dimension).fill(null));
  function handleClick(i) {
    console.log(i);
  }
  function renderSquare(i) {
    return <Square value={i} onClick={() => handleClick(i)} />;
  }

  for (let i = 0; i < dimension; i++) {
    a.push([...Array(dimension).keys()].map((k) => k + i * dimension));
  }

  return (
    <div>
      <div className="status">{status}</div>
      {a.map((raw) => (
        <div className="board-row">{raw.map((i) => renderSquare(i))}</div>
      ))}
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
