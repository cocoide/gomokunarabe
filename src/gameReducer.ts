
export const INITIAL_STATE={
    nowHistory:  [],
    xIsNext:  true,
    gameStatus: "",
    stepNumber: 0,
}
type ACTIONTYPE =
    | { type: "restore_backup" }
    | { type: "click_square" }
    | { type: "step-foward" }
    
type STORETYPE={
    stepNumber: number,
    nowHistory: { squares: squareType[] }[],
    xIsNext: boolean,
    gameStatus: string,
}

export const gameReducer=(state: STORETYPE, action: ACTIONTYPE)=>{
    
}
