import * as K from './constants';
import {UserLoginRequest, UserLoginResponse} from './types';

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
export const setError = (payload: Error, meta?: any) => ({
  type: K.SET_ERROR,
  payload,
  meta,
  error: true,
});

export const loginRequested = (payload: UserLoginRequest, meta?: any) => ({
  type: K.LOGIN_REQUESTED,
  payload,
  meta,
});

export const loginSucceeded = (payload: UserLoginResponse, meta?: any) => ({
  type: K.LOGIN_SUCCEEDED,
  payload,
  meta,
});

export const loginFailed = (payload: Error, meta?: any) => ({
  type: K.LOGIN_FAILED,
  payload,
  meta,
  error: true,
});

export const loginCancelled = (meta?: any) => ({
  type: K.LOGIN_CANCELLED,
  meta,
});
