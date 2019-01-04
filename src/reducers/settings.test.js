import reducer from './settings';
import {
  UPDATE_IMAGE_SETTING,
  UPDATE_BOUNDS_SETTING,
  UPDATE_STRATEGY
} from '../constants/action-types';

const initialState = {
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
};

describe('reducers', () => {
  describe('settings', () => {
    it('returns the correct initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handles UPDATE_IMAGE_SETTING', () => {
      const width = 100;
      const newState = reducer(initialState, {
        type: UPDATE_IMAGE_SETTING,
        payload: { width }
      });
      expect(newState.image.width).toEqual(width);
    });

    it('handles UPDATE_BOUNDS_SETTING', () => {
      const bottom = -20;
      const newState = reducer(initialState, {
        type: UPDATE_BOUNDS_SETTING,
        payload: { bottom }
      });
      expect(newState.bounds.bottom).toEqual(bottom);
    });

    it('handles UPDATE_STRATEGY', () => {
      const strategy = 'stretch';
      const newState = reducer(initialState, {
        type: UPDATE_STRATEGY,
        payload: { strategy }
      });
      expect(newState.strategy).toEqual(strategy);
    });
  });
});
