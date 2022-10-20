import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  Dispatch,
  AnyAction,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import RootReducer from './reducers';
import RootSaga from './saga';
import {enableMapSet, enableES5} from 'immer';

declare let window: any;

export {selectors as appSelectors} from './app';

export let dispatch: Dispatch<AnyAction>;

export default function configureStore() {
  enableMapSet();
  enableES5();

  const sagaMiddleware = createSagaMiddleware();

  /*eslint-disable */
  const composeEnhancers =
    __DEV__ && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose
  /*eslint-enable */

  const reducers = combineReducers({
    root: RootReducer,
  });

  const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore(reducers, enhancers);

  sagaMiddleware.run(RootSaga);

  // eslint-disable-next-line prefer-destructuring
  dispatch = store.dispatch;

  return store;
}
