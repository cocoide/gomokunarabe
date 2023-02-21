import React from 'react';

interface Props {
    onClick: () => void;
    squareValue: squareType;
};

export const Square = (props: Props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.squareValue}
        </button>
    );
}