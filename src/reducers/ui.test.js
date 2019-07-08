import reducer from './ui';
import {
  TOGGLE_PANE,
  UPDATE_PREVIEW_IDX,
  PLAY_PREVIEW,
  PAUSE_PREVIEW,
  SET_ERROR,
  CLEAR_ERROR,
  RESET
} from '../constants/action-types';
import panes from '../constants/pane-types';

const initialState = {
  expandedPane: panes.NONE,
  previewIdx: 0,
  playing: false,
  error: '',
  burstSliders: []
};

describe('reducers', () => {
  describe('ui', () => {
    it('returns the correct initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handles TOGGLE_PANE', () => {
      const pane = panes.PREVIEW;
      const newState = reducer(initialState, {
        type: TOGGLE_PANE,
        payload: { pane }
      });
      expect(newState.expandedPane).toEqual(panes.PREVIEW);
    });

    it('handles UPDATE_PREVIEW_IDX', () => {
      const idx = 2;
      const newState = reducer(initialState, {
        type: UPDATE_PREVIEW_IDX,
        payload: { idx }
      });
      expect(newState.previewIdx).toEqual(2);
    });

    it('handles PLAY_PREVIEW and PAUSE_PREVIEW', () => {
      const playingState = reducer(initialState, { type: PLAY_PREVIEW });
      expect(playingState.playing).toEqual(true);
      const pausedState = reducer(playingState, { type: PAUSE_PREVIEW });
      expect(pausedState.playing).toEqual(false);
    });

    it('handles SET_ERROR and CLEAR_ERROR', () => {
      const message = 'error';
      const errorState = reducer(initialState, {
        type: SET_ERROR,
        payload: { message }
      });
      expect(errorState.error).toEqual(message);

      const clearedState = reducer(errorState, { type: CLEAR_ERROR });
      expect(clearedState.error).toEqual('');
    });

    it('SET_ERROR with bad settings input opens the settings pane', () => {
      const message = 'settings error';
      const errorState = reducer(initialState, {
        type: SET_ERROR,
        payload: { message }
      });
      expect(errorState.error).toEqual(message);
      expect(errorState.expandedPane).toEqual(panes.SETTINGS);
    });

    it('handles RESET', () => {
      const previewState = reducer(initialState, {
        type: TOGGLE_PANE,
        payload: { pane: panes.PREVIEW }
      });
      const playingState = reducer(previewState, { type: PLAY_PREVIEW });
      const errorState = reducer(playingState, {
        type: SET_ERROR,
        payload: { message: 'error' }
      });
      const finalState = reducer(errorState, {
        type: UPDATE_PREVIEW_IDX,
        payload: { idx: 2 }
      });
      const resetState = reducer(finalState, { type: RESET });
      const { expandedPane, previewIdx, playing, error } = resetState;
      expect(expandedPane).toEqual(panes.PREVIEW);
      expect(previewIdx).toEqual(0);
      expect(playing).toEqual(false);
      expect(error).toEqual('');
    });
  });
});
