import React, { Component } from 'react';
import classNames from 'classnames';
import { isPositiveInteger } from '../lib/input-helpers';
import './Settings.css';
import Info from './Info';
import settingsBlurb from './infoBlurbs/settingsBlurb';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    };
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  handleInputUpdate(evt) {
    const {
      target: { name, value, checked }
    } = evt;
    const { updateSetting } = this.props;
    const val = name === 'oversample' ? checked : parseInt(value, 10);
    updateSetting(name, val);
  }

  toggleInfo() {
    this.setState({
      showInfo: !this.state.showInfo
    });
  }

  render() {
    const { expanded, width, height, oversample, interval } = this.props;
    let displayClass = this.state.showInfo ? 'show' : 'hide';

    if (!expanded) return <div className="Settings" />;

    return (
      <div
        className={classNames('Settings', { 'Settings-expanded': expanded })}
      >
        <div>
          <h1>Settings</h1>
        </div>
        <div>Image Width</div>
        <input
          className={classNames('Settings-input', {
            'Settings-input-error': !isPositiveInteger(width)
          })}
          type="number"
          name="width"
          aria-label="image width"
          value={isNaN(width) ? '' : width}
          onChange={this.handleInputUpdate}
        />
        <div>Image Height</div>
        <input
          className={classNames('Settings-input', {
            'Settings-input-error': !isPositiveInteger(height)
          })}
          type="number"
          name="height"
          aria-label="image height"
          value={isNaN(height) ? '' : height}
          onChange={this.handleInputUpdate}
        />
        <div>Interval (ms)</div>
        <input
          className={classNames('Settings-input', {
            'Settings-input-error': !isPositiveInteger(interval)
          })}
          type="number"
          name="interval"
          aria-label="frame interval"
          value={isNaN(interval) ? '' : interval}
          onChange={this.handleInputUpdate}
        />
        <div>
          <input
            type="checkbox"
            name="oversample"
            aria-label="oversample image"
            checked={oversample}
            onChange={this.handleInputUpdate}
          />
          <span>Oversample</span>
        </div>
        <Info
          infoButtonClass={'settings-info-button'}
          className={'settingsInformation'}
          toggleInfo={this.toggleInfo}
          displayClass={displayClass}
          blurb={settingsBlurb}
        />
      </div>
    );
  }
}

export default Settings;
