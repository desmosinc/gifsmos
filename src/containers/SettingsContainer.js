import { connect } from 'react-redux';
import Settings from '../components/Settings';
import { updateSetting } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { settings, ui } = state;
  const { width, height, interval, oversample } = settings.image;

  return {
    expanded: ui.expandedPane === panes.SETTINGS,
    width,
    height,
    oversample,
    interval
  };
};

const SettingsContainer = connect(
  mapStateToProps,
  { updateSetting }
)(Settings);

export default SettingsContainer;
