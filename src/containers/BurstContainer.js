import { connect } from 'react-redux';
import Burst from '../components/Burst';
import { requestBurst, undoBurst } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { settings, ui, images } = state;
  const { width, height, oversample } = settings.image;
  const { frames, frameIDs } = images;
  const { left, right, top, bottom } = settings.bounds;
  const { strategy } = settings;

  return {
    expanded: ui.expandedPane === panes.BURST,
    width,
    height,
    oversample,
    frames,
    frameIDs,
    left,
    right,
    top,
    bottom,
    strategy
  };
};

const BurstContainer = connect(
  mapStateToProps,
  { requestBurst, undoBurst }
)(Burst);

export default BurstContainer;
