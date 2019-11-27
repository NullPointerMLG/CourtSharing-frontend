export interface State {
  sport: string;
  date: string;
}

type Action =
 | { type: 'UPDATE_STATE', state: State} 


export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'UPDATE_STATE':
      state = action.state
      return {...state};
    default:
      throw new Error();
  }
}
