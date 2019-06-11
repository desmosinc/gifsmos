import { connect } from 'react-redux';
import FileCabinet from '../components/FileCabinet';
import { togglePane } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { ui } = state;

  return {
    expanded: ui.expandedPane === panes.FILES
  };
};

const FileCabinetContainer = connect(
  mapStateToProps,
  { togglePane }
)(FileCabinet);

export default FileCabinetContainer;
