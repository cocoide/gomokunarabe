type ACTIONTYPE =
  | {
    type: "changeTurn",
    payload: { turnState: boolean }
  }
  | {
    type: "setGameStep",
    payload: { stepNumber: number }
  }
  | {
    type: "setGameStatus",
    payload: { gameStatus: string }
  }
  | {
    type: "setGameBackup",
    payload: { gameBackup: { squares: squareType[] } }
  }

type STATETYPE = {
  stepNumber: number,
  xIsNext: boolean,
  gameStatus: string,
  gameBackup: { squares: squareType[] }[],
}
export const playInitialState = {
  stepNumber: 0,
  xIsNext: true,
  gameStatus: "",
  gameBackup: [{ squares: [null, null, null, null, null, null, null, null, null] }]
}

export const playReducer = (state: STATETYPE, action: ACTIONTYPE): STATETYPE => {
  switch (action.type) {
    case "setGameStep":
      return { ...state, stepNumber: action.payload.stepNumber };
    case "changeTurn":
      return { ...state, xIsNext: action.payload.turnState };
    case "setGameStatus":
      return { ...state, gameStatus: action.payload.gameStatus };
    case "setGameBackup":
      return { ...state, gameBackup: [...state.gameBackup, action.payload.gameBackup] };
  }
}















