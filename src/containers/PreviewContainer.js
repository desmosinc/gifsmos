import { connect } from 'react-redux';
import Preview from '../components/Preview';
import {
  updateGifFileName,
  generateGIF,
  updatePreviewIdx,
  startAnimation,
  stopAnimation
} from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { images, ui, settings } = state;
  const { expandedPane, previewIdx, playing } = ui;
  const { frames, frameIDs, gifProgress, gifData } = images;
  const { width, height, oversample, interval } = settings.image;

  return {
    expanded: expandedPane === panes.PREVIEW,
    previewIdx,
    playing,
    frames,
    frameIDs,
    gifProgress,
    gifData,
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
    generateGIF,
    updateGifFileName,
    startAnimation,
    stopAnimation
  }
)(Preview);

export default PreviewContainer;
