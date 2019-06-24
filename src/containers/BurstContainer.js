import { connect } from 'react-redux';
import Burst from '../components/Burst';
import { requestBurst } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { settings, ui } = state;
  const { width, height, oversample } = settings.image;
  const { left, right, top, bottom } = settings.bounds;

  return {
    expanded: ui.expandedPane === panes.BURST,
    width,
    height,
    oversample,
    left,
    right,
    top,
    bottom
  };
};

const BurstContainer = connect(
  mapStateToProps,
  { requestBurst }
)(Burst);

export default BurstContainer;
