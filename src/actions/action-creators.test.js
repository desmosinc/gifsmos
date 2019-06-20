import * as actions from './';
import * as types from '../constants/action-types';
import thunkMiddleware from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import panes from '../constants/pane-types';
import { initializeCalculator } from '../lib/calculator';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

const initialState = {
  images: {
    frames: {},
    frameIDs: [],
    gifProgress: 0,
    gifData: '',
    caption: '',
    fontColor: '#000000',
    gifFileName: ''
  },
  settings: {
    image: {
      width: 300,
      height: 300,
      interval: 100,
      oversample: false
    },
    bounds: {
      left: -10,
      right: 10,
      bottom: -10,
      top: 10
    },
    strategy: 'contain'
  },
  ui: {
    expandedPane: panes.NONE,
    previewIdx: 0,
    playing: false,
    error: ''
  }
};

const desmosMock = {
  GraphingCalculator: jest.fn(() => {
    return {
      asyncScreenshot: (opts, cb) => cb(''),
      getExpressions: () => [{ id: 1, latex: 'x = 3' }, { id: 2, latex: '' }],
      setExpression: () => null
    };
  })
};

const calcContainerMock = { current: undefined };

// Tests

describe('Action creators', () => {
  describe('synchronous action creators', () => {
    it('return an action to add a frame', () => {
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

    it('return an action to update GIF creation progress', () => {
      const progress = 0.5;
      const expected = {
        type: types.UPDATE_GIF_PROGRESS,
        payload: { progress }
      };
      expect(actions.updateGIFProgress(progress)).toEqual(expected);
    });

    it('return an action to add processed GIF data', () => {
      const imageData = 'URI';
      const expected = {
        type: types.ADD_GIF,
        payload: { imageData }
      };
      expect(actions.addGIF(imageData)).toEqual(expected);
    });

    it('return an action to toggle the visible pane', () => {
      const pane = panes.PREVIEW;
      const expected = {
        type: types.TOGGLE_PANE,
        payload: { pane }
      };
      expect(actions.togglePane(panes.PREVIEW)).toEqual(expected);
    });

    it('return an action to update the preview index', () => {
      const idx = 2;
      const expected = {
        type: types.UPDATE_PREVIEW_IDX,
        payload: { idx }
      };
      expect(actions.updatePreviewIdx(idx)).toEqual(expected);
    });

    it('return an action to update a setting', () => {
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

    it('return an action to play the preview animation', () => {
      expect(actions.playPreview()).toEqual({ type: types.PLAY_PREVIEW });
    });

    it('return an action to pause the preview animation', () => {
      expect(actions.stopAnimation()).toEqual({ type: types.PAUSE_PREVIEW });
    });

    it('return an action to set an error', () => {
      const message = 'error';
      const expected = {
        type: types.SET_ERROR,
        payload: { message }
      };
      expect(actions.setError(message)).toEqual(expected);
    });

    it('return an action to clear an error', () => {
      expect(actions.clearError()).toEqual({ type: types.CLEAR_ERROR });
    });

    it('return an action to reset the frames', () => {
      expect(actions.reset()).toEqual({ type: types.RESET });
    });
  });

  describe('async action creators', () => {
    let store;

    beforeEach(() => {
      store = mockStore(initialState);
    });

    it('return an action to temporarily display error message', () => {
      jest.useFakeTimers();
      const expectedActions = [
        { type: types.SET_ERROR, payload: { message: 'error' } },
        { type: types.CLEAR_ERROR }
      ];
      store.dispatch(actions.flashError('error'));
      jest.runAllTimers();
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('return an action to request a frame from the calculator', () => {
      const expectedActions = [
        {
          type: types.ADD_FRAME,
          payload: { id: 2, imageData: expect.any(String) }
        }
      ];
      const opts = {
        height: 300,
        targetPixelRatio: 1,
        width: 300
      };
      initializeCalculator(desmosMock, calcContainerMock);
      return store.dispatch(actions.requestFrame(opts)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('return an action to request a burst of frames from the calculator', () => {
      const opts = {
        height: 300,
        idx: 1,
        max: 3,
        min: -3,
        oversample: false,
        step: 1,
        width: 300
      };
      initializeCalculator(desmosMock, calcContainerMock);
      return store.dispatch(actions.requestBurst(opts)).then(() => {
        // slide with min/max of -3/3 should dispatch addFrame 7 times
        expect(store.getActions().length).toEqual(7);
      });
    });

    it('return actions to play animation via frames in state', () => {
      const expectedActions = [
        { type: types.PLAY_PREVIEW },
        { type: types.UPDATE_PREVIEW_IDX, payload: { idx: 1 } }
      ];
      store.dispatch(actions.startAnimation());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('return action to generate a GIF via frames in state', () => {
      const expectedActions = [
        { type: types.UPDATE_GIF_PROGRESS, payload: { progress: 100 } },
        { type: types.ADD_GIF, payload: { imageData: expect.any(String) } }
      ];
      const opts = {
        gifHeight: 300,
        gifWidth: 300,
        images: ['img1', 'img2', 'img3'],
        interval: 0.1,
        progressCallback: jest.fn()
      };
      // gifshot mock
      const gifshot = {
        createGIF: (args, cb) => {
          args.progressCallback(100);
          return cb({ image: 'test' });
        }
      };
      store.dispatch(actions.generateGIF([], opts, gifshot));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
