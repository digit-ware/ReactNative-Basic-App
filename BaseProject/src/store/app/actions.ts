import {AppError} from '../../types';
import * as K from './constants';
import {
  RememberMe,
  UserLoginRequest,
  UserLoginResponse,
  UserSigninRequest,
  UserSigninResponse,
} from './types';

/**
 * Dismiss all errors from the store
 */
export const clearError = (meta?: any) => ({
  type: K.CLEAR_ERROR,
  meta,
});

/**
 * Programmatically set errore on the store
 */
export const setError = (payload: AppError, meta?: any) => ({
  type: K.SET_ERROR,
  payload,
  meta,
  error: true,
});

export const bootstrap = (meta?: any) => ({
  type: K.BOOTSTRAP,
  meta,
});

export const loginRequested = <MType>(
  payload: UserLoginRequest,
  meta: MType & RememberMe,
) => ({
  type: K.LOGIN_REQUESTED,
  payload,
  meta,
});

export const loginSucceeded = <MType>(
  payload: UserLoginResponse,
  meta: MType & RememberMe,
) => ({
  type: K.LOGIN_SUCCEEDED,
  payload,
  meta,
});

export const loginFailed = (payload: AppError, meta?: any) => ({
  type: K.LOGIN_FAILED,
  payload,
  meta,
  error: true,
});

export const loginCancelled = (meta?: any) => ({
  type: K.LOGIN_CANCELLED,
  meta,
});

export const logoutRequested = (meta?: any) => ({
  type: K.LOGOUT_REQUESTED,
  meta,
});

export const logoutSucceeded = (meta?: any) => ({
  type: K.LOGOUT_SUCCEEDED,
  meta,
});

export const logoutFailed = (payload: AppError, meta?: any) => ({
  type: K.LOGOUT_FAILED,
  payload,
  meta,
  error: true,
});

export const logoutCancelled = (meta?: any) => ({
  type: K.LOGOUT_CANCELLED,
  meta,
});

export const signinRequested = (payload: UserSigninRequest, meta?: any) => ({
  type: K.SIGNIN_REQUESTED,
  payload,
  meta,
});

export const signinSucceeded = (payload: UserSigninResponse, meta?: any) => ({
  type: K.SIGNIN_SUCCEEDED,
  payload,
  meta,
});

export const signinFailed = (payload: AppError, meta?: any) => ({
  type: K.SIGNIN_FAILED,
  payload,
  meta,
  error: true,
});

export const signinCancelled = (meta?: any) => ({
  type: K.SIGNIN_CANCELLED,
  meta,
});
