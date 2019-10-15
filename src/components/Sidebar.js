import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { imageSettingPropTypes } from '../lib/propTypes';
import { imageSettingDefaults } from '../lib/defaultProps';
import SidebarButton from './SidebarButton';
import SidebarButtonWithBadge from './SidebarButtonWithBadge';
import panes from '../constants/pane-types';
import './Sidebar.css';
import HelpModal from './HelpModal';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelpModal: false
    };
    this.handleTogglePreview = this.handleTogglePreview.bind(this);
    this.handleToggleBurst = this.handleToggleBurst.bind(this);
    this.handleToggleSettings = this.handleToggleSettings.bind(this);
    this.handleRequestFrame = this.handleRequestFrame.bind(this);
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
    this.handleToggleFiles = this.handleToggleFiles.bind(this);
  }

  handleTogglePreview() {
    const { togglePane } = this.props;
    togglePane(panes.PREVIEW);
  }

  handleToggleBurst() {
    const { togglePane } = this.props;
    togglePane(panes.BURST);
  }

  handleToggleSettings() {
    const { togglePane } = this.props;
    togglePane(panes.SETTINGS);
  }

  handleRequestFrame() {
    const { requestFrame, width, height, oversample, strategy } = this.props;
    const imageOpts = {
      width,
      height,
      mode: strategy,
      targetPixelRatio: oversample ? 2 : 1
    };

    requestFrame(imageOpts);
  }

  toggleHelpModal() {
    this.setState({
      showHelpModal: !this.state.showHelpModal
    });
  }

  handleToggleFiles() {
    const { togglePane } = this.props;
    togglePane(panes.FILES);
  }

  render() {
    const { reset, expandedPane, numFrames } = this.props;

    return (
      <div className="Sidebar">
        <SidebarButton icon="camera" onClick={this.handleRequestFrame} />

        <SidebarButton
          icon="burst"
          expanded={expandedPane === panes.BURST}
          onClick={this.handleToggleBurst}
        />

        <SidebarButtonWithBadge
          icon="preview"
          expanded={expandedPane === panes.PREVIEW}
          onClick={this.handleTogglePreview}
          color="orange"
          showBadge={!!numFrames}
          value={numFrames > 99 ? '99+' : numFrames}
        />

        <SidebarButton
          icon="saved"
          expanded={expandedPane === panes.FILES}
          onClick={this.handleToggleFiles}
        />

        <SidebarButton
          icon="settings"
          expanded={expandedPane === panes.SETTINGS}
          onClick={this.handleToggleSettings}
        />

        {!!numFrames && <SidebarButton icon="reset" onClick={reset} />}

        <div className="Sidebar-help" onClick={this.toggleHelpModal}>
          <p>Help</p>
        </div>
        <div>
          <HelpModal
            showHelpModal={this.state.showHelpModal}
            toggleHelpModal={this.toggleHelpModal}
          />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  ...imageSettingPropTypes,
  numFrames: PropTypes.number.isRequired,
  expandedPane: PropTypes.string.isRequired,
  gifData: PropTypes.string.isRequired,
  requestFrame: PropTypes.func.isRequired,
  togglePane: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
  numFrames: 0,
  expandedPane: 'NONE',
  gifData: '',
  ...imageSettingDefaults,
  requestFrame: () => {},
  togglePane: () => {},
  reset: () => {},
  getBurstSliders: () => {}
};

export default Sidebar;
