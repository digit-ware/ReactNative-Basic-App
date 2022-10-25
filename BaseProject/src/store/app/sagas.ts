import {call, cancelled, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigationService from '../../services/navigationService';
import {AppError, FluxStandardAction} from '../../types';
import * as actions from './actions';
import * as chartActions from '../charts/actions';
import * as K from './constants';
import {RememberMe, UserLoginRequest, UserLoginResponse} from './types';
import * as userApi from '../../api/user';

const USER_LOGIN_STORAGE_KEY = 'USER_LOGIN';
const CONTATORI_KEY = '';

interface Contatore {
  id: string;
  consumption: number;
}

export function* loginRequested({
  payload,
  meta,
}: FluxStandardAction<UserLoginRequest, RememberMe>) {
  try {
    console.log('loginRequested', payload.username);
    const {rememberMe} = meta!;
    if (!rememberMe) {
      yield call(() => AsyncStorage.removeItem(USER_LOGIN_STORAGE_KEY));
    }
    yield put(actions.clearError({comment: 'login submitted'}));
    const user: userApi.User = yield call(userApi.getUser);

    yield put(
      actions.loginSucceeded(
        {
          username: user.username,
          token: user.token,
        },
        {rememberMe},
      ),
    );
  } catch (error) {
    yield put(actions.loginFailed(error as AppError));
  } finally {
    if ((yield cancelled()) as boolean) {
      yield put(actions.loginCancelled());
    }
  }
}

export function* loginSucceeded(
  action: FluxStandardAction<UserLoginResponse, RememberMe>,
) {
  try {
    console.log(action);
    if (action.meta?.rememberMe) {
      yield call(async () => {
        const userLoginStoredInfo: UserLoginResponse = {
          username: action.payload.username,
          token: action.payload.token,
        };
        await AsyncStorage.setItem(
          USER_LOGIN_STORAGE_KEY,
          JSON.stringify(userLoginStoredInfo),
        );
      });
    }
    yield put(chartActions.loadDataRequested({comment: 'from loginSucceeded'}));
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
    const userLoginStoredInfo: UserLoginResponse | null = yield call(
      async () => {
        const storedJSON = await AsyncStorage.getItem(USER_LOGIN_STORAGE_KEY);
        if (storedJSON !== null) {
          return JSON.parse(storedJSON);
        }
        return null;
      },
    );
    if (userLoginStoredInfo) {
      navigationService.navigate('HomeTabNavigator', {
        screen: 'Charts',
      });

      const contatori: Array<Contatore> | null = yield call(async () => {
        const jsonResult = await AsyncStorage.getItem(CONTATORI_KEY);
        return jsonResult === null
          ? jsonResult
          : (JSON.parse(jsonResult) as Array<Contatore>);
      });
      yield put(chartActions.loadDataRequested({comment: 'from bootsrap'}));
      console.log(contatori);
    }
  } catch (error) {
    navigationService.navigate('GlobalError');
  } finally {
    if ((yield cancelled()) as boolean) {
      console.log('loginSucceeded cancelled');
      navigationService.navigate('GlobalError');
    }
  }
}

export function* logoutRequested() {
  try {
    yield call(() => AsyncStorage.removeItem(USER_LOGIN_STORAGE_KEY));
    navigationService.goTo('Login');
    yield put(actions.logoutSucceeded());
  } catch (error) {
    yield put(actions.logoutFailed(error as AppError));
  } finally {
    if ((yield cancelled()) as boolean) {
      put(actions.logoutCancelled());
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
  yield takeLatest(K.LOGOUT_REQUESTED, logoutRequested);
  yield takeLatest(K.BOOTSTRAP, bootstrap);

  /* autonomous starting actions */
  yield put(actions.bootstrap());
}

export default watchApp;
