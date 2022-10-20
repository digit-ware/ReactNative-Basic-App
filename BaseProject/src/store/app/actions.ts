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

// export const doSucceeded = (payload: UserLoginResponse, meta?: any) => {
//   return async function (dispatch) {
//     const result = await fetch('...../login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });
//     dispatch({
//       type: K.LOGIN_SUCCEEDED,
//       payload: (await result.json()) as UserLoginResponse,
//       meta,
//     });
//   };
// };

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
