import React, { Component } from 'react';
import download from 'downloadjs';
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
    this.handleDownload = this.handleDownload.bind(this);
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

  handleDownload() {
    const { gifData } = this.props;
    download(gifData, 'gifsmos.gif', 'image/gif');
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

  render() {
    const { reset, expandedPane, numFrames, gifData } = this.props;

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
          icon="settings"
          expanded={expandedPane === panes.SETTINGS}
          onClick={this.handleToggleSettings}
        />

        {!!numFrames && <SidebarButton icon="trash" onClick={reset} />}

        {!!gifData.length && (
          <SidebarButtonWithBadge
            icon="download"
            onClick={this.handleDownload}
            color="green"
            showBadge={true}
            value={'\u2713'}
          />
        )}

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

export default Sidebar;
