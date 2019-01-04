/*
 * The root reducer manages changes to the application state. It's generated
 * automatically by merging sub-reducers that each manage a slice of the overall
 * state.
 *
 * Reducers are functions that have the signature (state, action) => newState.
 * In other words, they return the next state based on the current state and the
 * dispatched action they receive.
 *
 * Reducers must:
 * (1) be pure functions.
 * (2) never mutate the passed-in state.
 * (3) return an initial state if the passed-in state is `undefined`.
 * (4) return the current state for any unhandled action.
 */

import { combineReducers } from 'redux';
import images from './images';
import settings from './settings';
import ui from './ui';

const rootReducer = combineReducers({
  images,
  settings,
  ui
});

export default rootReducer;
