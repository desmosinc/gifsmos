import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getCalcState, setCalcState } from '../lib/calc-helpers';
import { imageSettingPropTypes } from '../lib/propTypes';
import { imageSettingDefaults } from '../lib/defaultProps';
import { getBurstErrors } from '../lib/input-helpers';
import './Burst.css';
import InfoIcon from './InfoIcon';
import refresh from './icons/refresh.svg';

class Burst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: null,
      min: -10,
      max: 10,
      step: 1,
      isCapturing: false,
      canUndo: false,
      prevFrames: {},
      prevFrameIDs: [],
      prevCalcState: {},
      errors: {}
    };
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleRequestBurst = this.handleRequestBurst.bind(this);
    this.handleUndoBurst = this.handleUndoBurst.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.frameIDs.length !== prevProps.frameIDs.length) {
      this.setState({ canUndo: false });
    }
    if (this.props.burstSliders.length && prevProps.burstSliders.length === 0) {
      this.setState({ idx: this.props.burstSliders[0].expressionIdx });
    }
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

  async handleRequestBurst() {
    this.setState({ isCapturing: true, canUndo: false });
    const { requestBurst, expanded, frames, frameIDs, ...imgOpts } = this.props;
    const prevCalcState = getCalcState();
    const undoData = await requestBurst({
      ...this.state,
      ...imgOpts,
      frames,
      frameIDs
    });
    if (undoData) {
      const { prevFrames, prevFrameIDs } = undoData;
      this.setState({
        isCapturing: false,
        canUndo: true,
        prevFrames,
        prevFrameIDs,
        prevCalcState
      });
    } else {
      this.setState({ isCapturing: false });
    }
  }

  handleUndoBurst() {
    const { undoBurst } = this.props;
    const { prevFrames, prevFrameIDs, prevCalcState } = this.state;
    undoBurst(prevFrames, prevFrameIDs);
    setCalcState(prevCalcState);
    this.setState({
      canUndo: false,
      prevFrames: {},
      prevFrameIDs: [],
      prevCalcState: {}
    });
  }

  render() {
    const { idx, min, max, step, errors } = this.state;
    const { expanded, burstSliders, getBurstSliders } = this.props;
    const burstInfo = `Burst allows you to generate multiple snapshots
      of your graph at one time. Enter the relevant info in the input fields
      and hit capture to watch the magic happen.`;

    if (!expanded) return <div className="Burst" />;

    return (
      <div className={classNames('Burst', { 'Burst-expanded': expanded })}>
        <div className="Burst-header">
          <h2>Burst</h2>
          <InfoIcon infoText={burstInfo} />
        </div>
        <div className="Options-container">
          <div className="Burst-dropdown-container">
            <div data-testid="Burst-slider-index-label">Slider</div>
            <select
              className={classNames('Burst-dropdown', {
                'Burst-input-error': !!errors.idx
              })}
              name="idx"
              aria-label="slider index"
              value={idx ? idx : undefined}
              onChange={this.handleInputUpdate}
            >
              {!burstSliders.length ? (
                <option value={undefined}>No Sliders</option>
              ) : null}
              {burstSliders.map(exp => {
                return (
                  <option
                    key={`slider-${exp.id}`}
                    value={exp.expressionIdx}
                    defaultValue={idx === exp.expressionIdx}
                  >
                    {exp.latex.split('=').join(' = ')}
                  </option>
                );
              })}
            </select>
            <img
              src={refresh}
              alt="refresh sliders icon"
              className="Burst-refresh-icon"
              onClick={getBurstSliders}
            />
          </div>
          <div data-testid="Burst-slider-min-label">Slider Min</div>
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
          <div data-testid="Burst-slider-max-label">Slider Max</div>
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
          <div data-testid="Burst-slider-step-label">Slider Step</div>
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
              className={classNames('Burst-button', {
                capturing: this.state.isCapturing
              })}
              onClick={this.handleRequestBurst}
              aria-label="capture several frames"
            >
              {this.state.isCapturing ? 'Capturing...' : 'Capture'}
            </button>
          </div>
        </div>
        {this.state.canUndo ? (
          <div>
            <button
              className="Burst-button"
              onClick={this.handleUndoBurst}
              aria-label="undo last burst"
            >
              Undo
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

Burst.defaultProps = {
  ...imageSettingDefaults,
  expanded: false,
  requestBurst: () => {},
  burstSliders: []
};

Burst.propTypes = {
  ...imageSettingPropTypes,
  expanded: PropTypes.bool.isRequired,
  requestBurst: PropTypes.func.isRequired
};

export default Burst;
