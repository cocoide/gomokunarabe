import React from 'react'

interface Props {
    gameStatus: string;
    gameBackup: { squares: squareType[] }[];
    restoreBackup: (gameIndex: number) => void;
}
const GameInfo = (props: Props) => {
    return (
        <div className="game-info">
            <div>{props.gameStatus}</div>
            <ol>{
                props.gameBackup.map((step, stepIndex) => {
                    const desc = stepIndex ? "Go to move #" + stepIndex : "Go to game start";
                    return (
                        <li key={stepIndex}>
                            <button
                                onClick={() => {
                                    props.restoreBackup(stepIndex);
                                }}
                            >
                                {desc}
                            </button>
                        </li>
                    );
                })
            }</ol>
        </div>
    )
}
export default GameInfo