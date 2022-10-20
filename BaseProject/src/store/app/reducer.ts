import produce from 'immer';
import {FluxStandardAction} from '../../types';
import * as K from './constants';
import {UserLoginResponse} from './types';

export interface AppState {
  userInfo: UserLoginResponse | null;
  loading: number;
  errors: Array<Error>;
}

// The initial state of the Reducer
export const initialState: AppState = {
  userInfo: null,
  loading: 0,
  errors: [],
};

export default (
  state: AppState = initialState,
  action: FluxStandardAction<unknown>,
) => {
  produce(state, draft => {
    switch (action.type) {
      case K.LOGIN_REQUESTED:
        draft.userInfo = action.payload as UserLoginResponse;
        break;
      case K.LOGIN_SUCCEEDED:
        break;
      case K.LOGIN_FAILED:
        break;
      case K.LOGIN_CANCELLED:
        break;
      default:
      /* NO_OP */
    }
  });
};
