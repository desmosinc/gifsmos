import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { requestFrame, togglePane, reset } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { images, settings, ui } = state;
  const { expandedPane } = ui;
  const { frameIDs } = images;
  const { width, height, oversample } = settings.image;
  const { left, right, top, bottom } = settings.bounds;
  const { strategy } = settings;

  return {
    numFrames: frameIDs.length,
    expandedPane,
    width,
    height,
    left,
    right,
    top,
    bottom,
    oversample,
    strategy
  };
};

const SidebarContainer = connect(
  mapStateToProps,
  {
    requestFrame,
    togglePane,
    reset
  }
)(Sidebar);

export default SidebarContainer;
