import React from 'react';
import { Square } from './Square';

interface Props {
    handleClick: (squareIndex: number) => void;
    currentSquare: { squares: squareType[] }
}
export const Board = (props: Props) => {
    return (
        <div className="game-board">
            <div className="board">
                {props.currentSquare.squares.map((square, index) => {
                    return <Square key={index}
                        onClick={() =>
                            props.handleClick(index)}
                        squareValue={props.currentSquare.squares[index]} />
            })}
        </div>
        </div>
    )
}