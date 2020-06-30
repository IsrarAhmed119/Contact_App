import { ContactActionTypes, All } from '../actions/contact.actions';

export interface State {
  response: null;
  type: String | null;
}
export const initialState: State = {
  response: null,
  type: null,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case ContactActionTypes.COMMON_SUCCESS: {
      return {
        ...state,
        response: action['payload'].response,
        type: action['payload'].type,
      };
    }
    case ContactActionTypes.COMMON_FALIURE: {
      return {
        ...state,
        response: action['payload'].error,
        type: action['payload'].type,
      };
    }

    default:
      return { ...state, type: 'default' };
  }
}
