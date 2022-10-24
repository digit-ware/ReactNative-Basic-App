import {cancelled, takeLatest} from 'redux-saga/effects';
// import {AppError, FluxStandardAction} from '../../types';
// import * as actions from './actions';
import * as appK from '../app/constants';

export function* onLoginSucceeded() {
  try {
    console.log(onLoginSucceeded);
  } catch (error) {
  } finally {
    if ((yield cancelled()) as boolean) {
      console.log('onLoginSucceeded cancelled');
    }
  }
}

function* watchApp() {
  yield takeLatest(appK.LOGIN_SUCCEEDED, onLoginSucceeded);
}

export default watchApp;
