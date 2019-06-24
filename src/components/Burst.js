import React, { Component } from 'react';
import classNames from 'classnames';
import { getBurstErrors } from '../lib/input-helpers';
import './Burst.css';
import Info from './Info';
import burstBlurb from '../blurbs/burstBlurb.js';

class Burst extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: 1,
      min: -10,
      max: 10,
      step: 1,
      errors: {}
    };

    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleRequestBurst = this.handleRequestBurst.bind(this);
  }

  handleInputUpdate(evt) {
    const {
      target: { name, value }
    } = evt;
    const { errors, ...newState } = this.state;
    const val = name === 'idx' ? parseInt(value, 10) : parseFloat(value);

    newState[name] = val;
    newState.errors = getBurstErrors(newState);

    this.setState(newState);
  }

  handleRequestBurst() {
    const { requestBurst, expanded, ...imgOpts } = this.props;
    requestBurst({ ...this.state, ...imgOpts });
  }

  render() {
    const { idx, min, max, step, errors } = this.state;
    const { expanded } = this.props;

    if (!expanded) return <div className="Burst" />;

    return (
      <div className={classNames('Burst', { 'Burst-expanded': expanded })}>
        <div className="Component-header">
          <Info blurb={burstBlurb} title={'Burst'} />
        </div>
        <div>Slider Index</div>
        <input
          className={classNames('Burst-input', {
            'Burst-input-error': !!errors.idx
          })}
          type="number"
          name="idx"
          aria-label="slider index"
          value={isNaN(idx) ? '' : idx}
          onChange={this.handleInputUpdate}
        />
        <div>Slider Min</div>
        <input
          className={classNames('Burst-input', {
            'Burst-input-error': !!errors.min
          })}
          type="number"
          name="min"
          aria-label="slider minimum"
          value={isNaN(min) ? '' : min}
          onChange={this.handleInputUpdate}
        />
        <div>Slider Max</div>
        <input
          className={classNames('Burst-input', {
            'Burst-input-error': !!errors.max
          })}
          type="number"
          name="max"
          aria-label="slider maximum"
          value={isNaN(max) ? '' : max}
          onChange={this.handleInputUpdate}
        />
        <div>Slider Step</div>
        <input
          className={classNames('Burst-input', {
            'Burst-input-error': !!errors.step
          })}
          type="number"
          name="step"
          aria-label="slider step"
          value={isNaN(step) ? '' : step}
          onChange={this.handleInputUpdate}
        />
        <div>
          <button
            className="Burst-button"
            onClick={this.handleRequestBurst}
            aria-label="capture several frames"
          >
            Capture
          </button>
        </div>
      </div>
    );
  }
}

export default Burst;
