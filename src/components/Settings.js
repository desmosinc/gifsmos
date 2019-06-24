import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isPositiveInteger } from '../lib/input-helpers';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
  }

  handleInputUpdate(evt) {
    const {
      target: { name, value, checked }
    } = evt;
    const { updateSetting } = this.props;
    const val = name === 'oversample' ? checked : parseInt(value, 10);
    updateSetting(name, val);
  }

  render() {
    const { expanded, width, height, oversample, interval } = this.props;

    if (!expanded) return <div className="Settings" />;

    return (
      <div
        className={classNames('Settings', { 'Settings-expanded': expanded })}
      >
        <div data-testid="Settings-image-width-label">Image Width</div>
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
        <div data-testid="Settings-image-height-label">Image Height</div>
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
        <div data-testid="Settings-frame-interval-label">Interval (ms)</div>
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
      </div>
    );
  }
}

Settings.defaultProps = {
  expanded: false,
  width: 300,
  height: 300,
  oversample: false,
  interval: 100,
  updateSetting: () => {}
};

Settings.propTypes = {
  expanded: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  oversample: PropTypes.bool.isRequired,
  interval: PropTypes.number.isRequired,
  updateSetting: PropTypes.func.isRequired
};

export default Settings;
