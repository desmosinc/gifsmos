import { connect } from 'react-redux';
import Save from '../components/Save';
import { togglePane, loadFramesFromLocal, saveGraph } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { ui, images } = state;

  return {
    expanded: ui.expandedPane === panes.FILES,
    images
  };
};

const SaveContainer = connect(
  mapStateToProps,
  { togglePane, loadFramesFromLocal, saveGraph }
)(Save);

export default SaveContainer;
