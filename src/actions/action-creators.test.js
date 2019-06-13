import * as actions from './';
import * as types from '../constants/action-types';
import thunkMiddleware from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import panes from '../constants/pane-types';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Action creators', () => {
  describe('synchronous action creators', () => {
    xit('return an action to add a frame', () => {
      const imageData = 'URI';
      const expected = {
        type: types.ADD_FRAME,
        payload: {
          id: 1,
          imageData
        }
      };
      expect(actions.addFrame(imageData)).toEqual(expected);
    });

    xit('return an action to update GIF creation progress', () => {
      const progress = 0.5;
      const expected = {
        type: types.UPDATE_GIF_PROGRESS,
        payload: { progress }
      };
      expect(actions.updateGIFProgress(progress)).toEqual(expected);
    });

    xit('return an action to add processed GIF data', () => {
      const imageData = 'URI';
      const expected = {
        type: types.ADD_GIF,
        payload: { imageData }
      };
      expect(actions.addGIF(imageData)).toEqual(expected);
    });

    xit('return an action to toggle the visible pane', () => {
      const pane = panes.PREVIEW;
      const expected = {
        type: types.TOGGLE_PANE,
        payload: { pane }
      };
      expect(actions.togglePane(panes.PREVIEW)).toEqual(expected);
    });

    xit('return an action to update the preview index', () => {
      const idx = 2;
      const expected = {
        type: types.UPDATE_PREVIEW_IDX,
        payload: { idx }
      };
      expect(actions.updatePreviewIdx(idx)).toEqual(expected);
    });

    xit('return an action to update a setting', () => {
      const imageSettings = {
        width: 400,
        height: 200,
        interval: 250,
        oversample: true
      };
      const boundsSettings = {
        left: -20,
        right: 20,
        top: 20,
        bottom: -20
      };
      const strategy = 'stretch';

      let key;
      let expected;
      let setting, val;

      for (key in imageSettings) {
        expect(actions.updateSetting(key, imageSettings[key])).toEqual({
          type: types.UPDATE_IMAGE_SETTING,
          payload: {
            [key]: imageSettings[key]
          }
        });
      }

      for (key in boundsSettings) {
        expect(actions.updateSetting(key, boundsSettings[key])).toEqual({
          type: types.UPDATE_BOUNDS_SETTING,
          payload: {
            [key]: boundsSettings[key]
          }
        });
      }

      expect(actions.updateSetting('strategy', 'stretch')).toEqual({
        type: types.UPDATE_STRATEGY,
        payload: { strategy: 'stretch' }
      });
    });

    xit('return an action to play the preview animation', () => {
      expect(actions.playPreview()).toEqual({ type: types.PLAY_PREVIEW });
    });

    xit('return an action to pause the preview animation', () => {
      expect(actions.stopAnimation()).toEqual({ type: types.PAUSE_PREVIEW });
    });

    xit('return an action to set an error', () => {
      const message = 'error';
      const expected = {
        type: types.SET_ERROR,
        payload: { message }
      };
      expect(actions.setError(message)).toEqual(expected);
    });

    xit('return an action to clear an error', () => {
      expect(actions.clearError()).toEqual({ type: types.CLEAR_ERROR });
    });

    xit('return an action to reset the frames', () => {
      expect(actions.reset()).toEqual({ type: types.RESET });
    });
  });

  describe('async action creators', () => {
    // TODO
  });
});
