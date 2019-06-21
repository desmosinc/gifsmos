import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarButton from './SidebarButton';
import SidebarButtonWithBadge from './SidebarButtonWithBadge';
import panes from '../constants/pane-types';
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleTogglePreview = this.handleTogglePreview.bind(this);
    this.handleToggleBurst = this.handleToggleBurst.bind(this);
    this.handleToggleSettings = this.handleToggleSettings.bind(this);
    this.handleRequestFrame = this.handleRequestFrame.bind(this);
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
    const { requestFrame, width, height, oversample } = this.props;
    const imageOpts = {
      width,
      height,
      targetPixelRatio: oversample ? 2 : 1
    };
    requestFrame(imageOpts);
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
          icon="folder"
          expanded={expandedPane === panes.FILES}
          onClick={this.handleToggleFiles}
        />

        <SidebarButton
          icon="settings"
          expanded={expandedPane === panes.SETTINGS}
          onClick={this.handleToggleSettings}
        />

        {!!numFrames && <SidebarButton icon="reset" onClick={reset} />}

        <div className="Sidebar-help">
          <a
            href="https://github.com/ctlusto/gifsmos/blob/master/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Help
          </a>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  numFrames: PropTypes.number.isRequired,
  expandedPane: PropTypes.string.isRequired,
  gifData: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  oversample: PropTypes.bool.isRequired,
  requestFrame: PropTypes.func.isRequired,
  togglePane: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
  numFrames: 0,
  expandedPane: 'NONE',
  gifData: '',
  width: 100,
  height: 100,
  oversample: false,
  requestFrame: () => {},
  togglePane: () => {},
  reset: () => {}
};

export default Sidebar;
