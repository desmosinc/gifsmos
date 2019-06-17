import React, { Component } from 'react';
import classNames from 'classnames';
import { isPositiveInteger, isProperBound } from '../lib/input-helpers';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleStrategyUpdate = this.handleStrategyUpdate.bind(this);
  }

  handleInputUpdate(evt) {
    const {
      target: { name, value, checked }
    } = evt;

    const { updateSetting } = this.props;
    const val = name === 'oversample' ? checked : parseInt(value, 10);
    updateSetting(name, val);
  }

  handleStrategyUpdate(evt) {
    const {
      target: { name, value }
    } = evt;
    const { updateSetting } = this.props;
    updateSetting(name, value);
  }

  render() {
    const {
      expanded,
      width,
      height,
      oversample,
      interval,
      left,
      right,
      top,
      bottom
    } = this.props;

    if (!expanded) return <div className="Settings" />;

    return (
      <div
        className={classNames('Settings', { 'Settings-expanded': expanded })}
      >
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

        <hr style={{ margin: '1rem' }} />

        <div>Top Bound</div>
        <input
          className={classNames('Settings-input', {
            'Settings-input-error': !isProperBound(bottom, top, top)
          })}
          type="number"
          name="top"
          aria-label="top bound"
          value={isNaN(top) ? '' : top}
          onChange={this.handleInputUpdate}
        />

        <div>Bottom Bound</div>
        <input
          className={classNames('Settings-input', {
            'Settings-input-error': !isProperBound(bottom, top, bottom)
          })}
          type="number"
          name="bottom"
          aria-label="bottom bound"
          value={isNaN(bottom) ? '' : bottom}
          onChange={this.handleInputUpdate}
        />

        <div>Left Bound</div>
        <input
          className={classNames('Settings-input', {
            'Settings-input-error': !isProperBound(left, right, left)
          })}
          type="number"
          name="left"
          aria-label="left bound"
          value={isNaN(left) ? '' : left}
          onChange={this.handleInputUpdate}
        />

        <div>Right Bound</div>
        <input
          className={classNames('Settings-input', {
            'Settings-input-error': !isProperBound(left, right, right)
          })}
          type="number"
          name="right"
          aria-label="right bound"
          value={isNaN(right) ? '' : right}
          onChange={this.handleInputUpdate}
        />

        <div>Strategy</div>
        <select
          className="Settings-dropdown"
          name="strategy"
          aria-label="strategy"
          onChange={this.handleStrategyUpdate}
        >
          <option value="contain" defaultValue>
            Contain
          </option>
          <option value="stretch">Stretch</option>
          <option value="preserveX">PreserveX</option>
          <option value="preserveY">PreserveY</option>
        </select>
      </div>
    );
  }
}

export default Settings;
