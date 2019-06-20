import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { requestFrame, togglePane, reset } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { images, settings, ui } = state;
  const { expandedPane } = ui;
  const { gifData, frameIDs, gifFileName } = images;
  const { width, height, oversample } = settings.image;

  return {
    numFrames: frameIDs.length,
    expandedPane,
    gifData,
    gifFileName,
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
    reset
  }
)(Sidebar);

export default SidebarContainer;
