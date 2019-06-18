import { connect } from 'react-redux';
import Preview from '../components/Preview';
import {
  generateGIF,
  updatePreviewIdx,
  startAnimation,
  stopAnimation,
  deleteFrameAtIdx
} from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { images, ui, settings } = state;
  const { expandedPane, previewIdx, playing } = ui;
  const { frames, frameIDs, gifProgress } = images;
  const { width, height, oversample, interval } = settings.image;

  return {
    expanded: expandedPane === panes.PREVIEW,
    previewIdx,
    playing,
    frames,
    frameIDs,
    gifProgress,
    width,
    height,
    oversample,
    interval
  };
};

const PreviewContainer = connect(
  mapStateToProps,
  {
    updatePreviewIdx,
    deleteFrameAtIdx,
    generateGIF,
    startAnimation,
    stopAnimation
  }
)(Preview);

export default PreviewContainer;
