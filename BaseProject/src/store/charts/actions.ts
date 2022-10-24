import {AppError} from '../../types';
import * as K from './constants';
import {Data} from './types';

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

export const loadDataRequested = (meta?: any) => ({
  type: K.LOAD_DATA_REQUESTED,
  meta,
});

export const loadDataSucceeded = (payload: Data, meta?: any) => ({
  type: K.LOAD_DATA_SUCCEEDED,
  payload,
  meta,
});

export const loadDataFailed = (payload: AppError, meta?: any) => ({
  type: K.LOAD_DATA_FAILED,
  payload,
  meta,
  error: true,
});

export const loadDataCancelled = (meta?: any) => ({
  type: K.LOAD_DATA_CANCELLED,
  meta,
});
