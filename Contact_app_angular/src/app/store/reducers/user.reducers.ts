import { All, UserActionTypes } from './../actions/user.actions';

// Section 1
export interface State {
  response: null;
  type: String | null;
  token: string;
}
export const initialState: State = {
  response: null,
  type: null,
  token: null,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case UserActionTypes.COMMON_SUCCESS: {
      return {
        ...state,
        response: action['payload'].response,
        type: action['payload'].type,
      };
    }
    case UserActionTypes.COMMON_FALIURE: {
      return {
        ...state,
        response: action['payload'].error,
        type: action['payload'].type,
      };
    }

    case UserActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        token: action['payload'].token,
        response: action['payload'].response,
        type: action['payload'].type,
      };
    }
    case UserActionTypes.LOGIN_USER_FALIURE: {
      // console.log("LOGIN_USER_FALIURE_reducer--->>");
      return {
        ...state,
        response: action['payload'].response,
        token: action['payload'].token,
        type: action['payload'].type,
      };
    }
    default:
      return { ...state, type: 'default' };
  }
}
