import { connect } from 'react-redux';
import Burst from '../components/Burst';
import { requestBurst, undoBurst, getBurstSliders } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { settings, ui, images } = state;
  const { width, height, oversample } = settings.image;
  const { frames, frameIDs } = images;
  const { strategy } = settings;

  return {
    expanded: ui.expandedPane === panes.BURST,
    width,
    height,
    oversample,
    burstSliders: ui.burstSliders,
    frames,
    frameIDs,
    strategy
  };
};

const BurstContainer = connect(
  mapStateToProps,
  { requestBurst, undoBurst, getBurstSliders }
)(Burst);

export default BurstContainer;
