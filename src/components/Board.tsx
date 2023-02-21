import React from 'react';
import { Square } from './Square';

interface Props {
    onClick: () => void;
    squares: squareType[]
}
export const Board = (props: Props) => {
    return (
        <div className="board-grid">
            {props.squares.map((square, index) => {
                return <Square key={index} onClick={props.onClick} squareValue={props.squares[index]} />
            })}
        </div>
    )
}