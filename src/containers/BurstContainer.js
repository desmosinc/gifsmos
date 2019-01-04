import { connect } from 'react-redux';
import Burst from '../components/Burst';
import { requestBurst } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { settings, ui } = state;
  const { width, height, oversample } = settings.image;

  return {
    expanded: ui.expandedPane === panes.BURST,
    width,
    height,
    oversample
  };
};

const BurstContainer = connect(
  mapStateToProps,
  { requestBurst }
)(Burst);

export default BurstContainer;
