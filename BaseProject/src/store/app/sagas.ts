import {call, cancelled, put, takeLatest} from 'redux-saga/effects';
import {FluxStandardAction} from '../../types';
import * as actions from './actions';
import * as K from './constants';
import {UserLoginRequest, UserLoginResponse} from './types';

export function* loginRequested(action: FluxStandardAction<UserLoginRequest>) {
  try {
    const result: UserLoginResponse = yield call(async () => {
      const fetchResult = await fetch('...../login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      });
      return (await fetchResult.json()) as UserLoginResponse;
    });
    yield put(actions.loginSucceeded(result));
  } catch (error) {
    yield put(actions.loginFailed(error as Error));
  } finally {
    if ((yield cancelled()) as boolean) {
      yield put(actions.loginCancelled());
    }
  }
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
