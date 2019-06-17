import { connect } from 'react-redux';
import Folder from '../components/Folder';
import { togglePane, loadFramesFromLocal, saveGraph } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { ui, images } = state;

  return {
    expanded: ui.expandedPane === panes.FILES,
    images
  };
};

const FolderContainer = connect(
  mapStateToProps,
  { togglePane, loadFramesFromLocal, saveGraph }
)(Folder);

export default FolderContainer;
