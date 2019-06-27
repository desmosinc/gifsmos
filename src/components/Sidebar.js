import React, { Component } from 'react';
import SidebarButton from './SidebarButton';
import SidebarButtonWithBadge from './SidebarButtonWithBadge';
import panes from '../constants/pane-types';
import './Sidebar.css';
import Modal from './Modal';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleTogglePreview = this.handleTogglePreview.bind(this);
    this.handleToggleBurst = this.handleToggleBurst.bind(this);
    this.handleToggleSettings = this.handleToggleSettings.bind(this);
    this.handleRequestFrame = this.handleRequestFrame.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
    const {
      requestFrame,
      width,
      height,
      oversample,
      left,
      right,
      top,
      bottom,
      strategy
    } = this.props;
    const imageOpts = {
      width,
      height,
      mathBounds: {
        left,
        right,
        top,
        bottom
      },
      mode: strategy,
      targetPixelRatio: oversample ? 2 : 1
    };

    requestFrame(imageOpts);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
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

        <div className="Sidebar-help" onClick={this.toggleModal}>
          <p>Help</p>
        </div>
        <div>
          <Modal
            showModal={this.state.showModal}
            toggleModal={this.toggleModal}
          />
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  gifData: ''
};

export default Sidebar;
