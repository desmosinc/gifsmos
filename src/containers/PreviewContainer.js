import { connect } from 'react-redux';
import Preview from '../components/Preview';
import {
  updateGIFFileName,
  generateGIF,
  updatePreviewIdx,
  startAnimation,
  stopAnimation,
  updateText,
  updateTextColor
} from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { images, ui, settings } = state;
  const { expandedPane, previewIdx, playing } = ui;
  const {
    frames,
    frameIDs,
    gifProgress,
    gifData,
    caption,
    fontColor,
    gifFileName
  } = images;
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
    interval,
    caption,
    fontColor,
    gifFileName
  };
};

const PreviewContainer = connect(
  mapStateToProps,
  {
    updatePreviewIdx,
    generateGIF,
    startAnimation,
    stopAnimation,
    updateText,
    updateTextColor,
    updateGIFFileName
  }
)(Preview);

export default PreviewContainer;
