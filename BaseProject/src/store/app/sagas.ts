import {call, cancelled, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigationService from '../../navigationService';
import {AppError, FluxStandardAction} from '../../types';
import * as actions from './actions';
import * as K from './constants';
import {UserLoginRequest, UserLoginResponse} from './types';

const CONTATORI_KEY = '';

interface Contatore {
  id: string;
  consumption: number;
}

export function* loginRequested(action: FluxStandardAction<UserLoginRequest>) {
  try {
    console.log('loginRequested', action);
    yield put(actions.clearError({comment: 'login submitted'}));
    const result: Response = yield call(async () => {
      return fetch('https://random-data-api.com/api/v2/users');
    });

    if (result.status === 200) {
      const user = yield call(() => result.json());
      yield put(
        actions.loginSucceeded({
          username: user.username,
          token: user.uid,
        }),
      );
    }
    if (result.status >= 400) {
      throw new Error('Login Failed');
    }
  } catch (error) {
    yield put(actions.loginFailed(error as AppError));
  } finally {
    if ((yield cancelled()) as boolean) {
      yield put(actions.loginCancelled());
    }
  }
}

export function* loginSucceeded(action: FluxStandardAction<UserLoginResponse>) {
  try {
    navigationService.navigate('HomeTabNavigator');
  } catch (error) {
    console.log('loginSucceeded', error);
  } finally {
    if ((yield cancelled()) as boolean) {
      console.log('loginSucceeded cancelled');
    }
  }
}

export function* bootstrap() {
  try {
    navigationService.navigate('HomeTabNavigator');

    const contatori: Array<Contatore> | null = yield call(async () => {
      const jsonResult = await AsyncStorage.getItem(CONTATORI_KEY);
      return jsonResult === null
        ? jsonResult
        : (JSON.parse(jsonResult) as Array<Contatore>);
    });
    console.log(contatori);
  } catch (error) {
    navigationService.navigate('GlobalError');
  } finally {
    if ((yield cancelled()) as boolean) {
      console.log('loginSucceeded cancelled');
      navigationService.navigate('GlobalError');
    }
  }
}

export function* handleErrors(action: FluxStandardAction<AppError>) {
  const error = action.payload;
  console.error(error.stack);
}

function* watchApp() {
  yield takeLatest(K.LOGIN_REQUESTED, loginRequested);
  yield takeLatest(K.LOGIN_SUCCEEDED, loginSucceeded);
  yield takeLatest(K.BOOTSTRAP, bootstrap);

  /* autonomous starting actions */
  yield put(actions.bootstrap());
}

export default watchApp;
