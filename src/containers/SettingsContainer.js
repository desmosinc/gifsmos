import { connect } from 'react-redux';
import Settings from '../components/Settings';
import { updateSetting } from '../actions';
import panes from '../constants/pane-types';

const mapStateToProps = (state, ownProps) => {
  const { settings, ui } = state;
  const { width, height, interval, oversample } = settings.image;
  const { left, right, top, bottom } = settings.bounds;
  const { strategy } = settings;

  return {
    expanded: ui.expandedPane === panes.SETTINGS,
    width,
    height,
    oversample,
    interval,
    left,
    right,
    top,
    bottom,
    strategy
  };
};

const SettingsContainer = connect(
  mapStateToProps,
  { updateSetting }
)(Settings);

export default SettingsContainer;
