import {AnyAction} from 'redux';
import {all, takeLatest} from 'redux-saga/effects';
import {sagas as appSaga} from './app';
export function* logError(action: AnyAction) {
  console.error(action.payload);
}

export default function* rootSaga() {
  yield all([appSaga()]);
  yield takeLatest((action: AnyAction) => action.error, logError);
}
