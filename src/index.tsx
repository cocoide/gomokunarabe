import "./index.css";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Board } from './components/Board';

const Game = () => {
  let squares: squareType[] = [null, null, null, null, null, null, null, null, null]
  const [nowHistory, setNowHistory] = useState<{ squares: squareType[] }[]>([{ squares }])
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, toggleXIsNext] = useState<boolean>(true)
  const [gameStatus, setGameStatus] = useState<string>("")

  const currentSquare = nowHistory[stepNumber];
  const winner = calculateWinner(currentSquare.squares);

  useEffect(() => {
    if (winner) {
      setGameStatus("Winner: " + winner)
    } else {
      setGameStatus("Next player: " + (xIsNext ? "X" : "O"))
    }
  }, [winner, xIsNext])


  function handleClick(i: number) {
    const history = nowHistory.slice(0, stepNumber + 1);
    const currentSquare = history[history.length - 1];
    const squares = currentSquare.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setNowHistory([...nowHistory, { squares }])
    setStepNumber(history.length,)
    toggleXIsNext(!xIsNext)
  }

  function jumpTo(step: number) {
    setStepNumber(step)
    toggleXIsNext(step % 2 === 0)
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquare.squares}
          onClick={() => handleClick(stepNumber)}
        />
      </div>
      <div className="game-info">
        <div>{gameStatus}</div>
        <ol>{
          nowHistory.map((step, move) => {
            const desc = move ? "Go to move #" + move : "Go to game start";
            return (
              <li key={move}>
                <button
                  onClick={() => {
                    jumpTo(move);
                  }}
                >
                  {desc}
                </button>
              </li>
            );
          })
        }</ol>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Game />);


function calculateWinner(squares: squareType[]) {
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
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
