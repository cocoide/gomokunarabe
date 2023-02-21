import "../index.css";
import React, { useEffect, useReducer } from 'react';
import { playInitialState, playReducer } from '../reducers/playReducer';
import { Board } from './Board';
import GameInfo from './GameInfo';
import { calculateWinner } from '../utils/calculateWinner';

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
    const setGameBackup = (currentSquares: { squares: squareType[] }[]) => {
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

    function handleClick(squareIndex: number) {
        const history = state.gameBackup.slice(0, state.stepNumber + 1);
        const currentSquare = history[history.length - 1];
        const squares = currentSquare.squares.slice();
        if (calculateWinner(squares) || squares[squareIndex]) {
            return;
        }
        squares[squareIndex] = state.xIsNext ? "X" : "O";
        setGameBackup(history.concat([{ squares }]))
        setGameStep(history.length)
        changeTurn(!state.xIsNext)
    };

    function restoreBackup(step: number) {
        setGameStep(step)
        changeTurn(step % 2 === 0)
    };

    return (
        <div className="game">
            <Board
                handleClick={handleClick}
                currentSquare={currentSquare} />
            <GameInfo
                gameStatus={state.gameStatus}
                gameBackup={state.gameBackup}
                restoreBackup={restoreBackup} />
        </div>
    );
};

export default Game