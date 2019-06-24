import React, { Component } from 'react';
import classNames from 'classnames';
import { getCalcState, setCalcState } from '../lib/calc-helpers';
import { getBurstErrors } from '../lib/input-helpers';
import './Burst.css';

class Burst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 1,
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
    const { expanded } = this.props;

    if (!expanded) return <div className="Burst" />;

    return (
      <div className={classNames('Burst', { 'Burst-expanded': expanded })}>
        <div data-testid="Burst-slider-index-label">Slider Index</div>
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

export default Burst;
