import reducer from './images';
import {
  ADD_FRAME,
  UPDATE_GIF_PROGRESS,
  ADD_GIF,
  UPDATE_IMAGE_SETTING,
  UPDATE_BOUNDS_SETTING,
  UPDATE_STRATEGY,
  RESET
} from '../constants/action-types';

const initialState = {
  frames: {},
  frameIDs: [],
  gifProgress: 0,
  gifData: '',
  caption: '',
  fontColor: '#000000',
  gifFileName: '',
  textAlign: 'center',
  textBaseline: 'bottom'
};

describe('reducers', () => {
  describe('images', () => {
    it('returns the correct initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handles ADD_FRAME', () => {
      const imageData = 'URI';
      const newState = reducer(initialState, {
        type: ADD_FRAME,
        payload: {
          id: 1,
          imageData
        }
      });
      expect(newState.frames).toEqual({ 1: imageData });
      expect(newState.frameIDs).toEqual([1]);
    });

    it('handles UPDATE_GIF_PROGRESS', () => {
      const gifProgress = 0.5;
      const newState = reducer(initialState, {
        type: UPDATE_GIF_PROGRESS,
        payload: { progress: gifProgress }
      });
      expect(newState.gifProgress).toEqual(gifProgress);
    });

    it('handles ADD_GIF', () => {
      const gifData = 'URI';
      const newState = reducer(initialState, {
        type: ADD_GIF,
        payload: { imageData: gifData }
      });
      expect(newState.gifData).toEqual(gifData);
    });

    it('handles image setting actions', () => {
      const gifData = 'URI';
      const gifProgress = 1;
      const gifState = reducer(initialState, {
        type: ADD_GIF,
        payload: { imageData: gifData }
      });
      const progressState = reducer(gifState, {
        type: UPDATE_GIF_PROGRESS,
        payload: { progress: gifProgress }
      });
      const finalState = reducer(progressState, {
        type: UPDATE_IMAGE_SETTING,
        payload: { width: 200 }
      });
      expect(finalState.gifData).toEqual('');
      expect(finalState.gifProgress).toEqual(0);
    });

    it('handles RESET', () => {
      const gifData = 'URI';
      const gifProgress = 1;
      const gifState = reducer(initialState, {
        type: ADD_GIF,
        payload: { imageData: gifData }
      });
      const progressState = reducer(gifState, {
        type: UPDATE_GIF_PROGRESS,
        payload: { progress: gifProgress }
      });
      const finalState = reducer(progressState, { type: RESET });
      expect(finalState).toEqual(initialState);
    });
  });
});
