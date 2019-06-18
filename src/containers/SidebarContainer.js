import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { requestFrame, togglePane, reset, getBurstSliders } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { images, settings, ui } = state;
  const { expandedPane } = ui;
  const { gifData, frameIDs } = images;
  const { width, height, oversample } = settings.image;

  return {
    numFrames: frameIDs.length,
    expandedPane,
    gifData,
    width,
    height,
    oversample
  };
};

const SidebarContainer = connect(
  mapStateToProps,
  {
    requestFrame,
    togglePane,
    reset,
    getBurstSliders
  }
)(Sidebar);

export default SidebarContainer;
