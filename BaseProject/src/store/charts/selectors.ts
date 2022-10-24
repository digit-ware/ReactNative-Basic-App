import {createSelector} from 'reselect';
import {STATE_KEY} from './constants';
import {AppState, initialState} from './reducer';

export function baseSelector(state: any): AppState {
  return state.root[STATE_KEY] || initialState;
}

export const dataSelector = createSelector(
  baseSelector,
  appState => appState.data,
);

export const loadingSelector = createSelector(
  baseSelector,
  appState => appState.loading > 0,
);

export const lastErrorSelector = createSelector(
  baseSelector,
  appState => appState.errors.slice(-1)[0],
);

export const hasErrorSelector = createSelector(
  baseSelector,
  appState => appState.errors.length > 0,
);
