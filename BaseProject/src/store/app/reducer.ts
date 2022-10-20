import produce from 'immer';
import {AppError, FluxStandardAction} from '../../types';
import * as K from './constants';
import {UserLoginResponse} from './types';

export interface AppState {
  userInfo: UserLoginResponse | null;
  loggedIn: boolean;
  loading: number;
  errors: Array<AppError>;
}

// The initial state of the Reducer
export const initialState: AppState = {
  userInfo: null,
  loggedIn: false,
  loading: 0,
  errors: [],
};

export default (
  state: AppState = initialState,
  action: FluxStandardAction<unknown>,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case K.CLEAR_ERROR:
        draft.errors = initialState.errors;
        break;
      case K.LOGIN_REQUESTED:
        break;
      case K.LOGIN_SUCCEEDED:
        draft.userInfo = action.payload as UserLoginResponse;
        draft.loggedIn = true;
        break;
      case K.LOGIN_FAILED:
        draft.errors = [...draft.errors, action.payload as AppError];
        break;
      case K.LOGIN_CANCELLED:
        break;
      case K.LOGOUT_SUCCEEDED:
        draft.loggedIn = false;
      default:
      /* NO_OP */
    }
  });
};
