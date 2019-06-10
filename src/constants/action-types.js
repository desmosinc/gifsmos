/*
 * Action types
 *
 * Strings used for the `type` property on actions. Defining them separately is
 * useful so that they can be imported from reducers and action creators instead
 * of writing sting literals in a bunch of places. This way, typos elsewhere
 * lead to undefined `type`s that become quickly obvious.
 */

// Images
export const ADD_FRAME = 'ADD_FRAME';
export const UPDATE_GIF_PROGRESS = 'UPDATE_GIF_PROGRESS';
export const ADD_GIF = 'ADD_GIF';
export const UPDATE_GIF_FILENAME = 'UPDATE_GIF_FILENAME';

// UI
export const UPDATE_PREVIEW_IDX = 'UPDATE_PREVIEW_IDX';
export const TOGGLE_PANE = 'TOGGLE_PANE';
export const PLAY_PREVIEW = 'PLAY_PREVIEW';
export const PAUSE_PREVIEW = 'PAUSE_PREVIEW';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// Settings
export const UPDATE_IMAGE_SETTING = 'UPDATE_IMAGE_SETTING';
export const UPDATE_BOUNDS_SETTING = 'UPDATE_BOUNDS_SETTING';
export const UPDATE_STRATEGY = 'UPDATE_STRATEGY';

export const RESET = 'RESET';
