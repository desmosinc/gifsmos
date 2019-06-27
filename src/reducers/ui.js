/*
 * The `ui` state slice holds data that's relevant to the user interface, but
 * not any images that are actually generated.
 *
 * expandedPane: the currently visible pane type
 * previewIdx: the index of the frame being previewed in the preview pane
 * playing: whether the preview is animating
 * error: currently displayed error message
 * burstSliders: expressions from the calculator that are valid sliders
 */

import {
  TOGGLE_PANE,
  UPDATE_PREVIEW_IDX,
  PLAY_PREVIEW,
  PAUSE_PREVIEW,
  SET_ERROR,
  CLEAR_ERROR,
  RESET,
  UPDATE_BURST_SLIDERS
} from '../constants/action-types';
import panes from '../constants/pane-types';

const initialState = {
  expandedPane: panes.NONE,
  previewIdx: 0,
  playing: false,
  error: '',
  burstSliders: []
};

const ui = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_PANE: {
      const { pane } = payload;
      const { expandedPane } = state;
      return {
        ...state,
        ...{
          expandedPane: pane === expandedPane ? panes.NONE : pane,
          playing: false
        }
      };
    }

    case UPDATE_PREVIEW_IDX:
      return {
        ...state,
        previewIdx: payload.idx
      };

    case PLAY_PREVIEW:
      return {
        ...state,
        playing: true
      };

    case PAUSE_PREVIEW:
      return {
        ...state,
        playing: false
      };

    case SET_ERROR: {
      let { expandedPane } = state;
      const { message } = payload;
      if (message.indexOf('setting') > -1) expandedPane = panes.SETTINGS;

      return {
        ...state,
        ...{
          error: message,
          expandedPane
        }
      };
    }

    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };

    case RESET:
      return {
        ...state,
        ...{
          previewIdx: 0,
          playing: false,
          error: ''
        }
      };

    case UPDATE_BURST_SLIDERS: {
      return {
        ...state,
        burstSliders: payload
      };
    }

    default:
      return state;
  }
};

export default ui;
