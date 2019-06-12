import { connect } from 'react-redux';
import FileCabinet from '../components/FileCabinet';
import { togglePane, loadFramesFromLocal } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { ui, images } = state;

  return {
    expanded: ui.expandedPane === panes.FILES,
    images
  };
};

const FileCabinetContainer = connect(
  mapStateToProps,
  { togglePane, loadFramesFromLocal }
)(FileCabinet);

export default FileCabinetContainer;
