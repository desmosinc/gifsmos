/*
 * The `images` slice holds the portion of the state related to actual image
 * data, both from individual frames and the final generated GIF.
 *
 * frames: a map from frame ids to data URIs
 * frameIDs: an array of images representing the final image order
 * gifProgress: a value in [0, 1] representing processing progress
 * gifData: the data URI of the generated GIF
 */

import {
  ADD_FRAME,
  UPDATE_GIF_PROGRESS,
  ADD_GIF,
  UNDO_BURST,
  UPDATE_GIF_FILENAME,
  UPDATE_IMAGE_SETTING,
  UPDATE_BOUNDS_SETTING,
  UPDATE_STRATEGY,
  RESET,
  UPDATE_TEXT,
  UPDATE_TEXT_COLOR,
  UPDATE_TEXT_POSITION
} from '../constants/action-types';

const initialState = {
  frames: {},
  frameIDs: [],
  gifProgress: 0,
  gifData: '',
  caption: '',
  textAlign: 'center',
  textBaseline: 'bottom',
  fontColor: '#000000',
  gifFileName: ''
};

const images = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FRAME: {
      const { id, imageData } = payload;
      const { frames, frameIDs } = state;
      return {
        ...state,
        ...{
          frames: { ...frames, [id]: imageData },
          frameIDs: [...frameIDs, id],
          gifProgress: 0,
          gifData: ''
        }
      };
    }

    case UPDATE_GIF_PROGRESS:
      return {
        ...state,
        gifProgress: payload.progress
      };

    case ADD_GIF:
      return {
        ...state,
        gifData: payload.imageData
      };

    case UNDO_BURST:
      return {
        ...state,
        frames: payload.frames,
        frameIDs: payload.frameIDs
      };

    case UPDATE_IMAGE_SETTING:
    case UPDATE_BOUNDS_SETTING:
    case UPDATE_STRATEGY:
      return {
        ...state,
        ...{
          gifProgress: 0,
          gifData: ''
        }
      };

    case UPDATE_TEXT:
      return {
        ...state,
        caption: payload.text
      };

    case UPDATE_TEXT_COLOR:
      return {
        ...state,
        fontColor: payload.fontColor
      };

    case UPDATE_GIF_FILENAME:
      return {
        ...state,
        gifFileName: payload.gifFileName
      };

    case UPDATE_TEXT_POSITION:
      return {
        ...state,
        textAlign: payload.textAlign,
        textBaseline: payload.textBaseline
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default images;
