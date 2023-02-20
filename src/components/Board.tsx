import React from 'react';
import { Square } from './Square';

interface Props {
    onClick: () => void;
    squares: squareType[]
}

export const Board = (props: Props) => {
    return (
        <>
            <div className="board-row">
                <Square onClick={props.onClick} squareValue={props.squares[0]} ></Square>
                <Square onClick={props.onClick} squareValue={props.squares[1]} ></Square>
                <Square onClick={props.onClick} squareValue={props.squares[2]} ></Square>
            </div>
            <div className="board-row">
                <Square onClick={props.onClick} squareValue={props.squares[3]} ></Square>
                <Square onClick={props.onClick} squareValue={props.squares[4]} ></Square>
                <Square onClick={props.onClick} squareValue={props.squares[5]} ></Square>
            </div>
            <div className="board-row">
                <Square onClick={props.onClick} squareValue={props.squares[6]} ></Square>
                <Square onClick={props.onClick} squareValue={props.squares[7]} ></Square>
                <Square onClick={props.onClick} squareValue={props.squares[8]} ></Square>
            </div>
        </>
    )
}