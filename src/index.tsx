import "./index.css";
import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import { Board } from './components/Board';
import { playReducer, playInitialState } from './reducers/playReducer';

const Game = () => {
  const [state, dispatch] = useReducer(playReducer, playInitialState)
  const currentSquare = state.gameBackup[state.stepNumber];
  const isGameEnd = calculateWinner(currentSquare.squares);

  const setGameStep = (step: number) => {
    dispatch({
      type: "setGameStep",
      payload: { stepNumber: step }
    })
  };
  const changeTurn = (turn: boolean) => {
    dispatch({
      type: "changeTurn",
      payload: { turnState: turn }
    })
  };
  const setGameStatus = (status: string) => {
    dispatch({
      type: "setGameStatus",
      payload: { gameStatus: status }
    })
  };
  const setGameBackup = (currentSquares: { squares: squareType[] }) => {
    dispatch({
      type: "setGameBackup",
      payload: { gameBackup: currentSquares }
    })
  };

  useEffect(() => {
    if (isGameEnd) {
      setGameStatus("Winner: " + isGameEnd)
    } else {
      setGameStatus("Next player: " + (state.xIsNext ? "X" : "O"))
    }
  }, [isGameEnd, state.xIsNext])

  function handleClick(i: number) {
    const history = state.gameBackup.slice(0, state.stepNumber + 1);
    const currentSquare = history[history.length - 1];
    const squares = currentSquare.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setGameBackup({ squares })
    setGameStep(history.length,)
    changeTurn(!state.xIsNext)
    console.log(state.gameBackup)
  }

  function restoreBackup(step: number) {
    setGameStep(step)
    changeTurn(step % 2 === 0)
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquare.squares}
          onClick={() => handleClick(state.stepNumber)}
        />
      </div>
      <div className="game-info">
        <div>{state.gameStatus}</div>
        <ol>{
          state.gameBackup.map((step, stepIndex) => {
            const desc = stepIndex ? "Go to move #" + stepIndex : "Go to game start";
            return (
              <li key={stepIndex}>
                <button
                  onClick={() => {
                    restoreBackup(stepIndex);
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

