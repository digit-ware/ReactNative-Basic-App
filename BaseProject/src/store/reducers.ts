/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from 'redux';

import {STATE_KEY as APP_KEY, reducer as appReducer} from './app';

const RootReducer = combineReducers({
  [APP_KEY]: appReducer,
});

export default RootReducer;
