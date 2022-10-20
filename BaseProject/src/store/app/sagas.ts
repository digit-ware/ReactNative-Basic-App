import {takeLatest} from 'redux-saga/effects';
import {FluxStandardAction} from '../../types';
import * as K from './constants';
import {UserLoginRequest} from './types';

export function* loginRequested(action: FluxStandardAction<UserLoginRequest>) {
  console.log(action);
  return;
  // yield put(actions.loadAppRequested())
}

export function* handleErrors(action: FluxStandardAction<Error>) {
  const error = action.payload;
  console.error(error.stack);
}

function* watchApp() {
  yield takeLatest(K.LOGIN_REQUESTED, loginRequested);

  /* autonomous starting actions */
  // yield put(actions.loadAppRequested())
}

export default watchApp;
