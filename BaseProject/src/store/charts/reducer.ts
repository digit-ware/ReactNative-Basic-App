import produce from 'immer';
import {AppError, FluxStandardAction} from '../../types';
import * as K from './constants';
import {Data} from './types';

export interface AppState {
  data: Data | null;
  loading: number;
  errors: Array<AppError>;
}

// The initial state of the Reducer
export const initialState: AppState = {
  data: null,
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
      case K.LOAD_DATA_REQUESTED:
        break;
      case K.LOAD_DATA_SUCCEEDED:
        draft.data = action.payload as Data;
        break;
      case K.LOAD_DATA_FAILED:
        draft.errors = [...draft.errors, action.payload as AppError];
        break;
      case K.LOAD_DATA_CANCELLED:
        break;
      default:
      /* NO_OP */
    }
  });
};
