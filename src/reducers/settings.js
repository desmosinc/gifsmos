/*
 * The `settings` slice holds the user preferences for their calculator
 * screenshots and the generated GIF
 *
 * images: {
 *   width: frame width
 *   height: frame height
 *   oversample: whether to use a higher targetPixelRatio in image sampling
 * }
 *
 * bounds: {
 *   left: minimum x-value, in math coordinates
 *   right: maximum x-value, in math coordinates
 *   top: maximum y-value, in math coordinates
 *   bottom: minimum y-value, in math coordinates
 * }
 *
 * strategy: how the calculator should reconcile mismatched aspect ratios
 * between the math bounds and the image dimensions
 */

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

// TODO: implement bounds and strategy
const settings = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_IMAGE_SETTING:
      return {
        ...state,
        image: {
          ...state.image,
          ...payload
        }
      };

    case UPDATE_BOUNDS_SETTING:
      return {
        ...state,
        bounds: {
          ...state.bounds,
          ...payload
        }
      };

    case UPDATE_STRATEGY:
      return {
        ...state,
        ...payload
      };

    // case RESET: intentionally omitted

    default:
      return state;
  }
};

export default settings;
