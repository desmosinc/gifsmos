import reducer from './images';
import {
  ADD_FRAME,
  UPDATE_GIF_PROGRESS,
  UPDATE_GIF_FILENAME,
  ADD_GIF,
  UNDO_BURST,
  UPDATE_IMAGE_SETTING,
  UPDATE_BOUNDS_SETTING,
  UPDATE_STRATEGY,
  UPDATE_TEXT,
  UPDATE_TEXT_COLOR,
  UPDATE_TEXT_POSITION,
  RESET
} from '../constants/action-types';

const initialState = {
  frames: {},
  frameIDs: [],
  redoFrames: [],
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

    it('handles UPDATE_GIF_FILENAME', () => {
      const gifFileName = 'name';
      const newState = reducer(initialState, {
        type: UPDATE_GIF_FILENAME,
        payload: { gifFileName }
      });
      expect(newState.gifFileName).toEqual(gifFileName);
    });

    it('handles ADD_GIF', () => {
      const gifData = 'URI';
      const newState = reducer(initialState, {
        type: ADD_GIF,
        payload: { imageData: gifData }
      });
      expect(newState.gifData).toEqual(gifData);
    });

    it('handles UNDO_BURST', () => {
      const frames = { 0: 'zero' };
      const frameIDs = [0];
      const newState = reducer(initialState, {
        type: UNDO_BURST,
        payload: { frames, frameIDs }
      });
      expect(newState.frames).toEqual(frames);
      expect(newState.frameIDs).toEqual(frameIDs);
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

    it('handles UPDATE_TEXT', () => {
      const text = 'text';
      const newState = reducer(initialState, {
        type: UPDATE_TEXT,
        payload: { text }
      });
      expect(newState.caption).toEqual(text);
    });

    it('handles UPDATE_TEXT_COLOR', () => {
      const fontColor = '#FFFFFF';
      const newState = reducer(initialState, {
        type: UPDATE_TEXT_COLOR,
        payload: { fontColor }
      });
      expect(newState.fontColor).toEqual(fontColor);
    });

    it('handles UPDATE_TEXT_POSITION', () => {
      const textAlign = 'left';
      const textBaseline = 'top';

      const newState = reducer(initialState, {
        type: UPDATE_TEXT_POSITION,
        payload: { textAlign, textBaseline }
      });
      expect(newState.textAlign).toEqual(textAlign);
      expect(newState.textBaseline).toEqual(textBaseline);
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
